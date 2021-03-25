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
  SelectGroup,
  SelectItem,
  IndexPath,
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

  const isNotAmountEmpty = parseFloat(transfer_amount) > 0;

  const [selectedFromAccountId, setSelectedFromAccountId] = React.useState(
    prevItem !== undefined
      ? parseInt(prevItem.from_account.split("pk=")[1], 10)
      : null
  );

  const isNotFromAccountEmpty = selectedFromAccountId !== null;

  const copyToProfile = prevItem
    ? Object.keys(toAccountData).find((profileKey) =>
        Object.keys(toAccountData[profileKey].items).find(
          (accountKey) =>
            parseInt(toAccountData[profileKey].items[accountKey].id, 10) ===
            parseInt(prevItem.to_account_id, 10)
        )
      )
    : prevItem;

  const copyToAccount = copyToProfile
    ? Object.keys(toAccountData[copyToProfile].items).find(
        (accountKey) =>
          parseInt(toAccountData[copyToProfile].items[accountKey].id, 10) ===
          parseInt(prevItem.to_account_id, 10)
      )
    : copyToProfile;

  const [selectedToAccountOption, setSelectedToAccountOption] = React.useState(
    copyToProfile && copyToAccount
      ? new IndexPath(parseInt(copyToAccount, 10), parseInt(copyToProfile, 10))
      : undefined
  );

  const [selectedToAccountValue, setSelectedToAccountValue] = React.useState(
    copyToProfile && copyToAccount
      ? toAccountData[copyToProfile].items[copyToAccount].text
      : ""
  );

  const onToSelectAccount = useCallback(
    (index) => {
      const profile = index.section;
      const account = index.row;

      setSelectedToAccountOption(index);
      setSelectedToAccountValue(toAccountData[profile].items[account].text);
    },
    [toAccountData]
  );

  const isNotToAccountEmpty =
    selectedToAccountOption && selectedToAccountOption !== null;

  const navigateBack = useCallback(() => {
    if (currentAccount !== null) {
      dispatch(clearCurrentAccount());
    }

    navigation.goBack(null);
  }, [currentAccount, dispatch, navigation]);

  const onSubmit = useCallback(() => {
    if (!loader) {
      Keyboard.dismiss();
      const toProfile = selectedToAccountOption.section;
      const toAccount = selectedToAccountOption.row;

      const newTransfer = {
        transfer_amount: parseFloat(transfer_amount),
        from_account: selectedFromAccountId,
        to_account: toAccountData[toProfile].items[toAccount].id,
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

  const BackAction = useCallback(
    () => <TopNavigationAction icon={BackIcon} onPress={navigateBack} />,
    [navigateBack]
  );

  const memoToAccountList = useMemo(
    () =>
      Object.keys(toAccountData).map((profile) => (
        <SelectGroup
          key={toAccountData[profile].text}
          title={toAccountData[profile].text}
        >
          {Object.keys(toAccountData[profile].items).map((account) => (
            <SelectItem
              key={toAccountData[profile].items[account].id}
              title={toAccountData[profile].items[account].text}
            />
          ))}
        </SelectGroup>
      )),
    [toAccountData]
  );

  return (
    <ScreenTemplate>
      <>
        <TopNavigation
          title="Создание перевода"
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
              value={selectedToAccountValue}
              selectedIndex={selectedToAccountOption}
              onSelect={onToSelectAccount}
              placeholder="Укажите счет пополнения"
              style={{ marginVertical: 10 }}
              status={isNotToAccountEmpty ? "success" : "danger"}
              caption={isNotToAccountEmpty ? "" : "Поле не может быть пустым"}
            >
              {memoToAccountList}
            </Select>

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
