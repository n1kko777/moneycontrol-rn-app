import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { useTheme, Layout, Text } from "@ui-kitten/components";
import { ThemeContext } from "../../themes/theme-context";

import { Toolbar } from "../../components/navigation/Toolbar";
import { ScreenTemplate } from "../../components/ScreenTemplate";
import { CustomDatePicker } from "../../components/CustomDatePicker";

import { OperationList } from "../../components/operation/OperationList";
import { View } from "react-native";

import { filterArrayByDate } from "../../filterArrayByDate";
import { prepareOperationData } from "../../prepareOperationData";

import { operationRefreshAction } from "../../store/actions/apiAction";
import { logout } from "../../store/actions/authAction";
import { FilterIcon, ActiveFilterIcon } from "../../themes/icons";
import { BalanceComponent } from "../../components/home/BalanceComponent";
import moment from "moment";

export const OperationsScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const filterParam =
    route.params !== undefined ? route.params.filterParam : null;

  const themeContext = React.useContext(ThemeContext);
  const kittenTheme = useTheme();

  const store = useSelector((store) => store);

  const { startDate, endDate } = store.calendar;

  const { profile } = store.profile;
  const { company } = store.company;

  const { accounts } = store.account;

  const { transactions } = store.transaction;
  const { actions } = store.action;
  const { transfer } = store.transfer;

  const [isFiltered, setIsFiltered] = React.useState(filterParam !== null);

  const onFilterOperation = () => {
    if (isFiltered) {
      setIsFiltered(false);
      navigation.setParams();
    }
  };

  React.useEffect(() => {
    setIsFiltered(filterParam !== null);
  }, [filterParam]);

  const operationListData = isFiltered
    ? prepareOperationData(
        company,
        filterArrayByDate(transactions, startDate, endDate),
        filterArrayByDate(actions, startDate, endDate),
        filterArrayByDate(transfer, startDate, endDate)
      ).filter((elem) => {
        switch (filterParam.type) {
          case "action":
          case "transaction":
          case "transfer":
            return elem.type === filterParam.type;

          case "tag":
            return (
              elem.tags !== undefined && elem.tags.includes(filterParam.id)
            );

          case "category":
            return (
              elem.category !== undefined && elem.category === filterParam.id
            );
          case "account":
            return (
              (elem.account !== undefined && elem.account === filterParam.id) ||
              (elem.from_account !== undefined &&
                parseInt(elem.from_account.split(" (pk=")[1]) ===
                  filterParam.id) ||
              (elem.to_account !== undefined &&
                parseInt(elem.to_account.split(" (pk=")[1]) === filterParam.id)
            );

          case "profile":
            break;

          default:
            break;
        }

        return elem;
      })
    : prepareOperationData(
        company,
        filterArrayByDate(transactions, startDate, endDate),
        filterArrayByDate(actions, startDate, endDate),
        filterArrayByDate(transfer, startDate, endDate)
      );

  const formatedOperationList = operationListData.reduce(
    (arrDate, nextItem) => {
      if (
        arrDate
          .map((el) => el.title)
          .some(
            (el) => el === moment(nextItem.last_updated).format("DD.MM.YYYY")
          )
      ) {
        return arrDate.map((itemDay) => {
          if (
            itemDay.title === moment(nextItem.last_updated).format("DD.MM.YYYY")
          ) {
            itemDay.itemList = [...itemDay.itemList, nextItem];
          }

          return itemDay;
        });
      } else {
        return [
          ...arrDate,
          {
            title: moment(nextItem.last_updated).format("DD.MM.YYYY"),
            itemList: [nextItem],
          },
        ];
      }
    },
    []
  );

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
    dispatch(operationRefreshAction());
  };

  React.useEffect(() => {
    if (company === undefined) {
      navigation.navigate("Login");
      dispatch(logout());
    }
  }, [company]);

  return (
    <ScreenTemplate>
      {company !== undefined && (
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
