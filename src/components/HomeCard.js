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
        <Text category="h4">{item.title}</Text>
        <Button
          style={{ marginRight: -8 }}
          appearance="ghost"
          icon={AddSmallIcon}
        />
      </View>

      <View>
        {item.data.map(account => (
          <HomeCardItem
            key={account.id}
            name={account.account_name}
            amount={account.balance}
          />
        ))}
      </View>
    </Layout>
  );
};
