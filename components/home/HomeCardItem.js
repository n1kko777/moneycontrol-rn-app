import { Text } from '@ui-kitten/components';
import React, { memo, useCallback, useMemo } from 'react';
import { TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { splitToDigits } from 'utils';

import { getOperationAction } from '../../store/actions/apiAction';
import { getLayoutFilterParams } from '../../store/selectors';
import {
  CardIcon,
  ExchangeIcon,
  IncreaseIcon,
  DecreaseIcon,
  CategoryIcon,
  TagIcon,
} from '../../themes/icons';

const avaiableTypes = {
  account: CardIcon,
  category: CategoryIcon,
  tag: TagIcon,
  action: IncreaseIcon,
  transaction: DecreaseIcon,
  transfer: ExchangeIcon,
};

const IconHOC = (Component, kittenTheme, themeContext, style) => () => (
  <Component
    style={{ width: 20, height: 20 }}
    fill={kittenTheme[style || `color-primary-${themeContext.theme === 'light' ? 800 : 100}`]}
  />
);

export const HomeCardItem = memo(({ kittenTheme, themeContext, item, navigation }) => {
  const { id, name, balance, type, style } = item;

  const isOperation = ['action', 'transaction', 'transfer'].includes(type);

  const dispatch = useDispatch();
  const selectedFilterParams = useSelector(getLayoutFilterParams);

  const renderIconItem = useMemo(() => {
    if (avaiableTypes[type]) {
      const IconComponent = IconHOC(avaiableTypes[type], kittenTheme, themeContext, style);
      return <IconComponent />;
    }

    return null;
  }, [kittenTheme, style, themeContext, type]);

  const memoBalance = useMemo(
    () => type !== 'category' && type !== 'tag' && `${splitToDigits(balance)} ₽`,
    [balance, type]
  );

  const onItemPress = useCallback(() => {
    if (!isOperation) {
      navigation.navigate('Operation');
      const selectedFilters = selectedFilterParams !== null ? selectedFilterParams : {};

      selectedFilters[type] = [
        {
          index: 0,
          text: name,
          title: name,
          id,
        },
      ];

      dispatch(getOperationAction(selectedFilters));
    }
  }, [isOperation, navigation, selectedFilterParams, type, name, id, dispatch]);

  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 5,
      }}
      onPress={onItemPress}
      activeOpacity={isOperation ? 1 : 0.2}>
      {renderIconItem}
      <Text
        style={{
          flex: 1,
          fontSize: 16,
          marginRight: 'auto',
          marginLeft: 8,
          color:
            kittenTheme[style || `color-primary-${themeContext.theme === 'light' ? 800 : 100}`],
        }}
        ellipsizeMode="tail"
        numberOfLines={1}
        category="s1">
        {name}
      </Text>
      <Text
        style={{
          fontSize: 16,
          color:
            kittenTheme[style || `color-primary-${themeContext.theme === 'light' ? 800 : 100}`],
        }}>
        {memoBalance}
      </Text>
    </TouchableOpacity>
  );
});
