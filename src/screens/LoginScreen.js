import React from "react";
import { Layout, Button } from "@ui-kitten/components";

import { ScreenTemplate } from "../components/ScreenTemplate";

import { THEME } from "../themes/themes";

export const LoginScreen = ({ navigation }) => {
  const navigateHome = () => {
    navigation.navigate("Home");
  };

  const navigateRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <ScreenTemplate>
      <Layout
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Button
          style={{ marginVertical: 4, borderRadius: THEME.BUTTON_RADIUS }}
          onPress={navigateHome}
        >
          Войти
        </Button>
        <Button
          style={{ marginVertical: 4, borderRadius: THEME.BUTTON_RADIUS }}
          onPress={navigateRegister}
        >
          Register Screen
        </Button>
      </Layout>
    </ScreenTemplate>
  );
};
