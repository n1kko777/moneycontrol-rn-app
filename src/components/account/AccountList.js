import React, { memo, useMemo } from "react";
import { View, FlatList } from "react-native";
import { useSelector } from "react-redux";

import { AccountListItem } from "./AccountListItem";

let renderCounter = 0;

export const AccountList = memo(({ navigation }) => {
  const store = useSelector((store) => store);
  const { profile } = store.profile;
  const { accounts } = store.account;

  const dataList = accounts.filter(
    (acc) => profile !== null && acc.profile == profile.id
  );

  const keyExtractor = (item) => item.id.toString();

  const renderItem = ({ item }) => (
    <AccountListItem navigation={navigation} item={item} />
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
