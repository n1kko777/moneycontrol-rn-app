import React, { memo, useCallback } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { CompanyProfileListItem } from './CompanyProfileListItem';
import { getShortName } from 'utils';
import { getProfileListData } from '../../store/actions/apiAction';
import { setFilterParams } from '../../store/actions/layoutAction';
import { getProfile, getLayoutFilterParams } from '../../store/selectors';

export const CompanyProfileList = memo(({ dataList, onCompanyRefresh, navigation }) => {
  const keyExtractor = useCallback((item) => item.id.toString(), []);

  const filteredParams = useSelector(getLayoutFilterParams);
  const profile = useSelector(getProfile);

  const dispatch = useDispatch();

  const onNavigateHandler = useCallback(
    (item) => {
      dispatch(getProfileListData(item.id)).then(() => {
        const targetProfile = {
          ...(filteredParams !== null ? filteredParams : {}),
          profile: [
            {
              index: 0,
              text: getShortName(`${item.first_name} ${item.last_name}`),
              title: getShortName(`${item.first_name} ${item.last_name}`),
              id: item.id,
            },
          ],
        };
        dispatch(setFilterParams(targetProfile));
        navigation.navigate('CompanyMember', {
          profile: item,
        });
      });
    },
    [dispatch, filteredParams, navigation]
  );

  const renderItem = useCallback(
    ({ item }) => (
      <CompanyProfileListItem isAdmin={profile?.is_admin} onClick={onNavigateHandler} item={item} />
    ),
    [onNavigateHandler, profile?.is_admin]
  );

  return (
    <FlatList
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={onCompanyRefresh} tintColor="transparent" />
      }
      style={{ marginHorizontal: 8, marginTop: 15 }}
      ListFooterComponentStyle={{ paddingBottom: 30 }}
      keyExtractor={keyExtractor}
      data={dataList}
      renderItem={renderItem}
    />
  );
});
