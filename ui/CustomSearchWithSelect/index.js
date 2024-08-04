import { Autocomplete, AutocompleteItem, Icon, Layout } from '@ui-kitten/components';
import { PopoverPlacements } from '@ui-kitten/components/ui/popover/type';
import React, { memo, useCallback, useState, useMemo, useEffect } from 'react';
import { ScrollView, View, TouchableWithoutFeedback } from 'react-native';

import { CustomSearchWithSelectItem } from './CustomSearchWithSelectItem';
import styles from './styles';

export const CustomSearchWithSelect = memo(
  ({ datasets = [], dataList, setDataList, enableCreate, ...props }) => {
    const [value, setValue] = useState('');
    const [data, setData] = useState(datasets);
    const [width, setWidth] = React.useState(400);
    const handleWidth = (event) => {
      const { width } = event.nativeEvent.layout;
      setWidth(width);
    };

    const onChangeText = useCallback(
      (query) => {
        setValue(query);
        setData(datasets.filter((item) => item.title.toLowerCase().includes(query.toLowerCase())));
      },
      [datasets]
    );

    const onSelect = useCallback(
      (item) => {
        onChangeText('');
        setDataList((prevState) => [...prevState, data[item]]);
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
          <CustomSearchWithSelectItem key={el.id} text={el.title} onDelete={onDelete} />
        )),
      [dataList, onDelete]
    );

    useEffect(() => {
      if (dataList.length) {
        setValue('');
        setData(datasets.filter((el) => !dataList.map((innderEl) => innderEl.id).includes(el.id)));
      }
    }, [dataList, datasets]);

    const memoAutocompleteData = useMemo(
      () => data.map((dataItem) => <AutocompleteItem key={dataItem.id} title={dataItem.title} />),
      [data]
    );

    const renderIcon = useCallback(
      (iconProps) =>
        Boolean(enableCreate) &&
        value.trim().length !== 0 && (
          <TouchableWithoutFeedback onPress={props.onSubmitEditing}>
            <Icon {...iconProps} name="plus-outline" />
          </TouchableWithoutFeedback>
        ),
      [enableCreate, props.onSubmitEditing, value]
    );

    return (
      <Layout style={styles.container}>
        <View onLayout={handleWidth}>
          <Autocomplete
            placement={PopoverPlacements.TOP}
            onChangeText={onChangeText}
            onSelect={onSelect}
            value={value}
            accessoryRight={renderIcon}
            ref={props.forwardedRef}
            style={{ width }}
            {...props}>
            {memoAutocompleteData}
          </Autocomplete>
        </View>
        {memoDataList.length ? (
          <ScrollView style={styles.scrollView}>
            <View style={styles.view}>{memoDataList}</View>
          </ScrollView>
        ) : null}
      </Layout>
    );
  }
);
