import React from "react";
import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Button, Text } from "@ui-kitten/components";

export const NavButton = ({
  coordinate,
  navigateHandlePress,
  icon,
  opacityValue,
  status,
  name,
}) => {
  return (
    <Animated.View
      style={
        (styles.overlay,
        {
          alignSelf: "center",
          transform: [coordinate],
        })
      }
    >
      <TouchableOpacity onPress={navigateHandlePress}>
        <Button status={status} style={styles.secondaryButton} icon={icon} />
      </TouchableOpacity>

      <View style={{ opacity: opacityValue }}>
        <Text style={{ marginTop: 5, textAlign: "center" }} category="c1">
          {name}
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginTop: 15,
  },
  secondaryButton: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    width: 48,
    height: 48,
    borderRadius: 24,
    zIndex: 1,
  },
});
