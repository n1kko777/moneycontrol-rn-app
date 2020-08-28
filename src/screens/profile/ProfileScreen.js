import React from "react";
import { View } from "react-native";
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

import { BackIcon } from "../../themes/icons";

import { updateImageProfileAction } from "../../store/actions/apiAction";
import { AvatarPicker } from "../../components/profile/AvatarPicker";

export const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const profileStore = useSelector((store) => store.profile);
  const { profile } = profileStore;

  const [first_name, setFirstName] = React.useState(profile.first_name);
  const [last_name, setLastName] = React.useState(profile.last_name);
  const [phone, setPhone] = React.useState(profile.phone);
  const [imageUrl, setImageUrl] = React.useState(profile.image);

  const [isEdit, setIsEdit] = React.useState(false);
  const loader = useSelector((store) => store.api.loader);

  const inputRef = React.useRef(null);

  const onSuccess = () => {
    setIsEdit(false);
  };

  const onSubmit = () => {
    if (isEdit && !loader) {
      let data = new FormData();
      data.append("image", {
        uri: imageUrl,
        type: "image/jpeg",
        name: `filename_${profile.id}.jpg`,
      });
      data.append("id", profile.id);
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
      setIsEdit(true);
      inputRef.current.focus();
    }
  };

  const navigateBack = () => {
    navigation.goBack(null);
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  return (
    <ScreenTemplate>
      <>
        <TopNavigation
          title="Профиль"
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
      </>
    </ScreenTemplate>
  );
};
