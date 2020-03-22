import React from "react";
import {
  SafeAreaView,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  Platform
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
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
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
