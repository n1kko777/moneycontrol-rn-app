import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "../screens/auth/LoginScreen";
import { RegisterScreen } from "../screens/auth/RegisterScreen";
import { CreateProfileScreen } from "../screens/profile/CreateProfileScreen";
import { CompanyManagerScreen } from "../screens/company/CompanyManagerScreen";

import { RootNavigator } from "./RootNavigator";

const Stack = createStackNavigator();

const HomeNavigator = () => (
  <Stack.Navigator
    headerMode="none"
    screenOptions={{
      gestureEnabled: false
    }}
    initialRouteName="Login"
  >
    <Stack.Screen name="Home" component={RootNavigator} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="CreateProfile" component={CreateProfileScreen} />
    <Stack.Screen name="CompanyManager" component={CompanyManagerScreen} />
  </Stack.Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <HomeNavigator />
  </NavigationContainer>
);
