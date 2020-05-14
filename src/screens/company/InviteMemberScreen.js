import React from "react";
import { View, Alert } from "react-native";
import { ScreenTemplate } from "../../components/ScreenTemplate";
import { Toolbar } from "../../components/navigation/Toolbar";
import { BackIcon } from "../../themes/icons";
import { Layout, Input, Button } from "@ui-kitten/components";
import { THEME } from "../../themes/themes";
import { useDispatch } from "react-redux";
import { startLoader, endLoader } from "../../store/actions/apiAction";
import { joinProfileToCompany } from "../../store/actions/companyAction";

export const InviteMemberScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [profile_id, setProfileId] = React.useState("");
  const [profile_phone, setProfilePhone] = React.useState("");

  const isNotProfileIdEmpty = profile_id && profile_id.length > 0;
  const isNotProfilePhoneEmpty = profile_phone && profile_phone.length > 0;

  const onSubmit = async () => {
    await dispatch(startLoader());
    await joinProfileToCompany(profile_id, profile_phone)
      .then((res) => {
        setProfileId("");
        setProfilePhone("");
        Alert.alert("Статус запроса", res.data.detail, [{ text: "OK" }], {
          cancelable: false,
        });
      })
      .catch((err) => {
        Alert.alert(
          "Статус запроса",
          err.response.data.detail,
          [{ text: "OK" }],
          {
            cancelable: false,
          }
        );
      });
    await dispatch(endLoader());
  };

  return (
    <ScreenTemplate>
      <Toolbar
        navigation={navigation}
        title="Добавление сотрудников"
        TargetIcon={BackIcon}
        onTarget={() => navigation.navigate("Home")}
        isMenu={false}
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
            value={profile_id}
            placeholder="ID пользователя"
            keyboardType="phone-pad"
            onChangeText={setProfileId}
            style={{ marginVertical: 10 }}
            status={isNotProfileIdEmpty ? "success" : "danger"}
            caption={isNotProfileIdEmpty ? "" : "Поле не может быть пустым"}
          />
          <Input
            value={profile_phone}
            placeholder="Номер телефона"
            autoCompleteType="tel"
            keyboardType="phone-pad"
            onChangeText={setProfilePhone}
            style={{ marginVertical: 10 }}
            status={isNotProfilePhoneEmpty ? "success" : "danger"}
            caption={isNotProfilePhoneEmpty ? "" : "Поле не может быть пустым"}
          />
          <Button
            style={{
              marginVertical: 25,
              borderRadius: THEME.BUTTON_RADIUS,
            }}
            onPress={onSubmit}
            disabled={
              (!isNotProfileIdEmpty ? true : false) ||
              (!isNotProfilePhoneEmpty ? true : false)
            }
          >
            Добавить сотрудника
          </Button>
        </View>
      </Layout>
    </ScreenTemplate>
  );
};
