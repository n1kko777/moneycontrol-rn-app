import React, { memo, useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  Layout,
  TopNavigation,
  TopNavigationAction,
  Input,
  Button,
} from "@ui-kitten/components";

import { View, Keyboard } from "react-native";
import { ScreenTemplate } from "../../components/ScreenTemplate";
import { THEME } from "../../themes/themes";
import { BackIcon } from "../../themes/icons";

import { createAccountAction } from "../../store/actions/apiAction";
import { clearCurrentAccount } from "../../store/actions/accountAction";
import { getApiLoading } from "../../store/selectors";
import { FlexibleView } from "../../components/FlexibleView";

export const CreateAccountScreen = memo(({ navigation, route }) => {
  const prevItem = route.params;

  const dispatch = useDispatch();
  const loader = useSelector(getApiLoading);

  const [account_name, setAccountName] = React.useState(
    prevItem !== undefined ? prevItem.account_name : ""
  );
  const [balance, setBalance] = React.useState("0");

  const navigateBack = useCallback(() => {
    if (prevItem === undefined) {
      dispatch(clearCurrentAccount());
    }
    navigation.goBack(null);
  }, [dispatch, navigation, prevItem]);

  const onReset = useCallback(() => {
    setAccountName("");
    setBalance("");
    navigateBack();
  }, [navigateBack]);

  const onSubmit = useCallback(() => {
    if (!loader) {
      Keyboard.dismiss();

      dispatch(
        createAccountAction(
          {
            account_name,
            balance,
          },
          onReset
        )
      );
    }
  }, [account_name, balance, dispatch, loader, onReset]);

  const BackAction = useCallback(
    () => <TopNavigationAction icon={BackIcon} onPress={navigateBack} />,
    [navigateBack]
  );

  const inputRef = React.useRef(null);

  React.useEffect(() => {
    setTimeout(() => {
      inputRef.current.focus();
    }, 100);
  }, []);

  return (
    <ScreenTemplate>
      <FlexibleView>
        <TopNavigation
          title="Создание счета"
          alignment="center"
          accessoryLeft={BackAction}
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
      </FlexibleView>
    </ScreenTemplate>
  );
});
