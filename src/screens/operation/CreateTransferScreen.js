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

import {
  clearCurrentAccount,
  setCurrentAccount,
} from "../../store/actions/accountAction";
import { AccountSelector } from "../../components/operation/account/AccountSelector";
import {
  getAccountCurrent,
  getAccountList,
  getApiLoading,
  getToAccountList,
} from "../../store/selectors";
import { FlexibleView } from "../../components/FlexibleView";

export const CreateTransferScreen = memo(({ route, navigation }) => {
  const prevItem = route.params;
  const amountRef = React.useRef();

  const loader = useSelector(getApiLoading);

  const currentAccount = useSelector(getAccountCurrent);
  const accountData = useSelector(getAccountList);

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

  // Account
  const isNotAccountEmpty = currentAccount !== null;

  const onSelectCurrentAccount = useCallback(
    (account) => {
      dispatch(setCurrentAccount(account));
    },
    [dispatch]
  );
  const onClearCurrentAccount = useCallback(() => {
    dispatch(clearCurrentAccount());
  }, [dispatch]);

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
      if (selectedToAccountOption) {
        const toProfile = selectedToAccountOption.section;
        const toAccount = selectedToAccountOption.row;

        const newTransfer = {
          transfer_amount: parseFloat(transfer_amount),
          from_account: currentAccount !== null ? currentAccount.id : null,
          to_account: toAccountData[toProfile].items[toAccount].id,
          is_active: true,
        };
        dispatch(createTransferAction(newTransfer, navigateBack));
      }
    }
  }, [
    loader,
    selectedToAccountOption,
    transfer_amount,
    currentAccount,
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
      <FlexibleView>
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
              current={currentAccount}
              setCurrent={onSelectCurrentAccount}
              clearCurrent={onClearCurrentAccount}
              accountData={accountData}
              isNotEmpty={isNotAccountEmpty}
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
                !isNotAmountEmpty || !isNotAccountEmpty || !isNotToAccountEmpty
              }
            >
              Создать
            </Button>
          </View>
        </Layout>
      </FlexibleView>
    </ScreenTemplate>
  );
});
