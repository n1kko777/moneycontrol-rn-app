import React, { memo, useCallback } from "react";
import { Autocomplete } from "@ui-kitten/components";
import { useSelector } from "react-redux";
import { CloseIcon, AddSmallIcon } from "../../../themes/icons";
import { getAccountTitle } from "../../../getAccountTitle";
import {
  getAccounts,
  getAccountCurrent,
  getAccountDataList,
} from "../../../store/selectors";

export const AccountSelector = memo(
  ({ selectedId, setSelectedId, isNotEmpty, navigation }) => {
    const accountInput = React.useRef(null);

    const accounts = useSelector(getAccounts);
    const current = useSelector(getAccountCurrent);

    const accountData = useSelector(getAccountDataList).map((elem) => ({
      title: getAccountTitle(elem),
      id: elem.id,
    }));

    const [value, setValue] = React.useState(
      selectedId !== null
        ? accountData.find((el) => el.id === selectedId).title
        : ""
    );
    const [data, setData] = React.useState(accountData);

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
          title: getAccountTitle(current),
          id: current.id,
        });
      }
    }, [current, onSelect]);

    const onChangeText = useCallback(
      (query) => {
        setValue(query);
        setData(
          accountData.filter((item) =>
            item.title.toLowerCase().includes(query.toLowerCase())
          )
        );
      },
      [accountData]
    );

    const clearInput = useCallback(() => {
      setValue("");
      setData(accountData);
      setSelectedId(null);
    }, [accountData, setSelectedId]);

    const addAccount = useCallback(() => {
      accountInput.current.blur();

      if (accounts.map((el) => el.account_name).includes(value)) {
        onSelect({ title: value });
      } else if (value.trim().length !== 0) {
        navigation.navigate("CreateAccount", { account_name: value });
      } else {
        onChangeText("");
      }
    }, [accounts, navigation, onChangeText, onSelect, value]);

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
  }
);
