import React, { memo, useCallback, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text, useTheme } from "@ui-kitten/components";

import { useSelector } from "react-redux";
import { THEME } from "../../themes/themes";
import { ThemeContext } from "../../themes/theme-context";

import { splitToDigits } from "../../splitToDigits";

import {
  HideIconBalance,
  ShowIconBalance,
  IncreaseIcon,
  DecreaseIcon,
} from "../../themes/icons";

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
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  creaseButton: {
    width: 45,
    height: 45,
    borderRadius: THEME.BUTTON_RADIUS,
    marginRight: 10,
  },
});

export const BalanceComponent = memo(({ balance = null }) => {
  const themeContext = React.useContext(ThemeContext);
  const kittenTheme = useTheme();

  const { profile, layout } = useSelector((store) => store);
  const { totalActions, totalTransactions } = layout;

  const isAdmin = profile.profile !== null && profile.profile.is_admin;

  const [isVisibleBalance, setIsVisibleBalance] = React.useState(true);

  if (balance !== null && balance !== 0) {
    balance = splitToDigits(balance.toString().replace(/\s/g, ""));
  }

  const action = splitToDigits(totalActions.toString().replace(/\s/g, ""));
  const transaction = splitToDigits(
    totalTransactions.toString().replace(/\s/g, "")
  );

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
        backgroundColor:
          kittenTheme[
            `color-basic-${themeContext.theme === "light" ? 100 : 800}`
          ],
      }}
    >
      {balance !== null ? (
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 12, textAlign: "center" }}>{`Баланс ${
            isAdmin ? "компании" : "счетов"
          }`}</Text>
          {isVisibleBalance ? (
            <Text
              style={{ fontWeight: "600", textAlign: "center" }}
              category="h2"
            >
              {balance} ₽
            </Text>
          ) : (
            <View
              style={{
                ...styles.hideBalance,
                marginVertical: 20,
                width: 100,
                backgroundColor: kittenTheme["color-basic-600"],
              }}
            />
          )}
          <Button
            size="large"
            appearance="ghost"
            icon={!isVisibleBalance ? ShowIconBalance : HideIconBalance}
            onPress={toggleVisibleBalance}
          />
        </View>
      ) : null}

      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <View style={styles.creaseItem}>
          <Button
            status="success"
            style={styles.creaseButton}
            icon={IncreaseIcon}
          />
          <View>
            <Text style={{ fontSize: 12 }}>Доход</Text>
            {isVisibleBalance ? (
              <Text
                style={{
                  fontWeight: "600",
                  color: kittenTheme["color-success-600"],
                  fontSize: FONT_SIZE,
                  lineHeight: FONT_SIZE * 1.45,
                }}
              >
                {action} ₽
              </Text>
            ) : (
              <View
                style={{
                  ...styles.hideBalance,
                  width: 70,
                  marginVertical: 11,
                  backgroundColor: kittenTheme["color-basic-600"],
                }}
              />
            )}
          </View>
        </View>
        <View style={styles.creaseItem}>
          <Button
            status="danger"
            style={styles.creaseButton}
            icon={DecreaseIcon}
          />
          <View>
            <Text style={{ fontSize: 12 }}>Расход</Text>
            {isVisibleBalance ? (
              <Text
                style={{
                  fontWeight: "600",
                  color: kittenTheme["color-danger-600"],
                  fontSize: FONT_SIZE,
                  lineHeight: FONT_SIZE * 1.45,
                }}
              >
                {transaction} ₽
              </Text>
            ) : (
              <View
                style={{
                  ...styles.hideBalance,
                  width: 70,
                  marginVertical: 11,
                  backgroundColor: kittenTheme["color-basic-600"],
                }}
              />
            )}
          </View>
        </View>
      </View>
    </View>
  );
});
