import React from "react";
import { Alert, View, StyleSheet } from "react-native";
import {
  Divider,
  Icon,
  Layout,
  TopNavigation,
  TopNavigationAction,
  Input,
  Button,
  Modal,
  Spinner
} from "@ui-kitten/components";

import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../store/actions/profileAction";
import { logout } from "../store/actions/authAction";

import { ScreenTemplate } from "../components/ScreenTemplate";
import { THEME } from "../themes/themes";

const LogoutIcon = style => <Icon {...style} name="logout" pack="assets" />;

export const CreateProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const profileStore = useSelector(store => store.profile);
  const { loading } = profileStore;

  const [first_name, setFirstName] = React.useState("");
  const [last_name, setLastName] = React.useState("");
  const [phone, setPhone] = React.useState("");

  const onSubmit = async () => {
    await dispatch(getProfile(navigation));
  };

  const renderModalElement = () => (
    <Layout level="3" style={styles.modalContainer}>
      <Spinner status="primary" />
    </Layout>
  );

  const logoutHandler = async () => {
    await dispatch(logout());
    navigation.navigate("Login");
  };

  const navigateLogout = () => {
    Alert.alert(
      "Выход",
      "Вы уверены что хотите выйти из учетной записи?",
      [
        {
          text: "Отмена",
          style: "cancel"
        },
        { text: "Выйти", onPress: logoutHandler }
      ],
      {
        cancelable: false
      }
    );
  };

  const BackAction = () => (
    <TopNavigationAction icon={LogoutIcon} onPress={navigateLogout} />
  );

  return (
    <ScreenTemplate>
      <>
        <Modal backdropStyle={styles.backdrop} visible={loading}>
          {renderModalElement()}
        </Modal>
        <TopNavigation
          title="Создание профиля сотрудника"
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
              width: "85%",
              maxWidth: 720,
              manrginBottom: 25
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
              value={phone}
              placeholder="Телефон"
              autoCompleteType="tel"
              keyboardType="phone-pad"
              onChangeText={setPhone}
              style={{ marginVertical: 10 }}
            />
            <Button
              style={{
                marginVertical: 25,
                borderRadius: THEME.BUTTON_RADIUS
              }}
              onPress={onSubmit}
            >
              Создать профиль
            </Button>
          </View>
        </Layout>
      </>
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
