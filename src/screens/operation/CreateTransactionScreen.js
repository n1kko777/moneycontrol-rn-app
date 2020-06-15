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
import {
  createTransaction,
  getTransaction,
} from "../../store/actions/transactionAction";
import { getAccount } from "../../store/actions/accountAction";

export const CreateTransactionScreen = ({ route, navigation }) => {
  const prevItem = route.params;

  const dispatch = useDispatch();

  const { profile } = useSelector((store) => store.profile);

  const { accounts } = useSelector((store) => store.account);

  const { error: transactionError } = useSelector((store) => store.transaction);

  const accountData = accounts
    .filter((elem) => elem.profile == profile.id)
    .map((elem, index) => ({
      index,
      text: `${elem.account_name} (${splitToDigits(elem.balance)} ₽)`,
      id: elem.id,
    }));

  const { categories } = useSelector((store) => store.category);

  const categoriesData = categories.map((elem, index) => ({
    index,
    text: elem.category_name,
    id: elem.id,
  }));

  const { tags } = useSelector((store) => store.tag);

  const tagData = tags.map((elem, index) => ({
    index,
    text: elem.tag_name,
    id: elem.id,
  }));

  const [transaction_amount, setTransactionAmount] = React.useState(
    prevItem !== undefined ? prevItem.balance : ""
  );
  const [selectedAccountOption, setSelectedAccountOption] = React.useState(
    prevItem !== undefined
      ? accountData.findIndex((elem) => elem.id == prevItem.account)
      : null
  );
  const [selectedCategoryOption, setSelectedCategoryOption] = React.useState(
    prevItem !== undefined
      ? categoriesData.findIndex((elem) => elem.id == prevItem.category)
      : null
  );
  const [selectedTagOption, setSelectedTagOption] = React.useState(
    prevItem !== undefined
      ? tagData.filter((elem) => prevItem.tags.includes(elem.id))
      : []
  );

  // Validate
  const isNotAmountEmpty = transaction_amount > 0;
  const isNotAccountEmpty = selectedAccountOption !== null;
  const isNotCategoryEmpty = selectedCategoryOption !== null;

  const navigateBack = () => {
    navigation.goBack();
  };

  const onSubmit = async () => {
    try {
      Keyboard.dismiss();
      dispatch(startLoader());

      const newTransaction = {
        transaction_amount,
        account:
          selectedAccountOption !== null &&
          accountData[selectedAccountOption].id,
        category:
          selectedCategoryOption !== null &&
          categoriesData[selectedCategoryOption].id,
        is_active: true,
        tags: tagData
          .filter(
            (elem) =>
              selectedTagOption !== undefined &&
              selectedTagOption.map((elem) => elem.index).includes(elem.index)
          )
          .map((elem) => elem.id),
      };

      await dispatch(createTransaction(newTransaction));

      if (transactionError === null) {
        dispatch(getAccount());
        dispatch(getTransaction());
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

  const onSelectCategory = React.useCallback((opt) => {
    setSelectedCategoryOption(opt.index);
  });

  const onSelectTag = React.useCallback((opt) => {
    setSelectedTagOption(opt);
  });

  return (
    <ScreenTemplate>
      <>
        <TopNavigation
          title="Создание расхода"
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
              value={transaction_amount}
              placeholder="Сумма расхода"
              keyboardType="decimal-pad"
              onChangeText={setTransactionAmount}
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
              data={categoriesData}
              placeholder="Укажите категорию"
              selectedOption={categoriesData[selectedCategoryOption]}
              onSelect={onSelectCategory}
              style={{ marginVertical: 10 }}
              status={isNotCategoryEmpty ? "success" : "danger"}
              caption={isNotCategoryEmpty ? "" : "Поле не может быть пустым"}
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
              disabled={
                !isNotAmountEmpty || !isNotAccountEmpty || !isNotCategoryEmpty
              }
            >
              Создать
            </Button>
          </View>
        </Layout>
      </>
    </ScreenTemplate>
  );
};
