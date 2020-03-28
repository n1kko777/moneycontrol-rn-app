import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCompany } from "../store/actions/companyAction";
import { useTheme, Layout } from "@ui-kitten/components";

import { Toolbar } from "../components/Toolbar";
import { ScreenTemplate } from "../components/ScreenTemplate";
import { ThemeContext } from "../themes/theme-context";
import { LoadingSpinner } from "../components/LoadingSpinner";

import { CompanyProfileList } from "../components/CompanyProfileList";

export const TeamsScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const themeContext = React.useContext(ThemeContext);
  const kittenTheme = useTheme();

  const state = useSelector(state => state);
  const { profile } = state.profile;
  const { company, loading: companyLoading } = state.company;

  const companyProfileListData = company.profiles;

  return (
    <ScreenTemplate>
      <LoadingSpinner loading={companyLoading} />
      <Toolbar
        navigation={navigation}
        title={`${profile.is_admin ? "⭐️ " : ""}${company.company_name}`}
        getData={async () => await dispatch(getCompany())}
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
        <CompanyProfileList
          dataList={companyProfileListData}
          isAdmin={profile.is_admin}
        />
      </Layout>
    </ScreenTemplate>
  );
};
