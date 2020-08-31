import React, { useEffect } from "react";
import { TouchableOpacity, View, Image, AsyncStorage } from "react-native";
import { Layout, Button, Text, Input } from "@ui-kitten/components";

import { ScreenTemplate } from "../../components/ScreenTemplate";

import { THEME } from "../../themes/themes";
import { hideIconPassword, showIconPassword } from "../../themes/icons";

import { connect } from "react-redux";

import {
  getProfileAction,
  authLoginAction,
} from ".././../store/actions/apiAction";
import { Keyboard } from "react-native";

const LoginScreen = ({
  navigation,
  loader,
  getProfileDispatch,
  authLoginDispatch,
}) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [isVisiblePassword, setIsVisiblePassword] = React.useState(false);

  const onSuccess = (profile) => {
    profile !== null
      ? profile.company !== null
        ? navigateHome()
        : navigateCompanyManager()
      : navigateCreateProfile();
  };

  const isAuthHandler = async () => {
    const token = await AsyncStorage.getItem("AUTH_TOKEN");
    if (token !== null) {
      getProfileDispatch(onSuccess);
    }
  };

  useEffect(() => {
    isAuthHandler();
  }, []);

  const onSubmit = () => {
    if (!loader) {
      authLoginDispatch(email, password, isAuthHandler);
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

const mapStateToProps = (store) => ({
  loader: store.api.loader,
});

const mapDispatchToProps = (dispatch) => ({
  getProfileDispatch: (onSuccess) => dispatch(getProfileAction(onSuccess)),
  authLoginDispatch: (email, password, isAuthHandler) =>
    dispatch(authLoginAction(email, password, isAuthHandler)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
