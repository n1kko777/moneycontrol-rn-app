import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTheme, Layout } from "@ui-kitten/components";

import { Toolbar } from "../components/Toolbar";
import { ScreenTemplate } from "../components/ScreenTemplate";
import { ThemeContext } from "../themes/theme-context";
import { LoadingSpinner } from "../components/LoadingSpinner";

export const TeamsScreen = () => {
  const dispatch = useDispatch();

  const themeContext = React.useContext(ThemeContext);
  const kittenTheme = useTheme();

  const state = useSelector(state => state);
  const { profile } = state.profile;
  const { company, loading: companyLoading } = state.company;
  return (
    <ScreenTemplate>
      <LoadingSpinner loading={companyLoading} />
      <Toolbar
        title={`${profile.is_admin ? "⭐️ " : ""}${company.company_name}`}
        getData={() => {}}
      />
      <Layout
        style={{
          flex: 1,
          backgroundColor:
            kittenTheme[
              `color-basic-${themeContext.theme === "light" ? 200 : 900}`
            ]
        }}
      ></Layout>
    </ScreenTemplate>
  );
};
