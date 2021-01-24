import React, { memo, useCallback, useMemo } from "react";
import Swipeable from "react-native-gesture-handler/Swipeable";

import { Text, ListItem, useTheme, Button } from "@ui-kitten/components";
import {
  ExchangeIcon,
  IncreaseIcon,
  DecreaseIcon,
  DeleteIcon,
  CopyIcon,
} from "../../themes/icons";
import { ThemeContext } from "../../themes/theme-context";

import { splitToDigits } from "../../splitToDigits";
import { useSelector, useDispatch } from "react-redux";
import { Alert } from "react-native";
import { hideOperationAction } from "../../store/actions/apiAction";

export const OperationListItem = memo(({ item, navigation }) => {
  const dispatch = useDispatch();

  const swipeableRow = React.useRef(null);

  const close = useCallback(() => {
    swipeableRow.current.close();
  }, [swipeableRow]);

  const themeContext = React.useContext(ThemeContext);
  const kittenTheme = useTheme();

  const store = useSelector((store) => store);
  const { accounts } = store.account;
  const { categories } = store.category;
  const { tags } = store.tag;

  const renderIconItem = useCallback(
    (style) => {
      switch (item.type) {
        case "action":
          return (
            <IncreaseIcon
              style={{ width: 20, height: 20 }}
              fill={kittenTheme[style]}
            />
          );

        case "transaction":
          return (
            <DecreaseIcon
              style={{ width: 20, height: 20 }}
              fill={kittenTheme[style]}
            />
          );

        case "transfer":
          return (
            <ExchangeIcon
              style={{ width: 20, height: 20 }}
              fill={
                kittenTheme[
                  `color-primary-${themeContext.theme === "light" ? 800 : 100}`
                ]
              }
            />
          );
      }
    },
    [item, themeContext]
  );

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
      "Удаление категории",
      `Вы уверены, что хотите удалить операцию?`,
      [
        {
          text: "Отмена",
          style: "cancel",
        },
        {
          text: "Удалить",
          onPress: () => {
            dispatch(hideOperationAction(item));
          },
        },
      ],
      {
        cancelable: false,
      }
    );
  }, [item]);

  const copyHandler = useCallback(() => {
    close();
    switch (item.type) {
      case "transaction":
        navigation.navigate("CreateTransaction", item);
        break;
      case "action":
        navigation.navigate("CreateAction", item);
        break;
      case "transfer":
        if (!accounts.map((acc) => acc.id).includes(item.from_account_id)) {
          Alert.alert(
            "Невозможно скопировать",
            `Вы не являетесь собственником операции.`
          );
        } else {
          navigation.navigate("CreateTransfer", item);
        }
        break;

      default:
        break;
    }
  }, [item]);

  const LeftAction = () => (
    <Button onPress={copyHandler} icon={CopyIcon} status="info" />
  );

  const RightAction = () => (
    <Button onPress={deleteHandler} icon={DeleteIcon} status="danger" />
  );

  const WrapperComponent = ({ children }) => (
    <Swipeable
      ref={swipeableRow}
      overshootLeft={false}
      renderLeftActions={LeftAction}
      overshootRight={false}
      renderRightActions={RightAction}
    >
      {children}
    </Swipeable>
  );

  const renderDescription = useMemo(
    () =>
      `${
        item.category !== undefined
          ? "– " +
            (categories.find((cat) => cat.id == item.category) !== undefined
              ? categories.find((cat) => cat.id == item.category).category_name
              : "Удалено")
          : ""
      }${
        item.tags !== undefined
          ? "\n" +
            item.tags.map((elTag) =>
              tags.find((tag) => tag.id == elTag) !== undefined
                ? "#" + tags.find((tag) => tag.id == elTag).tag_name
                : "Удалено"
            )
          : ""
      }`,
    [item]
  );

  return (
    <WrapperComponent>
      <ListItem
        title={item.name}
        titleStyle={{
          fontSize: 16,
        }}
        description={renderDescription}
        descriptionStyle={{
          fontSize: 14,
        }}
        icon={() => renderIconItem(item.style)}
        accessory={() => renderItemAccessory(item)}
        style={{
          paddingVertical: 8,
        }}
      />
    </WrapperComponent>
  );
});
