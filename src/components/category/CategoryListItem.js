import React from "react";
import Swipeable from "react-native-gesture-handler/Swipeable";

import { ListItem, Button } from "@ui-kitten/components";

import { DeleteIcon, CategoryIcon } from "../../themes/icons";

import { Alert } from "react-native";
import { useDispatch } from "react-redux";

import { hideCategory } from "../../store/actions/categoryAction";

import { startLoader, endLoader } from "../../store/actions/apiAction";

export const CategoryListItem = ({ item, index, dataList, navigation }) => {
  const dispatch = useDispatch();

  const swipeableRow = React.useRef(null);

  const close = () => {
    swipeableRow.current.close();
  };

  const renderIconItem = (style) => <CategoryIcon {...style} />;

  const deleteHandler = () => {
    close();

    Alert.alert(
      "Удаление категории",
      `Вы уверены что хотите удалить категорию ${item.category_name}?`,
      [
        {
          text: "Отмена",
          style: "cancel",
        },
        {
          text: "Удалить",
          onPress: async () => {
            dispatch(startLoader());
            const hideItem = item;

            await dispatch(hideCategory(hideItem)).then(() => {
              dispatch(endLoader());
            });
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

  const updateHandler = () => {
    navigation.navigate("UpdateCategory", {
      category: item,
    });
  };

  return (
    <Swipeable
      ref={swipeableRow}
      overshootRight={false}
      renderRightActions={RightAction}
    >
      <ListItem
        onPress={updateHandler}
        title={`${item.category_name}`}
        titleStyle={{
          fontSize: 16,
        }}
        descriptionStyle={{
          fontSize: 14,
        }}
        icon={renderIconItem}
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
