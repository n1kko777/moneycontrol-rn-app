import React from "react";
import { Text } from "@ui-kitten/components";

export const TdComponent = ({ text, bold }) => {
  return (
    <Text
      style={{
        flex: 1,
        textAlign: "center",
        padding: 10,
        fontWeight: bold ? "bold" : "normal",
      }}
    >
      {text}
    </Text>
  );
};
