import React from "react";
import { View, StyleSheet, Animated } from "react-native";
import * as Haptics from "expo-haptics";

import { Button, Text } from "@ui-kitten/components";

import {
  AddIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  ExchangeIcon,
} from "../../themes/icons";
import { TouchableOpacity } from "react-native-gesture-handler";

export const AddButton = ({ navigation }) => {
  const mode = new Animated.Value(0);

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    Animated.sequence([
      Animated.timing(mode, {
        toValue: mode._value === 0 ? 1 : 0,
        duration: 150,
      }),
    ]).start();
  };

  const navigateHandlePress = (navRoute = null) => {
    handlePress();

    navRoute !== null && navigation.navigate(navRoute);
  };

  const earnX = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -89],
  });

  const earnY = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [-30, -100],
  });

  const exchangeX = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 5],
  });

  const exchangeY = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [-30, -150],
  });

  const spendX = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 89],
  });

  const spendY = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [-30, -100],
  });

  const rotation = mode.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "45deg"],
  });

  const opacity = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <View style={{ alignItems: "center" }}>
      <Animated.View
        style={{
          position: "absolute",
          left: earnX,
          top: earnY,
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => navigateHandlePress("CreateAction")}>
          <Button
            status="success"
            style={styles.secondaryButton}
            icon={TrendingUpIcon}
          />
        </TouchableOpacity>

        <Animated.View
          style={{
            opacity,
          }}
        >
          <Text style={{ marginTop: 5 }} category="c1">
            Доход
          </Text>
        </Animated.View>
      </Animated.View>
      <Animated.View
        style={{
          position: "absolute",
          left: exchangeX,
          top: exchangeY,
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => navigateHandlePress("CreateTransfer")}>
          <Button
            status="info"
            style={styles.secondaryButton}
            icon={ExchangeIcon}
          />
        </TouchableOpacity>

        <Animated.View
          style={{
            opacity,
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
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => navigateHandlePress("CreateTransaction")}
        >
          <Button
            style={styles.secondaryButton}
            status="danger"
            icon={TrendingDownIcon}
          />
        </TouchableOpacity>
        <Animated.View
          style={{
            opacity,
          }}
        >
          <Text style={{ marginTop: 5 }} category="c1">
            Расход
          </Text>
        </Animated.View>
      </Animated.View>
      <View
        style={{
          ...styles.button,
        }}
      >
        <TouchableOpacity
          onPress={handlePress}
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: "#FFC300",
            borderColor: "#FFC300",
          }}
          activeOpacity={1}
        >
          <Animated.View
            style={{
              transform: [{ rotate: rotation }],
            }}
          >
            <AddIcon style={{}} fill="#6B0848" />
          </Animated.View>
        </TouchableOpacity>
      </View>
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
    marginTop: -35,
    zIndex: 1000,
  },
  secondaryButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 48,
    height: 48,
    borderRadius: 24,
    zIndex: 1,
  },
});
