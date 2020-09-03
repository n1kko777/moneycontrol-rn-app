import React from "react";
import { RefreshControl, SectionList } from "react-native";
import { OperationListItem } from "./OperationListItem";
import { Text } from "@ui-kitten/components";
import { useDispatch, useSelector } from "react-redux";
import { getDataDispatcher } from "../../store/actions/apiAction";

export const OperationList = ({ navigation }) => {
  const dispatch = useDispatch();
  const dataList = useSelector((store) => store.layout.formatedOperationList);

  const onOperationRefresh = () => {
    dispatch(getDataDispatcher(navigation));
  };

  return (
    <SectionList
      style={{ flex: 1, height: "100%" }}
      scrollEnabled
      stickySectionHeadersEnabled
      initialNumToRender={3}
      sections={dataList}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item }) => (
        <OperationListItem item={item} navigation={navigation} />
      )}
      renderSectionHeader={({ section: { title } }) => (
        <Text
          style={{
            marginHorizontal: 8,
            marginTop: 10,
            marginBottom: 5,
          }}
          category="h5"
        >
          {title}
        </Text>
      )}
      refreshControl={
        <RefreshControl
          refreshing={false}
          onRefresh={onOperationRefresh}
          tintColor="transparent"
        />
      }
      style={{
        marginHorizontal: 8,
        marginTop: 15,
      }}
      contentContainerStyle={{ paddingBottom: 30 }}
      ListEmptyComponent={
        <Text style={{ marginTop: 15, textAlign: "center" }}>
          Операции не найдены.
        </Text>
      }
    />
  );
};
