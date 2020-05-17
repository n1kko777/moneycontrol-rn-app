import React from "react";
import { FlatList, RefreshControl } from "react-native";
import { ListItem, useTheme, Avatar, Text } from "@ui-kitten/components";
import { ProfileIcon } from "../../themes/icons";

import { ThemeContext } from "../../themes/theme-context";
import { getShortName } from "../../getShortName";

import { splitToDigits } from "../../splitToDigits";

export const CompanyProfileList = ({
  dataList,
  onCompanyRefresh,
  navigation,
}) => {
  const themeContext = React.useContext(ThemeContext);
  const kittenTheme = useTheme();

  const keyExtractor = (item) => item.id.toString();

  const renderItemIcon = (item, style) => {
    delete style.tintColor;
    return item.image !== null ? (
      <Avatar
        style={{
          ...style,
          width: 30,
          height: 30,
        }}
        source={{
          uri: item.image,
        }}
      />
    ) : (
      <ProfileIcon
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
  };

  const renderItemAccessory = (balance) => (
    <Text category="s1">{`${splitToDigits(balance)} ₽`}</Text>
  );

  const renderItem = ({ item, index }) => (
    <ListItem
      title={`${getShortName(item.first_name + " " + item.last_name)} ${
        item.is_admin ? "⭐️" : ""
      }`}
      titleStyle={{
        fontSize: 16,
      }}
      descriptionStyle={{
        fontSize: 14,
      }}
      icon={(style) => renderItemIcon(item, style)}
      accessory={
        item.balance !== undefined
          ? () => renderItemAccessory(item.balance.toString())
          : null
      }
      style={{
        paddingVertical: 15,
        borderTopLeftRadius: index === 0 ? 10 : 0,
        borderTopRightRadius: index === 0 ? 10 : 0,
        borderBottomLeftRadius: index === dataList.length - 1 ? 10 : 0,
        borderBottomRightRadius: index === dataList.length - 1 ? 10 : 0,
      }}
      onPress={
        item.balance !== undefined &&
        (() =>
          navigation.navigate("CompanyMember", {
            profile: item,
          }))
      }
    />
  );

  return (
    <FlatList
      refreshControl={
        <RefreshControl
          refreshing={false}
          onRefresh={onCompanyRefresh}
          tintColor="transparent"
        />
      }
      style={{ marginHorizontal: 8, marginTop: 15 }}
      ListFooterComponentStyle={{ paddingBottom: 30 }}
      keyExtractor={keyExtractor}
      data={dataList}
      renderItem={renderItem}
    />
  );
};
