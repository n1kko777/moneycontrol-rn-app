import React from "react";
import { splitToDigits } from "../../splitToDigits";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text } from "@ui-kitten/components";

export const HomeCardItem = ({
  kittenTheme,
  themeContext,
  name,
  amount,
  color
}) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
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
        {amount !== "" && splitToDigits(amount.toString()) + " ₽"}
      </Text>
    </TouchableOpacity>
  );
};
