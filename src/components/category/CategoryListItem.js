import React from "react";
import Swipeable from "react-native-gesture-handler/Swipeable";

import { ListItem, Button } from "@ui-kitten/components";

import { DeleteIcon, CategoryIcon } from "../../themes/icons";

import { Alert } from "react-native";
import { useDispatch } from "react-redux";
import { hideCategoryAction } from "../../store/actions/apiAction";

export const CategoryListItem = React.memo(({ item, navigation }) => {
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
      `Вы уверены, что хотите удалить категорию ${item.category_name}?`,
      [
        {
          text: "Отмена",
          style: "cancel",
        },
        {
          text: "Удалить",
          onPress: () => {
            dispatch(hideCategoryAction(item));
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
        }}
      />
    </Swipeable>
  );
});
