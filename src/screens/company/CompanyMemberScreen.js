import React from "react";

import { useSelector, useDispatch } from "react-redux";

import { Layout, useTheme, Button } from "@ui-kitten/components";
import { ScrollView, View, RefreshControl, Alert } from "react-native";

import { ThemeContext } from "../../themes/theme-context";

import { ScreenTemplate } from "../../components/ScreenTemplate";

import { HomeList } from "../../components/home/HomeList";
import { Toolbar } from "../../components/navigation/Toolbar";

import { prepareHomeData } from "../../prepareHomeData";

import { filterArrayByDate } from "../../filterArrayByDate";
import { removeProfileFromCompany } from "../../store/actions/companyAction";

import {
  getDataDispatcher,
  startLoader,
  endLoader,
} from "../../store/actions/apiAction";
import { BackIcon } from "../../themes/icons";

export const CompanyMemberScreen = ({ navigation, route }) => {
  const { profile } = route.params;

  const dispatch = useDispatch();

  const themeContext = React.useContext(ThemeContext);
  const kittenTheme = useTheme();

  const state = useSelector((state) => state);

  const { startDate, endDate } = state.calendar;

  const { company } = state.company;
  const { accounts } = state.account;
  const { transactions } = state.transaction;
  const { actions } = state.action;
  const { transfer } = state.transfer;

  const homeListData = prepareHomeData(
    profile,
    company,
    accounts,
    filterArrayByDate(
      transactions.filter(
        (oper) => oper.profile_name.match(/\d+/).pop() == profile.id
      ),
      startDate,
      endDate
    ),
    filterArrayByDate(
      actions.filter(
        (oper) => oper.profile_name.match(/\d+/).pop() == profile.id
      ),
      startDate,
      endDate
    ),
    filterArrayByDate(
      transfer.filter(
        (oper) => oper.from_profile.match(/\d+/).pop() == profile.id
      ),
      startDate,
      endDate
    )
  ).filter((elem) => elem.navigate !== "Team");

  homeListData.isNavigate = false;

  const refreshData = async () => {
    dispatch(startLoader());
    await dispatch(getDataDispatcher());
    dispatch(endLoader());
  };

  const onDeleteMember = () => {
    Alert.alert(
      "Удаление сотрудника",
      `Вы уверены что хотите удалить сотрудника ${
        profile.first_name + " " + profile.last_name
      }?`,
      [
        {
          text: "Отмена",
          style: "cancel",
        },
        {
          text: "Удалить",
          onPress: async () => {
            if (
              accounts
                .filter((acc) => acc.profile == profile.id)
                .reduce((sum, next) => (sum += +next.balance), 0) == 0
            ) {
              navigation.goBack();
              await dispatch(startLoader());
              await removeProfileFromCompany(profile.id, profile.phone)
                .then((res) => {
                  Alert.alert(
                    "Статус запроса",
                    res.data.detail,
                    [{ text: "OK" }],
                    {
                      cancelable: false,
                    }
                  );
                })
                .catch((err) => {
                  Alert.alert(
                    "Статус запроса",
                    err.response.data.detail,
                    [{ text: "OK" }],
                    {
                      cancelable: false,
                    }
                  );
                });
              await dispatch(endLoader());
            } else {
              Alert.alert(
                "Невозможно удалить сотрудника",
                "Баланс сотрудника должен быть равен 0!",
                [{ text: "OK" }],
                {
                  cancelable: false,
                }
              );
            }
          },
        },
      ],
      {
        cancelable: false,
      }
    );
  };

  return (
    <ScreenTemplate>
      <Layout
        style={{
          backgroundColor:
            kittenTheme[
              `color-basic-${themeContext.theme === "light" ? 200 : 900}`
            ],
        }}
      >
        <Toolbar
          navigation={navigation}
          title={profile.first_name + " " + profile.last_name}
          TargetIcon={BackIcon}
          onTarget={() => navigation.navigate("Home")}
          isMenu={false}
        />
      </Layout>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={refreshData}
            tintColor="transparent"
          />
        }
        style={{
          flex: 1,
          backgroundColor:
            kittenTheme[
              `color-basic-${themeContext.theme === "light" ? 200 : 900}`
            ],
        }}
      >
        <View onStartShouldSetResponder={() => true}>
          <HomeList navigation={navigation} dataList={homeListData} />
          {!profile.is_admin && (
            <Button
              onPress={onDeleteMember}
              style={{ margin: 8 }}
              status="danger"
            >
              Удалить сотрудника
            </Button>
          )}
        </View>
      </ScrollView>
    </ScreenTemplate>
  );
};
