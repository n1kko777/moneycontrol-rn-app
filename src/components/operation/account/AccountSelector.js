import React from "react";
import { Autocomplete } from "@ui-kitten/components";
import { CloseIcon, AddSmallIcon } from "../../../themes/icons";
import { useSelector } from "react-redux";
import { splitToDigits } from "../../../splitToDigits";

export const AccountSelector = ({
  selectedId,
  setSelectedId,
  isNotEmpty,
  navigation,
}) => {
  const accountInput = React.useRef(null);
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
      : ""
  );
  const [data, setData] = React.useState(accountData);

  const onSelect = (item) => {
    setValue(item.title);
    setSelectedId(item.id);
  };

  const onClearSelect = () => {
    setValue("");
    setData(accountData);
    setSelectedId(null);
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

  const addAccount = () => {
    accountInput.current.blur();

    if (accounts.map((el) => el.account_name).includes(value)) {
      onSelect({ title: value });
    } else if (value.trim().length !== 0) {
      navigation.navigate("CreateAccount", { account_name: value });
      onClearSelect();
    } else {
      onChangeText("");
    }
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
      icon={
        value.trim().length !== 0 &&
        (selectedId !== null ? CloseIcon : AddSmallIcon)
      }
      onIconPress={selectedId !== null ? onClearSelect : addAccount}
      onSubmitEditing={addAccount}
      ref={accountInput}
      status={isNotEmpty ? "success" : "danger"}
    />
  );
};
