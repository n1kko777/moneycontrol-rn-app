import { Button, Text, useTheme } from '@ui-kitten/components';
import React, { memo, useCallback, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { splitToDigits } from 'utils';

import {
  getLayoutTotalActions,
  getLayoutTotalBalance,
  getLayoutTotalTransactions,
  getProfile,
} from '../../store/selectors';
import { HideIconBalance, ShowIconBalance, IncreaseIcon, DecreaseIcon } from '../../themes/icons';
import { ThemeContext } from '../../themes/theme-context';
import { THEME } from '../../themes/themes';

let FONT_SIZE = 22;
const styles = StyleSheet.create({
  balanceContainer: {
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 10,
    zIndex: 1,
  },
  hideBalance: {
    minWidth: 50,
    height: 4,
  },
  creaseItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  creaseButton: {
    width: 45,
    height: 45,
    borderRadius: THEME.BUTTON_RADIUS,
    marginRight: 10,
  },
});

export const BalanceComponent = memo(({ isBalance }) => {
  const themeContext = React.useContext(ThemeContext);
  const kittenTheme = useTheme();

  const totalActions = useSelector(getLayoutTotalActions);
  const totalTransactions = useSelector(getLayoutTotalTransactions);
  const profile = useSelector(getProfile);
  const balance = splitToDigits(useSelector(getLayoutTotalBalance));

  const isAdmin = profile !== null && profile.is_admin;

  const [isVisibleBalance, setIsVisibleBalance] = React.useState(true);

  const action = splitToDigits(totalActions);
  const transaction = splitToDigits(totalTransactions);

  useEffect(() => {
    if (totalActions > 1000000 || totalTransactions > 1000000) {
      FONT_SIZE = 20;
    } else {
      FONT_SIZE = 22;
    }
  }, [totalActions, totalTransactions]);

  const toggleVisibleBalance = useCallback(() => {
    setIsVisibleBalance(!isVisibleBalance);
  }, [isVisibleBalance]);

  return (
    <View
      style={{
        ...styles.balanceContainer,
        backgroundColor: kittenTheme[`color-basic-${themeContext.theme === 'light' ? 100 : 800}`],
      }}>
      {isBalance ? (
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 12, textAlign: 'center' }}>{`Баланс ${
            isAdmin ? 'компании' : 'счетов'
          }`}</Text>
          {isVisibleBalance ? (
            <Text style={{ fontWeight: '600', textAlign: 'center' }} category="h2">
              {balance} ₽
            </Text>
          ) : (
            <View
              style={{
                ...styles.hideBalance,
                marginVertical: 20,
                width: 100,
                backgroundColor: kittenTheme['color-basic-600'],
              }}
            />
          )}
          <Button
            size="large"
            appearance="ghost"
            accessoryLeft={!isVisibleBalance ? ShowIconBalance : HideIconBalance}
            onPress={toggleVisibleBalance}
          />
        </View>
      ) : null}

      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <View style={styles.creaseItem}>
          <Button status="success" style={styles.creaseButton} accessoryLeft={IncreaseIcon} />
          <View>
            <Text style={{ fontSize: 12 }}>Доход</Text>
            {isVisibleBalance ? (
              <Text
                style={{
                  fontWeight: '600',
                  color: kittenTheme['color-success-600'],
                  fontSize: FONT_SIZE,
                  lineHeight: FONT_SIZE * 1.45,
                }}>
                {action} ₽
              </Text>
            ) : (
              <View
                style={{
                  ...styles.hideBalance,
                  width: 70,
                  marginVertical: 11,
                  backgroundColor: kittenTheme['color-basic-600'],
                }}
              />
            )}
          </View>
        </View>
        <View style={styles.creaseItem}>
          <Button status="danger" style={styles.creaseButton} accessoryLeft={DecreaseIcon} />
          <View>
            <Text style={{ fontSize: 12 }}>Расход</Text>
            {isVisibleBalance ? (
              <Text
                style={{
                  fontWeight: '600',
                  color: kittenTheme['color-danger-600'],
                  fontSize: FONT_SIZE,
                  lineHeight: FONT_SIZE * 1.45,
                }}>
                {transaction} ₽
              </Text>
            ) : (
              <View
                style={{
                  ...styles.hideBalance,
                  width: 70,
                  marginVertical: 11,
                  backgroundColor: kittenTheme['color-basic-600'],
                }}
              />
            )}
          </View>
        </View>
      </View>
    </View>
  );
});
