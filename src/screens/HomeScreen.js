import React from "react";
import { SafeAreaView } from "react-native";
import { Button, Divider, Layout, TopNavigation } from "@ui-kitten/components";

export const HomeScreen = ({ navigation }) => {
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
        <Button onPress={navigateLogin}>Login Screen</Button>
        <Button onPress={navigateRegister}>Register Screen</Button>
      </Layout>
    </SafeAreaView>
  );
};
