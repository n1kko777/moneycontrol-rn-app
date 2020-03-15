import React from "react";
import { Provider } from "react-redux";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { AssetIconsPack } from "./src/themes/AssetIconsPack";

import { mapping, light, dark } from "@eva-design/eva";
import { useColorScheme } from "react-native-appearance";

import { default as appTheme } from "./src/themes/custom-theme.json";
import { ThemeContext } from "./src/themes/theme-context";

import { AppNavigator } from "./src/navigations/AppNavigator";
import store from "./src/store";

const themes = { light, dark };

const App = () => {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = React.useState(colorScheme);

  const currentTheme = { ...themes[theme], ...appTheme };

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
  };

  return (
    <Provider store={store}>
      <IconRegistry icons={[EvaIconsPack, AssetIconsPack]} />
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <ApplicationProvider mapping={mapping} theme={currentTheme}>
          <AppNavigator />
        </ApplicationProvider>
      </ThemeContext.Provider>
    </Provider>
  );
};

export default App;
