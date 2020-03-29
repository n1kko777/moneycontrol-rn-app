import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getCompany } from "../store/actions/companyAction";
import { getAccount } from "../store/actions/accountAction";
import { getTransaction } from "../store/actions/transactionAction";
import { getAction } from "../store/actions/actionAction";
import { getTransfer } from "../store/actions/transferAction";
import { getCategory } from "../store/actions/categoryAction";

import { Layout, useTheme } from "@ui-kitten/components";

import { ThemeContext } from "../themes/theme-context";

import { ScreenTemplate } from "../components/ScreenTemplate";
import { LoadingSpinner } from "../components/LoadingSpinner";

import { BalanceComponent } from "../components/home/BalanceComponent";
import { HomeList } from "../components/home/HomeList";
import { Toolbar } from "../components/navigation/Toolbar";

import { getShortName } from "../getShortName";
import { ScrollView, View } from "react-native";

export const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const themeContext = React.useContext(ThemeContext);
  const kittenTheme = useTheme();

  const state = useSelector(state => state);
  const { profile } = state.profile;
  const { company, loading: companyLoading } = state.company;
  const { accounts, loading: accountLoading } = state.account;
  const { transactions, loading: transactionLoading } = state.transaction;
  const { actions, loading: actionLoading } = state.action;
  const { transfer, loading: transferLoading } = state.transfer;
  const { categories, loading: categoryLoading } = state.category;

  const [totalBalance, setTotalBalance] = React.useState(parseFloat(0));
  const [totalTransactions, setTotalTransactions] = React.useState(
    parseFloat(0)
  );
  const [totalActions, setTotalActions] = React.useState(parseFloat(0));

  const getData = async () => {
    await dispatch(getCompany());
    await dispatch(getAccount());
    await dispatch(getTransaction());
    await dispatch(getAction());
    await dispatch(getTransfer());
    await dispatch(getCategory());
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

  const allOpprations = [];
  const homeListData = [];

  if (company.profiles !== undefined) {
    transactions.length !== 0 &&
      allOpprations.push(
        ...transactions.map(elem => {
          const currentProfile = company.profiles.find(
            cProf =>
              cProf.accounts.find(
                cProfAcc =>
                  cProfAcc.split("pk=")[1].match(/(\d+)/)[0] == elem.account
              ) !== undefined
          );

          return {
            id: elem.last_updated,
            name: `${getShortName(
              `${currentProfile.first_name} ${currentProfile.last_name}`
            )}${currentProfile.is_admin ? " ⭐️" : ""}`,
            style: "color-danger-600",
            balance: elem.transaction_amount
          };
        })
      );

    actions.length !== 0 &&
      allOpprations.push(
        ...actions.map(elem => {
          const currentProfile = company.profiles.find(
            cProf =>
              cProf.accounts.find(
                cProfAcc =>
                  cProfAcc.split("pk=")[1].match(/(\d+)/)[0] == elem.account
              ) !== undefined
          );

          return {
            id: elem.last_updated,
            name: `${getShortName(
              `${currentProfile.first_name} ${currentProfile.last_name}`
            )}${currentProfile.is_admin ? " ⭐️" : ""}`,
            style: "color-success-600",
            balance: elem.action_amount
          };
        })
      );

    transfer.length !== 0 &&
      allOpprations.push(
        ...transfer.map(elem => ({
          id: elem.last_updated,
          name:
            getShortName(elem.from_profile.split(" (")[0]) +
            " => " +
            getShortName(elem.to_profile.split(" (")[0]),
          balance: elem.transfer_amount
        }))
      );

    accounts.length !== 0 &&
      homeListData.push({
        title: "Счета",
        data: accounts
          .filter(acc => acc.profile === profile.id)
          .map(elem => ({
            id: elem.id,
            name: elem.account_name,
            balance: elem.balance
          }))
      });

    categories.length !== 0 &&
      homeListData.push({
        title: "Категории",
        data: categories.map(elem => ({
          id: elem.id,
          name: elem.category_name,
          balance: ""
        }))
      });

    homeListData.push({
      title: "Теги",
      data: []
    });

    [...allOpprations].length !== 0 &&
      homeListData.push({
        title: "Последние операции",
        data: allOpprations
          .sort((a, b) => new Date(b.id) - new Date(a.id))
          .filter((el, index) => index < 15)
      });
  }

  return (
    <ScreenTemplate>
      <LoadingSpinner
        loading={
          companyLoading ||
          accountLoading ||
          transactionLoading ||
          actionLoading ||
          transferLoading ||
          categoryLoading
        }
      />
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
