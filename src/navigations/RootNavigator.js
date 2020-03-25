import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { HomeScreen } from "../screens/HomeScreen";
import { OperationsScreen } from "../screens/OperationsScreen";
import { TeamsScreen } from "../screens/TeamsScreen";
import { MenuScreen } from "../screens/MenuScreen";

import { BottomTabBar } from "../components/BottomTabBar";

const BottomTab = createBottomTabNavigator();

const TabNavigator = () => (
  <BottomTab.Navigator tabBar={props => <BottomTabBar {...props} />}>
    <BottomTab.Screen name="Home" component={HomeScreen} />
    <BottomTab.Screen name="Operation" component={OperationsScreen} />
    <BottomTab.Screen name="Add" component={HomeScreen} />
    <BottomTab.Screen name="Team" component={TeamsScreen} />
    <BottomTab.Screen name="Menu" component={MenuScreen} />
  </BottomTab.Navigator>
);

export const RootNavigator = () => <TabNavigator />;
