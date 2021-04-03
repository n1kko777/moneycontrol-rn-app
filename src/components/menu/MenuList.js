import React, { memo, useCallback } from "react";
import { ListItem, Text, useTheme } from "@ui-kitten/components";
import { FlatList } from "react-native";

import { RightIcon } from "../../themes/icons";
import { ThemeContext } from "../../themes/theme-context";

export const MenuList = memo(({ data }) => {
  const themeContext = React.useContext(ThemeContext);
  const kittenTheme = useTheme();

  const keyExtractor = useCallback((item) => item.title.toString(), []);
  const renderItemAccessory = useCallback(
    () => (
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
    ),
    [kittenTheme, themeContext.theme]
  );

  const renderItem = useCallback(
    ({ item: { title, navLink, icon } }) => {
      const renderListTitle = (evaProps) => (
        <Text {...evaProps} style={[evaProps.style, { fontSize: 16 }]}>
          {title}
        </Text>
      );

      return (
        <ListItem
          key={title}
          title={renderListTitle}
          onPress={navLink}
          icon={icon}
          accessory={renderItemAccessory}
          style={{
            paddingVertical: 15,
          }}
        />
      );
    },
    [renderItemAccessory]
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
