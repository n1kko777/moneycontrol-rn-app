import React, { memo, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Alert } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";

import { Text, Layout, useTheme, Button, Card } from "@ui-kitten/components";
import { DeleteIcon, CopyIcon } from "../../themes/icons";
import { ThemeContext } from "../../themes/theme-context";

import { splitToDigits } from "../../splitToDigits";
import { hideOperationAction } from "../../store/actions/apiAction";
import { getAccounts, getCategories, getTags } from "../../store/selectors";

export const OperationListItem = memo(({ item, navigation }) => {
  const dispatch = useDispatch();

  const swipeableRow = React.useRef(null);

  const close = useCallback(() => {
    swipeableRow.current.close();
  }, [swipeableRow]);

  const themeContext = React.useContext(ThemeContext);
  const kittenTheme = useTheme();

  const accounts = useSelector(getAccounts);
  const categories = useSelector(getCategories);
  const tags = useSelector(getTags);

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
  }, [close, dispatch, item]);

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
  }, [accounts, close, item, navigation]);

  const LeftAction = useCallback(
    () => <Button onPress={copyHandler} icon={CopyIcon} status="info" />,
    [copyHandler]
  );

  const RightAction = useCallback(
    () => <Button onPress={deleteHandler} icon={DeleteIcon} status="danger" />,
    [deleteHandler]
  );

  const renderCategory = useMemo(() => {
    if (item.category !== undefined) {
      if (categories.find((cat) => cat.id === item.category) !== undefined) {
        return categories.find((cat) => cat.id === item.category).category_name;
      }

      return "Удалено";
    }

    return "";
  }, [categories, item.category]);

  const renderTag = useMemo(() => {
    const tagList = (item.tags
      ? item.tags.map((elTag) =>
          tags.find((tag) => tag.id === elTag)
            ? `#${tags.find((tag) => tag.id === elTag).tag_name}`
            : "Удалено"
        )
      : [""]
    ).join(", ");

    return `${
      tagList.length > 17 ? `${tagList.substring(0, 17)}...` : tagList
    }`;
  }, [item.tags, tags]);

  return (
    <Swipeable
      ref={swipeableRow}
      overshootLeft={false}
      renderLeftActions={LeftAction}
      overshootRight={false}
      renderRightActions={RightAction}
    >
      <Card style={{ borderWidth: 0 }}>
        <Layout
          style={{
            marginHorizontal: -12,
            marginVertical: -12,
          }}
        >
          <Layout
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
              }}
            >
              {item.name}
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color:
                  kittenTheme[
                    item.style ||
                      `color-primary-${
                        themeContext.theme === "light" ? 800 : 100
                      }`
                  ],
              }}
            >
              {item.balance !== "" &&
                `${splitToDigits(item.balance.toString())} ₽`}
            </Text>
          </Layout>
          <Layout
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 8,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color:
                  kittenTheme[
                    `color-basic-${themeContext.theme === "light" ? 700 : 600}`
                  ],
              }}
            >
              {renderCategory}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color:
                  kittenTheme[
                    `color-basic-${themeContext.theme === "light" ? 700 : 600}`
                  ],
              }}
            >
              {renderTag}
            </Text>
          </Layout>
        </Layout>
      </Card>
    </Swipeable>
  );
});
