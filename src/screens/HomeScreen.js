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

const ProfileIcon = style => <Icon {...style} name="person-outline" />;

const ProfileAction = props => (
  <TopNavigationAction {...props} icon={ProfileIcon} />
);

export const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const themeContext = React.useContext(ThemeContext);
  const kittenTheme = useTheme();

  const state = useSelector(state => state);
  const { company, loading: companyLoading } = state.company;
  const { account, loading: accountLoading } = state.account;

  const [localLoading, setLocalLoading] = React.useState(
    companyLoading || accountLoading
  );

  const [totalBalance, setTotalBalance] = React.useState(parseFloat(0));

  const getData = async () => {
    await dispatch(getCompany());
    await dispatch(getAccount()).then(() => {
      setTotalBalance(
        parseFloat(
          account.reduce((sum, nextAcc) => (sum += +nextAcc.balance), 0)
        )
      );
    });
  };

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

  return (
    <ScreenTemplate>
      <Modal backdropStyle={styles.backdrop} visible={localLoading}>
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
          title={company.company_name}
          alignment="center"
          leftControl={renderProfileAction()}
          rightControls={renderMenuAction()}
        />
        <BalanceComponent balance={totalBalance} />
        <Layout
          style={{
            flex: 1,
            backgroundColor:
              kittenTheme[
                `color-basic-${themeContext.theme === "light" ? 200 : 900}`
              ],
            justifyContent: "center",
            alignItems: "center"
          }}
        ></Layout>
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
