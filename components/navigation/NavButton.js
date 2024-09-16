import { Button, Text } from '@ui-kitten/components';
import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 15,
  },
  secondaryButton: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    width: 48,
    height: 48,
    borderRadius: 24,
    zIndex: 1,
  },
});

export const NavButton = memo(({ icon, opacityValue, status, name, onPress }) => (
  <TouchableOpacity onPress={onPress} activeOpacity={1}>
    <View>
      <Button status={status} style={styles.secondaryButton} accessoryLeft={icon} />

      <View style={{ opacity: opacityValue }}>
        <Text style={{ marginTop: 5, textAlign: 'center' }} category="c1">
          {name}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
));
