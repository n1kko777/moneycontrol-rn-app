import React, { memo, useMemo } from "react";
import { Text } from "@ui-kitten/components";
import { View } from "react-native";
import { splitToDigits } from "../../splitToDigits";
import {
  CardIcon,
  ExchangeIcon,
  IncreaseIcon,
  DecreaseIcon,
  CategoryIcon,
  TagIcon,
} from "../../themes/icons";

const avaiableTypes = {
  account: CardIcon,
  category: CategoryIcon,
  tag: TagIcon,
  action: IncreaseIcon,
  transaction: DecreaseIcon,
  transfer: ExchangeIcon,
};

const IconHOC = (Component, kittenTheme, themeContext, style) => () => (
  <Component
    style={{ width: 20, height: 20 }}
    fill={
      kittenTheme[
        style || `color-primary-${themeContext.theme === "light" ? 800 : 100}`
      ]
    }
  />
);

export const HomeCardItem = memo(({ kittenTheme, themeContext, item }) => {
  const { name, balance, type, style } = item;

  const renderIconItem = useMemo(() => {
    if (avaiableTypes[type]) {
      const IconComponent = IconHOC(
        avaiableTypes[type],
        kittenTheme,
        themeContext,
        style
      );
      return <IconComponent />;
    }

    return null;
  }, [kittenTheme, style, themeContext, type]);

  const memoBalance = useMemo(
    () =>
      balance !== "" &&
      `${splitToDigits(balance !== null ? balance.toString() : "0")} ₽`,
    [balance]
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
      {renderIconItem}
      <Text
        style={{
          fontSize: 16,
          marginRight: "auto",
          marginLeft: 8,
          color:
            kittenTheme[
              style ||
                `color-primary-${themeContext.theme === "light" ? 800 : 100}`
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
              style ||
                `color-primary-${themeContext.theme === "light" ? 800 : 100}`
            ],
        }}
      >
        {memoBalance}
      </Text>
    </View>
  );
});
