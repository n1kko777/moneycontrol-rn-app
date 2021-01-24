import React, { memo, useCallback } from "react";
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

export const CompanyManagerScreen = memo(({ navigation }) => {
  const dispatch = useDispatch();
  const profile = useSelector((store) => store.profile.profile);

  const [companyName, setCompanyName] = React.useState("");

  const logoutHandler = useCallback(() => {
    dispatch(logout(navigation));
  }, []);

  const navigateLogout = useCallback(() => {
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
  }, []);

  const BackAction = () => (
    <TopNavigationAction icon={LogoutIcon} onPress={navigateLogout} />
  );

  const loader = useSelector((store) => store.api.loader);

  const onSuccessProfile = useCallback((successProfile) => {
    successProfile !== null
      ? successProfile.company !== null && navigation.navigate("Home")
      : navigation.navigate("CreateProfile");
  }, []);

  const updateProfileHandler = useCallback(() => {
    if (!loader) {
      dispatch(getProfileAction(onSuccessProfile));
    }
  }, [loader]);

  const RefreshProfileAction = () => (
    <TopNavigationAction icon={UpdateIcon} onPress={updateProfileHandler} />
  );

  const onSuccessCompany = useCallback((successCompany) => {
    successCompany !== null && navigation.navigate("Home");
  }, []);

  const createCompanyHandler = useCallback(() => {
    const company = { company_name: companyName };
    dispatch(createCompanyAction(company, onSuccessCompany));
  }, [companyName]);

  return (
    <ScreenTemplate>
      <>
        <TopNavigation
          title="Добавление компании"
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
});
