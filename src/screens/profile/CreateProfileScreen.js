import React, { useEffect } from "react";
import { Alert, View } from "react-native";
import {
  Layout,
  TopNavigation,
  TopNavigationAction,
  Input,
  Button
} from "@ui-kitten/components";

import { useDispatch, useSelector } from "react-redux";
import { createProfile } from "../../store/actions/profileAction";
import { logout } from "../../store/actions/authAction";

import { ScreenTemplate } from "../../components/ScreenTemplate";
import { THEME } from "../../themes/themes";

import { LogoutIcon } from "../../themes/icons";

import { startLoader, endLoader } from "../../store/actions/apiAction";

export const CreateProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const profileStore = useSelector(store => store.profile);
  const { loading, profile } = profileStore;

  const [first_name, setFirstName] = React.useState("");
  const [last_name, setLastName] = React.useState("");
  const [phone, setPhone] = React.useState("");

  useEffect(() => {
    profile !== undefined &&
      profile.hasOwnProperty("company") &&
      navigation.navigate(profile.company !== null ? "Home" : "CompanyManager");
  }, [loading]);

  const onSubmit = async () => {
    dispatch(startLoader());
    const newProfile = {
      first_name,
      last_name,
      phone
    };
    await dispatch(createProfile(newProfile));
    dispatch(endLoader());
  };

  const logoutHandler = async () => {
    dispatch(startLoader());
    await dispatch(logout()).then(() => {
      dispatch(endLoader());
      navigation.navigate("Login");
    });
  };

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

  const BackAction = () => (
    <TopNavigationAction icon={LogoutIcon} onPress={navigateLogout} />
  );

  return (
    <ScreenTemplate>
      <>
        <TopNavigation
          title="Создание профиля сотрудника"
          alignment="center"
          leftControl={BackAction()}
        />
        <Layout
          style={{
            flex: 1,
            marginTop: 30,
            alignItems: "center"
          }}
        >
          <View
            style={{
              width: "85%",
              maxWidth: 720,
              manrginBottom: 25
            }}
          >
            <Input
              value={first_name}
              placeholder="Имя"
              onChangeText={setFirstName}
              autoCompleteType="name"
              style={{ marginVertical: 10 }}
            />
            <Input
              value={last_name}
              placeholder="Фамилия"
              autoCompleteType="name"
              onChangeText={setLastName}
              style={{ marginVertical: 10 }}
            />
            <Input
              value={phone}
              placeholder="Телефон"
              autoCompleteType="tel"
              keyboardType="phone-pad"
              onChangeText={setPhone}
              style={{ marginVertical: 10 }}
            />
            <Button
              style={{
                marginVertical: 25,
                borderRadius: THEME.BUTTON_RADIUS
              }}
              onPress={onSubmit}
            >
              Создать профиль
            </Button>
          </View>
        </Layout>
      </>
    </ScreenTemplate>
  );
};
