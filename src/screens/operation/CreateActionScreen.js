import React from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  Layout,
  TopNavigation,
  TopNavigationAction,
  Input,
  Button,
  Select,
} from "@ui-kitten/components";

import { ScreenTemplate } from "../../components/ScreenTemplate";
import { View } from "react-native";
import { THEME } from "../../themes/themes";
import { BackIcon } from "../../themes/icons";

import { startLoader, endLoader } from "../../store/actions/apiAction";
import { Keyboard } from "react-native";

import { splitToDigits } from "../../splitToDigits";
import { createAction, getAction } from "../../store/actions/actionAction";
import { getAccount } from "../../store/actions/accountAction";

export const CreateActionScreen = ({ route, navigation }) => {
  const prevItem = route.params;

  const dispatch = useDispatch();

  const { profile } = useSelector((store) => store.profile);

  const { accounts } = useSelector((store) => store.account);

  const { error: actionError } = useSelector((store) => store.action);

  const accountData = accounts
    .filter((elem) => elem.profile == profile.id)
    .map((elem, index) => ({
      index,
      text: `${elem.account_name} (${splitToDigits(elem.balance)} ₽)`,
      id: elem.id,
    }));

  const { tags } = useSelector((store) => store.tag);

  const tagData = tags.map((elem, index) => ({
    index,
    text: elem.tag_name,
    id: elem.id,
  }));

  const [action_amount, setActionAmount] = React.useState(
    prevItem !== undefined ? prevItem.balance : ""
  );
  const [selectedAccountOption, setSelectedAccountOption] = React.useState(
    prevItem !== undefined
      ? accountData.findIndex((elem) => elem.id == prevItem.account)
      : null
  );
  const [selectedTagOption, setSelectedTagOption] = React.useState(
    prevItem !== undefined
      ? tagData.filter((elem) => prevItem.tags.includes(elem.id))
      : []
  );

  // Validate
  const isNotAmountEmpty = action_amount > 0;
  const isNotAccountEmpty = selectedAccountOption !== null;

  const navigateBack = () => {
    navigation.goBack();
  };

  const onSubmit = async () => {
    try {
      Keyboard.dismiss();
      dispatch(startLoader());

      const newAction = {
        action_amount,
        account:
          selectedAccountOption !== null &&
          accountData[selectedAccountOption].id,
        is_active: true,
        tags: tagData
          .filter(
            (elem) =>
              selectedTagOption !== undefined &&
              selectedTagOption.map((elem) => elem.index).includes(elem.index)
          )
          .map((elem) => elem.id),
      };

      await dispatch(createAction(newAction));

      if (actionError === null) {
        dispatch(getAccount());
        dispatch(getAction());
        navigateBack();
      }

      dispatch(endLoader());
    } catch (error) {}
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  const onSelectAccount = React.useCallback((opt) => {
    setSelectedAccountOption(opt.index);
  });

  const onSelectTag = React.useCallback((opt) => {
    setSelectedTagOption(opt);
  });

  return (
    <ScreenTemplate>
      <>
        <TopNavigation
          title="Создание дохода"
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
              value={action_amount}
              placeholder="Сумма дохода"
              keyboardType="decimal-pad"
              onChangeText={setActionAmount}
              style={{ marginVertical: 10 }}
              status={isNotAmountEmpty ? "success" : "danger"}
              caption={
                isNotAmountEmpty ? "" : "Поле не может быть пустым или меньше 0"
              }
            />
            <Select
              data={accountData}
              placeholder="Укажите счет"
              selectedOption={accountData[selectedAccountOption]}
              onSelect={onSelectAccount}
              style={{ marginVertical: 10 }}
              status={isNotAccountEmpty ? "success" : "danger"}
              caption={isNotAccountEmpty ? "" : "Поле не может быть пустым"}
            />

            <Select
              data={tagData}
              placeholder="Укажите теги"
              selectedOption={tagData.filter(
                (elem) =>
                  selectedTagOption !== undefined &&
                  selectedTagOption
                    .map((elem) => elem.index)
                    .includes(elem.index)
              )}
              onSelect={onSelectTag}
              style={{ marginVertical: 10 }}
              multiSelect={true}
            />

            <Button
              style={{
                marginVertical: 25,
                borderRadius: THEME.BUTTON_RADIUS,
              }}
              onPress={onSubmit}
              disabled={!isNotAmountEmpty || !isNotAccountEmpty}
            >
              Создать
            </Button>
          </View>
        </Layout>
      </>
    </ScreenTemplate>
  );
};
