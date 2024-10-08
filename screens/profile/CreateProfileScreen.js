import { Layout, TopNavigation, TopNavigationAction, Input, Button } from '@ui-kitten/components';
import React, { memo, useCallback } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { alert } from 'utils';

import { FlexibleView } from '../../components/FlexibleView';
import { ScreenTemplate } from '../../components/ScreenTemplate';
import { createProfileAction } from '../../store/actions/apiAction';
import { logout } from '../../store/actions/authAction';
import { getApiLoading } from '../../store/selectors';
import { LogoutIcon } from '../../themes/icons';
import { THEME } from '../../themes/themes';

export const CreateProfileScreen = memo(({ navigation }) => {
  const dispatch = useDispatch();
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    setTimeout(() => {
      inputRef.current.focus();
    }, 100);
  }, []);

  const [first_name, setFirstName] = React.useState('');
  const [last_name, setLastName] = React.useState('');
  const [phone, setPhone] = React.useState('');

  const loader = useSelector(getApiLoading);

  const onSuccess = useCallback(
    (profile) => {
      navigation.navigate(profile.company !== null ? 'Home' : 'CompanyManager');
    },
    [navigation]
  );

  const onSubmit = useCallback(() => {
    if (!loader) {
      const newProfile = {
        first_name,
        last_name,
        phone,
      };
      dispatch(createProfileAction(newProfile, onSuccess));
    }
  }, [loader, first_name, last_name, phone, dispatch, onSuccess]);

  const logoutHandler = useCallback(() => {
    dispatch(logout(navigation));
  }, [dispatch, navigation]);

  const navigateLogout = useCallback(() => {
    alert(
      'Выход',
      'Вы уверены, что хотите выйти из учетной записи?',
      [
        {
          text: 'Отмена',
          style: 'cancel',
        },
        { text: 'Выйти', onPress: logoutHandler },
      ],
      {
        cancelable: false,
      }
    );
  }, [logoutHandler]);

  const BackAction = useCallback(
    () => <TopNavigationAction icon={LogoutIcon} onPress={navigateLogout} />,
    [navigateLogout]
  );

  return (
    <ScreenTemplate>
      <FlexibleView>
        <TopNavigation
          title="Создание профиля сотрудника"
          alignment="center"
          accessoryLeft={BackAction}
        />
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
              value={first_name}
              placeholder="Имя"
              onChangeText={setFirstName}
              autoCompleteType="name"
              style={{ marginVertical: 10 }}
            />
            <Input
              value={last_name}
              placeholder="Фамилия"
              autoCompleteType="name"
              onChangeText={setLastName}
              style={{ marginVertical: 10 }}
            />
            <Input
              value={phone}
              placeholder="Телефон"
              autoCompleteType="tel"
              keyboardType="phone-pad"
              onChangeText={setPhone}
              style={{ marginVertical: 10 }}
            />
            <Button
              style={{
                marginVertical: 25,
                borderRadius: THEME.BUTTON_RADIUS,
              }}
              onPress={onSubmit}>
              Создать профиль
            </Button>
          </View>
        </Layout>
      </FlexibleView>
    </ScreenTemplate>
  );
});
