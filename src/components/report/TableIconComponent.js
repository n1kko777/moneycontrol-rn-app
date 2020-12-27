import React, { memo } from "react";
import { View } from "react-native";

export const TableIconComponent = memo(({ colorTheme, IconName }) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
      }}
    >
      <IconName
        fill={colorTheme}
        style={{
          width: 24,
          height: 24,
        }}
      />
    </View>
  );
});
