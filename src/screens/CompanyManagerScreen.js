import React from "react";
import {
  Layout,
  TopNavigation,
  TopNavigationAction,
  Divider,
  Icon,
  Text,
  Button,
  Input
} from "@ui-kitten/components";

import { ScreenTemplate } from "../components/ScreenTemplate";
import { useDispatch } from "react-redux";
import { logout } from "../store/actions/authAction";
import { Alert } from "react-native";

const LogoutIcon = style => <Icon {...style} name="logout" pack="assets" />;

export const CompanyManagerScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [companyName, setCompanyName] = React.useState("");
  const [companyId, setCompanyId] = React.useState("");

  const logoutHandler = async () => {
    await dispatch(logout()).then(() => {
      navigation.navigate("Login");
    });
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
        <TopNavigation
          title="Управление компаниями"
          alignment="center"
          leftControl={BackAction()}
        />
        <Divider />
        <Layout
          style={{
            alignSelf: "center",
            width: "85%",
            maxWidth: 720,
            flex: 1,
            justifyContent: "flex-start",
            marginVertical: 8,
            marginTop: 170,
            marginHorizontal: 16
          }}
        >
          <Input
            placeholder="Название компании"
            value={companyName}
            onChangeText={setCompanyName}
            style={{ marginBottom: 15 }}
          />
          <Button>Создать компанию</Button>
          <Text style={{ marginVertical: 20, alignSelf: "center" }}>или</Text>
          <Input
            placeholder="Идентификатор компании"
            autoCapitalize="none"
            autoCompleteType="off"
            autoCorrect={false}
            value={companyId}
            onChangeText={setCompanyId}
            style={{ marginBottom: 15 }}
          />
          <Button status="info">Присоединиться</Button>
        </Layout>
      </>
    </ScreenTemplate>
  );
};
