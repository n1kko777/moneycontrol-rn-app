import React, { useEffect } from "react";
import {
  Layout,
  TopNavigation,
  TopNavigationAction,
  Text,
  Button,
  Input
} from "@ui-kitten/components";

import { ScreenTemplate } from "../../components/ScreenTemplate";
import { useDispatch, useSelector } from "react-redux";
import { createCompany } from "../../store/actions/companyAction";
import { updateProfile, getProfile } from "../../store/actions/profileAction";
import { logout } from "../../store/actions/authAction";
import { Alert } from "react-native";

import { LogoutIcon } from "../../themes/icons";

import { startLoader, endLoader } from "../../store/actions/apiAction";

export const CompanyManagerScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const store = useSelector(store => store);
  const {
    profile: profileStore,
    company: companyStore,
    auth: authUserStore
  } = store;

  const { isAuth } = authUserStore;
  const { profile } = profileStore;
  const { company } = companyStore;

  const [companyName, setCompanyName] = React.useState("");
  const [companyId, setCompanyId] = React.useState("");

  useEffect(() => {
    dispatch(endLoader());
    isAuth && profile.company !== null && navigation.navigate("Home");
  }, [company]);

  const logoutHandler = async () => {
    dispatch(endLoader());
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

  const createCompanyHandler = async () => {
    dispatch(startLoader());
    const company = { company_name: companyName };
    await dispatch(createCompany(company)).then(() => {
      dispatch(getProfile());
    });
    dispatch(endLoader());
  };

  const joinCompanyHandler = async () => {
    dispatch(startLoader());
    const teamProfile = JSON.parse(JSON.stringify(profile));
    teamProfile.company_identificator = companyId;
    await dispatch(updateProfile(teamProfile));
    dispatch(endLoader());
  };

  return (
    <ScreenTemplate>
      <>
        <TopNavigation
          title="Управление компаниями"
          alignment="center"
          leftControl={BackAction()}
        />
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
          <Button onPress={createCompanyHandler}>Создать компанию</Button>
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
          <Button onPress={joinCompanyHandler} status="info">
            Присоединиться
          </Button>
        </Layout>
      </>
    </ScreenTemplate>
  );
};
