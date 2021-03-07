import React, { memo, useCallback } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { Autocomplete, Layout } from "@ui-kitten/components";
import { CustomSearchWithSelectItem } from "./CustomSearchWithSelectItem";
import { PopoverPlacements } from "@ui-kitten/components/ui/popover/type";
import { AddSmallIcon } from "../../themes/icons";

export const CustomSearchWithSelect = memo(
  ({ datasets = [], dataList, setDataList, enableCreate, ...props }) => {
    const [value, setValue] = React.useState("");
    const [data, setData] = React.useState(datasets);

    const onChangeText = useCallback(
      (query) => {
        setValue(query);
        setData(
          datasets.filter((item) =>
            item.title.toLowerCase().includes(query.toLowerCase())
          )
        );
      },
      [datasets]
    );

    const onSelect = useCallback(
      ({ title }) => {
        onChangeText("");
        setDataList((prevState) => [
          ...prevState,
          data.find((el) => el.title === title),
        ]);
      },
      [data]
    );

    const onDelete = useCallback(
      (text) => {
        setDataList(dataList.filter((el) => el.title !== text));
      },
      [dataList]
    );

    const memoDataList = React.useMemo(
      () =>
        dataList.map((el) => (
          <CustomSearchWithSelectItem
            key={el.id}
            text={el.title}
            onDelete={onDelete}
          />
        )),
      [dataList]
    );

    React.useEffect(() => {
      if (dataList.length) {
        setValue("");
        setData(
          datasets.filter(
            (el) => !dataList.map((innderEl) => innderEl.id).includes(el.id)
          )
        );
      }
    }, [dataList]);

    const isCreateIcon =
      Boolean(enableCreate) && value.trim().length !== 0 ? AddSmallIcon : null;

    return (
      <Layout style={styles.container}>
        <Autocomplete
          placement={PopoverPlacements.TOP}
          onChangeText={onChangeText}
          onSelect={onSelect}
          value={value}
          data={data}
          icon={isCreateIcon}
          ref={props.forwardedRef}
          {...props}
        />
        <ScrollView style={styles.scrollView}>
          <View style={styles.view}>{memoDataList}</View>
        </ScrollView>
      </Layout>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  scrollView: {
    maxHeight: 108,
    marginVertical: 10,
  },
  view: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
