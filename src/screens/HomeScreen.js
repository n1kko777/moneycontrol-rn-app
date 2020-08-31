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

import { getDataDispatcher } from "../store/actions/apiAction";

export const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const themeContext = React.useContext(ThemeContext);
  const kittenTheme = useTheme();

  const store = useSelector((store) => store);

  const { startDate, endDate } = store.calendar;
  const { profile } = store.profile;
  const { company } = store.company;
  const { accounts } = store.account;
  const { transactions } = store.transaction;
  const { actions } = store.action;
  const { transfer } = store.transfer;
  const { categories } = store.category;
  const { tags } = store.tag;

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

  const [totalBalance, setTotalBalance] = React.useState(parseFloat(0));
  const [totalActions, setTotalActions] = React.useState(parseFloat(0));
  const [totalTransactions, setTotalTransactions] = React.useState(
    parseFloat(0)
  );

  useEffect(() => {
    setTotalActions(
      parseFloat(
        []
          .concat(...homeListData.map((elem) => elem.data))
          .filter((elem) => elem.type == "action")
          .reduce((sum, nextAcc) => (sum += +nextAcc.balance), 0)
      )
    );

    setTotalTransactions(
      parseFloat(
        []
          .concat(...homeListData.map((elem) => elem.data))
          .filter((elem) => elem.type == "transaction")
          .reduce((sum, nextAcc) => (sum += +nextAcc.balance), 0)
      )
    );
  }, [accounts, startDate, homeListData]);

  useEffect(() => {
    setTotalBalance(
      parseFloat(
        accounts.reduce((sum, nextAcc) => (sum += +nextAcc.balance), 0)
      )
    );
  }, [accounts, startDate]);

  const refreshData = () => {
    dispatch(getDataDispatcher(navigation));
  };

  React.useEffect(() => {
    refreshData();
  }, []);

  homeListData.isNavigate = true;

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
        {company !== undefined && (
          <Toolbar
            title={`${profile !== null && profile.is_admin ? "⭐️ " : ""}${
              company.company_name
            }`}
            navigation={navigation}
          />
        )}
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
            isAdmin={profile !== null && profile.is_admin}
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
