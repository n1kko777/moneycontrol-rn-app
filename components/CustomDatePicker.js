import { useTheme, Text } from '@ui-kitten/components';
import React, { memo, useCallback } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

import { getDisplayDate } from '../store/selectors';
import { CalendarIcon } from '../themes/icons';
import { ThemeContext } from '../themes/theme-context';

export const CustomDatePicker = memo(({ navigation }) => {
  const themeContext = React.useContext(ThemeContext);
  const kittenTheme = useTheme();

  const displayDate = useSelector(getDisplayDate);

  const onDateClick = useCallback(() => {
    if (navigation) {
      navigation.navigate('PeriodPicker');
    }
  }, [navigation]);

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center' }}
        onPress={onDateClick}>
        <CalendarIcon
          fill={kittenTheme[`color-primary-${themeContext.theme === 'light' ? 800 : 100}`]}
          style={{
            width: 22,
            height: 22,
          }}
        />
        <Text
          style={{
            marginTop: 1,
            marginLeft: 8,
          }}
          category="p1">
          {displayDate}
        </Text>
      </TouchableOpacity>
    </View>
  );
});
