import React from "react";
import Swipeable from "react-native-gesture-handler/Swipeable";

import { ListItem, Text, useTheme, Button } from "@ui-kitten/components";

import { CardIcon, DeleteIcon } from "../../themes/icons";
import { ThemeContext } from "../../themes/theme-context";

import { splitToDigits } from "../../splitToDigits";
import { Alert } from "react-native";
import { useDispatch } from "react-redux";

import { hideAccount } from "../../store/actions/accountAction";

import { startLoader, endLoader } from "../../store/actions/apiAction";

export const AccountListItem = ({ item, index, dataList }) => {
  const dispatch = useDispatch();

  const themeContext = React.useContext(ThemeContext);
  const kittenTheme = useTheme();

  const renderIconItem = style => <CardIcon {...style} />;
  const renderItemAccessory = ({ balance, style }) => (
    <Text
      style={{
        fontSize: 16,
        color:
          kittenTheme[
            style !== undefined
              ? style
              : `color-primary-${themeContext.theme === "light" ? 800 : 100}`
          ]
      }}
    >
      {balance !== "" && splitToDigits(balance.toString()) + " ₽"}
    </Text>
  );

  const deleteHandler = () => {
    Alert.alert(
      "Удаление счета",
      `Вы уверены что хотите удалить счет ${item.account_name}?`,
      [
        {
          text: "Отмена",
          style: "cancel"
        },
        {
          text: "Удалить",
          onPress: async () => {
            dispatch(startLoader());
            const hideItem = item;
            hideItem.is_active = false;
            await dispatch(hideAccount(hideItem)).then(() => {
              dispatch(endLoader());
            });
          }
        }
      ],
      {
        cancelable: false
      }
    );
  };

  const RightAction = () => (
    <Button onPress={deleteHandler} icon={DeleteIcon} status="danger" />
  );

  return (
    <Swipeable overshootRight={false} renderRightActions={RightAction}>
      <ListItem
        title={`${item.account_name}`}
        titleStyle={{
          fontSize: 16
        }}
        descriptionStyle={{
          fontSize: 14
        }}
        icon={renderIconItem}
        accessory={() => renderItemAccessory(item)}
        style={{
          paddingVertical: 15,
          borderTopLeftRadius: index === 0 ? 10 : 0,
          borderTopRightRadius: index === 0 ? 10 : 0,
          borderBottomLeftRadius: index === dataList.length - 1 ? 10 : 0,
          borderBottomRightRadius: index === dataList.length - 1 ? 10 : 0
        }}
      />
    </Swipeable>
  );
};
