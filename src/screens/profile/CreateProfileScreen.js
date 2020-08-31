import React from "react";
import { Alert, View } from "react-native";
import {
  Layout,
  TopNavigation,
  TopNavigationAction,
  Input,
  Button,
} from "@ui-kitten/components";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/actions/authAction";

import { ScreenTemplate } from "../../components/ScreenTemplate";
import { THEME } from "../../themes/themes";

import { LogoutIcon } from "../../themes/icons";

import { createProfileAction } from "../../store/actions/apiAction";

export const CreateProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    setTimeout(() => {
      inputRef.current.focus();
    }, 100);
  }, []);

  const [first_name, setFirstName] = React.useState("");
  const [last_name, setLastName] = React.useState("");
  const [phone, setPhone] = React.useState("");

  const loader = useSelector((store) => store.api.loader);

  const onSuccess = (profile) => {
    navigation.navigate(profile.company !== null ? "Home" : "CompanyManager");
  };

  const onSubmit = () => {
    if (!loader) {
      const newProfile = {
        first_name,
        last_name,
        phone,
      };
      dispatch(createProfileAction(newProfile, onSuccess));
    }
  };

  const logoutHandler = async () => {
    dispatch(logout(navigation));
  };

  const navigateLogout = () => {
    Alert.alert(
      "Выход",
      "Вы уверены, что хотите выйти из учетной записи?",
      [
        {
          text: "Отмена",
          style: "cancel",
        },
        { text: "Выйти", onPress: logoutHandler },
      ],
      {
        cancelable: false,
      }
    );
  };

  const BackAction = () => (
    <TopNavigationAction icon={LogoutIcon} onPress={navigateLogout} />
  );

  return (
    <ScreenTemplate>
      <>
        <TopNavigation
          title="Создание профиля сотрудника"
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
                borderRadius: THEME.BUTTON_RADIUS,
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
