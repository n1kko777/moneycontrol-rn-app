import React from "react";
import {
  Layout,
  TopNavigation,
  TopNavigationAction,
  Divider,
  Icon
} from "@ui-kitten/components";

import { ScreenTemplate } from "../../components/ScreenTemplate";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/actions/authAction";
import { Alert } from "react-native";

const LogoutIcon = style => <Icon {...style} name="logout" pack="assets" />;

export const SelectProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const navigateLogout = () => {
    Alert.alert(
      "Выход",
      "Вы уверены что хотите выйти из учетной записи?",
      [
        {
          text: "Отмена",
          style: "cancel"
        },
        { text: "Выйти", onPress: () => dispatch(logout(navigation)) }
      ],
      {
        cancelable: false
      }
    );
  };

  const BackAction = () => (
    <TopNavigationAction icon={LogoutIcon} onPress={navigateLogout} />
  );

  return (
    <ScreenTemplate>
      <>
        <TopNavigation
          title="Список профилей"
          alignment="center"
          leftControl={BackAction()}
        />
        <Divider />
        <Layout></Layout>
      </>
    </ScreenTemplate>
  );
};
