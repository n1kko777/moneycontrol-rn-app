import React from "react";
import {
  Layout,
  TopNavigation,
  TopNavigationAction,
  Text,
  Button,
  Input,
} from "@ui-kitten/components";

import { ScreenTemplate } from "../../components/ScreenTemplate";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/actions/authAction";
import { Alert } from "react-native";

import { LogoutIcon, UpdateIcon } from "../../themes/icons";

import {
  createCompanyAction,
  getProfileAction,
} from "../../store/actions/apiAction";

export const CompanyManagerScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const store = useSelector((store) => store);
  const { profile: profileStore } = store;
  const { profile } = profileStore;

  const [companyName, setCompanyName] = React.useState("");

  const logoutHandler = async () => {
    dispatch(logout(navigation));
  };

  const navigateLogout = () => {
    Alert.alert(
      "Выход",
      "Вы уверены что хотите выйти из учетной записи?",
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

  const loader = useSelector((store) => store.api.loader);

  const onSuccessProfile = (successProfile) => {
    successProfile !== null
      ? successProfile.company !== null && navigation.navigate("Home")
      : navigation.navigate("CreateProfile");
  };

  const updateProfileHandler = () => {
    if (!loader) {
      dispatch(getProfileAction(onSuccessProfile));
    }
  };

  const RefreshProfileAction = () => (
    <TopNavigationAction icon={UpdateIcon} onPress={updateProfileHandler} />
  );

  const onSuccessCompany = (successCompany) => {
    successCompany !== null && navigation.navigate("Home");
  };

  const createCompanyHandler = () => {
    const company = { company_name: companyName };
    dispatch(createCompanyAction(company, onSuccessCompany));
  };

  return (
    <ScreenTemplate>
      <>
        <TopNavigation
          title="Управление компаниями"
          alignment="center"
          leftControl={BackAction()}
          rightControls={RefreshProfileAction()}
        />
        <Layout
          style={{
            alignSelf: "center",
            width: "85%",
            maxWidth: 720,
            flex: 1,
            justifyContent: "flex-start",
            marginVertical: 8,
            marginTop: 30,
            marginHorizontal: 16,
          }}
        >
          <Input
            placeholder="Название компании"
            value={companyName}
            onChangeText={setCompanyName}
            style={{ marginBottom: 15 }}
          />
          <Button onPress={createCompanyHandler}>Создать компанию</Button>
          <Text style={{ marginVertical: 20, alignSelf: "center" }}>или</Text>

          <Text style={{ marginBottom: 10 }} category="s1">
            Сообщите руководителю следующие данные:
          </Text>
          <Text category="label">ID профиля:</Text>
          <Text selectable={true} style={{ marginBottom: 15 }} category="h4">
            {profile !== null && profile.id}
          </Text>
          <Text category="label">Номер телефона:</Text>
          <Text selectable={true} style={{ marginBottom: 15 }} category="h4">
            {profile !== null && profile.phone}
          </Text>
        </Layout>
      </>
    </ScreenTemplate>
  );
};
