import React, { useState, useRef, useEffect, memo, useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Layout, TopNavigation, TopNavigationAction, Input, Button } from '@ui-kitten/components';

import { View } from 'react-native';
import { ScreenTemplate } from '../../components/ScreenTemplate';
import { THEME } from '../../themes/themes';
import { BackIcon } from '../../themes/icons';

import { resetPassAction } from '../../store/actions/apiAction';
import { getApiLoading } from '../../store/selectors';
import { FlexibleView } from '../../components/FlexibleView';

export const ResetPassword = memo(({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const loader = useSelector(getApiLoading);

  const navigateBack = useCallback(() => {
    navigation.goBack(null);
  }, [navigation]);

  const onReset = useCallback(() => {
    setEmail('');
    navigateBack();
  }, [navigateBack]);

  const onSubmit = useCallback(() => {
    if (!loader) {
      dispatch(
        resetPassAction(
          {
            email,
          },
          onReset,
        ),
      );
    }
  }, [dispatch, email, loader, onReset]);

  const BackAction = useCallback(
    () => <TopNavigationAction icon={BackIcon} onPress={navigateBack} />,
    [navigateBack],
  );

  const inputRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      inputRef.current.focus();
    }, 100);
  }, []);

  return (
    <ScreenTemplate>
      <FlexibleView>
        <TopNavigation title="Сброс пароля" alignment="center" accessoryLeft={BackAction} />
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
      </FlexibleView>
    </ScreenTemplate>
  );
});
