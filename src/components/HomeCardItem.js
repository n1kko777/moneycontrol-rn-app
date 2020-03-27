import React from "react";
import { splitToDigits } from "../splitToDigits";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text } from "@ui-kitten/components";

export const HomeCardItem = ({ name, amount }) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 8,
        paddingBottom: 5
      }}
    >
      <Text style={{ textDecorationLine: "underline" }} category="s1">
        {name}
      </Text>
      <Text>{splitToDigits(amount.toString())}</Text>
    </TouchableOpacity>
  );
};
