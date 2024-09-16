import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import { BottomTabBar } from '../components/navigation/BottomTabBar';
import { HomeScreen } from '../screens/HomeScreen';
import { MenuScreen } from '../screens/MenuScreen';
import { TeamsScreen } from '../screens/company/TeamsScreen';
import { OperationsScreen } from '../screens/operation/OperationsScreen';

const BottomTab = createBottomTabNavigator();

const TabNavigator = () => (
  <BottomTab.Navigator
    screenOptions={{ headerShown: false }}
    tabBar={(props) => <BottomTabBar {...props} />}>
    <BottomTab.Screen name="Home" component={HomeScreen} />
    <BottomTab.Screen name="Operation" component={OperationsScreen} />
    <BottomTab.Screen name="Add" component={HomeScreen} />
    <BottomTab.Screen name="Team" component={TeamsScreen} />
    <BottomTab.Screen name="Menu" component={MenuScreen} />
  </BottomTab.Navigator>
);

export const RootNavigator = () => <TabNavigator />;
