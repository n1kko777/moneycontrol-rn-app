import React, { memo, useMemo } from 'react';
import { View } from 'react-native';

import { Text } from '@ui-kitten/components';
import { HomeCard } from './HomeCard';

export const HomeList = memo(({ navigation, dataList }) => {
  const renderHomeList = useMemo(
    () =>
      dataList.map((item) => (
        <HomeCard
          style={{ borderRadius: 10, marginHorizontal: 8, marginBottom: 20 }}
          key={item.title}
          item={item}
          navigation={navigation}
          isNavigate={dataList.isNavigate}
        />
      )),
    [dataList, navigation],
  );

  return (
    <View style={{ flex: 1, paddingBottom: 30 }}>
      {dataList.length !== 0 ? (
        renderHomeList
      ) : (
        <Text
          style={{
            textAlign: 'center',
            marginTop: 30,
          }}
        >
          Нет записей
        </Text>
      )}
    </View>
  );
});
