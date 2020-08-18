import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { authSignUp } from "../../store/actions/authAction";

import {
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
  Input,
  Button,
} from "@ui-kitten/components";

import { ScreenTemplate } from "../../components/ScreenTemplate";
import { View } from "react-native";
import { THEME } from "../../themes/themes";
import {
  BackIcon,
  hideIconPassword,
  showIconPassword,
} from "../../themes/icons";

import { startLoader, endLoader } from "../../store/actions/apiAction";

export const RegisterScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { isRegister, error } = state.auth;

  useEffect(() => {
    if (error === null && isRegister) {
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword1("");
      setPassword2("");
      navigation.navigate("Login");
    }
  }, [isRegister]);

  const [first_name, setFirstName] = React.useState("");
  const [last_name, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password1, setPassword1] = React.useState("");
  const [password2, setPassword2] = React.useState("");
  const [isVisiblePassword1, setIsVisiblePassword1] = React.useState(false);
  const [isVisiblePassword2, setIsVisiblePassword2] = React.useState(false);

  const navigateBack = () => {
    navigation.goBack();
  };
  const loader = useSelector((store) => store.api.loader);

  const onSubmit = async () => {
    if (!loader) {
      dispatch(startLoader());
      await dispatch(
        authSignUp({
          first_name,
          last_name,
          email,
          password1,
          password2,
        })
      );
      dispatch(endLoader());
    }
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  return (
    <ScreenTemplate>
      <>
        <TopNavigation
          title="Регистрация"
          alignment="center"
          leftControl={BackAction()}
        />
        <Layout
          style={{
            flex: 1,
            marginTop: 30,
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "85%",
              maxWidth: 720,
              manrginBottom: 25,
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
              value={email}
              autoCapitalize="none"
              placeholder="Почта"
              autoCompleteType="email"
              keyboardType="email-address"
              onChangeText={setEmail}
              style={{ marginVertical: 10 }}
            />
            <Input
              value={password1}
              placeholder="Пароль"
              autoCompleteType="password"
              icon={!isVisiblePassword1 ? showIconPassword : hideIconPassword}
              onIconPress={() => setIsVisiblePassword1(!isVisiblePassword1)}
              secureTextEntry={!isVisiblePassword1}
              onChangeText={setPassword1}
              style={{ marginVertical: 10 }}
            />
            <Input
              value={password2}
              placeholder="Повторите пароль"
              autoCompleteType="password"
              icon={!isVisiblePassword2 ? showIconPassword : hideIconPassword}
              onIconPress={() => setIsVisiblePassword2(!isVisiblePassword2)}
              secureTextEntry={!isVisiblePassword2}
              onChangeText={setPassword2}
              style={{ marginVertical: 10 }}
            />
            <Button
              style={{
                marginVertical: 25,
                borderRadius: THEME.BUTTON_RADIUS,
              }}
              onPress={onSubmit}
            >
              Зарегистрироваться
            </Button>

            <Text
              style={{
                alignSelf: "center",
                fontSize: 14,
                textAlign: "center",
                opacity: 0.7,
              }}
            >
              Нажав кнопку "Зарегистрироваться", я соглашаюсь с условиями
              предоставления услуг и политикой конфиденциальности
            </Text>
          </View>
        </Layout>
      </>
    </ScreenTemplate>
  );
};
