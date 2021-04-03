import React, { memo, useCallback } from "react";
import { ListItem, useTheme, Avatar, Text } from "@ui-kitten/components";
import { getShortName } from "../../getShortName";
import { ProfileIcon } from "../../themes/icons";

import { ThemeContext } from "../../themes/theme-context";

import { splitToDigits } from "../../splitToDigits";

export const CompanyProfileListItem = memo(({ item, onClick }) => {
  const themeContext = React.useContext(ThemeContext);
  const kittenTheme = useTheme();

  const renderItemIcon = useCallback(
    (elItem, style) => {
      delete style.tintColor;
      return elItem.image !== null ? (
        <Avatar
          style={{
            ...style,
            width: 30,
            height: 30,
          }}
          source={{
            uri: elItem.image,
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
    [kittenTheme, themeContext.theme]
  );

  const renderItemAccessory = (balance) => (
    <Text category="s1">{`${splitToDigits(balance)} ₽`}</Text>
  );

  const renderListTitle = useCallback(
    (evaProps) => (
      <Text {...evaProps} style={[evaProps.style, { fontSize: 16 }]}>
        {getShortName(`${item.first_name} ${item.last_name}`)}{" "}
        {item.is_admin ? "⭐️" : ""}
      </Text>
    ),
    [item.first_name, item.is_admin, item.last_name]
  );

  return (
    <ListItem
      title={renderListTitle}
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
