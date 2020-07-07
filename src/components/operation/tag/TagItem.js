import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, useTheme, Icon } from "@ui-kitten/components";

export const TagItem = ({ text, deleteTag }) => {
  const kittenTheme = useTheme();

  const { itemWrapper } = styles;
  return (
    <TouchableOpacity
      onPress={() => deleteTag(text)}
      style={{
        ...itemWrapper,
        flexDirection: "row",
        backgroundColor: kittenTheme["color-basic-500"],
      }}
    >
      <Text
        style={{
          color: kittenTheme["color-basic-900"],
        }}
      >
        {text}
      </Text>
      <Icon
        style={{ width: 18, height: 18, marginTop: 3, marginLeft: 5 }}
        fill={kittenTheme["color-basic-900"]}
        name="close"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemWrapper: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginRight: 10,
    marginBottom: 10,
  },
});
