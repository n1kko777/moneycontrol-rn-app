import React from "react";
import { useTheme } from "@ui-kitten/components";

import { ThemeContext } from "../themes/theme-context";

import { Toolbar } from "../components/navigation/Toolbar";
import { ScreenTemplate } from "../components/ScreenTemplate";
import { BackIcon } from "../themes/icons";
import { View, ScrollView, RefreshControl } from "react-native";

import { useSelector, useDispatch } from "react-redux";

import {
  getDataDispatcher,
  startLoader,
  endLoader,
} from "../store/actions/apiAction";

import { ReportFilter } from "../components/report/ReportFilter";
import { ChartTransaction } from "../components/report/ChartTransaction";

import moment from "moment";

export const ReportScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const themeContext = React.useContext(ThemeContext);
  const kittenTheme = useTheme();

  const store = useSelector((state) => state);
  const { transactions } = store.transaction;

  const transPeriod = transactions
    .filter((oper) => moment(oper.last_updated).year() === moment().year())
    .reduce(
      (months, prevOper) =>
        months.includes(moment().month(prevOper.last_updated).format("MMM"))
          ? months
          : [...months, moment().month(prevOper.last_updated).format("MMM")],
      []
    );

  const chartTransactions = {
    title: "Расходы",
    labels: transPeriod,
    data: transPeriod.map((month) =>
      transactions
        .filter((oper) => moment(oper.last_updated).year() === moment().year())
        .filter(
          (oper) =>
            moment(oper.last_updated).month() ==
            moment().month(month).format("M") - 1
        )
    ),
    totalAmount: transactions
      .filter((oper) => moment(oper.last_updated).year() === moment().year())
      .reduce((oper, prev) => (oper += +prev.transaction_amount), 0),
  };

  const refreshData = async () => {
    dispatch(startLoader());
    await dispatch(getDataDispatcher());
    dispatch(endLoader());
  };

  return (
    <ScreenTemplate>
      <Toolbar
        navigation={navigation}
        title="Отчет"
        TargetIcon={BackIcon}
        onTarget={() => navigation.navigate("Home")}
        isMenu={false}
      />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={refreshData}
            tintColor="transparent"
          />
        }
        style={{
          flex: 1,
          backgroundColor:
            kittenTheme[
              `color-basic-${themeContext.theme === "light" ? 200 : 900}`
            ],
        }}
      >
        <View onStartShouldSetResponder={() => true}>
          <ReportFilter kittenTheme={kittenTheme} themeContext={themeContext} />
          <ChartTransaction
            kittenTheme={kittenTheme}
            themeContext={themeContext}
            transactions={chartTransactions}
          />
        </View>
      </ScrollView>
    </ScreenTemplate>
  );
};
