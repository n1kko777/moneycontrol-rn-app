import React, { memo, useCallback, useMemo } from "react";
import { TouchableWithoutFeedback } from "react-native";
import { Autocomplete, AutocompleteItem, Icon } from "@ui-kitten/components";

export const AccountSelector = memo(
  ({
    current,
    setCurrent,
    clearCurrent,
    accountData,
    isNotEmpty,
    navigation,
  }) => {
    const accountInput = React.useRef(null);

    const [value, setValue] = React.useState(
      current !== null ? current.title : ""
    );

    React.useEffect(() => {
      setValue(current !== null ? current.title : "");
    }, [current]);

    const [data, setData] = React.useState(accountData || []);

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
          accountData.filter((item) =>
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
      [accountData, clearCurrent, current]
    );

    const clearInput = useCallback(() => {
      onChangeText("");
    }, [onChangeText]);

    const addAccount = useCallback(() => {
      accountInput.current.blur();
      const findIndex = data.findIndex((elAcc) =>
        new RegExp(value.toLowerCase(), "i").test(elAcc.title.toLowerCase())
      );

      if (findIndex !== -1) {
        onSelect(findIndex);
      } else if (value.trim().length !== 0) {
        navigation.navigate("CreateAccount", { account_name: value });
      } else {
        onChangeText("");
      }
    }, [data, navigation, onChangeText, onSelect, value]);

    const renderIcon = useCallback(
      (props) =>
        value.trim().length !== 0 && (
          <TouchableWithoutFeedback
            onPress={current !== null ? clearInput : addAccount}
          >
            <Icon
              {...props}
              name={current !== null ? "close" : "plus-outline"}
            />
          </TouchableWithoutFeedback>
        ),
      [addAccount, clearInput, current, value]
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
        placeholder="Укажите счет"
        style={{ marginVertical: 10 }}
        accessoryRight={renderIcon}
        onSubmitEditing={addAccount}
        ref={accountInput}
        status={isNotEmpty ? "success" : "danger"}
      >
        {renderOption}
      </Autocomplete>
    );
  }
);
