import React, { memo, useCallback, useState, useMemo, useEffect } from "react";
import { ScrollView, View } from "react-native";
import { Autocomplete, Layout } from "@ui-kitten/components";
import { PopoverPlacements } from "@ui-kitten/components/ui/popover/type";
import { CustomSearchWithSelectItem } from "./CustomSearchWithSelectItem";
import { AddSmallIcon } from "../../themes/icons";
import styles from "./styles";

export const CustomSearchWithSelect = memo(
  ({ datasets = [], dataList, setDataList, enableCreate, ...props }) => {
    const [value, setValue] = useState("");
    const [data, setData] = useState(datasets);

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
      [data, onChangeText, setDataList]
    );

    const onDelete = useCallback(
      (text) => {
        setDataList(dataList.filter((el) => el.title !== text));
      },
      [dataList, setDataList]
    );

    const memoDataList = useMemo(
      () =>
        dataList.map((el) => (
          <CustomSearchWithSelectItem
            key={el.id}
            text={el.title}
            onDelete={onDelete}
          />
        )),
      [dataList, onDelete]
    );

    useEffect(() => {
      if (dataList.length) {
        setValue("");
        setData(
          datasets.filter(
            (el) => !dataList.map((innderEl) => innderEl.id).includes(el.id)
          )
        );
      }
    }, [dataList, datasets]);

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
        {memoDataList.length ? (
          <ScrollView style={styles.scrollView}>
            <View style={styles.view}>{memoDataList}</View>
          </ScrollView>
        ) : null}
      </Layout>
    );
  }
);
