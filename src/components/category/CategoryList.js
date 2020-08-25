import React from "react";
import { View, FlatList } from "react-native";
import { useSelector } from "react-redux";

import { CategoryListItem } from "./CategoryListItem";

export const CategoryList = ({ navigation }) => {
  const { categories } = useSelector((store) => store.category);
  const dataList = categories;

  const keyExtractor = (item) => item.id.toString();

  const renderItem = ({ item, index }) => (
    <CategoryListItem
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
};
