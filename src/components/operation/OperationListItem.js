import React from "react";
import Swipeable from "react-native-gesture-handler/Swipeable";

import { Text, ListItem, useTheme, Button } from "@ui-kitten/components";
import {
  ExchangeIcon,
  IncreaseIcon,
  DecreaseIcon,
  DeleteIcon,
} from "../../themes/icons";
import { ThemeContext } from "../../themes/theme-context";

import { splitToDigits } from "../../splitToDigits";
import { useSelector, useDispatch } from "react-redux";
import { Alert } from "react-native";
import { startLoader, endLoader } from "../../store/actions/apiAction";
import { hideAction } from "../../store/actions/actionAction";
import { hideTransaction } from "../../store/actions/transactionAction";

export const OperationListItem = ({ item, index, dataList }) => {
  const dispatch = useDispatch();

  const themeContext = React.useContext(ThemeContext);
  const kittenTheme = useTheme();

  const { transactions } = useSelector((store) => store.transaction);
  const { actions } = useSelector((store) => store.action);
  const { categories } = useSelector((store) => store.category);
  const { tags } = useSelector((store) => store.tag);

  const renderIconItem = (style) => {
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
  };

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

  const deleteHandler = () => {
    Alert.alert(
      "Удаление категории",
      `Вы уверены что хотите удалить операцию?`,
      [
        {
          text: "Отмена",
          style: "cancel",
        },
        {
          text: "Удалить",
          onPress: async () => {
            dispatch(startLoader());
            let hideItem = null;

            try {
              switch (item.type) {
                case "action":
                  hideItem = actions.find((elem) => elem.id == item.id);
                  hideItem.is_active = false;
                  await dispatch(hideAction(hideItem));
                  break;

                case "transaction":
                  hideItem = transactions.find((elem) => elem.id == item.id);
                  hideItem.is_active = false;
                  await dispatch(hideTransaction(hideItem));
                  break;

                case "transfer":
                  console.log("transfer");
                  break;
              }
            } catch (error) {}

            // const hideItem = item;
            // hideItem.is_active = false;
            // await dispatch(hideCategory(hideItem)).then(() => {

            // });

            dispatch(endLoader());
          },
        },
      ],
      {
        cancelable: false,
      }
    );
  };

  const RightAction = () => (
    <Button onPress={deleteHandler} icon={DeleteIcon} status="danger" />
  );

  return (
    <Swipeable overshootRight={false} renderRightActions={RightAction}>
      <ListItem
        title={`${item.name}${
          item.category !== undefined
            ? " (" +
              (categories.find((cat) => cat.id == item.category) !== undefined
                ? categories.find((cat) => cat.id == item.category)
                    .category_name
                : "Удалено") +
              ")"
            : ""
        }`}
        titleStyle={{
          fontSize: 16,
        }}
        description={
          item.tags !== undefined &&
          `${item.tags.map((elTag) =>
            tags.find((tag) => tag.id == elTag) !== undefined
              ? `#${tags.find((tag) => tag.id == elTag).tag_name}`
              : "Удалено"
          )}`
        }
        descriptionStyle={{
          fontSize: 14,
        }}
        icon={() => renderIconItem(item.style)}
        accessory={() => renderItemAccessory(item)}
        style={{
          paddingVertical: 15,
          borderTopLeftRadius: index === 0 ? 10 : 0,
          borderTopRightRadius: index === 0 ? 10 : 0,
          borderBottomLeftRadius: index === dataList.length - 1 ? 10 : 0,
          borderBottomRightRadius: index === dataList.length - 1 ? 10 : 0,
        }}
      />
    </Swipeable>
  );
};
