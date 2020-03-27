import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text, useTheme } from "@ui-kitten/components";

import { THEME, shadowProperty } from "../themes/themes";
import { ThemeContext } from "../themes/theme-context";

import { splitToDigits } from "../splitToDigits.js";

import {
  HideIconBalance,
  ShowIconBalance,
  IncreaseIcon,
  DecreaseIcon
} from "../themes/icons";

export const BalanceComponent = ({ balance, transaction, action }) => {
  const themeContext = React.useContext(ThemeContext);
  const kittenTheme = useTheme();

  const [isVisibleBalance, setIsVisibleBalance] = React.useState(true);

  if (balance !== 0) {
    balance = splitToDigits(balance.toString().replace(/\s/g, ""));
  }

  if (transaction !== 0) {
    transaction = splitToDigits(transaction.toString().replace(/\s/g, ""));
  }

  if (action !== 0) {
    action = splitToDigits(action.toString().replace(/\s/g, ""));
  }

  const toggleVisibleBalance = () => {
    setIsVisibleBalance(!isVisibleBalance);
  };

  return (
    <View
      style={{
        ...styles.balanceContainer,
        backgroundColor:
          kittenTheme[
            `color-basic-${themeContext.theme === "light" ? 100 : 800}`
          ]
      }}
    >
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 12, textAlign: "center" }}>Баланс счетов</Text>
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
              backgroundColor: kittenTheme["color-basic-600"]
            }}
          />
        )}
        <Button
          size="large"
          appearance="ghost"
          icon={!isVisibleBalance ? ShowIconBalance : HideIconBalance}
          onPress={toggleVisibleBalance}
        ></Button>
      </View>

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
                  color: kittenTheme["color-success-600"]
                }}
                category="h5"
              >
                {action} ₽
              </Text>
            ) : (
              <View
                style={{
                  ...styles.hideBalance,
                  width: 70,
                  marginVertical: 11,
                  backgroundColor: kittenTheme["color-basic-600"]
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
                  color: kittenTheme["color-danger-600"]
                }}
                category="h5"
              >
                {transaction} ₽
              </Text>
            ) : (
              <View
                style={{
                  ...styles.hideBalance,
                  width: 70,
                  marginVertical: 11,
                  backgroundColor: kittenTheme["color-basic-600"]
                }}
              />
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  balanceContainer: {
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    ...shadowProperty,
    marginBottom: 10,
    zIndex: 1
  },
  hideBalance: {
    minWidth: 50,
    height: 4
  },
  creaseItem: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  creaseButton: {
    width: 45,
    height: 45,
    borderRadius: THEME.BUTTON_RADIUS,
    marginRight: 10
  }
});
