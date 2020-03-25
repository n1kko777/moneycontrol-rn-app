import React from "react";
import { View } from "react-native";
import { Text } from "@ui-kitten/components";
import { StyleSheet } from "react-native";

export const TeamsScreen = () => {
  return (
    <View style={styles.container}>
      <Text category="h2">Teams Screen</Text>
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
