import { Autocomplete, AutocompleteItem, Icon, Input } from '@ui-kitten/components';
import React, { memo, useCallback, useMemo } from 'react';
import { Platform, TouchableWithoutFeedback, View } from 'react-native';

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
    const [width, setWidth] = React.useState(400);
    const handleWidth = (event) => {
      const { width } = event.nativeEvent.layout;
      setWidth(width);
    };

    React.useEffect(() => {
      setValue(current !== null ? current.title : '');
    }, [current]);

    const [data, setData] = React.useState(profileData || []);

    React.useEffect(() => {
      setData(profileData || []);
    }, [profileData]);

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
          (profileData || []).filter((item) =>
            item.title.toLowerCase().includes(query.toLowerCase())
          )
        );
        if (query.trim().length === 0 || (current !== null && query !== current.title)) {
          clearCurrent();
        }
      },
      [profileData, clearCurrent, current]
    );

    const clearInput = useCallback(() => {
      onChangeText('');
    }, [onChangeText]);

    const addProfile = useCallback(() => {
      profileInput.current.blur();
      const normalizedValue = value.trim().toLowerCase();
      const match = (profileData || []).find((elAcc) =>
        elAcc.title.toLowerCase().includes(normalizedValue)
      );

      if (match !== undefined) {
        setCurrent(match);
      } else if (value?.trim().length !== 0) {
        navigation.navigate('CreateProfile', { profile_name: value });
      } else {
        onChangeText('');
      }
    }, [navigation, onChangeText, profileData, setCurrent, value]);

    const renderIcon = useCallback(
      (props) =>
        value?.trim().length !== 0 && (
          <TouchableWithoutFeedback onPress={current !== null ? clearInput : addProfile}>
            <Icon {...props} name={current !== null ? 'close' : 'plus-outline'} />
          </TouchableWithoutFeedback>
        ),
      [addProfile, clearInput, current, value]
    );

    const renderOption = useMemo(
      () =>
        data.map((item) => (
          <AutocompleteItem key={item.id} title={`${item.title}${item.is_admin ? ' ⭐️' : ''}`} />
        )),
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
            accessoryRight={value && renderIcon}
            onSubmitEditing={addProfile}
            ref={profileInput}
            status={isNotEmpty ? 'success' : 'danger'}
          />
        ) : (
          <Autocomplete
            value={value}
            onChangeText={onChangeText}
            onSelect={onSelect}
            placeholder={placeholder}
            style={{ width, marginVertical: 10 }}
            accessoryRight={value && renderIcon}
            onSubmitEditing={addProfile}
            ref={profileInput}
            status={isNotEmpty ? 'success' : 'danger'}>
            {renderOption}
          </Autocomplete>
        )}
      </View>
    );
  }
);
