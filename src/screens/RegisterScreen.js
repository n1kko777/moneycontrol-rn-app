import React from "react";
import {
  Divider,
  Icon,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction
} from "@ui-kitten/components";

import { ScreenTemplate } from "../components/ScreenTemplate";

const BackIcon = style => <Icon {...style} name="arrow-back" />;

export const RegisterScreen = ({ navigation }) => {
  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  return (
    <ScreenTemplate>
      <TopNavigation
        title="MyApp"
        alignment="center"
        leftControl={BackAction()}
      />
      <Divider />
      <Layout
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text category="h1">Register</Text>
      </Layout>
    </ScreenTemplate>
  );
};
