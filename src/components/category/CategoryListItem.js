import React, { memo, useCallback } from "react";
import Swipeable from "react-native-gesture-handler/Swipeable";

import { ListItem, Button } from "@ui-kitten/components";

import { Alert } from "react-native";
import { useDispatch } from "react-redux";
import { DeleteIcon, CategoryIcon } from "../../themes/icons";
import { hideCategoryAction } from "../../store/actions/apiAction";

export const CategoryListItem = memo(({ item, navigation }) => {
  const dispatch = useDispatch();

  const swipeableRow = React.useRef(null);

  const close = useCallback(() => {
    swipeableRow.current.close();
  }, [swipeableRow]);

  const renderIconItem = (style) => <CategoryIcon {...style} />;

  const deleteHandler = useCallback(() => {
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
    navigation.navigate("UpdateCategory", {
      category: item,
    });
  }, [item, navigation]);

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
