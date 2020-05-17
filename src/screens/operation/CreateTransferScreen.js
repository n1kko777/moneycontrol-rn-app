import React from "react";
import { Keyboard } from "react-native";

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
import { View } from "react-native";
import { THEME } from "../../themes/themes";
import { BackIcon } from "../../themes/icons";

import { startLoader, endLoader } from "../../store/actions/apiAction";
import { createTransfer } from "../../store/actions/transferAction";

import { splitToDigits } from "../../splitToDigits";

export const CreateTransferScreen = ({ route, navigation }) => {
  const prevItem = route.params;

  const dispatch = useDispatch();

  const { profile } = useSelector((store) => store.profile);

  const { company } = useSelector((store) => store.company);

  const toAccountData = company.profiles.map((elem, index) => ({
    text: `${elem.is_admin ? "⭐️ " : ""}${elem.first_name} ${elem.last_name} ${
      elem.id === profile.id ? "👈" : ""
    }`,
    items: elem.accounts.map((insideElem, insideIndex) => ({
      parentIndex: index,
      index: insideIndex,
      text: insideElem,
      id: insideElem.split("(pk=")[1].replace(")", ""),
    })),
  }));

  const { accounts } = useSelector((store) => store.account);

  const { error: transferError } = useSelector((store) => store.transfer);

  const fromAccountData = accounts
    .filter((elem) => elem.profile == profile.id)
    .map((elem, index) => ({
      index,
      text: `${elem.account_name} (${splitToDigits(elem.balance)} ₽)`,
      id: elem.id,
    }));

  const [transfer_amount, setTransferAmount] = React.useState(
    prevItem !== undefined ? prevItem.balance : ""
  );
  const [
    selectedFromAccountOption,
    setSelectedFromAccountOption,
  ] = React.useState(
    prevItem !== undefined
      ? fromAccountData.findIndex(
          (elem) =>
            elem.id == prevItem.from_account.split("(pk=")[1].replace(")", "")
        )
      : null
  );

  const [selectedToAccountOption, setSelectedToAccountOption] = React.useState(
    prevItem !== undefined
      ? []
          .concat(...toAccountData.map((elem) => elem.items))
          .find(
            (elem) =>
              elem.id == prevItem.to_account.split("(pk=")[1].replace(")", "")
          )
      : null
  );

  // Validate
  const isNotAmountEmpty = transfer_amount > 0;
  const isNotFromAccountEmpty = selectedFromAccountOption !== null;
  const isNotToAccountEmpty = selectedToAccountOption !== null;

  const navigateBack = () => {
    navigation.goBack();
  };

  const onSubmit = async () => {
    try {
      Keyboard.dismiss();
      dispatch(startLoader());

      const newTransfer = {
        transfer_amount,
        from_account:
          selectedFromAccountOption !== null &&
          fromAccountData[selectedFromAccountOption].id,
        to_account:
          selectedToAccountOption !== null &&
          toAccountData[selectedToAccountOption.parentIndex].items[
            selectedToAccountOption.index
          ].id,
        is_active: true,
      };

      await dispatch(createTransfer(newTransfer));

      if (transferError === null) {
        dispatch(getAccount());
        navigateBack();
      }

      dispatch(endLoader());
    } catch (error) {}
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  const onFromSelectAccount = React.useCallback((opt) => {
    setSelectedFromAccountOption(opt.index);
  });

  const onToSelectAccount = React.useCallback((opt) => {
    setSelectedToAccountOption(opt);
  });

  return (
    <ScreenTemplate>
      <>
        <TopNavigation
          title="Создание перевода"
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
              value={transfer_amount}
              placeholder="Сумма перевода"
              keyboardType="phone-pad"
              onChangeText={setTransferAmount}
              style={{ marginVertical: 10 }}
              status={isNotAmountEmpty ? "success" : "danger"}
              caption={
                isNotAmountEmpty ? "" : "Поле не может быть пустым или меньше 0"
              }
            />
            <Select
              data={fromAccountData}
              placeholder="Укажите счет списания"
              selectedOption={fromAccountData[selectedFromAccountOption]}
              onSelect={onFromSelectAccount}
              style={{ marginVertical: 10 }}
              status={isNotFromAccountEmpty ? "success" : "danger"}
              caption={isNotFromAccountEmpty ? "" : "Поле не может быть пустым"}
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
};
