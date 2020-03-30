import React, { useEffect } from "react";
import { TouchableOpacity, View, Image, AsyncStorage } from "react-native";
import { Layout, Button, Text, Input } from "@ui-kitten/components";

import { ScreenTemplate } from "../../components/ScreenTemplate";

import { THEME } from "../../themes/themes";
import { hideIconPassword, showIconPassword } from "../../themes/icons";

import { useDispatch, useSelector } from "react-redux";
import { authLogin, logout } from "../../store/actions/authAction";
import { getProfile } from "../../store/actions/profileAction";

import { LoadingSpinner } from "../../components/LoadingSpinner";

import { startLoader, endLoader } from ".././../store/actions/apiAction";

export const LoginScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const { isAuth, error: authError, loading: authLoading } = state.auth;
  const { profile, error: profileError } = state.profile;

  const [loader, setLoader] = React.useState(false);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [isVisiblePassword, setIsVisiblePassword] = React.useState(false);

  const checkLogIn = async () => {
    dispatch(startLoader());
    const token = await AsyncStorage.getItem("AUTH_TOKEN");
    if (token !== null) {
      try {
        await dispatch(getProfile());
      } catch (error) {
        await dispatch(logout());
      }

      if (authError === null && profileError === null) {
        profile !== undefined && profile.hasOwnProperty("company")
          ? profile.company !== null
            ? navigateHome()
            : navigateCompanyManager()
          : navigateCreateProfile();
      }
    }
    dispatch(endLoader());
  };

  const isAuthHandler = async () => {
    if (isAuth) {
      dispatch(startLoader());
      await dispatch(getProfile());
      dispatch(endLoader());
    }
  };

  useEffect(() => {
    checkLogIn();
  }, []);

  useEffect(() => {
    isAuthHandler();
  }, [isAuth]);

  useEffect(() => {
    if (isAuth) {
      profile !== undefined && profile.hasOwnProperty("company")
        ? profile.company !== null
          ? navigateHome()
          : navigateCompanyManager()
        : navigateCreateProfile();
    }
  }, [profile]);

  const onSubmit = async () => {
    dispatch(startLoader());
    await dispatch(authLogin(email, password));
    dispatch(endLoader());
  };

  const navigateHome = () => {
    navigation.navigate("Home");
  };

  const navigateCompanyManager = () => {
    navigation.navigate("CompanyManager");
  };

  const navigateCreateProfile = () => {
    navigation.navigate("CreateProfile");
  };

  const navigateRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <ScreenTemplate>
      {loader && <LoadingSpinner />}
      <Layout
        style={{
          flex: 1,
          justifyContent: "flex-start",
          alignItems: "center"
        }}
      >
        <View style={{ marginBottom: 50, marginTop: 70 }}>
          <Image
            style={{ width: 120, height: 120 }}
            source={{
              uri: "https://studwallet.herokuapp.com/static/logo192.png"
            }}
          />
        </View>
        <View
          style={{
            width: "85%",
            maxWidth: 720,
            manrginBottom: 25
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
              borderRadius: THEME.BUTTON_RADIUS
            }}
            onPress={onSubmit}
          >
            Войти
          </Button>
        </View>
        <TouchableOpacity onPress={navigateRegister}>
          <Text
            style={{
              marginVertical: 7,
              borderRadius: THEME.BUTTON_RADIUS,
              textDecorationLine: "underline"
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
              textDecorationLine: "underline"
            }}
          >
            Зарегистрироваться
          </Text>
        </TouchableOpacity>
      </Layout>
    </ScreenTemplate>
  );
};
