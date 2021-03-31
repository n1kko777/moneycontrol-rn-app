import React, { memo, useCallback, useMemo } from "react";
import { TouchableWithoutFeedback } from "react-native";
import { Autocomplete, AutocompleteItem, Icon } from "@ui-kitten/components";

export const CategorySelector = memo(
  ({
    current,
    setCurrent,
    clearCurrent,
    categoryData,
    isNotEmpty,
    navigation,
  }) => {
    const categoryInput = React.useRef(null);

    const [value, setValue] = React.useState(
      current !== null ? current.title : ""
    );

    React.useEffect(() => {
      setValue(current !== null ? current.title : "");
    }, [current]);

    const [data, setData] = React.useState(categoryData || []);

    const onSelect = useCallback(
      (item) => {
        setCurrent(data[item]);
      },
      [data, setCurrent]
    );

    const onChangeText = useCallback(
      (query) => {
        setValue(query);
        setData(
          categoryData.filter((item) =>
            item.title.toLowerCase().includes(query.toLowerCase())
          )
        );
        if (
          query.trim().length === 0 ||
          (current !== null && query !== current.title)
        ) {
          clearCurrent();
        }
      },
      [categoryData, clearCurrent, current]
    );

    const clearInput = useCallback(() => {
      onChangeText("");
    }, [onChangeText]);

    const addCategory = useCallback(() => {
      categoryInput.current.blur();
      const findIndex = data.findIndex((elAcc) =>
        new RegExp(value.toLowerCase(), "i").test(elAcc.title.toLowerCase())
      );

      if (findIndex !== -1) {
        onSelect(findIndex);
      } else if (value.trim().length !== 0) {
        navigation.navigate("CreateCategory", { category_name: value });
      } else {
        onChangeText("");
      }
    }, [data, navigation, onChangeText, onSelect, value]);

    const renderIcon = useCallback(
      (props) =>
        value.trim().length !== 0 && (
          <TouchableWithoutFeedback
            onPress={current !== null ? clearInput : addCategory}
          >
            <Icon
              {...props}
              name={current !== null ? "close" : "plus-outline"}
            />
          </TouchableWithoutFeedback>
        ),
      [addCategory, clearInput, current, value]
    );

    const renderOption = useMemo(
      () =>
        data.map((item) => (
          <AutocompleteItem key={item.id} title={item.title} />
        )),
      [data]
    );

    return (
      <Autocomplete
        value={value}
        onChangeText={onChangeText}
        onSelect={onSelect}
        placeholder="Укажите категорию"
        style={{ marginVertical: 10 }}
        accessoryRight={renderIcon}
        onSubmitEditing={addCategory}
        ref={categoryInput}
        status={isNotEmpty ? "success" : "danger"}
      >
        {renderOption}
      </Autocomplete>
    );
  }
);
