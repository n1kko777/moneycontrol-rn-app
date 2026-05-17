import { expect, type Page, test } from '@playwright/test';

const configuredApiBaseURL = (process.env.EXPO_PUBLIC_API_URL || 'http://127.0.0.1:8000').replace(
  /\/+$/,
  ''
);

const inputByPlaceholder = (page: Page, placeholder: string) =>
  page.locator(`input[placeholder="${placeholder}"]`).last();

test.describe('auth screens', () => {
  test('renders login screen without calling production auth endpoints', async ({ page }) => {
    const productionAuthRequests: string[] = [];

    page.on('request', (request) => {
      if (request.url().startsWith('https://mncntrl.ru/dj-rest-auth')) {
        productionAuthRequests.push(request.url());
      }
    });

    await page.goto('/');

    await expect(page).toHaveTitle('Login');
    await expect(page.getByText('Версия: 1.6.3')).toBeVisible();
    await expect(inputByPlaceholder(page, 'Почта')).toBeVisible();
    await expect(inputByPlaceholder(page, 'Пароль')).toBeVisible();
    await expect(page.getByText('Войти')).toBeVisible();
    await expect(page.getByText('Забыли пароль?')).toBeVisible();
    await expect(page.getByText('Зарегистрироваться')).toBeVisible();
    expect(productionAuthRequests).toEqual([]);
  });

  test('navigates from login to registration screen', async ({ page }) => {
    await page.goto('/');
    await page.getByText('Зарегистрироваться').click();

    await expect(page).toHaveTitle('Register');
    await expect(page.getByText('Регистрация')).toBeVisible();
    await expect(inputByPlaceholder(page, 'Имя')).toBeVisible();
    await expect(inputByPlaceholder(page, 'Фамилия')).toBeVisible();
    await expect(inputByPlaceholder(page, 'Почта')).toBeVisible();
    await expect(inputByPlaceholder(page, 'Пароль')).toBeVisible();
    await expect(inputByPlaceholder(page, 'Повторите пароль')).toBeVisible();
    await expect(page.getByText(/Нажав кнопку/)).toBeVisible();
  });

  test('submits login to configured API URL', async ({ page }) => {
    const authRequests: string[] = [];

    await page.route('**/dj-rest-auth/login/', async (route) => {
      authRequests.push(route.request().url());
      await route.fulfill({
        status: 401,
        contentType: 'application/json',
        body: JSON.stringify({ non_field_errors: ['Unable to log in with provided credentials.'] }),
      });
    });

    await page.goto('/');
    await inputByPlaceholder(page, 'Почта').fill('local-user@example.com');
    await inputByPlaceholder(page, 'Пароль').fill('local-password');
    await page.getByText('Войти').click();

    await expect.poll(() => authRequests).toHaveLength(1);
    expect(authRequests[0]).toBe(`${configuredApiBaseURL}/dj-rest-auth/login/`);
    expect(authRequests[0]).not.toContain('https://mncntrl.ru');
  });
});
