import React, { useEffect } from "react";
import {
  Layout,
  Icon,
  TopNavigation,
  TopNavigationAction,
  useTheme,
  Modal,
  Spinner
} from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import { ThemeContext } from "../themes/theme-context";

import { ScreenTemplate } from "../components/ScreenTemplate";
import { BalanceComponent } from "../components/BalanceComponent";
import { MenuOptions } from "../components/MenuOptions";

import { useSelector, useDispatch } from "react-redux";
import { getCompany } from "../store/actions/companyAction";
import { getAccount } from "../store/actions/accountAction";
import { getTransaction } from "../store/actions/transactionAction";
import { getAction } from "../store/actions/actionAction";
import { getTransfer } from "../store/actions/transferAction";

import { getShortName } from "../getShortName";
import { HomeList } from "../components/HomeList";

const ProfileIcon = style => <Icon {...style} name="person-outline" />;

const ProfileAction = props => (
  <TopNavigationAction {...props} icon={ProfileIcon} />
);

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

  const renderMenuAction = () => (
    <MenuOptions navigation={navigation} getData={getData} />
  );

  const renderProfileAction = () => <ProfileAction onPress={() => {}} />;

  const renderModalElement = () => (
    <Layout level="3" style={styles.modalContainer}>
      <Spinner status="primary" />
    </Layout>
  );

  const allOpprations = [];
  const homeListData = [];

  if (company.profiles !== undefined) {
    transactions.length !== 0 &&
      allOpprations.push(
        ...transactions.map(elem => ({
          id: elem.last_updated,
          name: getShortName(
            company.profiles
              .find(
                elProf =>
                  accounts.find(acc => acc.id === elem.account).profile ==
                  elProf.match(/(\d+)/)[0]
              )
              .split(" (")[0]
          ),
          style: "color-danger-600",
          balance: elem.transaction_amount
        }))
      );

    actions.length !== 0 &&
      allOpprations.push(
        ...actions.map(elem => ({
          id: elem.last_updated,
          name: getShortName(
            company.profiles
              .find(
                elProf =>
                  accounts.find(acc => acc.id === elem.account).profile ==
                  elProf.match(/(\d+)/)[0]
              )
              .split(" (")[0]
          ),
          style: "color-success-600",
          balance: elem.action_amount
        }))
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
      <Modal
        backdropStyle={styles.backdrop}
        visible={
          companyLoading ||
          accountLoading ||
          transactionLoading ||
          actionLoading ||
          transferLoading
        }
      >
        {renderModalElement()}
      </Modal>
      <Layout
        style={{
          flex: 1,
          backgroundColor:
            kittenTheme[
              `color-basic-${themeContext.theme === "light" ? 200 : 900}`
            ]
        }}
      >
        <TopNavigation
          style={{ position: "relative", zIndex: 10, elevation: 5 }}
          title={`${profile.is_admin ? "⭐️ " : ""}${company.company_name}`}
          alignment="center"
          leftControl={renderProfileAction()}
          rightControls={renderMenuAction()}
        />
        <BalanceComponent
          balance={totalBalance}
          transaction={totalTransactions}
          action={totalActions}
        />
        <Layout
          style={{
            flex: 1,
            backgroundColor:
              kittenTheme[
                `color-basic-${themeContext.theme === "light" ? 200 : 900}`
              ]
          }}
        >
          <HomeList dataList={homeListData} onRefresh={getData} />
        </Layout>
      </Layout>
    </ScreenTemplate>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 256,
    padding: 16
  },
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    borderRadius: 10,
    padding: 16
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  }
});
