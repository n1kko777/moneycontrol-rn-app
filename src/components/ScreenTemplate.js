import React, { memo, useCallback } from "react";
import {
  SafeAreaView,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import { ThemeContext } from "../themes/theme-context";

import { THEME } from "../themes/themes";

export const ScreenTemplate = memo(({ children }) => {
  const themeContext = React.useContext(ThemeContext);
  const onTouchablePress = useCallback(() => Keyboard.dismiss(), []);
  const safeAreaStyle = {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor:
      themeContext.theme === "light"
        ? THEME.BACKGROUND_LIGHT
        : THEME.BACKGROUND_DARK,
  };

  return (
    <>
      <StatusBar
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
