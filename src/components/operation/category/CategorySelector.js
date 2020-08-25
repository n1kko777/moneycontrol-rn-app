import React from "react";
import { Autocomplete } from "@ui-kitten/components";
import { CloseIcon, AddSmallIcon } from "../../../themes/icons";
import { useSelector } from "react-redux";

export const CategorySelector = ({
  selectedId,
  setSelectedId,
  isNotEmpty,
  navigation,
}) => {
  const categoryInput = React.useRef(null);
  const { categories, current } = useSelector((store) => store.category);

  const categoriesData = categories
    .sort((a, b) => new Date(b.last_updated) - new Date(a.last_updated))
    .map((elem) => ({
      title: elem.category_name,
      id: elem.id,
    }));

  const [value, setValue] = React.useState(
    selectedId !== null
      ? categoriesData.find((el) => el.id === selectedId).title
      : ""
  );
  const [data, setData] = React.useState(categoriesData);

  const onSelect = (item) => {
    setValue(item.title);
    setSelectedId(item.id);
  };

  React.useEffect(() => {
    current !== null &&
      onSelect({
        title: current.category_name,
        id: current.id,
      });
  }, [current]);

  const onChangeText = (query) => {
    setValue(query);
    setData(
      categoriesData.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const clearInput = () => {
    setValue("");
    setData(categoriesData);
    setSelectedId(null);
  };

  const addCategory = () => {
    categoryInput.current.blur();

    if (categories.map((el) => el.category_name).includes(value)) {
      onSelect({ title: value });
    } else if (value.trim().length !== 0) {
      navigation.navigate("CreateCategory", { category_name: value });
    } else {
      onChangeText("");
    }
  };

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
};
