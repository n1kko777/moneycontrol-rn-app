import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { PeriodPickerScreen } from 'screens/PeriodPickerScreen';
import { AccountScreen } from 'screens/account/AccountScreen';
import { CreateAccountScreen } from 'screens/account/CreateAccountScreen';
import { UpdateAccountScreen } from 'screens/account/UpdateAccountScreen';
import LoginScreen from 'screens/auth/LoginScreen';
import { RegisterScreen } from 'screens/auth/RegisterScreen';
import { ResetPassword } from 'screens/auth/ResetPassword';
import { CategoryScreen } from 'screens/category/CategoryScreen';
import { CreateCategoryScreen } from 'screens/category/CreateCategoryScreen';
import { UpdateCategoryScreen } from 'screens/category/UpdateCategoryScreen';
import { ChangeCompanyNameScreen } from 'screens/company/ChangeCompanyNameScreen';
import { CompanyManagerScreen } from 'screens/company/CompanyManagerScreen';
import { CompanyMemberScreen } from 'screens/company/CompanyMemberScreen';
import { InviteMemberScreen } from 'screens/company/InviteMemberScreen';
import { CreateActionScreen } from 'screens/operation/CreateActionScreen';
import { CreateTransactionScreen } from 'screens/operation/CreateTransactionScreen';
import { CreateTransferScreen } from 'screens/operation/CreateTransferScreen';
import { FilterOperationScreen } from 'screens/operation/FilterOperationScreen';
import { CreateProfileScreen } from 'screens/profile/CreateProfileScreen';
import { ProfileScreen } from 'screens/profile/ProfileScreen';
import { CreateTagScreen } from 'screens/tag/CreateTagScreen';
import { TagScreen } from 'screens/tag/TagScreen';
import { UpdateTagScreen } from 'screens/tag/UpdateTagScreen';

import { RootNavigator } from './root';

const Stack = createStackNavigator();

export default function RootStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
          headerLeft: undefined,
        }}
        initialRouteName="Login">
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
    </NavigationContainer>
  );
}
