import React from "react";
import { View, FlatList, RefreshControl } from "react-native";
import { OperationListItem } from "./OperationListItem";
import { Text } from "@ui-kitten/components";

export const OperationList = ({ dataList, navigation, onOperationRefresh }) => {
  const keyExtractor = (item) => `${item.key}_${item.key}`;

  const renderItem = ({ item, index }) => (
    <OperationListItem
      item={item}
      index={index}
      dataList={dataList}
      navigation={navigation}
    />
  );

  return (
    <FlatList
      refreshControl={
        <RefreshControl
          refreshing={false}
          onRefresh={onOperationRefresh}
          tintColor="transparent"
        />
      }
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
      ListEmptyComponent={
        <Text style={{ alignSelf: "center" }}>Операции не найдены.</Text>
      }
    />
  );
};
