import React from "react";
import { SafeAreaView } from "react-native";
import { Button, Divider, Layout, TopNavigation } from "@ui-kitten/components";
import { ThemeContext } from "../themes/theme-context";

export const HomeScreen = ({ navigation }) => {
  const themeContext = React.useContext(ThemeContext);

  const navigateLogin = () => {
    navigation.navigate("Login");
  };

  const navigateRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title="MyApp" alignment="center" />
      <Divider />
      <Layout
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Button style={{ marginVertical: 4 }} onPress={navigateLogin}>
          Login Screen
        </Button>
        <Button style={{ marginVertical: 4 }} onPress={navigateRegister}>
          Register Screen
        </Button>

        <Button
          style={{ marginVertical: 4 }}
          onPress={themeContext.toggleTheme}
        >
          TOGGLE THEME
        </Button>
      </Layout>
    </SafeAreaView>
  );
};
