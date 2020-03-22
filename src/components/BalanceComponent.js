import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text, useTheme } from "@ui-kitten/components";

import { THEME } from "../themes/themes";
import { ThemeContext } from "../themes/theme-context";

import {
  HideIconBalance,
  ShowIconBalance,
  IncreaseIcon,
  DecreaseIcon
} from "../themes/icons";

const shadowProperty = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  elevation: 5
};

export const BalanceComponent = ({ balance, transaction }) => {
  const themeContext = React.useContext(ThemeContext);
  const kittenTheme = useTheme();

  const [isVisibleBalance, setIsVisibleBalance] = React.useState(true);

  const splitToDigits = str => {
    let parts = (str + "").split("."),
      main = parts[0],
      len = main.length,
      output = "",
      i = len - 1;

    while (i >= 0) {
      output = main.charAt(i) + output;
      if ((len - i) % 3 === 0 && i > 0) {
        output = " " + output;
      }
      --i;
    }

    if (parts[1]) {
      parts[1] = parts[1].slice(0, 3);
    }

    if (parts.length > 1) {
      output += "." + parts[1];
    }
    return output.slice(0, len + 4);
  };

  if (balance !== 0) {
    balance = splitToDigits(balance.toString().replace(/\s/g, ""));
  }

  if (transaction !== 0) {
    transaction = splitToDigits(transaction.toString().replace(/\s/g, ""));
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
                0,00 ₽
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
