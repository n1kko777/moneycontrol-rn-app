import React, { memo } from "react";
import { View, FlatList } from "react-native";
import { useSelector } from "react-redux";

import { TagListItem } from "./TagListItem";

export const TagList = memo(({ navigation }) => {
  const { tags } = useSelector((store) => store.tag);
  const dataList = tags;

  const keyExtractor = (item) => item.id.toString();

  const renderItem = ({ item, index }) => (
    <TagListItem
      navigation={navigation}
      item={item}
      index={index}
      dataList={dataList}
    />
  );

  return (
    <FlatList
      style={{
        marginHorizontal: 8,
        marginTop: 15,
      }}
      ListFooterComponent={
        <View style={{ marginHorizontal: 16, marginTop: 30 }}></View>
      }
      ListFooterComponentStyle={{ paddingBottom: 30 }}
      keyExtractor={keyExtractor}
      data={dataList}
      renderItem={renderItem}
    />
  );
});
