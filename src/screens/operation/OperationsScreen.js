import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { useTheme, Layout, Text } from "@ui-kitten/components";
import { ThemeContext } from "../../themes/theme-context";

import { Toolbar } from "../../components/navigation/Toolbar";
import { ScreenTemplate } from "../../components/ScreenTemplate";
import { CustomDatePicker } from "../../components/CustomDatePicker";

import { OperationList } from "../../components/operation/OperationList";
import { View } from "react-native";

import {
  getDataDispatcher,
  clearFilterParamAction,
} from "../../store/actions/apiAction";
import { FilterIcon, ActiveFilterIcon } from "../../themes/icons";
import { BalanceComponent } from "../../components/home/BalanceComponent";

export const OperationsScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const themeContext = React.useContext(ThemeContext);
  const kittenTheme = useTheme();

  const store = useSelector((store) => store);
  const filterParam = store.layout.filterParam;

  const { startDate } = store.calendar;
  const { profile } = store.profile;
  const { company } = store.company;

  const { accounts } = store.account;

  const operationListData = store.layout.operationListData;
  const formatedOperationList = store.layout.formatedOperationList;

  const [isFiltered, setIsFiltered] = React.useState(filterParam !== null);

  const onFilterOperation = () => {
    if (isFiltered) {
      setIsFiltered(false);
      dispatch(clearFilterParamAction());
    }
  };

  React.useEffect(() => {
    setIsFiltered(filterParam !== null);
  }, [filterParam]);

  const [totalTransactions, setTotalTransactions] = React.useState(
    parseFloat(
      operationListData
        .filter((elem) => elem.type == "transaction")
        .reduce((sum, next) => (sum += +next.balance), 0)
    )
  );
  const [totalActions, setTotalActions] = React.useState(
    parseFloat(
      operationListData
        .filter((elem) => elem.type == "action")
        .reduce((sum, next) => (sum += +next.balance), 0)
    )
  );

  React.useEffect(() => {
    setTotalTransactions(
      parseFloat(
        operationListData
          .filter((elem) => elem.type == "transaction")
          .reduce((sum, next) => (sum += +next.balance), 0)
      )
    );
    setTotalActions(
      parseFloat(
        operationListData
          .filter((elem) => elem.type == "action")
          .reduce((sum, next) => (sum += +next.balance), 0)
      )
    );
  }, [isFiltered, startDate, accounts, operationListData]);

  const onOperationRefresh = () => {
    dispatch(getDataDispatcher(navigation));
  };

  return (
    <ScreenTemplate>
      {company !== null && (
        <Toolbar
          navigation={navigation}
          title={`${profile !== null && profile.is_admin ? "⭐️ " : ""}${
            company.company_name
          }`}
          TargetIcon={isFiltered ? ActiveFilterIcon : FilterIcon}
          onTarget={onFilterOperation}
        />
      )}
      <Layout
        style={{
          flex: 1,
          backgroundColor:
            kittenTheme[
              `color-basic-${themeContext.theme === "light" ? 200 : 900}`
            ],
        }}
      >
        <BalanceComponent
          transaction={totalTransactions}
          action={totalActions}
          isAdmin={profile !== null && profile.is_admin}
        />

        <View style={{ height: 30, marginTop: 10, marginBottom: 20 }}>
          <CustomDatePicker />
        </View>
        <Layout
          style={{ flex: 1, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
        >
          {formatedOperationList.length !== 0 ? (
            <OperationList
              onOperationRefresh={onOperationRefresh}
              dataList={formatedOperationList}
              navigation={navigation}
            />
          ) : (
            <Text style={{ marginTop: 15, textAlign: "center" }}>
              Операции не найдены.
            </Text>
          )}
        </Layout>
      </Layout>
    </ScreenTemplate>
  );
};
