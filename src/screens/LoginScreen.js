import React, { useEffect } from "react";
import { TouchableOpacity, View, Image, StyleSheet } from "react-native";
import {
  Layout,
  Button,
  Text,
  Input,
  Icon,
  Spinner,
  Modal
} from "@ui-kitten/components";

import { ScreenTemplate } from "../components/ScreenTemplate";

import { THEME } from "../themes/themes";
import { useDispatch, useSelector } from "react-redux";
import { authLogin } from "../store/actions/authAction";

export const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const { user, isAuth, loading } = state.auth;
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  useEffect(() => {
    isAuth === true && navigateSelectProfile();
  }, [isAuth]);

  useEffect(() => {
    setEmail(user.email);
    setPassword(user.password);
  }, [user.email]);

  const showIconPassword = style => <Icon name="eye-outline" {...style} />;
  const hideIconPassword = style => <Icon name="eye-off-outline" {...style} />;

  const [isVisiblePassword, setIsVisiblePassword] = React.useState(false);

  const onSubmit = async () => {
    await dispatch(authLogin(email, password));
  };

  const navigateSelectProfile = () => {
    navigation.navigate("SelectProfile");
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
      <Modal backdropStyle={styles.backdrop} visible={loading}>
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
            width: "80%",
            maxWidth: 720,
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
