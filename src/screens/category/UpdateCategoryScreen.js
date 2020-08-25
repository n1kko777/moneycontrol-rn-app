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
import { updateCategory } from "../../store/actions/categoryAction";
import { Keyboard } from "react-native";

export const UpdateCategoryScreen = ({ route, navigation }) => {
  const { category } = route.params;

  const dispatch = useDispatch();
  const { error: categoryError } = useSelector((store) => store.category);

  const [category_name, setCategoryName] = React.useState(
    category.category_name
  );

  const navigateBack = () => {
    navigation.goBack(null);
  };
  const loader = useSelector((store) => store.api.loader);

  const onSubmit = async () => {
    if (!loader) {
      Keyboard.dismiss();
      dispatch(startLoader());

      try {
        await dispatch(
          updateCategory(category.id, {
            category_name,
          })
        );
      } catch (error) {}

      if (categoryError === null) {
        navigateBack();
      }

      dispatch(endLoader());
    }
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  const inputRef = React.useRef(null);

  React.useEffect(() => {
    setTimeout(() => {
      inputRef.current.focus();
    }, 100);
  }, []);

  return (
    <ScreenTemplate>
      <>
        <TopNavigation
          title="Обновление категории"
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
              ref={inputRef}
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
              Обновить
            </Button>
          </View>
        </Layout>
      </>
    </ScreenTemplate>
  );
};
