import React, { memo, useCallback } from "react";
import { FlatList, RefreshControl } from "react-native";
import { useDispatch } from "react-redux";
import { getProfileListData } from "../../store/actions/apiAction";
import { CompanyProfileListItem } from "./CompanyProfileListItem";

export const CompanyProfileList = memo(
  ({ dataList, onCompanyRefresh, navigation }) => {
    const keyExtractor = useCallback((item) => item.id.toString(), []);

    const dispatch = useDispatch();

    const onNavigateHandler = useCallback(
      (item) => {
        dispatch(getProfileListData(item.id)).then(() => {
          navigation.navigate("CompanyMember", {
            profile: item,
          });
        });
      },
      [dispatch, navigation]
    );

    const renderItem = useCallback(
      ({ item }) => (
        <CompanyProfileListItem onClick={onNavigateHandler} item={item} />
      ),
      [onNavigateHandler]
    );

    return (
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={onCompanyRefresh}
            tintColor="transparent"
          />
        }
        style={{ marginHorizontal: 8, marginTop: 15 }}
        ListFooterComponentStyle={{ paddingBottom: 30 }}
        keyExtractor={keyExtractor}
        data={dataList}
        renderItem={renderItem}
      />
    );
  }
);
