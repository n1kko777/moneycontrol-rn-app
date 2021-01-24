import React, { memo, useCallback } from "react";
import { splitToDigits } from "../../splitToDigits";
import { Text } from "@ui-kitten/components";
import { View } from "react-native";
import {
  CardIcon,
  ExchangeIcon,
  IncreaseIcon,
  DecreaseIcon,
  CategoryIcon,
  TagIcon,
} from "../../themes/icons";
export const HomeCardItem = memo(({ kittenTheme, themeContext, item }) => {
  const { name, balance, type, style: color } = item;

  const renderIconItem = useCallback(
    (style) => {
      switch (type) {
        case "account":
          return (
            <CardIcon
              style={{ width: 20, height: 20 }}
              fill={
                kittenTheme[
                  `color-primary-${themeContext.theme === "light" ? 800 : 100}`
                ]
              }
            />
          );
        case "category":
          return (
            <CategoryIcon
              style={{ width: 20, height: 20 }}
              fill={
                kittenTheme[
                  `color-primary-${themeContext.theme === "light" ? 800 : 100}`
                ]
              }
            />
          );
        case "tag":
          return (
            <TagIcon
              style={{ width: 20, height: 20 }}
              fill={
                kittenTheme[
                  `color-primary-${themeContext.theme === "light" ? 800 : 100}`
                ]
              }
            />
          );
        case "action":
          return (
            <IncreaseIcon
              style={{ width: 20, height: 20 }}
              fill={
                style
                  ? kittenTheme[style]
                  : kittenTheme[
                      `color-primary-${
                        themeContext.theme === "light" ? 800 : 100
                      }`
                    ]
              }
            />
          );
        case "transaction":
          return (
            <DecreaseIcon
              style={{ width: 20, height: 20 }}
              fill={
                style
                  ? kittenTheme[style]
                  : kittenTheme[
                      `color-primary-${
                        themeContext.theme === "light" ? 800 : 100
                      }`
                    ]
              }
            />
          );
        case "transfer":
          return (
            <ExchangeIcon
              style={{ width: 20, height: 20 }}
              fill={
                kittenTheme[
                  `color-primary-${themeContext.theme === "light" ? 800 : 100}`
                ]
              }
            />
          );
      }
    },
    [item, themeContext]
  );

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 5,
      }}
    >
      {renderIconItem(color)}
      <Text
        style={{
          fontSize: 16,
          marginRight: "auto",
          marginLeft: 8,
          color:
            kittenTheme[
              color !== undefined
                ? color
                : `color-primary-${themeContext.theme === "light" ? 800 : 100}`
            ],
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
        {balance !== "" &&
          splitToDigits(balance !== null ? balance.toString() : "0") + " ₽"}
      </Text>
    </View>
  );
});
