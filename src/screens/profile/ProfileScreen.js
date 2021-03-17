import React, { memo, useCallback } from "react";
import { View, Alert } from "react-native";
import {
  Layout,
  TopNavigation,
  TopNavigationAction,
  Input,
  Button,
} from "@ui-kitten/components";

import { useDispatch, useSelector } from "react-redux";
import { ScreenTemplate } from "../../components/ScreenTemplate";
import { THEME } from "../../themes/themes";

import { BackIcon, DeleteIcon } from "../../themes/icons";

import {
  updateImageProfileAction,
  updateProfileAction,
  hideProfileAction,
} from "../../store/actions/apiAction";
import { AvatarPicker } from "../../components/profile/AvatarPicker";
import { FlexibleView } from "../../components/FlexibleView";

export const ProfileScreen = memo(({ navigation }) => {
  const dispatch = useDispatch();
  const profileStore = useSelector((store) => store.profile);
  const { profile } = profileStore;

  const [first_name, setFirstName] = React.useState(
    profile !== null ? profile.first_name : ""
  );
  const [last_name, setLastName] = React.useState(
    profile !== null ? profile.last_name : ""
  );
  const [phone, setPhone] = React.useState(
    profile !== null ? profile.phone : ""
  );
  const [imageUrl, setImageUrl] = React.useState(
    profile !== null ? profile.image : null
  );

  const [isEdit, setIsEdit] = React.useState(false);
  const loader = useSelector((store) => store.api.loader);

  const inputRef = React.useRef(null);

  const onSuccess = () => {
    setIsEdit(false);
  };

  const onSubmit = () => {
    if (isEdit && !loader) {
      if (imageUrl !== null) {
        const data = new FormData();

        data.append("image", {
          uri: imageUrl,
          type: "image/jpeg",
          name: `filename_${profile.id}.jpg`,
        });
        data.append("first_name", first_name);
        data.append("last_name", last_name);
        data.append("phone", phone);

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
        const data = {
          image: null,
          first_name,
          last_name,
          phone,
        };

        dispatch(
          updateProfileAction(
            {
              id: profile.id,
              data,
            },
            onSuccess
          )
        );
      }
    } else {
      setIsEdit(true);
      inputRef.current.focus();
    }
  };

  const navigateBack = useCallback(() => {
    navigation.goBack(null);
  }, [navigation]);

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  const deleteProfileHandler = useCallback(() => {
    Alert.alert(
      "Удаление профиля",
      profile.is_admin
        ? "Вы уверены, что хотите удалить компанию и все данные принадлежащие ей, а также удалить текущий профиль?"
        : "Вы уверены, что хотите выйти из компании и удалить текущий профиль?",
      [
        {
          text: "Отмена",
          style: "cancel",
        },
        {
          text: "Удалить профиль",
          onPress: () => {
            dispatch(hideProfileAction(profile.id, navigation));
          },
        },
      ],
      {
        cancelable: false,
      }
    );
  }, [dispatch, navigation, profile.id, profile.is_admin]);

  const DeleteProfileAction = () => (
    <TopNavigationAction icon={DeleteIcon} onPress={deleteProfileHandler} />
  );

  return (
    <ScreenTemplate>
      <FlexibleView>
        <TopNavigation
          title="Профиль"
          alignment="center"
          leftControl={BackAction()}
          rightControls={DeleteProfileAction()}
        />
        <Layout
          style={{
            flex: 1,
            marginTop: 30,
            alignItems: "center",
          }}
        >
          <View style={{ height: 200 }}>
            <AvatarPicker
              isEdit={isEdit}
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
            />
          </View>
          <View
            style={{
              width: "85%",
              maxWidth: 720,
              manrginBottom: 25,
            }}
          >
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
              onPress={onSubmit}
            >
              {isEdit ? "Сохранить" : "Изменить"}
            </Button>
          </View>
        </Layout>
      </FlexibleView>
    </ScreenTemplate>
  );
});
