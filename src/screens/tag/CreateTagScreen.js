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

import { createTagAction } from "../../store/actions/apiAction";

export const CreateTagScreen = memo(({ navigation }) => {
  const dispatch = useDispatch();

  const [tag_name, setTagName] = React.useState("");

  const navigateBack = useCallback(() => {
    navigation.goBack(null);
  }, [navigation]);

  const loader = useSelector((store) => store.api.loader);

  const onReset = useCallback(() => {
    setTagName("");
    navigateBack();
  }, [navigateBack]);

  const onSubmit = useCallback(() => {
    if (!loader) {
      Keyboard.dismiss();

      dispatch(
        createTagAction(
          {
            tag_name,
          },
          onReset
        )
      );
    }
  }, [loader, dispatch, tag_name, onReset]);

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
              ref={inputRef}
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
});
