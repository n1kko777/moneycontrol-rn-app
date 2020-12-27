import React, { memo, useCallback } from "react";
import { View, Keyboard } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import {
  Layout,
  TopNavigation,
  TopNavigationAction,
  Input,
  Button,
} from "@ui-kitten/components";

import { THEME } from "../../themes/themes";
import { BackIcon } from "../../themes/icons";

import { createTransactionAction } from "../../store/actions/apiAction";
import { clearCurrentAccount } from "../../store/actions/accountAction";

import { ScreenTemplate } from "../../components/ScreenTemplate";
import { CustomTag } from "../../components/operation/tag/CustomTag";
import { AccountSelector } from "../../components/operation/account/AccountSelector";
import { CategorySelector } from "../../components/operation/category/CategorySelector";
import { clearCurrentCategory } from "../../store/actions/categoryAction";

export const CreateTransactionScreen = memo(({ route, navigation }) => {
  const prevItem = route.params;
  const amountRef = React.useRef();
  const store = useSelector((store) => store);
  const loader = store.api.loader;

  const currentAccount = store.account.current;
  const currentCateory = store.category.current;

  React.useEffect(() => {
    setTimeout(() => {
      amountRef.current.focus();
    }, 100);
  }, []);

  const dispatch = useDispatch();

  // Amount
  const [transaction_amount, setTransactionAmount] = React.useState(
    prevItem !== undefined ? prevItem.balance.toString() : ""
  );
  const isNotAmountEmpty = parseFloat(transaction_amount) > 0;

  // Account
  const [selectedAccountId, setSelectedAccountId] = React.useState(
    prevItem !== undefined ? prevItem.account : null
  );
  const isNotAccountEmpty = selectedAccountId !== null;

  // Category
  const [selectedCategoryId, setSelectedCategoryId] = React.useState(
    prevItem !== undefined ? prevItem.category : null
  );
  const isNotCategoryEmpty = selectedCategoryId !== null;

  // Tag
  const { tags } = store.tag;
  const tagData = tags.map((elem) => ({
    title: elem.tag_name,
    id: elem.id,
  }));

  const [tagList, setTagList] = React.useState(
    prevItem !== undefined
      ? tagData.filter((elem) => prevItem.tags.includes(elem.id))
      : []
  );

  const onSubmit = useCallback(() => {
    if (!loader) {
      Keyboard.dismiss();
      const newTransaction = {
        transaction_amount: parseFloat(transaction_amount),
        account: selectedAccountId,
        category: selectedCategoryId,
        tags: tagList.map((elem) => elem.id),
        is_active: true,
      };

      dispatch(createTransactionAction(newTransaction, navigateBack));
    }
  }, [transaction_amount, selectedAccountId, selectedCategoryId, tagList]);

  const navigateBack = useCallback(() => {
    currentAccount && dispatch(clearCurrentAccount());
    currentCateory && dispatch(clearCurrentCategory());
    navigation.goBack(null);
  }, [currentAccount, currentCateory]);

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

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
              navigation={navigation}
            />
            <CategorySelector
              selectedId={selectedCategoryId}
              setSelectedId={setSelectedCategoryId}
              isNotEmpty={isNotCategoryEmpty}
              navigation={navigation}
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
});
