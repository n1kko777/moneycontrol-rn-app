import React from "react";
import { View, StyleSheet } from "react-native";
import Animated, { interpolate } from "react-native-reanimated";
import * as Haptics from "expo-haptics";

import {
  AddIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  ExchangeIcon,
} from "../../themes/icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTransition } from "react-native-redash";

import { NavButton } from "./NavButton";

export const AddButton = ({ navigation }) => {
  const [toggled, setToggle] = React.useState(false);

  const toggleHandler = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setToggle((prev) => !prev);
  };

  const transition = useTransition(toggled, { duration: 150 });
  const rotate = interpolate(transition, {
    inputRange: [0, 1],
    outputRange: [0, 0.785398],
  });

  const earnX = interpolate(transition, {
    inputRange: [0, 1],
    outputRange: [0, -94],
  });

  const earnY = interpolate(transition, {
    inputRange: [0, 1],
    outputRange: [0, -50],
  });

  const transferX = interpolate(transition, {
    inputRange: [0, 1],
    outputRange: [0, 0],
  });

  const transferY = interpolate(transition, {
    inputRange: [0, 1],
    outputRange: [-63, -160],
  });

  const spendX = interpolate(transition, {
    inputRange: [0, 1],
    outputRange: [0, 84],
  });

  const spendY = interpolate(transition, {
    inputRange: [0, 1],
    outputRange: [-136, -188],
  });

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setToggle((prev) => !prev);
  };

  const navigateHandlePress = (navRoute = null) => {
    handlePress();

    navRoute !== null && navigation.navigate(navRoute);
  };

  return (
    <View style={{ width: 60, height: 60, marginTop: -35 }}>
      <NavButton
        coordinate={{ translateX: earnX, translateY: earnY }}
        navigateHandlePress={() => navigateHandlePress("CreateAction")}
        icon={TrendingUpIcon}
        opacityValue={toggled ? 1 : 0}
        status="success"
        name="Доход"
      />
      <NavButton
        coordinate={{ translateX: transferX, translateY: transferY }}
        navigateHandlePress={() => navigateHandlePress("CreateTransfer")}
        icon={ExchangeIcon}
        opacityValue={toggled ? 1 : 0}
        status="info"
        name="Перевод"
      />
      <NavButton
        coordinate={{ translateX: spendX, translateY: spendY }}
        navigateHandlePress={() => navigateHandlePress("CreateTransaction")}
        icon={TrendingDownIcon}
        opacityValue={toggled ? 1 : 0}
        status="danger"
        name="Расход"
      />
      <View
        style={{
          ...styles.button,
        }}
      >
        <TouchableOpacity
          onPress={toggleHandler}
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
              transform: [{ rotate }],
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
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    borderRadius: 30,
    zIndex: 1000,
  },
});
