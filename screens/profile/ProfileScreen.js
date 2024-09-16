import { Layout, TopNavigation, TopNavigationAction, Input, Button } from '@ui-kitten/components';
import React, { memo, useCallback } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { alert } from 'utils';

import { FlexibleView } from '../../components/FlexibleView';
import { ScreenTemplate } from '../../components/ScreenTemplate';
import { AvatarPicker } from '../../components/profile/AvatarPicker';
import {
  updateImageProfileAction,
  updateProfileAction,
  hideProfileAction,
} from '../../store/actions/apiAction';
import { logout } from '../../store/actions/authAction';
import { getApiLoading, getProfile } from '../../store/selectors';
import { BackIcon, DeleteIcon } from '../../themes/icons';
import { THEME } from '../../themes/themes';

export const ProfileScreen = memo(({ navigation }) => {
  const dispatch = useDispatch();

  const loader = useSelector(getApiLoading);
  const profile = useSelector(getProfile);

  const [first_name, setFirstName] = React.useState(profile !== null ? profile.first_name : '');
  const [last_name, setLastName] = React.useState(profile !== null ? profile.last_name : '');
  const [phone, setPhone] = React.useState(profile !== null ? profile.phone : '');
  const [imageUrl, setImageUrl] = React.useState(profile !== null ? profile.image : null);

  const [isEdit, setIsEdit] = React.useState(false);

  const inputRef = React.useRef(null);

  const onSuccess = useCallback(() => {
    setIsEdit(false);
  }, []);

  const onSubmit = useCallback(() => {
    if (isEdit && !loader) {
      if (imageUrl !== null) {
        const data = new FormData();

        data.append('image', {
          uri: imageUrl,
          type: 'image/jpeg',
          name: profile !== null ? `filename_${profile.id}.jpg` : '',
        });
        data.append('first_name', first_name);
        data.append('last_name', last_name);
        data.append('phone', phone);

        if (profile !== null) {
          dispatch(
            updateImageProfileAction(
              {
                id: profile.id,
                data,
              },
              onSuccess
            )
          );
        } else {
          dispatch(logout(navigation));
        }
      } else {
        const data = {
          image: null,
          first_name,
          last_name,
          phone,
        };

        if (profile !== null) {
          dispatch(
            updateProfileAction(
              {
                id: profile.id,
                data,
              },
              onSuccess
            )
          );
        } else {
          dispatch(logout(navigation));
        }
      }
    } else {
      setIsEdit(true);
      inputRef.current.focus();
    }
  }, [
    dispatch,
    first_name,
    imageUrl,
    isEdit,
    last_name,
    loader,
    navigation,
    onSuccess,
    phone,
    profile,
  ]);

  const navigateBack = useCallback(() => {
    navigation.goBack(null);
  }, [navigation]);

  const BackAction = useCallback(
    () => <TopNavigationAction icon={BackIcon} onPress={navigateBack} />,
    [navigateBack]
  );

  const deleteProfileHandler = useCallback(() => {
    alert(
      'Удаление профиля',
      profile.is_admin
        ? 'Вы уверены, что хотите удалить компанию и все данные принадлежащие ей, а также удалить текущий профиль?'
        : 'Вы уверены, что хотите выйти из компании и удалить текущий профиль?',
      [
        {
          text: 'Отмена',
          style: 'cancel',
        },
        {
          text: 'Удалить профиль',
          onPress: () => {
            if (profile !== null) {
              dispatch(hideProfileAction(profile.id, navigation));
            } else {
              dispatch(logout(navigation));
            }
          },
        },
      ],
      {
        cancelable: false,
      }
    );
  }, [dispatch, navigation, profile]);

  const DeleteProfileAction = useCallback(
    () => <TopNavigationAction icon={DeleteIcon} onPress={deleteProfileHandler} />,
    [deleteProfileHandler]
  );

  return (
    <ScreenTemplate>
      <FlexibleView>
        <TopNavigation
          title="Профиль"
          alignment="center"
          accessoryLeft={BackAction}
          accessoryRight={DeleteProfileAction}
        />
        <Layout
          style={{
            flex: 1,
            marginTop: 30,
            alignItems: 'center',
          }}>
          <View style={{ height: 200 }}>
            <AvatarPicker isEdit={isEdit} imageUrl={imageUrl} setImageUrl={setImageUrl} />
          </View>
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
              disabled={!isEdit}
            />
            <Input
              value={last_name}
              placeholder="Фамилия"
              autoCompleteType="name"
              onChangeText={setLastName}
              style={{ marginVertical: 10 }}
              disabled={!isEdit}
            />
            <Input
              value={phone}
              placeholder="Телефон"
              autoCompleteType="tel"
              keyboardType="phone-pad"
              onChangeText={setPhone}
              style={{ marginVertical: 10 }}
              disabled={!isEdit}
            />
            <Button
              style={{
                marginVertical: 25,
                borderRadius: THEME.BUTTON_RADIUS,
              }}
              onPress={onSubmit}>
              {isEdit ? 'Сохранить' : 'Изменить'}
            </Button>
          </View>
        </Layout>
      </FlexibleView>
    </ScreenTemplate>
  );
});
