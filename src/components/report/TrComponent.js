import React, { memo } from "react";
import { View } from "react-native";
import { Divider } from "@ui-kitten/components";

export const TrComponent = memo(({ children }) => {
  return (
    <>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        {children}
      </View>
      <Divider />
    </>
  );
});
