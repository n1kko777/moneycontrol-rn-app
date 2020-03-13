import React from "react";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { mapping, light, dark } from "@eva-design/eva";

import { default as appTheme } from "./src/themes/custom-theme.json";
import { ThemeContext } from "./src/themes/theme-context";

import { AppNavigator } from "./src/navigations/AppNavigator";

const themes = { light, dark };

const App = () => {
  const [theme, setTheme] = React.useState("light");
  const currentTheme = { ...themes[theme], ...appTheme };

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
  };

  return (
    <React.Fragment>
      <IconRegistry icons={EvaIconsPack} />
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <ApplicationProvider mapping={mapping} theme={currentTheme}>
          <AppNavigator />
        </ApplicationProvider>
      </ThemeContext.Provider>
    </React.Fragment>
  );
};

export default App;
