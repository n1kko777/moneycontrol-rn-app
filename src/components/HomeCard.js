import React from "react";
import { Layout, Text, Button } from "@ui-kitten/components";
import { View } from "react-native";

import { AddSmallIcon } from "../themes/icons";
import { shadowProperty } from "../themes/themes";
import { HomeCardItem } from "./HomeCardItem";

export const HomeCard = ({ item }) => {
  return (
    <Layout
      style={{
        borderRadius: 10,
        marginHorizontal: 8,
        marginTop: 15,
        marginBottom: 30,
        padding: 16,
        paddingTop: 8,
        ...shadowProperty
      }}
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row"
        }}
      >
        <Text category="h5">{item.title}</Text>
      </View>

      <View>
        {item.data.map(elem => (
          <HomeCardItem
            key={elem.id}
            name={elem.name}
            amount={elem.balance}
            color={elem.style}
          />
        ))}
      </View>
    </Layout>
  );
};
