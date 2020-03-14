import React from "react";
import {
  TouchableOpacity,
  View,
  Image,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { Layout, Button, Text, Input, Icon } from "@ui-kitten/components";

import { ScreenTemplate } from "../components/ScreenTemplate";

import { THEME } from "../themes/themes";

export const LoginScreen = ({ navigation }) => {
  const showIconPassword = style => <Icon name="eye-outline" {...style} />;
  const hideIconPassword = style => <Icon name="eye-off-outline" {...style} />;

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isVisiblePassword, setIsVisiblePassword] = React.useState(false);

  const navigateHome = () => {
    navigation.navigate("Home");
  };

  const navigateRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <ScreenTemplate>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
              width: "80%",
              maxWidth: 420,
              manrginBottom: 25
            }}
          >
            <Input
              value={email}
              placeholder="Почта"
              keyboardType="email-address"
              onChangeText={setEmail}
              style={{ marginVertical: 10 }}
            />
            <Input
              value={password}
              placeholder="Пароль"
              icon={!isVisiblePassword ? showIconPassword : hideIconPassword}
              onIconPress={() => setIsVisiblePassword(!isVisiblePassword)}
              secureTextEntry={!isVisiblePassword}
              onChangeText={setPassword}
              style={{ marginVertical: 10 }}
            />
            <Button
              style={{
                marginVertical: 15,
                borderRadius: THEME.BUTTON_RADIUS
              }}
              onPress={navigateHome}
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
              status="info"
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
              status="info"
            >
              Зарегистрироваться
            </Text>
          </TouchableOpacity>
        </Layout>
      </TouchableWithoutFeedback>
    </ScreenTemplate>
  );
};
