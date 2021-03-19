import React, { memo, useCallback, useEffect } from "react";
import { TouchableOpacity, View, Image, Keyboard } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Clipboard from "expo-clipboard";
import { Layout, Button, Text, Input } from "@ui-kitten/components";

import { useDispatch, useSelector } from "react-redux";
import { ScreenTemplate } from "../../components/ScreenTemplate";

import { THEME } from "../../themes/themes";
import { hideIconPassword, showIconPassword } from "../../themes/icons";

import {
  getProfileAction,
  authLoginAction,
} from "../../store/actions/apiAction";
import { APP_VERSION } from "../../store/constants";
import { FlexibleView } from "../../components/FlexibleView";
import LogoIcon from "../../../assets/logo.png";
import { getApiLoading } from "../../store/selectors";

const LoginScreen = memo(({ navigation }) => {
  const dispatch = useDispatch();

  const loader = useSelector(getApiLoading);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [isVisiblePassword, setIsVisiblePassword] = React.useState(false);

  const copyToClipboard = useCallback(() => {
    Clipboard.setString(APP_VERSION);
  }, []);

  const navigateToScreen = useCallback(
    (name) => {
      Keyboard.dismiss();
      navigation.navigate(name);
    },
    [navigation]
  );

  const onSuccess = useCallback(
    (profile) => {
      if (profile !== null) {
        if (profile.company !== null) {
          navigateToScreen("Home");
          return;
        }

        navigateToScreen("CompanyManager");
        return;
      }
      navigateToScreen("CreateProfile");
    },
    [navigateToScreen]
  );

  const isAuthHandler = useCallback(async () => {
    const token = await AsyncStorage.getItem("AUTH_TOKEN");
    if (token !== null) {
      dispatch(getProfileAction(onSuccess));
    }
  }, [dispatch, onSuccess]);

  const onSubmit = useCallback(() => {
    if (!loader) {
      dispatch(authLoginAction(email, password, isAuthHandler));
    }
  }, [loader, dispatch, email, password, isAuthHandler]);

  useEffect(() => {
    isAuthHandler();
  }, [isAuthHandler]);

  const onNavigateToReset = useCallback(() => navigateToScreen("Reset"), [
    navigateToScreen,
  ]);

  const onNavigateToRegister = useCallback(() => navigateToScreen("Register"), [
    navigateToScreen,
  ]);

  return (
    <ScreenTemplate>
      <FlexibleView>
        <Layout
          style={{
            flex: 1,
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <View style={{ marginBottom: 50, marginTop: 70 }}>
            <Image style={{ width: 120, height: 120 }} source={LogoIcon} />
            <TouchableOpacity
              style={{ marginTop: 10, alignSelf: "center" }}
              onPress={copyToClipboard}
            >
              <Text style={{ opacity: 0.3, fontSize: 12 }}>
                Версия: {APP_VERSION}
              </Text>
            </TouchableOpacity>
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
          <TouchableOpacity onPress={onNavigateToReset}>
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
          <TouchableOpacity onPress={onNavigateToRegister}>
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
      </FlexibleView>
    </ScreenTemplate>
  );
});

export default LoginScreen;
