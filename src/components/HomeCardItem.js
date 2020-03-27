import React from "react";
import { splitToDigits } from "../splitToDigits";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text, useTheme } from "@ui-kitten/components";
import { ThemeContext } from "../themes/theme-context";

export const HomeCardItem = ({ name, amount, color }) => {
  const themeContext = React.useContext(ThemeContext);
  const kittenTheme = useTheme();

  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 8,
        paddingBottom: 5
      }}
    >
      <Text
        style={{
          color:
            kittenTheme[
              color !== undefined
                ? color
                : `color-primary-${themeContext.theme === "light" ? 800 : 100}`
            ],
          textDecorationLine: "underline"
        }}
        category="s1"
      >
        {name}
      </Text>
      <Text
        style={{
          color:
            kittenTheme[
              color !== undefined
                ? color
                : `color-primary-${themeContext.theme === "light" ? 800 : 100}`
            ]
        }}
      >
        {splitToDigits(amount.toString())} ₽
      </Text>
    </TouchableOpacity>
  );
};
