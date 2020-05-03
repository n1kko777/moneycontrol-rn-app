import React from "react";
import { splitToDigits } from "../../splitToDigits";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text } from "@ui-kitten/components";

export const HomeCardItem = ({
  kittenTheme,
  themeContext,
  item,
  navigation,
}) => {
  const { id, name, balance, type, style: color } = item;

  const onFilterOperation = () => {
    navigation.navigate("Operation", {
      filterParam: {
        name,
        type,
        id,
      },
    });
  };

  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingBottom: 5,
      }}
      onPress={onFilterOperation}
    >
      <Text
        style={{
          fontSize: 16,
          color:
            kittenTheme[
              color !== undefined
                ? color
                : `color-primary-${themeContext.theme === "light" ? 800 : 100}`
            ],
          textDecorationLine: "underline",
        }}
        category="s1"
      >
        {name}
      </Text>
      <Text
        style={{
          fontSize: 16,
          color:
            kittenTheme[
              color !== undefined
                ? color
                : `color-primary-${themeContext.theme === "light" ? 800 : 100}`
            ],
        }}
      >
        {balance !== "" && splitToDigits(balance.toString()) + " ₽"}
      </Text>
    </TouchableOpacity>
  );
};
