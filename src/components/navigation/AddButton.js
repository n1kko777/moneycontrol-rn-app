import React from "react";
import { View, StyleSheet, Animated } from "react-native";
import * as Haptics from "expo-haptics";

import { Button, Text } from "@ui-kitten/components";

import {
  AddIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  ExchangeIcon
} from "../../themes/icons";

export const AddButton = ({ kittenTheme }) => {
  const mode = new Animated.Value(0);

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    Animated.sequence([
      Animated.timing(mode, {
        toValue: mode._value === 0 ? 1 : 0,
        duration: 200
      })
    ]).start();
  };

  const navigateHandlePress = () => {
    handlePress();

    console.log("navigate");
  };

  const earnX = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -94]
  });

  const earnY = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [-35, -100]
  });

  const exchangeX = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0]
  });

  const exchangeY = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [-35, -150]
  });

  const spendX = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 94]
  });

  const spendY = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [-35, -100]
  });

  const rotation = mode.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "45deg"]
  });

  const opacity = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1]
  });

  return (
    <View style={{ alignItems: "center" }}>
      <Animated.View
        style={{
          position: "absolute",
          left: earnX,
          top: earnY,
          alignItems: "center"
        }}
      >
        <Button
          status="success"
          style={styles.secondaryButton}
          icon={TrendingUpIcon}
          onPress={navigateHandlePress}
        />
        <Animated.View
          style={{
            opacity
          }}
        >
          <Text style={{ marginTop: 5 }} category="c1">
            Дооход
          </Text>
        </Animated.View>
      </Animated.View>
      <Animated.View
        style={{
          position: "absolute",
          left: exchangeX,
          top: exchangeY,
          alignItems: "center"
        }}
      >
        <Button
          status="info"
          style={styles.secondaryButton}
          icon={ExchangeIcon}
          onPress={navigateHandlePress}
        />
        <Animated.View
          style={{
            opacity
          }}
        >
          <Text style={{ marginTop: 5 }} category="c1">
            Перевод
          </Text>
        </Animated.View>
      </Animated.View>
      <Animated.View
        style={{
          position: "absolute",
          left: spendX,
          top: spendY,
          alignItems: "center"
        }}
      >
        <Button
          status="danger"
          style={styles.secondaryButton}
          icon={TrendingDownIcon}
          onPress={navigateHandlePress}
        />
        <Animated.View
          style={{
            opacity
          }}
        >
          <Text style={{ marginTop: 5 }} category="c1">
            Расход
          </Text>
        </Animated.View>
      </Animated.View>
      <Button
        onPress={handlePress}
        style={{
          ...styles.button,
          backgroundColor: kittenTheme["color-info-500"]
        }}
        icon={() => (
          <Animated.View
            style={{
              transform: [{ rotate: rotation }]
            }}
          >
            <AddIcon
              style={{ marginTop: -6, marginLeft: -6, width: 24, height: 24 }}
              fill="#fff"
            />
          </Animated.View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    borderRadius: 30,
    marginTop: -40
  },
  secondaryButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 48,
    height: 48,
    borderRadius: 24
  }
});
