import React from "react";
import Swipeable from "react-native-gesture-handler/Swipeable";

import { ListItem, Button } from "@ui-kitten/components";

import { DeleteIcon, TagIcon } from "../../themes/icons";

import { Alert } from "react-native";
import { useDispatch } from "react-redux";
import { hideTagAction } from "../../store/actions/apiAction";

export const TagListItem = ({ item, index, dataList, navigation }) => {
  const dispatch = useDispatch();

  const swipeableRow = React.useRef(null);

  const close = () => {
    swipeableRow.current.close();
  };

  const renderIconItem = (style) => <TagIcon {...style} />;

  const deleteHandler = () => {
    close();
    Alert.alert(
      "Удаление тега",
      `Вы уверены что хотите удалить тег ${item.tag_name}?`,
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
  };

  const RightAction = () => (
    <Button onPress={deleteHandler} icon={DeleteIcon} status="danger" />
  );

  const updateHandler = () => {
    navigation.navigate("UpdateTag", {
      tag: item,
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
          borderTopLeftRadius: index === 0 ? 10 : 0,
          borderTopRightRadius: index === 0 ? 10 : 0,
          borderBottomLeftRadius: index === dataList.length - 1 ? 10 : 0,
          borderBottomRightRadius: index === dataList.length - 1 ? 10 : 0,
        }}
      />
    </Swipeable>
  );
};
