import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getDataDispatcher } from "../store/actions/apiAction";
import { Layout, useTheme } from "@ui-kitten/components";

import { ThemeContext } from "../themes/theme-context";

import { ScreenTemplate } from "../components/ScreenTemplate";
import { LoadingSpinner } from "../components/LoadingSpinner";

import { BalanceComponent } from "../components/home/BalanceComponent";
import { HomeList } from "../components/home/HomeList";
import { Toolbar } from "../components/navigation/Toolbar";

import { ScrollView, View } from "react-native";

import { prepareHomeData } from "../prepareHomeData";

export const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const themeContext = React.useContext(ThemeContext);
  const kittenTheme = useTheme();

  const state = useSelector(state => state);

  const { loader } = state.api;
  const { profile, loading: profileLadoing } = state.profile;
  const { company, loading: companyLadoing } = state.company;
  const { accounts, loading: accountsLadoing } = state.account;
  const { transactions, loading: transactionsLadoing } = state.transaction;
  const { actions, loading: actionsLadoing } = state.action;
  const { transfer, loading: transferLadoing } = state.transfer;
  const { categories, loading: categoriesLadoing } = state.category;
  const { tags, loading: tagsLadoing } = state.tag;

  const [totalBalance, setTotalBalance] = React.useState(parseFloat(0));
  const [totalTransactions, setTotalTransactions] = React.useState(
    parseFloat(0)
  );
  const [totalActions, setTotalActions] = React.useState(parseFloat(0));

  const getData = () => {
    dispatch(getDataDispatcher());
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
      <LoadingSpinner loading={loader !== 0} />
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

          <HomeList dataList={homeListData} onRefresh={getData} />
        </View>
      </ScrollView>
    </ScreenTemplate>
  );
};
