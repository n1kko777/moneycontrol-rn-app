import React from "react";

import { useSelector, useDispatch } from "react-redux";

import { Layout, useTheme } from "@ui-kitten/components";
import { ScrollView, View, RefreshControl } from "react-native";

import { ThemeContext } from "../../themes/theme-context";

import { ScreenTemplate } from "../../components/ScreenTemplate";

import { HomeList } from "../../components/home/HomeList";
import { Toolbar } from "../../components/navigation/Toolbar";

import { prepareHomeData } from "../../prepareHomeData";

import { filterArrayByDate } from "../../filterArrayByDate";

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
        </View>
      </ScrollView>
    </ScreenTemplate>
  );
};
