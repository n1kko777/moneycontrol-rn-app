import React, { memo, useCallback, useState } from "react";
import { ScrollView, Dimensions } from "react-native";
const { height } = Dimensions.get("window");

export const FlexibleView = memo(({ children }) => {
  const [screenHeight, setScreenHeight] = useState(0);

  const onContentSizeChange = useCallback((contentWidth, contentHeight) => {
    // Save the content height in state
    setScreenHeight(contentHeight);
  }, []);
  const scrollEnabled = screenHeight > height;

  return (
    <ScrollView
      style={{ flex: 1 }}
      scrollEnabled={scrollEnabled}
      onContentSizeChange={onContentSizeChange}
    >
      {children}
    </ScrollView>
  );
});
