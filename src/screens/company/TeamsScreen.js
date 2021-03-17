import React, { memo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useTheme, Layout, Button } from "@ui-kitten/components";
import { View } from "react-native";
import { ThemeContext } from "../../themes/theme-context";

import { Toolbar } from "../../components/navigation/Toolbar";
import { ScreenTemplate } from "../../components/ScreenTemplate";

import { CompanyProfileList } from "../../components/company/CompanyProfileList";

import { THEME } from "../../themes/themes";
import { EditIcon, ProfileIcon } from "../../themes/icons";
import { getDataDispatcher } from "../../store/actions/apiAction";

export const TeamsScreen = memo(({ navigation }) => {
  const dispatch = useDispatch();
  const themeContext = React.useContext(ThemeContext);
  const kittenTheme = useTheme();

  const store = useSelector((elStore) => elStore);
  const { profile } = store.profile;
  const { accounts } = store.account;
  const { company } = store.company;

  const companyProfileListData = useCallback(() => {
    const innerListData = () => {
      if (company !== null && "profiles" in company) {
        if (profile !== null && profile.is_admin) {
          return company.profiles.map((elem) => ({
            ...elem,
            balance: accounts
              .filter((acc) => acc.profile === elem.id)
              .reduce((sum, next) => sum + +next.balance, 0),
          }));
        }
        return company.profiles;
      }
      return [];
    };

    return innerListData().sort((a, b) => {
      if (a.is_admin === b.is_admin) {
        return 0;
      }
      if (a.is_admin) {
        return -1;
      }

      return 1;
    });
  }, [accounts, company, profile]);

  const companyList = companyProfileListData();

  const onCompanyRefresh = useCallback(() => {
    dispatch(getDataDispatcher(navigation));
  }, [dispatch, navigation]);

  const inviteToTeam = useCallback(() => {
    navigation.navigate("InviteMember");
  }, [navigation]);

  const onEditCompanyName = useCallback(() => {
    navigation.navigate("ChangeCompanyName");
  }, [navigation]);

  return (
    <ScreenTemplate>
      {company !== null && (
        <Toolbar
          navigation={navigation}
          TargetIcon={
            profile !== null && profile.is_admin ? EditIcon : ProfileIcon
          }
          onTarget={
            profile !== null && profile.is_admin
              ? onEditCompanyName
              : () => {
                  navigation.navigate("Profile");
                }
          }
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
            dataList={companyList}
            navigation={navigation}
          />
        </Layout>
      </Layout>
    </ScreenTemplate>
  );
});
