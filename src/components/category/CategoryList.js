import React, { memo } from "react";
import { View, FlatList } from "react-native";
import { useSelector } from "react-redux";

import { CategoryListItem } from "./CategoryListItem";

export const CategoryList = memo(({ navigation }) => {
  const { categories } = useSelector((store) => store.category);

  const keyExtractor = (item) => item.id.toString();

  const renderItem = ({ item }) => (
    <CategoryListItem navigation={navigation} item={item} />
  );

  return (
    <FlatList
      style={{
        marginHorizontal: 8,
        marginTop: 15,
      }}
      ListFooterComponent={
        <View style={{ marginHorizontal: 16, marginTop: 30 }} />
      }
      ListFooterComponentStyle={{ paddingBottom: 30 }}
      keyExtractor={keyExtractor}
      data={categories}
      renderItem={renderItem}
    />
  );
});
