import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { useTheme, Layout, Text } from "@ui-kitten/components";
import { ThemeContext } from "../themes/theme-context";

import { Toolbar } from "../components/navigation/Toolbar";
import { ScreenTemplate } from "../components/ScreenTemplate";

import { startLoader, endLoader } from "../store/actions/apiAction";
import { getTransaction } from "../store/actions/transactionAction";
import { getAction } from "../store/actions/actionAction";
import { getTransfer } from "../store/actions/transferAction";
import { CustomDatePicker } from "../components/CustomDatePicker";

import { OperationList } from "../components/operation/OperationList";
import { View } from "react-native";

import { filterArrayByDate } from "../filterArrayByDate";
import { prepareOperationData } from "../prepareOperationData";

export const OperationsScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const themeContext = React.useContext(ThemeContext);
  const kittenTheme = useTheme();

  const state = useSelector(state => state);

  const { startDate, endDate } = state.calendar;

  const { profile } = state.profile;
  const { company } = state.company;

  const { transactions } = state.transaction;
  const { actions } = state.action;
  const { transfer } = state.transfer;

  const { categories } = state.category;
  const { tags } = state.tag;

  const getDataHandler = async () => {
    dispatch(startLoader());
    await Promise.all([
      dispatch(getTransaction()),
      dispatch(getAction()),
      dispatch(getTransfer())
    ]);

    dispatch(endLoader());
  };

  const operationListData = prepareOperationData(
    company,
    filterArrayByDate(transactions, startDate, endDate),
    filterArrayByDate(actions, startDate, endDate),
    filterArrayByDate(transfer, startDate, endDate)
  );

  return (
    <ScreenTemplate>
      <Toolbar
        navigation={navigation}
        title={`${profile.is_admin ? "⭐️ " : ""}${company.company_name}`}
        getData={getDataHandler}
      />
      <Layout
        style={{
          flex: 1,
          backgroundColor:
            kittenTheme[
              `color-basic-${themeContext.theme === "light" ? 200 : 900}`
            ]
        }}
      >
        <View style={{ height: 30, marginVertical: 20 }}>
          <CustomDatePicker />
        </View>
        <Layout
          style={{ flex: 1, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
        >
          <OperationList
            categories={categories}
            tags={tags}
            dataList={operationListData}
          />
        </Layout>
      </Layout>
    </ScreenTemplate>
  );
};
