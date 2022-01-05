import React, { memo, useCallback, useMemo, useState } from 'react';
import { Keyboard, View } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

import { Layout, TopNavigation, TopNavigationAction, Input, Button } from '@ui-kitten/components';

import { ScreenTemplate } from '../../components/ScreenTemplate';

import { THEME } from '../../themes/themes';
import { BackIcon } from '../../themes/icons';

import { createTransferAction } from '../../store/actions/apiAction';

import { clearCurrentAccount, setCurrentAccount } from '../../store/actions/accountAction';
import { AccountSelector } from '../../components/operation/account/AccountSelector';
import { ProfileSelector } from '../../components/operation/profile/ProfileSelector';
import {
  getAccountCurrent,
  getAccountList,
  getApiLoading,
  getToAccountList,
  getProfileList,
} from '../../store/selectors';
import { FlexibleView } from '../../components/FlexibleView';

export const CreateTransferScreen = memo(({ route, navigation }) => {
  const prevItem = route.params;
  const amountRef = React.useRef();

  const loader = useSelector(getApiLoading);

  const currentAccount = useSelector(getAccountCurrent);

  const accountData = useSelector(getAccountList);
  const profileData = useSelector(getProfileList);

  const toAccountData = useSelector(getToAccountList);
  const [profileAccountData, setProfileAccountData] = useState([]);

  React.useEffect(() => {
    setTimeout(() => {
      amountRef.current.focus();
    }, 100);
  }, []);

  React.useEffect(() => {
    if (Object.keys(toAccountData).length === 1) {
      setProfileAccountData(
        Object.keys(toAccountData[0].items).map((el) => {
          const { id, text } = toAccountData[0].items[el];

          return {
            id,
            index: el,
            text,
            title: text,
          };
        }),
      );
    }
  }, [toAccountData]);

  const dispatch = useDispatch();

  const [transfer_amount, setTransferAmount] = React.useState(
    prevItem !== undefined ? prevItem.balance.toString() : '',
  );

  const isNotAmountEmpty = parseFloat(transfer_amount) > 0;

  // Account
  const isNotAccountEmpty = currentAccount !== null;

  const onSelectCurrentAccount = useCallback(
    (account) => {
      dispatch(setCurrentAccount(account));
    },
    [dispatch],
  );
  const onClearCurrentAccount = useCallback(() => {
    dispatch(clearCurrentAccount());
  }, [dispatch]);

  // To Profile
  const [selectedProfile, seSelectedProfile] = useState(null);

  const isNotProfileEmpty = useMemo(() => selectedProfile !== null, [selectedProfile]);

  const onSelectCurrentProfile = useCallback(
    (profile) => {
      setProfileAccountData(
        Object.keys(toAccountData[profile.index].items).map((el) => {
          const { id, text } = toAccountData[profile.index].items[el];

          return {
            id,
            index: el,
            text,
            title: text,
          };
        }),
      );
      seSelectedProfile(profile);
    },
    [toAccountData],
  );
  const onClearCurrentProfile = useCallback(() => {
    setProfileAccountData([]);
    seSelectedProfile(null);
  }, []);

  // To Profile Account
  const [selectedProfileAccount, seSelectedProfileAccount] = useState(null);

  const isNotProfileAccountEmpty = useMemo(
    () => selectedProfileAccount !== null,
    [selectedProfileAccount],
  );

  const onSelectCurrentProfileAccount = useCallback((account) => {
    seSelectedProfileAccount(account);
  }, []);
  const onClearCurrentProfileAccount = useCallback(() => {
    seSelectedProfileAccount(null);
  }, []);

  const isNotToAccountEmpty = useMemo(
    () => selectedProfileAccount !== null,
    [selectedProfileAccount],
  );

  const navigateBack = useCallback(() => {
    if (currentAccount !== null) {
      dispatch(clearCurrentAccount());
    }

    navigation.goBack(null);
  }, [currentAccount, dispatch, navigation]);

  const onSubmit = useCallback(() => {
    if (!loader) {
      Keyboard.dismiss();

      if (currentAccount && selectedProfileAccount && transfer_amount) {
        const newTransfer = {
          transfer_amount: parseFloat(transfer_amount),
          from_account: Number(currentAccount.id),
          to_account: Number(selectedProfileAccount.id),
        };

        dispatch(createTransferAction(newTransfer, navigateBack));
      }
    }
  }, [currentAccount, dispatch, loader, navigateBack, selectedProfileAccount, transfer_amount]);

  const BackAction = useCallback(
    () => <TopNavigationAction icon={BackIcon} onPress={navigateBack} />,
    [navigateBack],
  );

  return (
    <ScreenTemplate>
      <FlexibleView>
        <TopNavigation title="Создание перевода" alignment="center" accessoryLeft={BackAction} />
        <Layout
          style={{
            flex: 1,
            marginTop: 30,
            alignItems: 'center',
          }}
        >
          <View
            style={{
              width: '85%',
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
              status={isNotAmountEmpty ? 'success' : 'danger'}
              caption={isNotAmountEmpty ? '' : 'Поле не может быть пустым или меньше 0'}
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
            {Object.keys(toAccountData).length > 1 ? (
              <ProfileSelector
                current={selectedProfile}
                setCurrent={onSelectCurrentProfile}
                clearCurrent={onClearCurrentProfile}
                profileData={profileData}
                isNotEmpty={isNotProfileEmpty}
                navigation={navigation}
              />
            ) : null}
            <AccountSelector
              current={selectedProfileAccount}
              setCurrent={onSelectCurrentProfileAccount}
              clearCurrent={onClearCurrentProfileAccount}
              accountData={profileAccountData}
              isNotEmpty={isNotProfileAccountEmpty}
              navigation={navigation}
              isCreate={false}
            />
            <Button
              style={{
                marginVertical: 25,
                borderRadius: THEME.BUTTON_RADIUS,
              }}
              onPress={onSubmit}
              disabled={!isNotAmountEmpty || !isNotAccountEmpty || !isNotToAccountEmpty}
            >
              Создать
            </Button>
          </View>
        </Layout>
      </FlexibleView>
    </ScreenTemplate>
  );
});
