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
import { updateTag } from "../../store/actions/tagAction";
import { Keyboard } from "react-native";

export const UpdateTagScreen = ({ route, navigation }) => {
  const { tag } = route.params;

  const dispatch = useDispatch();
  const { error: tagError } = useSelector((store) => store.tag);

  const [tag_name, setTagName] = React.useState(tag.tag_name);

  const navigateBack = () => {
    navigation.goBack();
  };

  const onSubmit = async () => {
    Keyboard.dismiss();
    dispatch(startLoader());

    try {
      await dispatch(
        updateTag(tag.id, {
          tag_name,
        })
      );
    } catch (error) {}

    if (tagError === null) {
      navigateBack();
    }

    dispatch(endLoader());
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  return (
    <ScreenTemplate>
      <>
        <TopNavigation
          title="Обновление тега"
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
              Обновить
            </Button>
          </View>
        </Layout>
      </>
    </ScreenTemplate>
  );
};
