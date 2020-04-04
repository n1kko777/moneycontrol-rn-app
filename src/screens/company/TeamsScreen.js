import React from "react";
import { useSelector } from "react-redux";

import { useTheme, Layout, Button } from "@ui-kitten/components";
import { ThemeContext } from "../../themes/theme-context";

import { Toolbar } from "../../components/navigation/Toolbar";
import { ScreenTemplate } from "../../components/ScreenTemplate";

import { CompanyProfileList } from "../../components/company/CompanyProfileList";

import { View } from "react-native";
import { THEME } from "../../themes/themes";

export const TeamsScreen = ({ navigation }) => {
  const themeContext = React.useContext(ThemeContext);
  const kittenTheme = useTheme();

  const state = useSelector(state => state);
  const { profile } = state.profile;
  const { company } = state.company;

  const companyProfileListData = company.profiles;

  return (
    <ScreenTemplate>
      <Toolbar
        navigation={navigation}
        title={`${profile.is_admin ? "⭐️ " : ""}${company.company_name}`}
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
        <View style={{ height: profile.is_admin ? 40 : 0, marginVertical: 20 }}>
          {profile.is_admin && (
            <Button
              style={{
                alignSelf: "center",
                paddingHorizontal: 20,
                borderRadius: THEME.BUTTON_RADIUS
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
            dataList={companyProfileListData}
            isAdmin={profile.is_admin}
          />
        </Layout>
      </Layout>
    </ScreenTemplate>
  );
};
