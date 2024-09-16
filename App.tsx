import 'react-native-gesture-handler';

import { mapping, light, dark } from '@eva-design/eva';
import { IconRegistry, ApplicationProvider } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import LoadingSpinner from 'components/LoadingSpinner';
import { useDisableBack } from 'hooks';
import React, { useCallback } from 'react';
import { Appearance } from 'react-native';
import { Provider } from 'react-redux';
import { AssetIconsPack } from 'themes/AssetIconsPack';
import appTheme from 'themes/custom-theme.json';
import { ThemeContext } from 'themes/theme-context';

import RootStack from './navigation';
import store from './store';

const themes = { light, dark };

export default function App() {
  useDisableBack();

  const colorScheme = Appearance.getColorScheme();
  const [theme, setTheme] = React.useState(colorScheme);

  const currentTheme = theme ? { ...themes[theme], ...appTheme } : {};

  const toggleTheme = useCallback(() => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  }, [theme]);

  return (
    <Provider store={store}>
      <IconRegistry icons={[EvaIconsPack, AssetIconsPack]} />
      <ThemeContext.Provider value={{ theme: theme ?? '', toggleTheme }}>
        <ApplicationProvider mapping={mapping} theme={currentTheme}>
          <LoadingSpinner />
          <RootStack />
        </ApplicationProvider>
      </ThemeContext.Provider>
    </Provider>
  );
}
