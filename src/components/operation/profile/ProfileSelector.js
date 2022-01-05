import React, { memo, useCallback, useMemo } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Autocomplete, AutocompleteItem, Icon } from '@ui-kitten/components';

export const ProfileSelector = memo(
  ({
    current,
    setCurrent,
    clearCurrent,
    profileData,
    isNotEmpty,
    navigation,
    placeholder = 'Укажите профиль',
  }) => {
    const profileInput = React.useRef(null);

    const [value, setValue] = React.useState(current !== null ? current.title : '');

    React.useEffect(() => {
      setValue(current !== null ? current.title : '');
    }, [current]);

    const [data, setData] = React.useState(profileData || []);

    const onSelect = useCallback(
      (item) => {
        setCurrent(data[item]);
      },
      [data, setCurrent],
    );

    const onChangeText = useCallback(
      (query) => {
        setValue(query);
        setData(
          (profileData || []).filter((item) =>
            item.title.toLowerCase().includes(query.toLowerCase()),
          ),
        );
        if (query.trim().length === 0 || (current !== null && query !== current.title)) {
          clearCurrent();
        }
      },
      [profileData, clearCurrent, current],
    );

    const clearInput = useCallback(() => {
      onChangeText('');
    }, [onChangeText]);

    const addProfile = useCallback(() => {
      profileInput.current.blur();
      const findIndex = data.findIndex((elAcc) =>
        new RegExp(value.toLowerCase(), 'i').test(elAcc.title.toLowerCase()),
      );

      if (findIndex !== -1) {
        onSelect(findIndex);
      } else if (value?.trim().length !== 0) {
        navigation.navigate('CreateProfile', { profile_name: value });
      } else {
        onChangeText('');
      }
    }, [data, navigation, onChangeText, onSelect, value]);

    const renderIcon = useCallback(
      (props) =>
        value?.trim().length !== 0 && (
          <TouchableWithoutFeedback onPress={current !== null ? clearInput : addProfile}>
            <Icon {...props} name={current !== null ? 'close' : 'plus-outline'} />
          </TouchableWithoutFeedback>
        ),
      [addProfile, clearInput, current, value],
    );

    const renderOption = useMemo(
      () =>
        data.map((item) => (
          <AutocompleteItem key={item.id} title={`${item.title}${item.is_admin ? ' ⭐️' : ''}`} />
        )),
      [data],
    );

    return (
      <Autocomplete
        value={value}
        onChangeText={onChangeText}
        onSelect={onSelect}
        placeholder={placeholder}
        style={{ marginVertical: 10 }}
        accessoryRight={value && renderIcon}
        onSubmitEditing={addProfile}
        ref={profileInput}
        status={isNotEmpty ? 'success' : 'danger'}
      >
        {renderOption}
      </Autocomplete>
    );
  },
);
