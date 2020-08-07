import React from "react";
import { View, FlatList, RefreshControl } from "react-native";
import { OperationListItem } from "./OperationListItem";
import { Text } from "@ui-kitten/components";
import { ScrollView } from "react-native-gesture-handler";

export const OperationList = ({ dataList, navigation, onOperationRefresh }) => {
  return (
    <ScrollView
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
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      {dataList.map((listItem) => (
        <View
          style={{
            marginBottom: 15,
          }}
          key={listItem.title}
        >
          <Text
            style={{
              marginHorizontal: 8,
              marginTop: 15,
            }}
            category="h5"
          >
            {listItem.title}
          </Text>
          {listItem.itemList.map((item, index) => (
            <OperationListItem
              key={`${item.key}`}
              item={item}
              index={index}
              dataList={dataList}
              navigation={navigation}
            />
          ))}
        </View>
      ))}
    </ScrollView>
  );
};
