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
import { createCategory } from "../../store/actions/categoryAction";
import { Keyboard } from "react-native";

export const CreateCategoryScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { error: categoryError } = useSelector((store) => store.category);

  const [category_name, setCategoryName] = React.useState("");

  const navigateBack = () => {
    navigation.goBack();
  };

  const onSubmit = async () => {
    Keyboard.dismiss();
    dispatch(startLoader());

    try {
      await dispatch(
        createCategory({
          category_name,
        })
      );

      if (categoryError === null) {
        setCategoryName("");
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
          title="Создание категории"
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
              value={category_name}
              placeholder="Название категории"
              onChangeText={setCategoryName}
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
