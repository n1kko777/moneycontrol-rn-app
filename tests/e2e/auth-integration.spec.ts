import { expect, type APIRequestContext, type Page, test } from '@playwright/test';
import { execFileSync } from 'node:child_process';

const configuredApiBaseURL = (process.env.EXPO_PUBLIC_API_URL || 'http://127.0.0.1:8000').replace(
  /\/+$/,
  ''
);
const apiContainer = process.env.E2E_API_CONTAINER || 'mc-local-api';

type TestUser = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

type OnboardingData = {
  companyName: string;
  phone: string;
};

type CreatedOnboardingUser = {
  user: TestUser;
  companyName: string;
};

const inputByPlaceholder = (page: Page, placeholder: string) =>
  page.locator(`input[placeholder="${placeholder}"]`).last();

const buttonText = (page: Page, text: string) => page.getByText(text, { exact: true }).last();
const exactText = (page: Page, text: string) => page.getByText(text, { exact: true }).last();

const uniqueUser = (label: string): TestUser => {
  const id = `${label}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  return {
    email: `${id}@example.com`,
    firstName: 'E2E',
    lastName: 'User',
    password: 'E2ePassword12345',
  };
};

const runDjangoShell = (script: string, env: Record<string, string>) => {
  const envArgs = Object.entries(env).flatMap(([key, value]) => ['-e', `${key}=${value}`]);

  return execFileSync(
    'docker',
    ['exec', ...envArgs, apiContainer, 'python', 'manage.py', 'shell', '-c', script],
    { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }
  ).trim();
};

const cleanupUser = (email: string) => {
  runDjangoShell(
    [
      'import os',
      'from django.contrib.auth import get_user_model',
      'from core.models import Company, Profile',
      "user = get_user_model().objects.filter(email=os.environ['E2E_EMAIL']).first()",
      'profiles = list(Profile.objects.filter(user=user)) if user else []',
      'company_ids = [profile.company_id for profile in profiles if profile.company_id]',
      'Company.objects.filter(id__in=company_ids).delete()',
      'Profile.objects.filter(user=user).delete() if user else None',
      'user.delete() if user else None',
    ].join('; '),
    { E2E_EMAIL: email }
  );
};

const loginVerifiedUserViaUi = async (page: Page, request: APIRequestContext, user: TestUser) => {
  await registerUserViaApi(request, user);
  await verifyEmailViaApi(request, user.email);

  await page.goto('/');
  await inputByPlaceholder(page, 'Почта').fill(user.email);
  await inputByPlaceholder(page, 'Пароль').fill(user.password);
  await buttonText(page, 'Войти').click();
};

const registerUserViaApi = async (request: APIRequestContext, user: TestUser) => {
  const response = await request.post(`${configuredApiBaseURL}/dj-rest-auth/registration/`, {
    data: {
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.email,
      password1: user.password,
      password2: user.password,
    },
  });

  expect(response.status()).toBe(201);
};

const confirmationKeyFor = (email: string) =>
  runDjangoShell(
    [
      'import os',
      'from allauth.account.models import EmailAddress, EmailConfirmationHMAC',
      "address = EmailAddress.objects.get(email=os.environ['E2E_EMAIL'])",
      'print(EmailConfirmationHMAC(address).key)',
    ].join('; '),
    { E2E_EMAIL: email }
  );

const verifyEmailViaApi = async (request: APIRequestContext, email: string) => {
  const response = await request.post(
    `${configuredApiBaseURL}/dj-rest-auth/registration/verify-email/`,
    {
      data: { key: confirmationKeyFor(email) },
    }
  );

  expect(response.status()).toBe(200);
};

const createOnboardedUserViaUi = async (
  page: Page,
  request: APIRequestContext,
  label = 'onboarding'
): Promise<CreatedOnboardingUser> => {
  const user = uniqueUser(label);
  const phoneSuffix = `${Date.now().toString().slice(-6)}${Math.random().toString().slice(2, 6)}`;
  const companyName = `E2E Co ${Math.random().toString(36).slice(2, 8)}`;

  try {
    await loginVerifiedUserViaUi(page, request, user);

    await expect(page.getByText('Создание профиля сотрудника')).toBeVisible();
    await inputByPlaceholder(page, 'Имя').fill(user.firstName);
    await inputByPlaceholder(page, 'Фамилия').fill(user.lastName);
    await inputByPlaceholder(page, 'Телефон').fill(`+7900${phoneSuffix}`);
    await buttonText(page, 'Создать профиль').click();

    await expect(page.getByText('Добавление компании')).toBeVisible();
    await inputByPlaceholder(page, 'Название компании').fill(companyName);
    await buttonText(page, 'Создать компанию').click();

    await expect(page.getByText(companyName)).toBeVisible();
    await expect(page.getByText('Баланс компании')).toBeVisible();

    return { user, companyName };
  } catch (error) {
    try {
      cleanupUser(user.email);
    } catch {
      // Preserve the original test failure.
    }
    throw error;
  }
};

const gotoHome = async (page: Page, companyName: string) => {
  await page.goto('/');
  await expect(page.getByText(companyName)).toBeVisible();
};

const openMenuItem = async (page: Page, title: string) => {
  await exactText(page, 'Еще').click();
  await expect(exactText(page, 'Меню')).toBeVisible();
  await exactText(page, title).click();
};

test.describe('auth API integration', () => {
  test('registers a new user through the UI against the local API', async ({ page }) => {
    const user = uniqueUser('register');
    const productionAuthRequests: string[] = [];
    const registrationResponses: number[] = [];

    page.on('dialog', (dialog) => dialog.dismiss());
    page.on('request', (request) => {
      if (request.url().startsWith('https://mncntrl.ru')) {
        productionAuthRequests.push(request.url());
      }
    });
    page.on('response', (response) => {
      if (response.url() === `${configuredApiBaseURL}/dj-rest-auth/registration/`) {
        registrationResponses.push(response.status());
      }
    });

    try {
      await page.goto('/');
      await buttonText(page, 'Зарегистрироваться').click();

      await inputByPlaceholder(page, 'Имя').fill(user.firstName);
      await inputByPlaceholder(page, 'Фамилия').fill(user.lastName);
      await inputByPlaceholder(page, 'Почта').fill(user.email);
      await inputByPlaceholder(page, 'Пароль').fill(user.password);
      await inputByPlaceholder(page, 'Повторите пароль').fill(user.password);
      await buttonText(page, 'Зарегистрироваться').click();

      await expect.poll(() => registrationResponses).toEqual([201]);
      await expect(page).toHaveTitle('Login');
      expect(productionAuthRequests).toEqual([]);
    } finally {
      cleanupUser(user.email);
    }
  });

  test('logs in a verified user through the UI against the local API', async ({
    page,
    request,
  }) => {
    const user = uniqueUser('login');
    const productionAuthRequests: string[] = [];
    const loginResponses: number[] = [];

    page.on('request', (pageRequest) => {
      if (pageRequest.url().startsWith('https://mncntrl.ru')) {
        productionAuthRequests.push(pageRequest.url());
      }
    });
    page.on('response', (response) => {
      if (response.url() === `${configuredApiBaseURL}/dj-rest-auth/login/`) {
        loginResponses.push(response.status());
      }
    });

    try {
      await loginVerifiedUserViaUi(page, request, user);

      await expect.poll(() => loginResponses).toEqual([200]);
      await expect(page.getByText('Создание профиля сотрудника')).toBeVisible();
      await expect(inputByPlaceholder(page, 'Телефон')).toBeVisible();
      expect(productionAuthRequests).toEqual([]);
    } finally {
      cleanupUser(user.email);
    }
  });

  test('creates profile and company during first-login onboarding', async ({ page, request }) => {
    const user = uniqueUser('onboarding');
    const phoneSuffix = `${Date.now().toString().slice(-6)}${Math.random().toString().slice(2, 6)}`;
    const onboardingData: OnboardingData = {
      companyName: `E2E Co ${Math.random().toString(36).slice(2, 8)}`,
      phone: `+7900${phoneSuffix}`,
    };
    const productionAuthRequests: string[] = [];
    const profileResponses: number[] = [];
    const companyResponses: number[] = [];

    page.on('request', (pageRequest) => {
      if (pageRequest.url().startsWith('https://mncntrl.ru')) {
        productionAuthRequests.push(pageRequest.url());
      }
    });
    page.on('response', (response) => {
      if (
        response.request().method() === 'POST' &&
        response.url() === `${configuredApiBaseURL}/api/v1/profile/`
      ) {
        profileResponses.push(response.status());
      }
      if (
        response.request().method() === 'POST' &&
        response.url() === `${configuredApiBaseURL}/api/v1/company/`
      ) {
        companyResponses.push(response.status());
      }
    });

    try {
      await loginVerifiedUserViaUi(page, request, user);

      await expect(page.getByText('Создание профиля сотрудника')).toBeVisible();
      await inputByPlaceholder(page, 'Имя').fill(user.firstName);
      await inputByPlaceholder(page, 'Фамилия').fill(user.lastName);
      await inputByPlaceholder(page, 'Телефон').fill(onboardingData.phone);
      await buttonText(page, 'Создать профиль').click();

      await expect.poll(() => profileResponses).toContain(201);
      await expect(page.getByText('Добавление компании')).toBeVisible();
      await inputByPlaceholder(page, 'Название компании').fill(onboardingData.companyName);
      await buttonText(page, 'Создать компанию').click();

      await expect.poll(() => companyResponses).toContain(201);
      await expect(page.getByText(onboardingData.companyName)).toBeVisible();
      await expect(page.getByText('Баланс компании')).toBeVisible();
      await expect(page.getByText('Счета')).toBeVisible();
      await expect(page.getByText('Категории')).toBeVisible();
      await expect(page.getByText('Теги')).toBeVisible();
      await expect(page.getByText('Последние операции')).toBeVisible();
      await expect(page.getByText('Список пуст').first()).toBeVisible();
      await expect(exactText(page, 'Главная')).toBeVisible();
      await expect(exactText(page, 'Операции')).toBeVisible();
      await expect(exactText(page, 'Команда')).toBeVisible();
      await expect(exactText(page, 'Еще')).toBeVisible();
      expect(productionAuthRequests).toEqual([]);
    } finally {
      cleanupUser(user.email);
    }
  });

  test('creates account, category, tag, and income operation after onboarding', async ({
    page,
    request,
  }) => {
    const accountName = `E2E Account ${Math.random().toString(36).slice(2, 8)}`;
    const categoryName = `E2E Category ${Math.random().toString(36).slice(2, 8)}`;
    const tagName = `E2E Tag ${Math.random().toString(36).slice(2, 8)}`;
    const incomeAmount = '250';
    const productionRequests: string[] = [];

    page.on('request', (pageRequest) => {
      if (pageRequest.url().startsWith('https://mncntrl.ru')) {
        productionRequests.push(pageRequest.url());
      }
    });

    const { user, companyName } = await createOnboardedUserViaUi(page, request, 'crud');

    try {
      await openMenuItem(page, 'Счета');
      await exactText(page, 'Добавить счет').click();
      await expect(page.getByText('Создание счета')).toBeVisible();
      await inputByPlaceholder(page, 'Название счета').fill(accountName);
      await inputByPlaceholder(page, 'Остаток на счете').fill('1000');
      const accountResponsePromise = page.waitForResponse(
        (response) =>
          response.request().method() === 'POST' &&
          response.url() === `${configuredApiBaseURL}/api/v1/account/`
      );
      await buttonText(page, 'Создать').click();
      expect((await accountResponsePromise).status()).toBe(201);
      await expect(exactText(page, accountName)).toBeVisible();

      await gotoHome(page, companyName);
      await openMenuItem(page, 'Категории');
      await exactText(page, 'Добавить категорию').click();
      await expect(page.getByText('Создание категории')).toBeVisible();
      await inputByPlaceholder(page, 'Название категории').fill(categoryName);
      const categoryResponsePromise = page.waitForResponse(
        (response) =>
          response.request().method() === 'POST' &&
          response.url() === `${configuredApiBaseURL}/api/v1/category/`
      );
      await buttonText(page, 'Создать').click();
      expect((await categoryResponsePromise).status()).toBe(201);
      await expect(exactText(page, categoryName)).toBeVisible();

      await gotoHome(page, companyName);
      await openMenuItem(page, 'Теги');
      await exactText(page, 'Добавить тег').click();
      await expect(page.getByText('Создание тега')).toBeVisible();
      await inputByPlaceholder(page, 'Название тега').fill(tagName);
      const tagResponsePromise = page.waitForResponse(
        (response) =>
          response.request().method() === 'POST' &&
          response.url() === `${configuredApiBaseURL}/api/v1/tag/`
      );
      await buttonText(page, 'Создать').click();
      expect((await tagResponsePromise).status()).toBe(201);
      await expect(exactText(page, tagName)).toBeVisible();

      await gotoHome(page, companyName);
      await page.getByLabel('Добавить операцию').click();
      await page.getByRole('button', { name: 'Доход' }).click();
      await expect(page.getByText('Создание дохода')).toBeVisible();
      await inputByPlaceholder(page, 'Сумма дохода').fill(incomeAmount);
      await inputByPlaceholder(page, 'Укажите счет').fill(accountName);
      await page.keyboard.press('Enter');
      await inputByPlaceholder(page, 'Укажите категорию').fill(categoryName);
      await page.keyboard.press('Enter');
      const actionResponsePromise = page.waitForResponse(
        (response) =>
          response.request().method() === 'POST' &&
          response.url() === `${configuredApiBaseURL}/api/v1/action/`
      );
      await buttonText(page, 'Создать').click();
      expect((await actionResponsePromise).status()).toBe(201);

      await gotoHome(page, companyName);
      await expect(exactText(page, accountName)).toBeVisible();
      await expect(exactText(page, categoryName)).toBeVisible();
      await expect(exactText(page, tagName)).toBeVisible();
      await expect(page.getByText(`${incomeAmount} ₽`).first()).toBeVisible();
      expect(productionRequests).toEqual([]);
    } finally {
      cleanupUser(user.email);
    }
  });
});
