import * as Haptics from 'expo-haptics';
import React, { memo, useCallback, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import { AddIcon, ExchangeIcon, TrendingDownIcon, TrendingUpIcon } from '../../themes/icons';
import { NavButton } from './NavButton';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    zIndex: 1000,
  },
  plusButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFC300',
  },
  navButton: {
    position: 'absolute',
    left: 6,
    top: 6,
  },
  hiddenView: {
    position: 'absolute',
    top: -width,
    left: 0,
    right: -height,
    bottom: 0,
  },
});

export const AddButton = memo(({ navigation }) => {
  const animation = useRef(new Animated.Value(0)).current;

  const [toggled, setToggle] = React.useState(false);

  const toggleHandler = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const toValue = toggled ? 0 : 1;

    Animated.spring(animation, {
      toValue,
      duration: 150,
      useNativeDriver: true,
    }).start();

    setToggle(!toggled);
  }, [animation, toggled]);

  const navigateHandlePress = useCallback(
    (navRoute = null) => {
      toggleHandler();

      if (navRoute !== null) {
        navigation.navigate(navRoute);
      }
    },
    [navigation, toggleHandler],
  );

  const onNavigateToCreateAction = useCallback(() => {
    toggleHandler();
    navigateHandlePress('CreateAction');
  }, [navigateHandlePress, toggleHandler]);

  const onNavigateToCreateTransfer = useCallback(() => {
    toggleHandler();
    navigateHandlePress('CreateTransfer');
  }, [navigateHandlePress, toggleHandler]);

  const onNavigateToCreateTransaction = useCallback(() => {
    toggleHandler();
    navigateHandlePress('CreateTransaction');
  }, [navigateHandlePress, toggleHandler]);

  const rotation = {
    transform: [
      {
        rotate: animation.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '45deg'],
        }),
      },
    ],
  };

  const earnAnim = {
    transform: [
      {
        translateX: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -95],
        }),
      },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -55],
        }),
      },
    ],
  };

  const transferAnim = {
    transform: [
      {
        translateX: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 0],
        }),
      },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -100],
        }),
      },
    ],
  };

  const spendAnim = {
    transform: [
      {
        translateX: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 95],
        }),
      },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -55],
        }),
      },
    ],
  };

  return (
    <>
      {toggled && <View style={styles.hiddenView} />}
      <View style={{ width: 60, height: 60, marginTop: -35 }}>
        <Animated.View style={[styles.navButton, earnAnim]}>
          <NavButton
            icon={TrendingUpIcon}
            onPress={onNavigateToCreateAction}
            opacityValue={toggled ? 1 : 0}
            status="success"
            name="Доход"
          />
        </Animated.View>

        <Animated.View style={[styles.navButton, transferAnim]}>
          <NavButton
            icon={ExchangeIcon}
            onPress={onNavigateToCreateTransfer}
            opacityValue={toggled ? 1 : 0}
            status="info"
            name="Перевод"
          />
        </Animated.View>

        <Animated.View style={[styles.navButton, spendAnim]}>
          <NavButton
            icon={TrendingDownIcon}
            onPress={onNavigateToCreateTransaction}
            opacityValue={toggled ? 1 : 0}
            status="danger"
            name="Расход"
          />
        </Animated.View>

        <TouchableOpacity onPress={toggleHandler} activeOpacity={1}>
          <View style={styles.plusButton}>
            <Animated.View style={[styles.button, rotation]}>
              <AddIcon fill="#6B0848" />
            </Animated.View>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
});
