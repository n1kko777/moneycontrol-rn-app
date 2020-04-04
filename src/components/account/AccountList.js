import React from "react";
import { View, FlatList } from "react-native";
import { useSelector } from "react-redux";

import { AccountListItem } from "./AccountListItem";

export const AccountList = () => {
  const { profile } = useSelector(state => state.profile);
  const { accounts } = useSelector(state => state.account);
  const dataList = accounts.filter(acc => acc.profile == profile.id);

  const keyExtractor = item => item.id.toString();

  const renderItem = ({ item, index }) => (
    <AccountListItem item={item} index={index} dataList={dataList} />
  );

  return (
    <FlatList
      style={{
        marginHorizontal: 8,
        marginTop: 15
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
