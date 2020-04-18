import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { Layout, useTheme } from "@ui-kitten/components";

import { ThemeContext } from "../themes/theme-context";

import { ScreenTemplate } from "../components/ScreenTemplate";

import { BalanceComponent } from "../components/home/BalanceComponent";
import { HomeList } from "../components/home/HomeList";
import { Toolbar } from "../components/navigation/Toolbar";

import { ScrollView, View, RefreshControl } from "react-native";

import { prepareHomeData } from "../prepareHomeData";
import { CustomDatePicker } from "../components/CustomDatePicker";

import { filterArrayByDate } from "../filterArrayByDate";

import {
  getDataDispatcher,
  startLoader,
  endLoader,
} from "../store/actions/apiAction";

export const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const themeContext = React.useContext(ThemeContext);
  const kittenTheme = useTheme();

  const state = useSelector((state) => state);

  const { startDate, endDate } = state.calendar;
  const { profile } = state.profile;
  const { company } = state.company;
  const { accounts } = state.account;
  const { transactions } = state.transaction;
  const { actions } = state.action;
  const { transfer } = state.transfer;
  const { categories } = state.category;
  const { tags } = state.tag;

  const [totalBalance, setTotalBalance] = React.useState(parseFloat(0));
  const [totalTransactions, setTotalTransactions] = React.useState(
    parseFloat(0)
  );
  const [totalActions, setTotalActions] = React.useState(parseFloat(0));

  useEffect(() => {
    setTotalActions(
      parseFloat(
        filterArrayByDate(actions, startDate, endDate).reduce(
          (sum, nextAcc) => (sum += +nextAcc.action_amount),
          0
        )
      )
    );
  }, [actions, startDate]);

  useEffect(() => {
    setTotalTransactions(
      parseFloat(
        filterArrayByDate(transactions, startDate, endDate).reduce(
          (sum, nextAcc) => (sum += +nextAcc.transaction_amount),
          0
        )
      )
    );
  }, [transactions, startDate]);

  useEffect(() => {
    setTotalBalance(
      parseFloat(
        accounts.reduce((sum, nextAcc) => (sum += +nextAcc.balance), 0)
      )
    );
  }, [accounts, startDate]);

  const homeListData = prepareHomeData(
    profile,
    company,
    accounts,
    filterArrayByDate(transactions, startDate, endDate),
    filterArrayByDate(actions, startDate, endDate),
    filterArrayByDate(transfer, startDate, endDate),
    categories,
    tags
  );

  const refreshData = async () => {
    dispatch(startLoader());
    await dispatch(getDataDispatcher());
    dispatch(endLoader());
  };

  React.useEffect(() => {
    refreshData();
  }, []);

  return (
    <ScreenTemplate>
      <Layout
        style={{
          backgroundColor:
            kittenTheme[
              `color-basic-${themeContext.theme === "light" ? 200 : 900}`
            ],
        }}
      >
        <Toolbar
          title={`${profile !== null && profile.is_admin ? "⭐️ " : ""}${
            company.company_name
          }`}
          navigation={navigation}
        />
      </Layout>
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
          <BalanceComponent
            balance={totalBalance}
            transaction={totalTransactions}
            action={totalActions}
          />

          <View style={{ height: 30, marginVertical: 10 }}>
            <CustomDatePicker />
          </View>

          <HomeList navigation={navigation} dataList={homeListData} />
        </View>
      </ScrollView>
    </ScreenTemplate>
  );
};
