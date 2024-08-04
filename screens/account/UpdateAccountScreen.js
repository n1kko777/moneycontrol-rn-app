import { Layout, TopNavigation, TopNavigationAction, Input, Button } from '@ui-kitten/components';
import React, { memo, useCallback } from 'react';
import { View, Keyboard } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { FlexibleView } from '../../components/FlexibleView';
import { ScreenTemplate } from '../../components/ScreenTemplate';
import { updateAccountAction } from '../../store/actions/apiAction';
import { getApiLoading } from '../../store/selectors';
import { BackIcon } from '../../themes/icons';
import { THEME } from '../../themes/themes';

export const UpdateAccountScreen = memo(({ route, navigation }) => {
  const { account } = route.params;

  const dispatch = useDispatch();

  const [account_name, setAccountName] = React.useState(account.account_name);
  const [balance, setBalance] = React.useState(account.balance);

  const navigateBack = useCallback(() => {
    navigation.goBack(null);
  }, [navigation]);

  const loader = useSelector(getApiLoading);

  const onSubmit = useCallback(() => {
    if (!loader) {
      Keyboard.dismiss();
      dispatch(
        updateAccountAction(
          {
            id: account.id,
            account_name,
            balance,
          },
          navigateBack
        )
      );
    }
  }, [account.id, account_name, balance, dispatch, loader, navigateBack]);

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
        <TopNavigation title="Обновление счета" alignment="center" accessoryLeft={BackAction} />
        <Layout
          style={{
            flex: 1,
            marginTop: 30,
            alignItems: 'center',
          }}>
          <View
            style={{
              width: '85%',
              maxWidth: 720,
              manrginBottom: 25,
            }}>
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
              onPress={onSubmit}>
              Обновить
            </Button>
          </View>
        </Layout>
      </FlexibleView>
    </ScreenTemplate>
  );
});
