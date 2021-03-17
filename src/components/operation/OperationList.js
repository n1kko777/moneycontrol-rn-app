import React, { memo } from "react";
import { RefreshControl, SectionList, View } from "react-native";
import { Text } from "@ui-kitten/components";
import { OperationListItem } from "./OperationListItem";

export const OperationList = memo(
  ({ navigation, dataList = [], onOperationRefresh }) => (
    <SectionList
      scrollEnabled
      stickySectionHeadersEnabled={false}
      initialNumToRender={3}
      sections={dataList}
      keyExtractor={(item, index) => item + index}
      nestedScrollEnabled
      renderItem={({ item }) => (
        <View style={{ marginVertical: 4 }}>
          <OperationListItem item={item} navigation={navigation} />
        </View>
      )}
      renderSectionHeader={({ section: { title } }) => (
        <Text
          style={{
            marginHorizontal: 8,
            marginTop: 10,
            marginBottom: 5,
          }}
          category="h6"
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
  )
);
