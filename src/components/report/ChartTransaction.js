import React from "react";
import { View, Dimensions } from "react-native";
import { Text } from "@ui-kitten/components";
import { LineChart } from "react-native-chart-kit";
import { TableComponent } from "./TableComponent";
import { splitToDigits } from "../../splitToDigits";

const screenWidth = Dimensions.get("window").width - 32;

export const ChartTransaction = ({
  themeContext,
  kittenTheme,
  transactions,
  accountData,
}) => {
  return (
    <View
      style={{
        flex: 1,
        borderRadius: 10,
        marginHorizontal: 8,
        marginTop: 15,
        marginBottom: 30,
        padding: 8,
        backgroundColor:
          kittenTheme[
            `color-basic-${themeContext.theme === "light" ? 100 : 800}`
          ],
      }}
    >
      <Text category="h4">{transactions.title}</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text category="h5">{transactions.subtitle}:</Text>
        <Text category="h5">₽ {splitToDigits(transactions.totalAmount)}</Text>
      </View>

      <LineChart
        data={{
          labels: transactions.labels,
          datasets: [
            {
              data:
                transactions !== undefined && transactions.data.length !== 0
                  ? transactions.data.map(
                      (oper) =>
                        oper.reduce(
                          (sum, next) =>
                            sum + parseInt(next.transaction_amount),
                          0
                        ) / 1000
                    )
                  : [0],
            },
          ],
        }}
        yAxisSuffix="т."
        width={screenWidth} // from react-native
        height={220}
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundGradientFrom: kittenTheme[`color-danger-700`],
          backgroundGradientTo: kittenTheme[`color-danger-700`],
          decimalPlaces: 1, // optional, defaults
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 10,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#333",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 8,
        }}
      />

      <TableComponent
        colorTheme={
          kittenTheme[
            `color-basic-${themeContext.theme === "light" ? 1100 : 100}`
          ]
        }
        accountData={accountData}
        tableData={transactions.data}
      />
    </View>
  );
};
