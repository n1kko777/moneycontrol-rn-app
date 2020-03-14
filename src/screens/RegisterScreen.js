import React from "react";
import {
  Divider,
  Icon,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
  Input,
  Button
} from "@ui-kitten/components";

import { ScreenTemplate } from "../components/ScreenTemplate";
import { View } from "react-native";
import { THEME } from "../themes/themes";

const BackIcon = style => <Icon {...style} name="arrow-back" />;

export const RegisterScreen = ({ navigation }) => {
  const mobilevalidate = text => {
    const reg = /^[0]?[789]\d{9}$/;
    if (reg.test(text) === false) {
      setIsPhoneValidate(false);
      setPhone(text);
    } else {
      setIsPhoneValidate(true);
      setPhone(text);
    }

    console.log("isPhoneValidate :", isPhoneValidate);
  };

  const navigateBack = () => {
    navigation.goBack();
  };

  const navigatePhone = () => {
    navigation.goBack();
  };

  const showIconPassword = style => <Icon name="eye-outline" {...style} />;
  const hideIconPassword = style => <Icon name="eye-off-outline" {...style} />;

  const [firstname, setFirstname] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [isPhoneValidate, setIsPhoneValidate] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password1, setPassword1] = React.useState("");
  const [password2, setPassword2] = React.useState("");
  const [isVisiblePassword1, setIsVisiblePassword1] = React.useState(false);
  const [isVisiblePassword2, setIsVisiblePassword2] = React.useState(false);

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
        <Divider />
        <Layout
          style={{
            flex: 1,
            marginTop: 30,
            alignItems: "center"
          }}
        >
          <View
            style={{
              width: "80%",
              maxWidth: 720,
              manrginBottom: 25
            }}
          >
            <Input
              value={firstname}
              placeholder="Имя"
              onChangeText={setFirstname}
              style={{ marginVertical: 10 }}
            />
            <Input
              value={lastname}
              placeholder="Фамилия"
              onChangeText={setLastname}
              style={{ marginVertical: 10 }}
            />
            <Input
              value={phone}
              placeholder="Телефон"
              keyboardType="phone-pad"
              onChangeText={mobilevalidate}
              style={{ marginVertical: 10 }}
            />
            <Input
              value={email}
              placeholder="Почта"
              keyboardType="email-address"
              onChangeText={setEmail}
              style={{ marginVertical: 10 }}
            />
            <Input
              value={password1}
              placeholder="Пароль"
              icon={!isVisiblePassword1 ? showIconPassword : hideIconPassword}
              onIconPress={() => setIsVisiblePassword1(!isVisiblePassword1)}
              secureTextEntry={!isVisiblePassword1}
              onChangeText={setPassword1}
              style={{ marginVertical: 10 }}
            />
            <Input
              value={password2}
              placeholder="Повторите пароль"
              icon={!isVisiblePassword2 ? showIconPassword : hideIconPassword}
              onIconPress={() => setIsVisiblePassword2(!isVisiblePassword2)}
              secureTextEntry={!isVisiblePassword2}
              onChangeText={setPassword2}
              style={{ marginVertical: 10 }}
            />
            <Button
              style={{
                marginVertical: 25,
                borderRadius: THEME.BUTTON_RADIUS
              }}
              onPress={navigatePhone}
            >
              Зарегистрироваться
            </Button>

            <Text
              style={{
                alignSelf: "flex-end",
                fontSize: 14,
                textAlign: "center",
                opacity: 0.7
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
