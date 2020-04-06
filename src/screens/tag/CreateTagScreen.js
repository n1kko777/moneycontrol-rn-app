import React from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  Layout,
  TopNavigation,
  TopNavigationAction,
  Input,
  Button,
} from "@ui-kitten/components";

import { ScreenTemplate } from "../../components/ScreenTemplate";
import { View } from "react-native";
import { THEME } from "../../themes/themes";
import { BackIcon } from "../../themes/icons";

import { startLoader, endLoader } from "../../store/actions/apiAction";
import { createTag } from "../../store/actions/tagAction";
import { Keyboard } from "react-native";

export const CreateTagScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { error: tagError } = useSelector((store) => store.tag);

  const [tag_name, setTagName] = React.useState("");

  const navigateBack = () => {
    navigation.goBack();
  };

  const onSubmit = async () => {
    Keyboard.dismiss();
    dispatch(startLoader());

    try {
      await dispatch(
        createTag({
          tag_name,
        })
      );

      if (tagError === null) {
        setTagName("");
        navigateBack();
      }
    } catch (error) {}

    dispatch(endLoader());
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  return (
    <ScreenTemplate>
      <>
        <TopNavigation
          title="Создание тега"
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
          <View
            style={{
              width: "85%",
              maxWidth: 720,
              manrginBottom: 25,
            }}
          >
            <Input
              value={tag_name}
              placeholder="Название тега"
              onChangeText={setTagName}
              autoCompleteType="name"
              style={{ marginVertical: 10 }}
            />
            <Button
              style={{
                marginVertical: 25,
                borderRadius: THEME.BUTTON_RADIUS,
              }}
              onPress={onSubmit}
            >
              Создать
            </Button>
          </View>
        </Layout>
      </>
    </ScreenTemplate>
  );
};
