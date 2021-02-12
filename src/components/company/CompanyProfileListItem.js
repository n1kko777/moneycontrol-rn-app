import React, { memo, useCallback } from "react";
import { getShortName } from "../../getShortName";
import { ListItem, useTheme, Avatar, Text } from "@ui-kitten/components";
import { ProfileIcon } from "../../themes/icons";

import { ThemeContext } from "../../themes/theme-context";

import { splitToDigits } from "../../splitToDigits";

export const CompanyProfileListItem = memo(({ item, onClick }) => {
  const themeContext = React.useContext(ThemeContext);
  const kittenTheme = useTheme();

  const renderItemIcon = useCallback(
    (item, style) => {
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
    },
    [item, themeContext]
  );

  const renderItemAccessory = (balance) => (
    <Text category="s1">{`${splitToDigits(balance)} ₽`}</Text>
  );
  return (
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
      }}
      onPress={item.balance !== undefined && (() => onClick(item))}
    />
  );
});
