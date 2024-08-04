import { Text, useTheme, Icon } from '@ui-kitten/components';
import React, { memo, useCallback } from 'react';
import { TouchableOpacity } from 'react-native';

import styles from './styles';

export const CustomSearchWithSelectItem = memo(({ text, onDelete }) => {
  const kittenTheme = useTheme();

  const { itemWrapper, iconStyle } = styles;
  const touchStyles = {
    ...itemWrapper,
    backgroundColor: kittenTheme['color-basic-500'],
  };
  const textStyles = {
    color: kittenTheme['color-basic-900'],
  };

  const onDeleteHandler = useCallback(() => onDelete(text), [text, onDelete]);

  return (
    <TouchableOpacity onPress={onDeleteHandler} style={touchStyles}>
      <Text style={textStyles}>{text}</Text>
      <Icon style={iconStyle} fill={kittenTheme['color-basic-900']} name="close" />
    </TouchableOpacity>
  );
});
