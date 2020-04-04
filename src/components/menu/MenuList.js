import React from "react";
import { ListItem, useTheme } from "@ui-kitten/components";
import { FlatList } from "react-native";

import { RightIcon } from "../../themes/icons";
import { ThemeContext } from "../../themes/theme-context";

export const MenuList = ({ data }) => {
  const themeContext = React.useContext(ThemeContext);
  const kittenTheme = useTheme();

  const keyExtractor = item => item.title.toString();
  const renderItemAccessory = () => (
    <RightIcon
      fill={
        kittenTheme[
          `color-primary-${themeContext.theme === "light" ? 800 : 100}`
        ]
      }
      style={{
        width: 30,
        height: 30
      }}
    />
  );

  const renderItem = ({ item: { title, navLink, icon }, index }) => (
    <ListItem
      key={title}
      title={title}
      titleStyle={{
        fontSize: 16
      }}
      descriptionStyle={{
        fontSize: 14
      }}
      onPress={navLink}
      icon={icon}
      accessory={renderItemAccessory}
      style={{
        paddingVertical: 15,
        borderTopLeftRadius: index === 0 ? 10 : 0,
        borderTopRightRadius: index === 0 ? 10 : 0,
        borderBottomLeftRadius: index === data.length - 1 ? 10 : 0,
        borderBottomRightRadius: index === data.length - 1 ? 10 : 0
      }}
    />
  );

  return (
    <FlatList
      style={{ marginHorizontal: 8, marginTop: 15 }}
      ListFooterComponentStyle={{ paddingBottom: 30 }}
      keyExtractor={keyExtractor}
      data={data}
      renderItem={renderItem}
    />
  );
};
