import React from "react";
import { View, Keyboard } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import {
  Layout,
  TopNavigation,
  TopNavigationAction,
  Input,
  Button,
} from "@ui-kitten/components";

import { startLoader, endLoader } from "../../store/actions/apiAction";
import { createAction, getAction } from "../../store/actions/actionAction";
import { getAccount } from "../../store/actions/accountAction";

import { THEME } from "../../themes/themes";
import { BackIcon } from "../../themes/icons";

import { ScreenTemplate } from "../../components/ScreenTemplate";
import { CustomTag } from "../../components/operation/tag/CustomTag";
import { AccountSelector } from "../../components/operation/account/AccountSelector";
import { CategorySelector } from "../../components/operation/category/CategorySelector";

export const CreateActionScreen = ({ route, navigation }) => {
  const prevItem = route.params;
  const amountRef = React.useRef();
  const loader = useSelector((store) => store.api.loader);

  React.useEffect(() => {
    setTimeout(() => {
      amountRef.current.focus();
    }, 100);
  }, []);

  const dispatch = useDispatch();
  const { error: actionError } = useSelector((store) => store.action);

  // Amount
  const [action_amount, setActionAmount] = React.useState(
    prevItem !== undefined ? prevItem.balance : ""
  );
  const isNotAmountEmpty = parseFloat(action_amount) > 0;

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
  const { tags } = useSelector((store) => store.tag);

  const tagData = tags.map((elem) => ({
    title: elem.tag_name,
    id: elem.id,
  }));

  const [tagList, setTagList] = React.useState(
    prevItem !== undefined
      ? tagData.filter((elem) => prevItem.tags.includes(elem.id))
      : []
  );

  const onSubmit = async () => {
    if (!loader) {
      try {
        Keyboard.dismiss();
        dispatch(startLoader());

        const newAction = {
          action_amount: parseFloat(action_amount),
          account: selectedAccountId,
          category: selectedCategoryId,
          tags: tagList.map((elem) => elem.id),
          is_active: true,
        };

        await dispatch(createAction(newAction));

        if (actionError === null) {
          dispatch(getAccount());
          dispatch(getAction());
          navigateBack();
        }

        dispatch(endLoader());
      } catch (error) {}
    }
  };

  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

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
};
