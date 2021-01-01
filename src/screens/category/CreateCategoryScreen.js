import React, { memo, useCallback } from "react";

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

import { createCategoryAction } from "../../store/actions/apiAction";
import { clearCurrentCategory } from "../../store/actions/categoryAction";
import { Keyboard } from "react-native";

export const CreateCategoryScreen = memo(({ route, navigation }) => {
  const prevItem = route.params;
  const dispatch = useDispatch();

  const [category_name, setCategoryName] = React.useState(
    prevItem !== undefined ? prevItem.category_name : ""
  );
  const navigateBack = useCallback(() => {
    prevItem === undefined && dispatch(clearCurrentCategory());
    navigation.goBack(null);
  }, [prevItem]);

  const loader = useSelector((store) => store.api.loader);

  const onReset = useCallback(() => {
    setCategoryName("");
    navigateBack();
  }, []);

  const onSubmit = useCallback(() => {
    if (!loader) {
      Keyboard.dismiss();
      dispatch(
        createCategoryAction(
          {
            category_name,
          },
          onReset
        )
      );
    }
  }, [category_name]);

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
              Создать
            </Button>
          </View>
        </Layout>
      </>
    </ScreenTemplate>
  );
});
