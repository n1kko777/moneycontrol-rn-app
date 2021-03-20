import React, {
  memo,
  useCallback,
  useEffect,
  useState,
  useRef,
  useMemo,
} from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  Icon,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
  Input,
  Button,
} from "@ui-kitten/components";

import { View, TouchableWithoutFeedback } from "react-native";
import { ScreenTemplate } from "../../components/ScreenTemplate";
import { FlexibleView } from "../../components/FlexibleView";
import { THEME } from "../../themes/themes";
import { BackIcon } from "../../themes/icons";

import { authSignUpAction } from "../../store/actions/apiAction";
import { getApiLoading } from "../../store/selectors";

export const RegisterScreen = memo(({ navigation }) => {
  const dispatch = useDispatch();
  const loader = useSelector(getApiLoading);

  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [isVisiblePassword1, setIsVisiblePassword1] = useState(false);
  const [isVisiblePassword2, setIsVisiblePassword2] = useState(false);

  const navigateBack = useCallback(() => {
    navigation.goBack(null);
  }, [navigation]);

  const onSuccess = useCallback(() => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword1("");
    setPassword2("");
    navigation.navigate("Login");
  }, [navigation]);

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
  }, [
    loader,
    dispatch,
    first_name,
    last_name,
    email,
    password1,
    password2,
    onSuccess,
  ]);

  const BackAction = useMemo(
    () => <TopNavigationAction icon={BackIcon} onPress={navigateBack} />,
    [navigateBack]
  );

  const inputRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      if (inputRef !== null && inputRef.current !== null) {
        inputRef.current.focus();
      }
    }, 100);
  }, []);

  const onToggleVisibilityIcon1 = useCallback(
    () => setIsVisiblePassword1(!isVisiblePassword1),
    [isVisiblePassword1]
  );

  const renderVisibilityIcon1 = useCallback(
    (props) => (
      <TouchableWithoutFeedback onPress={onToggleVisibilityIcon1}>
        <Icon
          {...props}
          name={isVisiblePassword1 ? "eye-off-outline" : "eye-outline"}
        />
      </TouchableWithoutFeedback>
    ),
    [isVisiblePassword1, onToggleVisibilityIcon1]
  );

  const onToggleVisibilityIcon2 = useCallback(
    () => setIsVisiblePassword2(!isVisiblePassword2),
    [isVisiblePassword2]
  );

  const renderVisibilityIcon2 = useCallback(
    (props) => (
      <TouchableWithoutFeedback onPress={onToggleVisibilityIcon2}>
        <Icon
          {...props}
          name={isVisiblePassword2 ? "eye-off-outline" : "eye-outline"}
        />
      </TouchableWithoutFeedback>
    ),
    [isVisiblePassword2, onToggleVisibilityIcon2]
  );

  return (
    <ScreenTemplate>
      <FlexibleView>
        <TopNavigation
          title="Регистрация"
          alignment="center"
          leftControl={BackAction}
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
              accessoryRight={renderVisibilityIcon1}
              secureTextEntry={!isVisiblePassword1}
              onChangeText={setPassword1}
              style={{ marginVertical: 10 }}
            />
            <Input
              value={password2}
              placeholder="Повторите пароль"
              autoCompleteType="password"
              accessoryRight={renderVisibilityIcon2}
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
              Нажав кнопку &quot;Зарегистрироваться&quot;, я соглашаюсь с
              условиями предоставления услуг и политикой конфиденциальности
            </Text>
          </View>
        </Layout>
      </FlexibleView>
    </ScreenTemplate>
  );
});
