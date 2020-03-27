import React from "react";
import { FlatList, View } from "react-native";

import { HomeCard } from "../components/HomeCard";
import { Text } from "@ui-kitten/components";

export const HomeList = ({ navigation, dataList }) => {
  const keyExtractor = item => `${dataList.indexOf(item)}`;

  const renderItem = ({ item }) => (
    <HomeCard item={item} navigation={navigation} />
  );

  return (
    <FlatList
      ListFooterComponent={<View></View>}
      ListFooterComponentStyle={{ paddingBottom: 30 }}
      keyExtractor={keyExtractor}
      data={dataList}
      renderItem={renderItem}
      ListEmptyComponent={
        <Text
          style={{
            textAlign: "center",
            marginTop: 30
          }}
        >
          Нет записей
        </Text>
      }
    />
  );
};
