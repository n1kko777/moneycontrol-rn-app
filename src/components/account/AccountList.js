import React, { memo, useCallback, useMemo } from "react";
import { View, FlatList } from "react-native";
import { useSelector } from "react-redux";

import { AccountListItem } from "./AccountListItem";

export const AccountList = memo(({ navigation }) => {
  const store = useSelector((selStore) => selStore);
  const { profile } = store.profile;
  const { accounts } = store.account;

  const dataList = useMemo(
    () =>
      accounts.filter((acc) => profile !== null && acc.profile === profile.id),
    [accounts, profile]
  );

  const keyExtractor = useCallback((item) => item.id.toString(), []);

  const renderItem = useCallback(
    ({ item }) => <AccountListItem navigation={navigation} item={item} />,
    [navigation]
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
      data={dataList}
      renderItem={renderItem}
    />
  );
});
