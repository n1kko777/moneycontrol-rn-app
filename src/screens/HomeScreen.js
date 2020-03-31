import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  getDataDispatcher,
  startLoader,
  endLoader
} from "../store/actions/apiAction";
import { Layout, useTheme } from "@ui-kitten/components";

import { ThemeContext } from "../themes/theme-context";

import { ScreenTemplate } from "../components/ScreenTemplate";

import { BalanceComponent } from "../components/home/BalanceComponent";
import { HomeList } from "../components/home/HomeList";
import { Toolbar } from "../components/navigation/Toolbar";

import { ScrollView, View } from "react-native";

import { prepareHomeData } from "../prepareHomeData";
import { CustomDatePicker } from "../components/CustomDatePicker";

export const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const themeContext = React.useContext(ThemeContext);
  const kittenTheme = useTheme();

  const state = useSelector(state => state);

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

  const getData = async () => {
    dispatch(startLoader());
    await dispatch(getDataDispatcher()).then(() => {
      dispatch(endLoader());
    });
  };

  useEffect(() => {
    setTotalActions(
      parseFloat(
        actions.reduce((sum, nextAcc) => (sum += +nextAcc.action_amount), 0)
      )
    );
  }, [actions]);

  useEffect(() => {
    setTotalTransactions(
      parseFloat(
        transactions.reduce(
          (sum, nextAcc) => (sum += +nextAcc.transaction_amount),
          0
        )
      )
    );
  }, [transactions]);

  useEffect(() => {
    setTotalBalance(
      parseFloat(
        accounts.reduce((sum, nextAcc) => (sum += +nextAcc.balance), 0)
      )
    );
  }, [accounts]);

  useEffect(() => {
    getData();
  }, [dispatch]);

  const homeListData = prepareHomeData(
    profile,
    company,
    accounts,
    transactions,
    actions,
    transfer,
    categories,
    tags
  );

  return (
    <ScreenTemplate>
      <Layout
        style={{
          backgroundColor:
            kittenTheme[
              `color-basic-${themeContext.theme === "light" ? 200 : 900}`
            ]
        }}
      >
        <Toolbar
          title={`${profile.is_admin ? "⭐️ " : ""}${company.company_name}`}
          navigation={navigation}
          getData={getData}
        />
      </Layout>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor:
            kittenTheme[
              `color-basic-${themeContext.theme === "light" ? 200 : 900}`
            ]
        }}
      >
        <View onStartShouldSetResponder={() => true}>
          <BalanceComponent
            balance={totalBalance}
            transaction={totalTransactions}
            action={totalActions}
          />

          <CustomDatePicker />

          <HomeList dataList={homeListData} onRefresh={getData} />
        </View>
      </ScrollView>
    </ScreenTemplate>
  );
};
