import React from "react";

import { useDispatch, useSelector } from "react-redux";

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
import {
  createAccount,
  clearCurrentAccount,
} from "../../store/actions/accountAction";
import { Keyboard } from "react-native";

export const CreateAccountScreen = ({ navigation, route }) => {
  const prevItem = route.params;

  const dispatch = useDispatch();
  const { error: accountError } = useSelector((store) => store.account);
  const loader = useSelector((store) => store.api.loader);

  const [account_name, setAccountName] = React.useState(
    prevItem !== undefined ? prevItem.account_name : ""
  );
  const [balance, setBalance] = React.useState("0");

  const navigateBack = () => {
    prevItem === undefined && dispatch(clearCurrentAccount());
    navigation.goBack(null);
  };

  const onSubmit = async () => {
    if (!loader) {
      Keyboard.dismiss();
      dispatch(startLoader());

      try {
        await dispatch(
          createAccount({
            account_name,
            balance,
          })
        );

        if (accountError === null) {
          setAccountName("");
          setBalance("");
          navigateBack();
        }
      } catch (error) {}

      dispatch(endLoader());
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
          title="Создание счета"
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
              value={account_name}
              placeholder="Название счета"
              onChangeText={setAccountName}
              autoCompleteType="name"
              style={{ marginVertical: 10 }}
            />
            <Input
              value={balance}
              placeholder="Остаток на счете"
              keyboardType="decimal-pad"
              onChangeText={setBalance}
              style={{ marginVertical: 10 }}
            />
            <Button
              style={{
                marginVertical: 25,
                borderRadius: THEME.BUTTON_RADIUS,
              }}
              onPress={onSubmit}
            >
              Создать
            </Button>
          </View>
        </Layout>
      </>
    </ScreenTemplate>
  );
};
