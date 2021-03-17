import React, { memo, useCallback } from "react";
import { Autocomplete } from "@ui-kitten/components";
import { useSelector } from "react-redux";
import { CloseIcon, AddSmallIcon } from "../../../themes/icons";

export const CategorySelector = memo(
  ({ selectedId, setSelectedId, isNotEmpty, navigation }) => {
    const categoryInput = React.useRef(null);
    const { categories, current } = useSelector((store) => store.category);

    const categoriesData = categories.map((elem) => ({
      title: elem.category_name,
      id: elem.id,
    }));

    const [value, setValue] = React.useState(
      selectedId !== null
        ? categoriesData.find((el) => el.id === selectedId).title
        : ""
    );
    const [data, setData] = React.useState(categoriesData);

    const onSelect = useCallback(
      (item) => {
        setValue(item.title);
        setSelectedId(item.id);
      },
      [setSelectedId]
    );

    React.useEffect(() => {
      if (current !== null) {
        onSelect({
          title: current.category_name,
          id: current.id,
        });
      }
    }, [current, onSelect]);

    const onChangeText = useCallback(
      (query) => {
        setValue(query);
        setData(
          categoriesData.filter((item) =>
            item.title.toLowerCase().includes(query.toLowerCase())
          )
        );
      },
      [categoriesData]
    );

    const clearInput = useCallback(() => {
      setValue("");
      setData(categoriesData);
      setSelectedId(null);
    }, [categoriesData, setSelectedId]);

    const addCategory = useCallback(() => {
      categoryInput.current.blur();

      if (categories.map((el) => el.category_name).includes(value)) {
        onSelect({ title: value });
      } else if (value.trim().length !== 0) {
        navigation.navigate("CreateCategory", { category_name: value });
      } else {
        onChangeText("");
      }
    }, [categories, navigation, onChangeText, onSelect, value]);

    return (
      <Autocomplete
        value={value}
        data={data}
        onChangeText={onChangeText}
        onSelect={onSelect}
        placeholder="Укажите категорию"
        style={{ marginVertical: 10 }}
        icon={
          value.trim().length !== 0 &&
          (selectedId !== null ? CloseIcon : AddSmallIcon)
        }
        onIconPress={selectedId !== null ? clearInput : addCategory}
        onSubmitEditing={addCategory}
        ref={categoryInput}
        status={isNotEmpty ? "success" : "danger"}
      />
    );
  }
);
