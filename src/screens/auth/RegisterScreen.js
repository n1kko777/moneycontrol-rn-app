import React, { memo, useCallback, useEffect, useState, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";

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

import { authSignUpAction } from "../../store/actions/apiAction";

export const RegisterScreen = memo(({ navigation }) => {
  const dispatch = useDispatch();
  const { loader } = useSelector((store) => store.api);

  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [isVisiblePassword1, setIsVisiblePassword1] = useState(false);
  const [isVisiblePassword2, setIsVisiblePassword2] = useState(false);

  const navigateBack = useCallback(() => {
    navigation.goBack(null);
  }, []);

  const onSuccess = useCallback(() => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword1("");
    setPassword2("");
    navigation.navigate("Login");
  }, []);

  const onSubmit = useCallback(() => {
    if (!loader) {
      dispatch(
        authSignUpAction(
          {
            first_name,
            last_name,
            email,
            password1,
            password2,
          },
          onSuccess
        )
      );
    }
  }, [first_name, last_name, email, password1, password2, loader]);

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  const inputRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      inputRef !== null &&
        inputRef.current !== null &&
        inputRef.current.focus();
    }, 100);
  }, []);

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
              ref={inputRef}
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
});
