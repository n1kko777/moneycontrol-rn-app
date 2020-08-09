import React from "react";
import { Autocomplete } from "@ui-kitten/components";
import { CloseIcon } from "../../../themes/icons";
import { useSelector } from "react-redux";

export const CategorySelector = ({ selectedId, setSelectedId, isNotEmpty }) => {
  const { categories } = useSelector((store) => store.category);

  const categoriesData = categories.map((elem) => ({
    title: elem.category_name,
    id: elem.id,
  }));

  const [value, setValue] = React.useState(
    selectedId !== null
      ? categoriesData.find((el) => el.id === selectedId).title
      : null
  );
  const [data, setData] = React.useState(categoriesData);

  const onSelect = (item) => {
    setValue(item.title);
    setSelectedId(item.id);
  };

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

  return (
    <Autocomplete
      value={value}
      data={data}
      icon={isNotEmpty && CloseIcon}
      onIconPress={clearInput}
      onChangeText={onChangeText}
      onSelect={onSelect}
      placeholder="Укажите категорию"
      style={{ marginVertical: 10 }}
      status={isNotEmpty ? "success" : "danger"}
    />
  );
};
