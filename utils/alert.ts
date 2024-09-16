import { Alert, Platform } from 'react-native';

// @ts-ignore
const alertPolyfill = (title, description, options, extra) => {
  const result = window.confirm([title, description].filter(Boolean).join('\n'));

  if (result) {
    // @ts-ignore
    const confirmOption = options.find(({ style }) => style !== 'cancel');
    confirmOption && confirmOption.onPress();
  } else {
    // @ts-ignore
    const cancelOption = options.find(({ style }) => style === 'cancel');
    cancelOption && cancelOption.onPress();
  }
};

export const alert = Platform.OS === 'web' ? alertPolyfill : Alert.alert;
