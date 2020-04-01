import React from "react";

import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";

import { AssetIconsPack } from "../themes/AssetIconsPack";
import { ThemeContext } from "../themes/theme-context";
import { default as appTheme } from "../themes/custom-theme.json";

import { mapping, light, dark } from "@eva-design/eva";
import { useColorScheme } from "react-native-appearance";

import { AppNavigator } from "../navigations/AppNavigator";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { View } from "react-native";

const themes = { light, dark };

export const AppContainer = () => {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = React.useState(colorScheme);

  const currentTheme = { ...themes[theme], ...appTheme };

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
  };

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
};