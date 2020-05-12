import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { useTheme, Layout, Button } from "@ui-kitten/components";
import { ThemeContext } from "../../themes/theme-context";

import { Toolbar } from "../../components/navigation/Toolbar";
import { ScreenTemplate } from "../../components/ScreenTemplate";

import { CompanyProfileList } from "../../components/company/CompanyProfileList";

import { View, Clipboard, Alert } from "react-native";
import { THEME } from "../../themes/themes";
import { startLoader, endLoader } from "../../store/actions/apiAction";
import { getCompany } from "../../store/actions/companyAction";
import { logout } from "../../store/actions/authAction";
import { getAccount } from "../../store/actions/accountAction";

export const TeamsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const themeContext = React.useContext(ThemeContext);
  const kittenTheme = useTheme();

  const state = useSelector((state) => state);
  const { profile } = state.profile;
  const { accounts } = state.account;
  const { company } = state.company;

  const companyProfileListData =
    company !== undefined && company.hasOwnProperty("profiles")
      ? profile !== null && profile.is_admin
        ? company.profiles.map((elem) => ({
            ...elem,
            balance: accounts
              .filter((acc) => acc.profile == elem.id)
              .reduce((sum, next) => (sum += +next.balance), 0),
          }))
        : company.profiles
      : [];

  const onCompanyRefresh = async () => {
    dispatch(startLoader());
    await dispatch(getCompany());
    await dispatch(getAccount());
    dispatch(endLoader());
  };

  const inviteToTeam = async () => {
    await Clipboard.setString(company.company_id);

    Alert.alert(
      "Идентификатор скопирован",
      "Отправьте код сотруднику.",
      [{ text: "OK" }],
      {
        cancelable: false,
      }
    );
  };

  React.useEffect(() => {
    if (company === undefined) {
      navigation.navigate("Login");
      dispatch(logout());
    }
  }, [company]);

  return (
    <ScreenTemplate>
      {company !== undefined && (
        <Toolbar
          navigation={navigation}
          title={`${profile !== null && profile.is_admin ? "⭐️ " : ""}${
            company.company_name
          }`}
        />
      )}
      <Layout
        style={{
          flex: 1,
          backgroundColor:
            kittenTheme[
              `color-basic-${themeContext.theme === "light" ? 200 : 900}`
            ],
        }}
      >
        <View
          style={{
            height: profile !== null && profile.is_admin ? 45 : 0,
            marginVertical: 20,
          }}
        >
          {profile !== null && profile.is_admin && (
            <Button
              onPress={inviteToTeam}
              style={{
                alignSelf: "center",
                paddingHorizontal: 20,
                borderRadius: THEME.BUTTON_RADIUS,
              }}
              status="info"
            >
              Добавить сотрудника
            </Button>
          )}
        </View>
        <Layout
          style={{ flex: 1, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
        >
          <CompanyProfileList
            onCompanyRefresh={onCompanyRefresh}
            dataList={companyProfileListData.sort((a, b) =>
              a.is_admin === b.is_admin ? 0 : a.is_admin ? -1 : 1
            )}
            navigation={navigation}
          />
        </Layout>
      </Layout>
    </ScreenTemplate>
  );
};
