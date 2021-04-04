import React, { memo, useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  Layout,
  TopNavigation,
  TopNavigationAction,
  Input,
  Button,
} from "@ui-kitten/components";

import { View, Keyboard } from "react-native";
import { ScreenTemplate } from "../../components/ScreenTemplate";
import { THEME } from "../../themes/themes";
import { BackIcon } from "../../themes/icons";

import { updateCategoryAction } from "../../store/actions/apiAction";
import { getApiLoading } from "../../store/selectors";
import { FlexibleView } from "../../components/FlexibleView";

export const UpdateCategoryScreen = memo(({ route, navigation }) => {
  const { category } = route.params;

  const dispatch = useDispatch();

  const [category_name, setCategoryName] = React.useState(
    category.category_name
  );

  const navigateBack = useCallback(() => {
    navigation.goBack(null);
  }, [navigation]);

  const loader = useSelector(getApiLoading);

  const onSubmit = useCallback(() => {
    if (!loader) {
      Keyboard.dismiss();
      dispatch(
        updateCategoryAction(
          {
            id: category.id,
            category_name,
          },
          navigateBack
        )
      );
    }
  }, [category.id, category_name, dispatch, loader, navigateBack]);

  const BackAction = useCallback(
    () => <TopNavigationAction icon={BackIcon} onPress={navigateBack} />,
    [navigateBack]
  );

  const inputRef = React.useRef(null);

  React.useEffect(() => {
    setTimeout(() => {
      inputRef.current.focus();
    }, 100);
  }, []);

  return (
    <ScreenTemplate>
      <FlexibleView>
        <TopNavigation
          title="Обновление категории"
          alignment="center"
          accessoryLeft={BackAction}
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
      </FlexibleView>
    </ScreenTemplate>
  );
});
