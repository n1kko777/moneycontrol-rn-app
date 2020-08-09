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

import {
  createTransaction,
  getTransaction,
} from "../../store/actions/transactionAction";
import { getAccount } from "../../store/actions/accountAction";
import { CustomTag } from "../../components/operation/tag/CustomTag";
import { AccountSelector } from "../../components/operation/account/AccountSelector";

export const CreateTransactionScreen = ({ route, navigation }) => {
  const prevItem = route.params;
  const amountRef = React.useRef();

  React.useEffect(() => {
    amountRef.current.focus();
  }, []);

  const dispatch = useDispatch();

  const { error: transactionError } = useSelector((store) => store.transaction);

  const { categories } = useSelector((store) => store.category);

  const categoriesData = categories.map((elem, index) => ({
    index,
    text: elem.category_name,
    id: elem.id,
  }));

  const { tags } = useSelector((store) => store.tag);

  const tagData = tags.map((elem, index) => ({
    index,
    title: elem.tag_name,
    id: elem.id,
  }));

  const [transaction_amount, setTransactionAmount] = React.useState(
    prevItem !== undefined ? prevItem.balance : ""
  );

  const [selectedAccountId, setSelectedAccountId] = React.useState(
    prevItem !== undefined ? prevItem.account : null
  );
  const isNotAccountEmpty = selectedAccountId !== null;

  const [selectedCategoryOption, setSelectedCategoryOption] = React.useState(
    prevItem !== undefined
      ? categoriesData.findIndex((elem) => elem.id == prevItem.category)
      : null
  );
  const [tagList, setTagList] = React.useState(
    prevItem !== undefined
      ? tagData.filter((elem) => prevItem.tags.includes(elem.id))
      : []
  );

  // Validate
  const isNotAmountEmpty = parseFloat(transaction_amount) > 0;
  const isNotCategoryEmpty = selectedCategoryOption !== null;

  const navigateBack = () => {
    navigation.goBack();
  };

  const onSubmit = async () => {
    try {
      Keyboard.dismiss();
      dispatch(startLoader());

      const newTransaction = {
        transaction_amount: parseFloat(transaction_amount),
        account: selectedAccountId,
        category:
          selectedCategoryOption !== null &&
          categoriesData[selectedCategoryOption].id,
        is_active: true,
        tags: tagList.map((elem) => elem.id),
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

  const onSelectCategory = React.useCallback((opt) => {
    setSelectedCategoryOption(opt.index);
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
              ref={amountRef}
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
            <AccountSelector
              selectedId={selectedAccountId}
              setSelectedId={setSelectedAccountId}
              isNotEmpty={isNotAccountEmpty}
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

            <CustomTag
              tagData={tagData}
              tagList={tagList}
              setTagList={setTagList}
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
