import React from "react";
import { FlatList, RefreshControl } from "react-native";
import { useDispatch } from "react-redux";
import { getProfileListData } from "../../store/actions/apiAction";
import { CompanyProfileListItem } from "./CompanyProfileListItem";

export const CompanyProfileList = ({
  dataList,
  onCompanyRefresh,
  navigation,
}) => {
  const keyExtractor = (item) => item.id.toString();

  const dispatch = useDispatch();

  const onNavigateHandler = (item) => {
    dispatch(getProfileListData(item.id)).then(() => {
      navigation.navigate("CompanyMember", {
        profile: item,
      });
    });
  };

  const renderItem = ({ item }) => (
    <CompanyProfileListItem onClick={onNavigateHandler} item={item} />
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
};
