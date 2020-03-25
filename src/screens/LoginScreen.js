import React, { useEffect } from "react";
import {
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  AsyncStorage
} from "react-native";
import {
  Layout,
  Button,
  Text,
  Input,
  Spinner,
  Modal
} from "@ui-kitten/components";

import { ScreenTemplate } from "../components/ScreenTemplate";

import { THEME } from "../themes/themes";
import { hideIconPassword, showIconPassword } from "../themes/icons";

import { useDispatch, useSelector } from "react-redux";
import { authLogin } from "../store/actions/authAction";
import { getProfile } from "../store/actions/profileAction";

export const LoginScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const { isAuth, loading: authLoading } = state.auth;
  const { profile, loading: profileLoading } = state.profile;

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [isVisiblePassword, setIsVisiblePassword] = React.useState(false);

  const checkLogIn = async () => {
    const token = await AsyncStorage.getItem("AUTH_TOKEN");
    if (token !== null) {
      await dispatch(getProfile()).then(() => {
        profile !== undefined && profile.hasOwnProperty("company")
          ? profile.company !== null
            ? navigateHome()
            : navigateCompanyManager()
          : navigateCreateProfile();
      });
    }
  };

  useEffect(() => {
    checkLogIn();
  }, []);

  useEffect(() => {
    if (isAuth) {
      dispatch(getProfile());
    }
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
    await dispatch(authLogin(email, password));
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

  const renderModalElement = () => (
    <Layout level="3" style={styles.modalContainer}>
      <Spinner status="primary" />
    </Layout>
  );

  return (
    <ScreenTemplate>
      <Modal
        backdropStyle={styles.backdrop}
        visible={authLoading || profileLoading}
      >
        {renderModalElement()}
      </Modal>
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

const styles = StyleSheet.create({
  container: {
    minHeight: 256,
    padding: 16
  },
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    borderRadius: 10,
    padding: 16
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  }
});
