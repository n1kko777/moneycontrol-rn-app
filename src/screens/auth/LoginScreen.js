import React, { useEffect } from "react";
import { TouchableOpacity, View, Image, AsyncStorage } from "react-native";
import { Layout, Button, Text, Input } from "@ui-kitten/components";

import { ScreenTemplate } from "../../components/ScreenTemplate";

import { THEME } from "../../themes/themes";
import { hideIconPassword, showIconPassword } from "../../themes/icons";

import { useDispatch, useSelector } from "react-redux";
import { authLogin } from "../../store/actions/authAction";
import { getProfile } from "../../store/actions/profileAction";

import { startLoader, endLoader } from ".././../store/actions/apiAction";
import { Keyboard } from "react-native";

export const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { isAuth } = state.auth;
  const { profile } = state.profile;

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [isVisiblePassword, setIsVisiblePassword] = React.useState(false);

  const isAuthHandler = async () => {
    const token = await AsyncStorage.getItem("AUTH_TOKEN");
    if (token !== null) {
      dispatch(startLoader());
      await dispatch(getProfile());
      dispatch(endLoader());
    }
  };

  useEffect(() => {
    isAuthHandler();
  }, [dispatch, isAuth]);

  useEffect(() => {
    if (profile !== null) {
      profile.hasOwnProperty("company")
        ? profile.company !== null
          ? navigateHome()
          : navigateCompanyManager()
        : navigateCreateProfile();
    }
  }, [profile]);
  const loader = useSelector((store) => store.api.loader);

  const onSubmit = async () => {
    if (!loader) {
      dispatch(startLoader());
      await dispatch(authLogin(email, password));
      dispatch(endLoader());
    }
  };

  const navigateHome = () => {
    Keyboard.dismiss();
    navigation.navigate("Home");
  };

  const navigateCompanyManager = () => {
    Keyboard.dismiss();
    navigation.navigate("CompanyManager");
  };

  const navigateCreateProfile = () => {
    Keyboard.dismiss();
    navigation.navigate("CreateProfile");
  };

  const navigateRegister = () => {
    Keyboard.dismiss();
    navigation.navigate("Register");
  };

  const navigateReset = () => {
    Keyboard.dismiss();
    navigation.navigate("Reset");
  };

  return (
    <ScreenTemplate>
      <Layout
        style={{
          flex: 1,
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <View style={{ marginBottom: 50, marginTop: 70 }}>
          <Image
            style={{ width: 120, height: 120 }}
            source={require("../../../assets/logo.png")}
          />
        </View>
        <View
          style={{
            width: "85%",
            maxWidth: 720,
            manrginBottom: 25,
          }}
        >
          <Input
            value={email}
            autoCapitalize="none"
            placeholder="Почта"
            keyboardType="email-address"
            autoCompleteType="email"
            onChangeText={setEmail}
            style={{ marginVertical: 10 }}
          />
          <Input
            value={password}
            placeholder="Пароль"
            icon={!isVisiblePassword ? showIconPassword : hideIconPassword}
            onIconPress={() => setIsVisiblePassword(!isVisiblePassword)}
            secureTextEntry={!isVisiblePassword}
            autoCompleteType="password"
            onChangeText={setPassword}
            style={{ marginVertical: 10 }}
          />
          <Button
            style={{
              marginVertical: 25,
              borderRadius: THEME.BUTTON_RADIUS,
            }}
            onPress={onSubmit}
          >
            Войти
          </Button>
        </View>
        <TouchableOpacity onPress={navigateReset}>
          <Text
            style={{
              marginVertical: 7,
              borderRadius: THEME.BUTTON_RADIUS,
              textDecorationLine: "underline",
            }}
          >
            Забыли пароль?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateRegister}>
          <Text
            style={{
              marginVertical: 7,
              borderRadius: THEME.BUTTON_RADIUS,
              textDecorationLine: "underline",
            }}
          >
            Зарегистрироваться
          </Text>
        </TouchableOpacity>
      </Layout>
    </ScreenTemplate>
  );
};
