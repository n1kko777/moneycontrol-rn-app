import React, { memo, useCallback } from 'react';
import { View } from 'react-native';
import { Layout, Input, Button } from '@ui-kitten/components';
import { useDispatch, useSelector } from 'react-redux';
import { ScreenTemplate } from '../../components/ScreenTemplate';
import { Toolbar } from '../../components/navigation/Toolbar';
import { BackIcon } from '../../themes/icons';
import { THEME } from '../../themes/themes';
import { joinProfileToCompanyAction, getDataDispatcher } from '../../store/actions/apiAction';
import { getApiLoading } from '../../store/selectors';
import { FlexibleView } from '../../components/FlexibleView';

export const InviteMemberScreen = memo(({ navigation }) => {
  const dispatch = useDispatch();

  const [profile_id, setProfileId] = React.useState('');
  const [profile_phone, setProfilePhone] = React.useState('');

  const isNotProfileIdEmpty = profile_id && profile_id.length > 0;
  const isNotProfilePhoneEmpty = profile_phone && profile_phone.length > 0;

  const loader = useSelector(getApiLoading);

  const onSuccess = useCallback(() => {
    setProfileId('');
    setProfilePhone('');
    dispatch(getDataDispatcher(navigation));
  }, [dispatch, navigation]);

  const onSubmit = useCallback(() => {
    if (!loader) {
      dispatch(joinProfileToCompanyAction({ profile_id, profile_phone }, onSuccess));
    }
  }, [loader, dispatch, profile_id, profile_phone, onSuccess]);

  const inputRef = React.useRef(null);

  React.useEffect(() => {
    setTimeout(() => {
      inputRef.current.focus();
    }, 100);
  }, []);

  return (
    <ScreenTemplate>
      <FlexibleView>
        <Toolbar
          navigation={navigation}
          title="Добавление сотрудников"
          TargetIcon={BackIcon}
          onTarget={() => navigation.navigate('Home')}
          isMenu={false}
        />

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
              value={profile_id}
              placeholder="ID пользователя"
              keyboardType="number-pad"
              onChangeText={setProfileId}
              style={{ marginVertical: 10 }}
              status={isNotProfileIdEmpty ? 'success' : 'danger'}
              caption={isNotProfileIdEmpty ? '' : 'Поле не может быть пустым'}
            />
            <Input
              value={profile_phone}
              placeholder="Номер телефона"
              autoCompleteType="tel"
              keyboardType="phone-pad"
              onChangeText={setProfilePhone}
              style={{ marginVertical: 10 }}
              status={isNotProfilePhoneEmpty ? 'success' : 'danger'}
              caption={isNotProfilePhoneEmpty ? '' : 'Поле не может быть пустым'}
            />
            <Button
              style={{
                marginVertical: 25,
                borderRadius: THEME.BUTTON_RADIUS,
              }}
              onPress={onSubmit}
              disabled={!isNotProfileIdEmpty || !isNotProfilePhoneEmpty}
            >
              Добавить сотрудника
            </Button>
          </View>
        </Layout>
      </FlexibleView>
    </ScreenTemplate>
  );
});
