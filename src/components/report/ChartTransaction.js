import React from "react";
import { View, Dimensions } from "react-native";
import { Text } from "@ui-kitten/components";
import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width - 32;

export const ChartTransaction = ({
  themeContext,
  kittenTheme,
  transactions,
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
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text category="h5">{transactions.title}:</Text>
        <Text category="h5">₽ {transactions.totalAmount}</Text>
      </View>

      <LineChart
        data={{
          labels: transactions.labels,
          datasets:
            transactions !== undefined
              ? transactions.data.map((oper) => ({
                  data: oper.map((elem) => parseInt(elem.transaction_amount)),
                }))
              : [],
        }}
        width={screenWidth} // from react-native
        height={220}
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 10,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 8,
        }}
      />
    </View>
  );
};
