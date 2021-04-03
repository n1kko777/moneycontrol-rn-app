import React, { memo, useCallback } from "react";
import { ListItem, Text, useTheme } from "@ui-kitten/components";
import { FlatList } from "react-native";

import { RightIcon } from "../../themes/icons";
import { ThemeContext } from "../../themes/theme-context";

export const MenuList = memo(({ data }) => {
  const themeContext = React.useContext(ThemeContext);
  const kittenTheme = useTheme();

  const keyExtractor = useCallback((item) => item.title.toString(), []);

  const renderItem = useCallback(
    ({ item: { title, navLink, icon } }) => {
      const renderListTitle = (evaProps) => (
        <Text {...evaProps} style={[evaProps.style, { fontSize: 16 }]}>
          {title}
        </Text>
      );

      const renderItemAccessory = () => (
        <RightIcon
          fill={
            kittenTheme[
              `color-primary-${themeContext.theme === "light" ? 800 : 100}`
            ]
          }
          style={{
            width: 30,
            height: 30,
          }}
        />
      );

      return (
        <ListItem
          key={title}
          title={renderListTitle}
          onPress={navLink}
          accessoryLeft={icon}
          accessoryRight={renderItemAccessory}
          style={{
            paddingVertical: 15,
          }}
        />
      );
    },
    [kittenTheme, themeContext.theme]
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
});
