import React from "react";
import { View, FlatList } from "react-native";
import { Text, ListItem, Button, useTheme } from "@ui-kitten/components";
import { ProfileIcon, RightIcon } from "../themes/icons";
import { THEME } from "../themes/themes";

import { ThemeContext } from "../themes/theme-context";
import { getShortName } from "../getShortName";

export const CompanyProfileList = ({ dataList, isAdmin }) => {
  const themeContext = React.useContext(ThemeContext);
  const kittenTheme = useTheme();

  const keyExtractor = item => item.id.toString();

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

  const renderItemIcon = style => <ProfileIcon {...style} />;

  const renderItem = ({ item }) => (
    <ListItem
      title={`${getShortName(item.first_name + " " + item.last_name)} ${
        item.is_admin ? "⭐️" : ""
      }`}
      description={`${item.accounts.join(",")}`}
      icon={renderItemIcon}
      accessory={isAdmin && renderItemAccessory}
      style={{
        paddingVertical: 15
      }}
    />
  );

  return (
    <FlatList
      ListFooterComponent={
        <View style={{ marginHorizontal: 16, marginTop: 30 }}>
          {isAdmin && (
            <Button
              style={{
                borderRadius: THEME.BUTTON_RADIUS
              }}
              status="info"
            >
              Добавить сотрудника
            </Button>
          )}
        </View>
      }
      ListFooterComponentStyle={{ paddingBottom: 30 }}
      keyExtractor={keyExtractor}
      data={dataList}
      renderItem={renderItem}
    />
  );
};
