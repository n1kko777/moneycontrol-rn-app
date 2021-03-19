import React, { memo, useCallback, useMemo } from "react";

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

import { updateCompanyAction } from "../../store/actions/apiAction";
import { getApiLoading, getCompany } from "../../store/selectors";

export const ChangeCompanyNameScreen = memo(({ navigation }) => {
  const dispatch = useDispatch();
  const { company_name: companyName, id: companyId } = useSelector(getCompany);

  const [company_name, setCompanyName] = React.useState(companyName);

  const navigateBack = useCallback(() => {
    navigation.goBack(null);
  }, [navigation]);

  const loader = useSelector(getApiLoading);

  const onReset = useCallback(() => {
    navigateBack();
  }, [navigateBack]);

  const onSubmit = useCallback(() => {
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
  }, [companyId, company_name, dispatch, loader, onReset]);

  const BackAction = useMemo(
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
      <>
        <TopNavigation
          title="Изменение названия компании"
          alignment="center"
          leftControl={BackAction}
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
});
