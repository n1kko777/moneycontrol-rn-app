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

import { createActionAction } from "../../store/actions/apiAction";
import {
  clearCurrentAccount,
  setCurrentAccount,
} from "../../store/actions/accountAction";

import { THEME } from "../../themes/themes";
import { BackIcon } from "../../themes/icons";

import { ScreenTemplate } from "../../components/ScreenTemplate";
import { CustomTag } from "../../components/operation/tag/CustomTag";
import { AccountSelector } from "../../components/operation/account/AccountSelector";
import { CategorySelector } from "../../components/operation/category/CategorySelector";
import {
  clearCurrentCategory,
  setCurrentCategory,
} from "../../store/actions/categoryAction";
import {
  getApiLoading,
  getAccountCurrent,
  getCategoryCurrent,
  getTagsList,
  getAccountList,
  getCategoriesList,
} from "../../store/selectors";

export const CreateActionScreen = memo(({ route, navigation }) => {
  const prevItem = route.params;
  const amountRef = React.useRef();

  const dispatch = useDispatch();

  const loader = useSelector(getApiLoading);

  React.useEffect(() => {
    setTimeout(() => {
      amountRef.current.focus();
    }, 100);
  }, []);

  // Amount
  const [action_amount, setActionAmount] = React.useState(
    prevItem !== undefined ? prevItem.balance.toString() : ""
  );
  const isNotAmountEmpty = parseFloat(action_amount) > 0;

  // Account
  const currentAccount = useSelector(getAccountCurrent);

  const accountData = useSelector(getAccountList);

  const isNotAccountEmpty = currentAccount !== null;

  const onSelectCurrentAccount = useCallback(
    (account) => {
      dispatch(setCurrentAccount(account));
    },
    [dispatch]
  );
  const onClearCurrentAccount = useCallback(() => {
    dispatch(clearCurrentAccount());
  }, [dispatch]);

  // Category
  const currentCategory = useSelector(getCategoryCurrent);

  const categoryData = useSelector(getCategoriesList);

  const isNotCategoryEmpty = currentCategory !== null;

  const onSelectCurrentCategory = useCallback(
    (category) => {
      dispatch(setCurrentCategory(category));
    },
    [dispatch]
  );
  const onClearCurrentCategory = useCallback(() => {
    dispatch(clearCurrentCategory());
  }, [dispatch]);

  // Tag
  const tagData = useSelector(getTagsList);

  const [tagList, setTagList] = React.useState(
    prevItem !== undefined
      ? tagData.filter((elem) => prevItem.tags.includes(elem.id))
      : []
  );

  const navigateBack = useCallback(() => {
    if (currentAccount !== null) {
      dispatch(clearCurrentAccount());
    }

    if (currentCategory !== null) {
      dispatch(clearCurrentCategory());
    }
    navigation.goBack(null);
  }, [currentAccount, currentCategory, dispatch, navigation]);

  const onSubmit = useCallback(() => {
    if (!loader) {
      Keyboard.dismiss();
      const newAction = {
        action_amount: parseFloat(action_amount),
        account: currentAccount !== null ? currentAccount.id : null,
        category: currentCategory !== null ? currentCategory.id : null,
        tags: tagList.map((elem) => elem.id),
        is_active: true,
      };

      dispatch(createActionAction(newAction, navigateBack));
    }
  }, [
    loader,
    action_amount,
    currentAccount,
    currentCategory,
    tagList,
    dispatch,
    navigateBack,
  ]);

  const BackAction = useCallback(
    () => <TopNavigationAction icon={BackIcon} onPress={navigateBack} />,
    [navigateBack]
  );

  return (
    <ScreenTemplate>
      <TopNavigation
        title="Создание дохода"
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
            ref={amountRef}
            value={action_amount}
            placeholder="Сумма дохода"
            keyboardType="decimal-pad"
            onChangeText={setActionAmount}
            style={{ marginVertical: 10 }}
            status={isNotAmountEmpty ? "success" : "danger"}
            caption={
              isNotAmountEmpty ? "" : "Поле не может быть пустым или меньше 0"
            }
            selectTextOnFocus
          />
          <AccountSelector
            current={currentAccount}
            setCurrent={onSelectCurrentAccount}
            clearCurrent={onClearCurrentAccount}
            accountData={accountData}
            isNotEmpty={isNotAccountEmpty}
            navigation={navigation}
          />
          <CategorySelector
            current={currentCategory}
            setCurrent={onSelectCurrentCategory}
            clearCurrent={onClearCurrentCategory}
            categoryData={categoryData}
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
    </ScreenTemplate>
  );
});
