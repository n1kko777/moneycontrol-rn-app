import React from "react";
import { View } from "react-native";

import { HomeCard } from "./HomeCard";
import { Text } from "@ui-kitten/components";

export const HomeList = ({ navigation, dataList }) => {
  return (
    <View style={{ flex: 1, paddingBottom: 30 }}>
      {dataList.length !== 0 ? (
        dataList.map((item, index) => (
          <HomeCard
            style={{ borderRadius: 10, marginHorizontal: 8, marginBottom: 20 }}
            key={index}
            item={item}
            navigation={navigation}
          />
        ))
      ) : (
        <Text
          style={{
            textAlign: "center",
            marginTop: 30
          }}
        >
          Нет записей
        </Text>
      )}
    </View>
  );
};
