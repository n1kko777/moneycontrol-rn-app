import React, { memo, useCallback } from 'react';
import { View, FlatList } from 'react-native';
import { useSelector } from 'react-redux';

import { TagListItem } from './TagListItem';
import { getTags } from '../../store/selectors';

export const TagList = memo(({ navigation }) => {
  const dataList = useSelector(getTags);

  const keyExtractor = useCallback((item) => item.id.toString(), []);

  const renderItem = useCallback(
    ({ item }) => <TagListItem item={item} navigation={navigation} />,
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
