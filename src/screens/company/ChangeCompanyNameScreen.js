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

import { updateCompanyAction } from "../../store/actions/apiAction";
import { Keyboard } from "react-native";

export const ChangeCompanyNameScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const companyName = useSelector(
    (store) => store.company.company.company_name
  );
  const companyId = useSelector((store) => store.company.company.id);

  const [company_name, setCompanyName] = React.useState(companyName);
  const navigateBack = () => {
    navigation.goBack(null);
  };
  const loader = useSelector((store) => store.api.loader);
  const onReset = () => {
    navigateBack();
  };

  const onSubmit = () => {
    if (!loader) {
      Keyboard.dismiss();
      dispatch(
        updateCompanyAction(
          {
            id: companyId,
            company_name,
          },
          onReset
        )
      );
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
          title="Изменение названия компании"
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
              value={company_name}
              placeholder="Название компании"
              onChangeText={setCompanyName}
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
              Изменить
            </Button>
          </View>
        </Layout>
      </>
    </ScreenTemplate>
  );
};
