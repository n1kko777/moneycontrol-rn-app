import React from "react";
import {
  SafeAreaView,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { ThemeContext } from "../themes/theme-context";

import { THEME } from "../themes/themes";

export const ScreenTemplate = ({ children }) => {
  const themeContext = React.useContext(ThemeContext);

  return (
    <>
      <StatusBar
        barStyle={`${
          themeContext.theme === "light" ? "dark" : "light"
        }-content`}
      />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor:
              themeContext.theme === "light"
                ? THEME.BACKGROUND_LIGHT
                : THEME.BACKGROUND_DARK
          }}
        >
          {children}
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </>
  );
};
