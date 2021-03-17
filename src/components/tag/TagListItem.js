import React, { memo, useCallback } from "react";
import Swipeable from "react-native-gesture-handler/Swipeable";

import { ListItem, Button } from "@ui-kitten/components";

import { Alert } from "react-native";
import { useDispatch } from "react-redux";
import { DeleteIcon, TagIcon } from "../../themes/icons";
import { hideTagAction } from "../../store/actions/apiAction";

export const TagListItem = memo(({ item, navigation }) => {
  const dispatch = useDispatch();

  const swipeableRow = React.useRef(null);

  const close = useCallback(() => {
    swipeableRow.current.close();
  }, [swipeableRow]);

  const renderIconItem = (style) => <TagIcon {...style} />;

  const deleteHandler = useCallback(() => {
    close();
    Alert.alert(
      "Удаление тега",
      `Вы уверены, что хотите удалить тег ${item.tag_name}?`,
      [
        {
          text: "Отмена",
          style: "cancel",
        },
        {
          text: "Удалить",
          onPress: () => {
            dispatch(hideTagAction(item));
          },
        },
      ],
      {
        cancelable: false,
      }
    );
  }, [close, dispatch, item]);

  const RightAction = () => (
    <Button onPress={deleteHandler} icon={DeleteIcon} status="danger" />
  );

  const updateHandler = useCallback(() => {
    navigation.navigate("UpdateTag", {
      tag: item,
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
        title={`${item.tag_name}`}
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
