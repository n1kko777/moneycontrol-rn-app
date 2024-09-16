import React, { memo, useCallback } from 'react';
import { View, FlatList } from 'react-native';
import { useSelector } from 'react-redux';

import { AccountListItem } from './AccountListItem';
import { getAccountDataList } from '../../store/selectors';

export const AccountList = memo(({ navigation }) => {
  const dataList = useSelector(getAccountDataList);

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
      ListFooterComponent={<View style={{ marginHorizontal: 16, marginTop: 30 }} />}
      ListFooterComponentStyle={{ paddingBottom: 30 }}
      keyExtractor={keyExtractor}
      data={dataList}
      renderItem={renderItem}
    />
  );
});
