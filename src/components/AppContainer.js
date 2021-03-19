import React, { memo, useCallback } from "react";

import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";

import { mapping, light, dark } from "@eva-design/eva";
import { useColorScheme } from "react-native-appearance";
import { AssetIconsPack } from "../themes/AssetIconsPack";
import { ThemeContext } from "../themes/theme-context";
import appTheme from "../themes/custom-theme.json";

import { AppNavigator } from "../navigations/AppNavigator";
import LoadingSpinner from "./LoadingSpinner";

const themes = { light, dark };

export const AppContainer = memo(() => {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = React.useState(colorScheme);

  const currentTheme = { ...themes[theme], ...appTheme };

  const toggleTheme = useCallback(() => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
  }, [theme]);

  return (
    <>
      <IconRegistry icons={[EvaIconsPack, AssetIconsPack]} />
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <ApplicationProvider mapping={mapping} theme={currentTheme}>
          <LoadingSpinner />
          <AppNavigator />
        </ApplicationProvider>
      </ThemeContext.Provider>
    </>
  );
});
