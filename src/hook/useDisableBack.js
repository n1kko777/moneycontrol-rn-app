import * as React from 'react';
import { BackHandler } from 'react-native';

export default function useDisableBack() {
  React.useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true);

    return () => {
      backHandler.remove();
    };
  }, []);

  return null;
}
