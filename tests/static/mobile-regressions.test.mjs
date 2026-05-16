import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const read = (path) => readFileSync(new URL(`../../${path}`, import.meta.url), 'utf8');

test('safe area uses context provider and Android-aware SafeAreaView', () => {
  const app = read('App.tsx');
  const screenTemplate = read('components/ScreenTemplate.js');
  const bottomTabBar = read('components/navigation/BottomTabBar.js');
  const packageJson = JSON.parse(read('package.json'));

  assert.match(app, /SafeAreaProvider/);
  assert.match(app, /from 'react-native-safe-area-context'/);
  assert.match(app, /<SafeAreaProvider>/);
  assert.match(app, /<\/SafeAreaProvider>/);

  assert.match(screenTemplate, /SafeAreaView.+from 'react-native-safe-area-context'/s);
  assert.match(bottomTabBar, /SafeAreaView.+from 'react-native-safe-area-context'/s);
  assert.match(bottomTabBar, /edges=\{\['bottom', 'left', 'right'\]\}/);

  assert.ok(
    !packageJson.expo?.install?.exclude?.includes('react-native-safe-area-context'),
    'react-native-safe-area-context must not be excluded from Expo dependency validation'
  );
  assert.match(packageJson.dependencies['react-native-safe-area-context'], /^[~^]?5\./);
});

test('primary transparent theme tokens are valid RGBA values based on primary-500', () => {
  const theme = JSON.parse(read('themes/custom-theme.json'));
  const expectedAlpha = {
    100: '0.08',
    200: '0.16',
    300: '0.24',
    400: '0.32',
    500: '0.4',
    600: '0.48',
  };

  for (const [level, alpha] of Object.entries(expectedAlpha)) {
    assert.equal(theme[`color-primary-transparent-${level}`], `rgba(66, 108, 148, ${alpha})`);
  }
});
