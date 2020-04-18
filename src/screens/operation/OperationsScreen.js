import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { useTheme, Layout } from "@ui-kitten/components";
import { ThemeContext } from "../../themes/theme-context";

import { Toolbar } from "../../components/navigation/Toolbar";
import { ScreenTemplate } from "../../components/ScreenTemplate";
import { CustomDatePicker } from "../../components/CustomDatePicker";

import { OperationList } from "../../components/operation/OperationList";
import { View } from "react-native";

import { filterArrayByDate } from "../../filterArrayByDate";
import { prepareOperationData } from "../../prepareOperationData";

import { startLoader, endLoader } from "../../store/actions/apiAction";
import { getAction } from "../../store/actions/actionAction";
import { getTransfer } from "../../store/actions/transferAction";
import { getTransaction } from "../../store/actions/transactionAction";

export const OperationsScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const themeContext = React.useContext(ThemeContext);
  const kittenTheme = useTheme();

  const state = useSelector((state) => state);

  const { startDate, endDate } = state.calendar;

  const { profile } = state.profile;
  const { company } = state.company;

  const { transactions } = state.transaction;
  const { actions } = state.action;
  const { transfer } = state.transfer;

  const operationListData = prepareOperationData(
    company,
    filterArrayByDate(transactions, startDate, endDate),
    filterArrayByDate(actions, startDate, endDate),
    filterArrayByDate(transfer, startDate, endDate)
  );

  const onOperationRefresh = async () => {
    dispatch(startLoader());
    await Promise.all([
      dispatch(getAction()),
      dispatch(getTransfer()),
      dispatch(getTransaction()),
    ]);
    dispatch(endLoader());
  };

  return (
    <ScreenTemplate>
      <Toolbar
        navigation={navigation}
        title={`${profile !== null && profile.is_admin ? "⭐️ " : ""}${
          company.company_name
        }`}
      />
      <Layout
        style={{
          flex: 1,
          backgroundColor:
            kittenTheme[
              `color-basic-${themeContext.theme === "light" ? 200 : 900}`
            ],
        }}
      >
        <View style={{ height: 30, marginVertical: 20 }}>
          <CustomDatePicker />
        </View>
        <Layout
          style={{ flex: 1, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
        >
          <OperationList
            onOperationRefresh={onOperationRefresh}
            dataList={operationListData}
            navigation={navigation}
          />
        </Layout>
      </Layout>
    </ScreenTemplate>
  );
};
