import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "../screens/auth/LoginScreen";
import { RegisterScreen } from "../screens/auth/RegisterScreen";
import { CreateProfileScreen } from "../screens/profile/CreateProfileScreen";
import { CompanyManagerScreen } from "../screens/company/CompanyManagerScreen";

import { RootNavigator } from "./RootNavigator";
import { AccountScreen } from "../screens/account/AccountScreen";
import { CreateAccountScreen } from "../screens/account/CreateAccountScreen";
import { UpdateAccountScreen } from "../screens/account/UpdateAccountScreen";

const Stack = createStackNavigator();

const HomeNavigator = () => (
  <Stack.Navigator
    headerMode="none"
    screenOptions={{
      gestureEnabled: false,
      headerLeft: null,
    }}
    initialRouteName="Login"
  >
    <Stack.Screen name="Home" component={RootNavigator} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="CreateProfile" component={CreateProfileScreen} />
    <Stack.Screen name="CompanyManager" component={CompanyManagerScreen} />
    <Stack.Screen name="Account" component={AccountScreen} />
    <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
    <Stack.Screen name="UpdateAccount" component={UpdateAccountScreen} />
  </Stack.Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <HomeNavigator />
  </NavigationContainer>
);
