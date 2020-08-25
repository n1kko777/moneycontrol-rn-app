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
import { updateAccount } from "../../store/actions/accountAction";
import { Keyboard } from "react-native";

export const UpdateAccountScreen = ({ route, navigation }) => {
  const { account } = route.params;

  const dispatch = useDispatch();
  const { error: accountError } = useSelector((store) => store.account);

  const [account_name, setAccountName] = React.useState(account.account_name);
  const [balance, setBalance] = React.useState(account.balance);

  const navigateBack = () => {
    navigation.goBack(null);
  };
  const loader = useSelector((store) => store.api.loader);

  const onSubmit = async () => {
    if (!loader) {
      Keyboard.dismiss();
      dispatch(startLoader());

      try {
        await dispatch(
          updateAccount(account.id, {
            account_name,
            balance,
          })
        );
      } catch (error) {}

      if (accountError === null) {
        navigateBack();
      }

      dispatch(endLoader());
    }
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  return (
    <ScreenTemplate>
      <>
        <TopNavigation
          title="Обновление счета"
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
              Обновить
            </Button>
          </View>
        </Layout>
      </>
    </ScreenTemplate>
  );
};
