import React from "react";
import { View, FlatList } from "react-native";
import { Text, ListItem, useTheme } from "@ui-kitten/components";
import { ExchangeIcon, IncreaseIcon, DecreaseIcon } from "../../themes/icons";
import { ThemeContext } from "../../themes/theme-context";

import { splitToDigits } from "../../splitToDigits";

export const OperationList = ({ dataList, categories, tags }) => {
  const themeContext = React.useContext(ThemeContext);
  const kittenTheme = useTheme();

  const keyExtractor = (item) => item.id.toString();

  const renderIconItem = (style) =>
    style !== undefined ? (
      style.search("danger") === -1 ? (
        <IncreaseIcon
          style={{ width: 20, height: 20 }}
          fill={kittenTheme[style]}
        />
      ) : (
        <DecreaseIcon
          style={{ width: 20, height: 20 }}
          fill={kittenTheme[style]}
        />
      )
    ) : (
      <ExchangeIcon
        style={{ width: 20, height: 20 }}
        fill={
          kittenTheme[
            `color-primary-${themeContext.theme === "light" ? 800 : 100}`
          ]
        }
      />
    );

  const renderItemAccessory = ({ balance, style }) => (
    <Text
      style={{
        fontSize: 16,
        color:
          kittenTheme[
            style !== undefined
              ? style
              : `color-primary-${themeContext.theme === "light" ? 800 : 100}`
          ],
      }}
    >
      {balance !== "" && splitToDigits(balance.toString()) + " ₽"}
    </Text>
  );

  const renderItem = ({ item, index }) => (
    <ListItem
      title={`${item.name}${
        item.category !== undefined
          ? " (" + categories.find((cat) => cat.id == item.category) !==
            undefined
            ? categories.find((cat) => cat.id == item.category).category_name
            : "Удалено" + ")"
          : ""
      }`}
      titleStyle={{
        fontSize: 16,
      }}
      description={
        item.tags !== undefined &&
        `${item.tags.map((elTag) =>
          tags.find((tag) => tag.id == elTag) !== undefined
            ? tags.find((tag) => tag.id == elTag).tag_name
            : "Удалено"
        )}`
      }
      descriptionStyle={{
        fontSize: 14,
      }}
      icon={() => renderIconItem(item.style)}
      accessory={() => renderItemAccessory(item)}
      style={{
        paddingVertical: 15,
        borderTopLeftRadius: index === 0 ? 10 : 0,
        borderTopRightRadius: index === 0 ? 10 : 0,
        borderBottomLeftRadius: index === dataList.length - 1 ? 10 : 0,
        borderBottomRightRadius: index === dataList.length - 1 ? 10 : 0,
      }}
    />
  );

  return (
    <FlatList
      style={{
        marginHorizontal: 8,
        marginTop: 15,
      }}
      ListFooterComponent={
        <View style={{ marginHorizontal: 16, marginTop: 30 }}></View>
      }
      ListFooterComponentStyle={{ paddingBottom: 30 }}
      keyExtractor={keyExtractor}
      data={dataList}
      renderItem={renderItem}
    />
  );
};
