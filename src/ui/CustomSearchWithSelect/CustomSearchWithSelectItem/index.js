import React, { memo, useCallback } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, useTheme, Icon } from "@ui-kitten/components";

export const CustomSearchWithSelectItem = memo(({ text, onDelete }) => {
  const kittenTheme = useTheme();

  const { itemWrapper, iconStyle } = styles;
  const touchStyles = {
    ...itemWrapper,
    backgroundColor: kittenTheme["color-basic-500"],
  };
  const textStyles = {
    color: kittenTheme["color-basic-900"],
  };

  const onDeleteHandler = useCallback(() => onDelete(text), [text, onDelete]);

  return (
    <TouchableOpacity onPress={onDeleteHandler} style={touchStyles}>
      <Text style={textStyles}>{text}</Text>
      <Icon
        style={iconStyle}
        fill={kittenTheme["color-basic-900"]}
        name="close"
      />
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  itemWrapper: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginRight: 10,
    marginBottom: 10,
  },
  iconStyle: {
    width: 18,
    height: 18,
    marginTop: 3,
    marginLeft: 5,
  },
});
