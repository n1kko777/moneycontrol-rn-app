import React, { memo, useCallback } from 'react';
import { View, FlatList } from 'react-native';
import { useSelector } from 'react-redux';

import { CategoryListItem } from './CategoryListItem';
import { getCategories } from '../../store/selectors';

export const CategoryList = memo(({ navigation }) => {
  const categories = useSelector(getCategories);

  const keyExtractor = useCallback((item) => item.id.toString(), []);

  const renderItem = useCallback(
    ({ item }) => <CategoryListItem navigation={navigation} item={item} />,
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
      data={categories}
      renderItem={renderItem}
    />
  );
});
