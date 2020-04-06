import React from "react";
import Swipeable from "react-native-gesture-handler/Swipeable";

import { ListItem, Button } from "@ui-kitten/components";

import { DeleteIcon, TagIcon } from "../../themes/icons";

import { Alert } from "react-native";
import { useDispatch } from "react-redux";

import { hideTag } from "../../store/actions/tagAction";

import { startLoader, endLoader } from "../../store/actions/apiAction";

export const TagListItem = ({ item, index, dataList, navigation }) => {
  const dispatch = useDispatch();

  const renderIconItem = (style) => <TagIcon {...style} />;

  const deleteHandler = () => {
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
          onPress: async () => {
            dispatch(startLoader());
            const hideItem = item;
            hideItem.is_active = false;
            await dispatch(hideTag(hideItem)).then(() => {
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
    navigation.navigate("UpdateTag", {
      tag: item,
    });
  };

  return (
    <Swipeable overshootRight={false} renderRightActions={RightAction}>
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
