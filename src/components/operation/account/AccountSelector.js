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
  const { accounts, current } = useSelector((store) => store.account);
  const accountData = accounts
    .filter((elem) => elem.profile == profile.id)
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

  React.useEffect(() => {
    current !== null &&
      onSelect({
        title: `${current.account_name} (${splitToDigits(current.balance)} ₽)`,
        id: current.id,
      });
  }, [current]);

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
      placeholder="Укажите счет"
      style={{ marginVertical: 10 }}
      icon={
        value.trim().length !== 0 &&
        (selectedId !== null ? CloseIcon : AddSmallIcon)
      }
      onIconPress={selectedId !== null ? clearInput : addAccount}
      onSubmitEditing={addAccount}
      ref={accountInput}
      status={isNotEmpty ? "success" : "danger"}
    />
  );
};
