import React from "react";
import {
  Button,
  Divider,
  Layout,
  TopNavigation,
  Icon,
  TopNavigationAction
} from "@ui-kitten/components";
import { ThemeContext } from "../themes/theme-context";

import { ScreenTemplate } from "../components/ScreenTemplate";

import { THEME } from "../themes/themes";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/actions/authAction";
import { Alert } from "react-native";

const LogoutIcon = style => <Icon {...style} name="logout" pack="assets" />;

export const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const themeContext = React.useContext(ThemeContext);
  const state = useSelector(state => state);
  const { user } = state.auth;
  const { profile } = state.profile;
  console.log("HOME: profile :", profile);
  console.log("HOME: user :", user);

  const logoutHandler = async () => {
    await dispatch(logout()).then(() => {
      navigation.navigate("Login");
    });
  };

  const BackAction = () => (
    <TopNavigationAction icon={LogoutIcon} onPress={navigateLogout} />
  );

  const navigateLogout = () => {
    Alert.alert(
      "Выход",
      "Вы уверены что хотите выйти из учетной записи?",
      [
        {
          text: "Отмена",
          style: "cancel"
        },
        { text: "Выйти", onPress: logoutHandler }
      ],
      {
        cancelable: false
      }
    );
  };

  return (
    <ScreenTemplate>
      <>
        <TopNavigation
          title="Home"
          alignment="center"
          leftControl={BackAction()}
        />
        <Divider />
        <Layout
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Button
            style={{ marginVertical: 4, borderRadius: THEME.BUTTON_RADIUS }}
            onPress={themeContext.toggleTheme}
          >
            TOGGLE THEME
          </Button>
        </Layout>
      </>
    </ScreenTemplate>
  );
};
