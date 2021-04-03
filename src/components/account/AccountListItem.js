import React, { memo, useCallback } from "react";
import Swipeable from "react-native-gesture-handler/Swipeable";

import { ListItem, Text, useTheme, Button } from "@ui-kitten/components";

import { Alert } from "react-native";
import { useDispatch } from "react-redux";
import { CardIcon, DeleteIcon } from "../../themes/icons";
import { ThemeContext } from "../../themes/theme-context";

import { splitToDigits } from "../../splitToDigits";

import { hideAccountAction } from "../../store/actions/apiAction";

export const AccountListItem = memo(({ item, navigation }) => {
  const dispatch = useDispatch();

  const themeContext = React.useContext(ThemeContext);
  const kittenTheme = useTheme();

  const swipeableRow = React.useRef(null);

  const close = useCallback(() => {
    swipeableRow.current.close();
  }, [swipeableRow]);

  const renderIconItem = useCallback((style) => <CardIcon {...style} />, []);
  const renderItemAccessory = useCallback(
    () => (
      <Text
        style={{
          fontSize: 16,
          color:
            kittenTheme[
              item.style ||
                `color-primary-${themeContext.theme === "light" ? 800 : 100}`
            ],
        }}
      >
        {splitToDigits(item.balance)} ₽
      </Text>
    ),
    [item.balance, item.style, kittenTheme, themeContext.theme]
  );

  const deleteHandler = useCallback(() => {
    close();
    Alert.alert(
      "Удаление счета",
      `Вы уверены, что хотите удалить счет ${item.account_name}?`,
      [
        {
          text: "Отмена",
          style: "cancel",
        },
        {
          text: "Удалить",
          onPress: () => {
            dispatch(hideAccountAction(item));
          },
        },
      ],
      {
        cancelable: false,
      }
    );
  }, [close, dispatch, item]);

  const RightAction = useCallback(
    () => (
      <Button
        onPress={deleteHandler}
        accessoryLeft={DeleteIcon}
        status="danger"
      />
    ),
    [deleteHandler]
  );

  const updateHandler = useCallback(() => {
    navigation.navigate("UpdateAccount", {
      account: item,
    });
  }, [item, navigation]);

  const renderListTitle = useCallback(
    (evaProps) => (
      <Text {...evaProps} style={[evaProps.style, { fontSize: 16 }]}>
        {item.account_name}
      </Text>
    ),
    [item.account_name]
  );

  return (
    <Swipeable
      ref={swipeableRow}
      overshootRight={false}
      renderRightActions={RightAction}
    >
      <ListItem
        onPress={updateHandler}
        title={renderListTitle}
        accessoryLeft={renderIconItem}
        accessoryRight={renderItemAccessory}
        style={{
          paddingVertical: 15,
        }}
      />
    </Swipeable>
  );
});
