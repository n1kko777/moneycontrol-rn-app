import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { resetPass } from "../../store/actions/authAction";

import {
  Layout,
  TopNavigation,
  TopNavigationAction,
  Input,
  Button,
} from "@ui-kitten/components";

import { ScreenTemplate } from "../../components/ScreenTemplate";
import { View } from "react-native";
import { THEME } from "../../themes/themes";
import { BackIcon } from "../../themes/icons";

import { startLoader, endLoader } from "../../store/actions/apiAction";

export const ResetPassword = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState("");

  const navigateBack = () => {
    navigation.goBack(null);
  };
  const loader = useSelector((store) => store.api.loader);

  const onSubmit = async () => {
    if (!loader) {
      dispatch(startLoader());
      await dispatch(
        resetPass({
          email,
        })
      );
      dispatch(endLoader());
      setEmail("");
    }
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  const inputRef = React.useRef(null);

  React.useEffect(() => {
    setTimeout(() => {
      inputRef.current.focus();
    }, 100);
  }, []);

  return (
    <ScreenTemplate>
      <>
        <TopNavigation
          title="Сброс пароля"
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
              value={email}
              autoCapitalize="none"
              placeholder="Почта"
              autoCompleteType="email"
              keyboardType="email-address"
              onChangeText={setEmail}
              style={{ marginVertical: 10 }}
            />
            <Button
              style={{
                marginVertical: 25,
                borderRadius: THEME.BUTTON_RADIUS,
              }}
              onPress={onSubmit}
            >
              Сбросить пароль
            </Button>
          </View>
        </Layout>
      </>
    </ScreenTemplate>
  );
};
