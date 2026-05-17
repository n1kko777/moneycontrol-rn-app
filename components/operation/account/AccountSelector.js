import { Autocomplete, AutocompleteItem, Icon, Input } from '@ui-kitten/components';
import React, { useEffect, memo, useCallback, useMemo } from 'react';
import { Platform, TouchableWithoutFeedback, View } from 'react-native';

export const AccountSelector = memo(
  ({
    current,
    setCurrent,
    clearCurrent,
    accountData,
    isNotEmpty,
    navigation,
    isCreate = true,
    placeholder = 'Укажите счет',
  }) => {
    const accountInput = React.useRef(null);

    const [value, setValue] = React.useState(current !== null ? current.title : '');
    const [width, setWidth] = React.useState(400);
    const handleWidth = (event) => {
      const { width } = event.nativeEvent.layout;
      setWidth(width);
    };

    React.useEffect(() => {
      setValue(current !== null ? current.title : '');
    }, [current]);

    const [data, setData] = React.useState([]);

    useEffect(() => {
      setData(accountData);
    }, [accountData]);

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
          accountData.filter((item) => item.title.toLowerCase().includes(query.toLowerCase()))
        );
        if (query.trim().length === 0 || (current !== null && query !== current.title)) {
          clearCurrent();
        }
      },
      [accountData, clearCurrent, current]
    );

    const clearInput = useCallback(() => {
      onChangeText('');
    }, [onChangeText]);

    const addAccount = useCallback(() => {
      accountInput.current.blur();
      const normalizedValue = value.trim().toLowerCase();
      const match = accountData.find((elAcc) =>
        elAcc.title.toLowerCase().includes(normalizedValue)
      );

      if (match !== undefined) {
        setCurrent(match);
      } else if (value?.trim().length !== 0 && isCreate) {
        navigation.navigate('CreateAccount', { account_name: value });
      } else {
        onChangeText('');
      }
    }, [accountData, isCreate, navigation, onChangeText, setCurrent, value]);

    const renderIcon = useCallback(
      (props) =>
        value?.trim().length !== 0 && (
          <TouchableWithoutFeedback onPress={current !== null ? clearInput : addAccount}>
            {isCreate ? (
              <Icon {...props} name={current !== null ? 'close' : 'plus-outline'} />
            ) : (
              <Icon {...props} name="close" />
            )}
          </TouchableWithoutFeedback>
        ),
      [addAccount, clearInput, current, isCreate, value]
    );

    const renderOption = useMemo(
      () => data.map((item) => <AutocompleteItem key={item.id} title={item.title} />),
      [data]
    );

    return (
      <View onLayout={handleWidth}>
        {Platform.OS === 'web' ? (
          <Input
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            style={{ width, marginVertical: 10 }}
            accessoryRight={renderIcon}
            onSubmitEditing={addAccount}
            ref={accountInput}
            status={isNotEmpty ? 'success' : 'danger'}
          />
        ) : (
          <Autocomplete
            value={value}
            onChangeText={onChangeText}
            onSelect={onSelect}
            placeholder={placeholder}
            style={{ width, marginVertical: 10 }}
            accessoryRight={renderIcon}
            onSubmitEditing={addAccount}
            ref={accountInput}
            status={isNotEmpty ? 'success' : 'danger'}>
            {renderOption}
          </Autocomplete>
        )}
      </View>
    );
  }
);
