import React from "react";
import { Autocomplete } from "@ui-kitten/components";
import { CloseIcon } from "../../../themes/icons";
import { useSelector } from "react-redux";
import { splitToDigits } from "../../../splitToDigits";

export const AccountSelector = ({ selectedId, setSelectedId, isNotEmpty }) => {
  const { profile } = useSelector((store) => store.profile);
  const { accounts } = useSelector((store) => store.account);
  const accountData = accounts
    .filter((elem) => elem.profile == profile.id)
    .sort((a, b) => new Date(b.last_updated) - new Date(a.last_updated))
    .map((elem) => ({
      title: `${elem.account_name} (${splitToDigits(elem.balance)} ₽)`,
      id: elem.id,
    }));

  const [value, setValue] = React.useState(
    selectedId !== null
      ? accountData.find((el) => el.id === selectedId).title
      : null
  );
  const [data, setData] = React.useState(accountData);

  const onSelect = (item) => {
    setValue(item.title);
    setSelectedId(item.id);
  };

  const onChangeText = (query) => {
    setValue(query);
    setData(
      accountData.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const clearInput = () => {
    setValue("");
    setData(accountData);
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
      placeholder="Укажите счет"
      style={{ marginVertical: 10 }}
      status={isNotEmpty ? "success" : "danger"}
    />
  );
};
