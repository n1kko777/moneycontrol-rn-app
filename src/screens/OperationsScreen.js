import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "@ui-kitten/components";

export const OperationsScreen = () => {
  return (
    <View style={styles.container}>
      <Text category="h2">Operations Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
