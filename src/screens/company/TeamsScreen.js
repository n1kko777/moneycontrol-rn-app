import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCompany } from "../../store/actions/companyAction";

import { useTheme, Layout } from "@ui-kitten/components";
import { ThemeContext } from "../../themes/theme-context";

import { Toolbar } from "../../components/navigation/Toolbar";
import { ScreenTemplate } from "../../components/ScreenTemplate";
import { LoadingSpinner } from "../../components/LoadingSpinner";

import { CompanyProfileList } from "../../components/company/CompanyProfileList";

import { startLoader, endLoader } from "../../store/actions/apiAction";

export const TeamsScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const themeContext = React.useContext(ThemeContext);
  const kittenTheme = useTheme();

  const state = useSelector(state => state);
  const { profile } = state.profile;
  const { company } = state.company;

  const companyProfileListData = company.profiles;

  const [loader, setLoader] = React.useState(false);

  const getDataHandler = async () => {
    dispatch(startLoader());
    await dispatch(getCompany());
    dispatch(endLoader());
  };

  return (
    <ScreenTemplate>
      {loader && <LoadingSpinner />}
      <Toolbar
        navigation={navigation}
        title={`${profile.is_admin ? "⭐️ " : ""}${company.company_name}`}
        getData={getDataHandler}
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
