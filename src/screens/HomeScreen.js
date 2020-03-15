import React from "react";
import { Button, Divider, Layout, TopNavigation } from "@ui-kitten/components";
import { ThemeContext } from "../themes/theme-context";

import { ScreenTemplate } from "../components/ScreenTemplate";

import { THEME } from "../themes/themes";
import { useSelector } from "react-redux";

export const HomeScreen = ({ navigation }) => {
  const themeContext = React.useContext(ThemeContext);
  const state = useSelector(state => state);
  const { user } = state.auth;
  console.log("user :", user);

  return (
    <ScreenTemplate>
      <>
        <TopNavigation title="MyApp" alignment="center" />
        <Divider />
        <Layout
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Button
            style={{ marginVertical: 4, borderRadius: THEME.BUTTON_RADIUS }}
            onPress={themeContext.toggleTheme}
          >
            TOGGLE THEME
          </Button>
        </Layout>
      </>
    </ScreenTemplate>
  );
};
