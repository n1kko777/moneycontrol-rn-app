import React, { memo, useCallback } from "react";
import {
  Layout,
  TopNavigation,
  TopNavigationAction,
  Text,
  Button,
  Input,
} from "@ui-kitten/components";

import { useDispatch, useSelector } from "react-redux";
import { Alert } from "react-native";
import { ScreenTemplate } from "../../components/ScreenTemplate";
import { logout } from "../../store/actions/authAction";

import { LogoutIcon, UpdateIcon } from "../../themes/icons";

import {
  createCompanyAction,
  getProfileAction,
} from "../../store/actions/apiAction";
import { FlexibleView } from "../../components/FlexibleView";

export const CompanyManagerScreen = memo(({ navigation }) => {
  const dispatch = useDispatch();
  const profile = useSelector((store) => store.profile.profile);

  const [companyName, setCompanyName] = React.useState("");

  const logoutHandler = useCallback(() => {
    dispatch(logout(navigation));
  }, [dispatch, navigation]);

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
  }, [logoutHandler]);

  const BackAction = () => (
    <TopNavigationAction icon={LogoutIcon} onPress={navigateLogout} />
  );

  const loader = useSelector((store) => store.api.loader);

  const onSuccessProfile = useCallback(
    (successProfile) => {
      if (successProfile !== null) {
        if (successProfile.company !== null) {
          navigation.navigate("Home");
        }
      }
      navigation.navigate("CreateProfile");
    },
    [navigation]
  );

  const updateProfileHandler = useCallback(() => {
    if (!loader) {
      dispatch(getProfileAction(onSuccessProfile));
    }
  }, [dispatch, loader, onSuccessProfile]);

  const RefreshProfileAction = () => (
    <TopNavigationAction icon={UpdateIcon} onPress={updateProfileHandler} />
  );

  const onSuccessCompany = useCallback(
    (successCompany) => {
      if (successCompany !== null) {
        navigation.navigate("Home");
      }
    },
    [navigation]
  );

  const createCompanyHandler = useCallback(() => {
    const company = { company_name: companyName };
    dispatch(createCompanyAction(company, onSuccessCompany));
  }, [companyName, dispatch, onSuccessCompany]);

  return (
    <ScreenTemplate>
      <FlexibleView>
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
          <Text selectable style={{ marginBottom: 15 }} category="h4">
            {profile !== null && profile.id}
          </Text>
          <Text category="label">Номер телефона:</Text>
          <Text selectable style={{ marginBottom: 15 }} category="h4">
            {profile !== null && profile.phone}
          </Text>
        </Layout>
      </FlexibleView>
    </ScreenTemplate>
  );
});
