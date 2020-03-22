import React, { useEffect } from "react";
import {
  Layout,
  TopNavigation,
  TopNavigationAction,
  Divider,
  Text,
  Button,
  Input,
  Modal,
  Spinner
} from "@ui-kitten/components";

import { ScreenTemplate } from "../components/ScreenTemplate";
import { useDispatch, useSelector } from "react-redux";
import { createCompany } from "../store/actions/companyAction";
import { updateProfile, getProfile } from "../store/actions/profileAction";
import { logout } from "../store/actions/authAction";
import { Alert, StyleSheet } from "react-native";

import { LogoutIcon } from "../themes/icons";

export const CompanyManagerScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const store = useSelector(store => store);
  const {
    profile: profileStore,
    company: companyStore,
    auth: authUserStore
  } = store;
  const { isAuth } = authUserStore;
  const { profile, loading: profileLoading } = profileStore;
  const { company, loading: companyLoading } = companyStore;

  const [companyName, setCompanyName] = React.useState("");
  const [companyId, setCompanyId] = React.useState(
    "faee1dfe-e7f1-49a8-8424-dfc4e6190ef5"
  );

  useEffect(() => {
    isAuth && profile.company !== null && navigation.navigate("Home");
  }, [company]);

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

  const createCompanyHandler = async () => {
    const company = { company_name: companyName };
    await dispatch(createCompany(company)).then(() => {
      dispatch(getProfile());
    });
  };

  const joinCompanyHandler = async () => {
    const teamProfile = JSON.parse(JSON.stringify(profile));
    teamProfile.company_identificator = companyId;
    dispatch(updateProfile(teamProfile));
  };

  const renderModalElement = () => (
    <Layout level="3" style={styles.modalContainer}>
      <Spinner status="primary" />
    </Layout>
  );

  return (
    <ScreenTemplate>
      <>
        <Modal
          backdropStyle={styles.backdrop}
          visible={profileLoading || companyLoading}
        >
          {renderModalElement()}
        </Modal>
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
