import React, { memo, useCallback, useMemo } from "react";
import { Keyboard, View } from "react-native";

import { useDispatch, useSelector } from "react-redux";

import {
  Layout,
  TopNavigation,
  TopNavigationAction,
  Input,
  Button,
  Select,
} from "@ui-kitten/components";

import { ScreenTemplate } from "../../components/ScreenTemplate";

import { THEME } from "../../themes/themes";
import { BackIcon } from "../../themes/icons";

import { createTransferAction } from "../../store/actions/apiAction";

import { clearCurrentAccount } from "../../store/actions/accountAction";
import { AccountSelector } from "../../components/operation/account/AccountSelector";
import {
  getAccountCurrent,
  getApiLoading,
  getToAccountList,
} from "../../store/selectors";

export const CreateTransferScreen = memo(({ route, navigation }) => {
  const prevItem = route.params;
  const amountRef = React.useRef();

  const loader = useSelector(getApiLoading);

  const currentAccount = useSelector(getAccountCurrent);

  React.useEffect(() => {
    setTimeout(() => {
      amountRef.current.focus();
    }, 100);
  }, []);

  const dispatch = useDispatch();

  const toAccountData = useSelector(getToAccountList);

  const [transfer_amount, setTransferAmount] = React.useState(
    prevItem !== undefined ? prevItem.balance.toString() : ""
  );
  const [selectedFromAccountId, setSelectedFromAccountId] = React.useState(
    prevItem !== undefined
      ? parseInt(prevItem.from_account.split("pk=")[1], 10)
      : null
  );
  const isNotFromAccountEmpty = selectedFromAccountId !== null;

  const [selectedToAccountOption, setSelectedToAccountOption] = React.useState(
    prevItem !== undefined
      ? []
          .concat(...toAccountData.map((elem) => elem.items))
          .find(
            (elem) =>
              elem.id === prevItem.to_account.split("(pk=")[1].replace(")", "")
          )
      : null
  );

  // Validate
  const isNotAmountEmpty = parseFloat(transfer_amount) > 0;
  const isNotToAccountEmpty = selectedToAccountOption !== null;

  const navigateBack = useCallback(() => {
    if (currentAccount !== null) {
      dispatch(clearCurrentAccount());
    }

    navigation.goBack(null);
  }, [currentAccount, dispatch, navigation]);

  const onSubmit = useCallback(() => {
    if (!loader) {
      Keyboard.dismiss();

      const newTransfer = {
        transfer_amount: parseFloat(transfer_amount),
        from_account: selectedFromAccountId,
        to_account:
          selectedToAccountOption !== null &&
          toAccountData[selectedToAccountOption.parentIndex].items[
            selectedToAccountOption.index
          ].id,
        is_active: true,
      };

      dispatch(createTransferAction(newTransfer, navigateBack));
    }
  }, [
    loader,
    transfer_amount,
    selectedFromAccountId,
    selectedToAccountOption,
    toAccountData,
    dispatch,
    navigateBack,
  ]);

  const BackAction = useMemo(
    () => <TopNavigationAction icon={BackIcon} onPress={navigateBack} />,
    [navigateBack]
  );

  const onToSelectAccount = useCallback((opt) => {
    setSelectedToAccountOption(opt);
  }, []);

  return (
    <ScreenTemplate>
      <>
        <TopNavigation
          title="Создание перевода"
          alignment="center"
          leftControl={BackAction}
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
              ref={amountRef}
              value={transfer_amount}
              placeholder="Сумма перевода"
              keyboardType="decimal-pad"
              onChangeText={setTransferAmount}
              style={{ marginVertical: 10 }}
              status={isNotAmountEmpty ? "success" : "danger"}
              caption={
                isNotAmountEmpty ? "" : "Поле не может быть пустым или меньше 0"
              }
              selectTextOnFocus
            />
            <AccountSelector
              selectedId={selectedFromAccountId}
              setSelectedId={setSelectedFromAccountId}
              isNotEmpty={isNotFromAccountEmpty}
              navigation={navigation}
            />
            <Select
              data={toAccountData}
              placeholder="Укажите счет пополнения"
              selectedOption={
                selectedToAccountOption !== null &&
                toAccountData[selectedToAccountOption.parentIndex] &&
                toAccountData[selectedToAccountOption.parentIndex].items[
                  selectedToAccountOption.index
                ]
              }
              onSelect={onToSelectAccount}
              style={{ marginVertical: 10 }}
              status={isNotToAccountEmpty ? "success" : "danger"}
              caption={isNotToAccountEmpty ? "" : "Поле не может быть пустым"}
            />

            <Button
              style={{
                marginVertical: 25,
                borderRadius: THEME.BUTTON_RADIUS,
              }}
              onPress={onSubmit}
              disabled={
                !isNotAmountEmpty ||
                !isNotFromAccountEmpty ||
                !isNotToAccountEmpty
              }
            >
              Создать
            </Button>
          </View>
        </Layout>
      </>
    </ScreenTemplate>
  );
});
