import React, { memo, useCallback } from "react";
import Swipeable from "react-native-gesture-handler/Swipeable";

import { ListItem, Text, useTheme, Button } from "@ui-kitten/components";

import { CardIcon, DeleteIcon } from "../../themes/icons";
import { ThemeContext } from "../../themes/theme-context";

import { splitToDigits } from "../../splitToDigits";
import { Alert } from "react-native";
import { useDispatch } from "react-redux";

import { hideAccountAction } from "../../store/actions/apiAction";

export const AccountListItem = memo(({ item, navigation }) => {
  const dispatch = useDispatch();

  const themeContext = React.useContext(ThemeContext);
  const kittenTheme = useTheme();

  const swipeableRow = React.useRef(null);

  const close = useCallback(() => {
    swipeableRow.current.close();
  }, [swipeableRow]);

  const renderIconItem = (style) => <CardIcon {...style} />;
  const renderItemAccessory = ({ balance, style }) => (
    <Text
      style={{
        fontSize: 16,
        color:
          kittenTheme[
            style !== undefined
              ? style
              : `color-primary-${themeContext.theme === "light" ? 800 : 100}`
          ],
      }}
    >
      {balance !== "" && splitToDigits(balance.toString()) + " ₽"}
    </Text>
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
  }, [item]);

  const RightAction = () => (
    <Button onPress={deleteHandler} icon={DeleteIcon} status="danger" />
  );

  const updateHandler = useCallback(() => {
    navigation.navigate("UpdateAccount", {
      account: item,
    });
  }, [item]);

  return (
    <Swipeable
      ref={swipeableRow}
      overshootRight={false}
      renderRightActions={RightAction}
    >
      <ListItem
        onPress={updateHandler}
        title={`${item.account_name}`}
        titleStyle={{
          fontSize: 16,
        }}
        descriptionStyle={{
          fontSize: 14,
        }}
        icon={renderIconItem}
        accessory={() => renderItemAccessory(item)}
        style={{
          paddingVertical: 15,
        }}
      />
    </Swipeable>
  );
});
