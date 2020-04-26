import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { HomeScreen } from "../screens/HomeScreen";
import { TeamsScreen } from "../screens/company/TeamsScreen";
import { MenuScreen } from "../screens/MenuScreen";

import { BottomTabBar } from "../components/navigation/BottomTabBar";
import { OperationsScreen } from "../screens/operation/OperationsScreen";

const BottomTab = createBottomTabNavigator();

const TabNavigator = () => (
  <BottomTab.Navigator tabBar={(props) => <BottomTabBar {...props} />}>
    <BottomTab.Screen name="Home" component={HomeScreen} />
    <BottomTab.Screen name="Operation" component={OperationsScreen} />
    <BottomTab.Screen name="Add" component={HomeScreen} />
    <BottomTab.Screen name="Team" component={TeamsScreen} />
    <BottomTab.Screen name="Menu" component={MenuScreen} />
  </BottomTab.Navigator>
);

export const RootNavigator = () => <TabNavigator />;
