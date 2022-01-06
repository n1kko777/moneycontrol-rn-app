import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/auth/LoginScreen';
import { ResetPassword } from '../screens/auth/ResetPassword';
import { RegisterScreen } from '../screens/auth/RegisterScreen';
import { CreateProfileScreen } from '../screens/profile/CreateProfileScreen';
import { CompanyMemberScreen } from '../screens/company/CompanyMemberScreen';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { CompanyManagerScreen } from '../screens/company/CompanyManagerScreen';
import { ChangeCompanyNameScreen } from '../screens/company/ChangeCompanyNameScreen';
import { InviteMemberScreen } from '../screens/company/InviteMemberScreen';

import { RootNavigator } from './RootNavigator';

import { AccountScreen } from '../screens/account/AccountScreen';
import { CreateAccountScreen } from '../screens/account/CreateAccountScreen';
import { UpdateAccountScreen } from '../screens/account/UpdateAccountScreen';
import { CategoryScreen } from '../screens/category/CategoryScreen';
import { CreateCategoryScreen } from '../screens/category/CreateCategoryScreen';
import { UpdateCategoryScreen } from '../screens/category/UpdateCategoryScreen';
import { TagScreen } from '../screens/tag/TagScreen';
import { CreateTagScreen } from '../screens/tag/CreateTagScreen';
import { UpdateTagScreen } from '../screens/tag/UpdateTagScreen';

import { CreateTransactionScreen } from '../screens/operation/CreateTransactionScreen';
import { FilterOperationScreen } from '../screens/operation/FilterOperationScreen';
import { CreateActionScreen } from '../screens/operation/CreateActionScreen';
import { CreateTransferScreen } from '../screens/operation/CreateTransferScreen';
import { PeriodPickerScreen } from '../screens/PeriodPickerScreen';

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
    <Stack.Screen name="Reset" component={ResetPassword} />
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="CreateProfile" component={CreateProfileScreen} />
    <Stack.Screen name="CompanyMember" component={CompanyMemberScreen} />
    <Stack.Screen name="CompanyManager" component={CompanyManagerScreen} />
    <Stack.Screen name="ChangeCompanyName" component={ChangeCompanyNameScreen} />
    <Stack.Screen name="InviteMember" component={InviteMemberScreen} />
    <Stack.Screen name="FilterOperation" component={FilterOperationScreen} />
    <Stack.Screen name="CreateTransaction" component={CreateTransactionScreen} />
    <Stack.Screen name="CreateAction" component={CreateActionScreen} />
    <Stack.Screen name="CreateTransfer" component={CreateTransferScreen} />
    <Stack.Screen name="Profile" component={ProfileScreen} />
    <Stack.Screen name="Account" component={AccountScreen} />
    <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
    <Stack.Screen name="UpdateAccount" component={UpdateAccountScreen} />
    <Stack.Screen name="Category" component={CategoryScreen} />
    <Stack.Screen name="CreateCategory" component={CreateCategoryScreen} />
    <Stack.Screen name="UpdateCategory" component={UpdateCategoryScreen} />
    <Stack.Screen name="Tag" component={TagScreen} />
    <Stack.Screen name="CreateTag" component={CreateTagScreen} />
    <Stack.Screen name="UpdateTag" component={UpdateTagScreen} />
    <Stack.Screen name="PeriodPicker" component={PeriodPickerScreen} />
  </Stack.Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <HomeNavigator />
  </NavigationContainer>
);
