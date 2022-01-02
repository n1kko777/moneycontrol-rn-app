import React, { memo, useCallback } from "react";
import { ListItem, useTheme, Avatar, Text } from "@ui-kitten/components";
import { getShortName } from "../../getShortName";
import { ProfileIcon } from "../../themes/icons";

import { ThemeContext } from "../../themes/theme-context";

import { splitToDigits } from "../../splitToDigits";

export const CompanyProfileListItem = memo(({ item, isAdmin, onClick }) => {
  const themeContext = React.useContext(ThemeContext);
  const kittenTheme = useTheme();

  const onHandleClick = useCallback(() => onClick(item), [item, onClick]);

  const renderItemIcon = useCallback(
    () =>
      item.image !== null ? (
        <Avatar
          shape="round"
          size="small"
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
      ),
    [item.image, kittenTheme, themeContext.theme]
  );

  const renderItemAccessory = useCallback(
    () => <Text category="s1">{`${splitToDigits(item.balance)} ₽`}</Text>,
    [item.balance]
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
      accessoryLeft={renderItemIcon}
      accessoryRight={renderItemAccessory}
      style={{
        paddingVertical: 15,
      }}
      onPress={onHandleClick}
      disabled={!isAdmin}
    />
  );
});
