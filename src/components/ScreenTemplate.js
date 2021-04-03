import React, { memo, useCallback } from "react";
import {
  SafeAreaView,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { ThemeContext } from "../themes/theme-context";

import { THEME } from "../themes/themes";

export const ScreenTemplate = memo(({ children }) => {
  const themeContext = React.useContext(ThemeContext);
  const onTouchablePress = useCallback(() => Keyboard.dismiss(), []);
  const safeAreaStyle = {
    flex: 1,
    backgroundColor:
      themeContext.theme === "light"
        ? THEME.BACKGROUND_LIGHT
        : THEME.BACKGROUND_DARK,
  };

  return (
    <>
      <StatusBar
        backgroundColor={
          themeContext.theme === "light"
            ? THEME.BACKGROUND_LIGHT
            : THEME.BACKGROUND_DARK
        }
        barStyle={`${
          themeContext.theme === "light" ? "dark" : "light"
        }-content`}
      />
      <TouchableWithoutFeedback onPress={onTouchablePress}>
        <SafeAreaView style={safeAreaStyle}>{children}</SafeAreaView>
      </TouchableWithoutFeedback>
    </>
  );
});
