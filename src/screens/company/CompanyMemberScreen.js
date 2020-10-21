import React from "react";

import { useSelector, useDispatch } from "react-redux";

import { Layout, useTheme, Button } from "@ui-kitten/components";
import { ScrollView, View, RefreshControl, Alert } from "react-native";

import { ThemeContext } from "../../themes/theme-context";

import { ScreenTemplate } from "../../components/ScreenTemplate";

import { HomeList } from "../../components/home/HomeList";
import { Toolbar } from "../../components/navigation/Toolbar";
import {
  getProfileListData,
  removeProfileFromCompanyAction,
} from "../../store/actions/apiAction";
import { BackIcon } from "../../themes/icons";
import { generateHomeData } from "../../store/actions/layoutAction";

export const CompanyMemberScreen = ({ navigation, route }) => {
  const { profile } = route.params;

  const dispatch = useDispatch();

  const themeContext = React.useContext(ThemeContext);
  const kittenTheme = useTheme();

  const store = useSelector((store) => store);
  const { accounts } = store.account;
  const { homeListData: profileListData } = store.layout;

  const homeListData = profileListData.filter(
    (elem) =>
      elem.navigate !== "Team" &&
      elem.navigate !== "Tag" &&
      elem.navigate !== "Category"
  );

  homeListData.isNavigate = false;

  const refreshData = () => {
    dispatch(getProfileListData(profile.id));
  };

  const onDeleteMember = () => {
    Alert.alert(
      "Удаление сотрудника",
      `Вы уверены, что хотите удалить сотрудника ${
        profile.first_name + " " + profile.last_name
      }?`,
      [
        {
          text: "Отмена",
          style: "cancel",
        },
        {
          text: "Удалить",
          onPress: () => {
            if (
              accounts
                .filter((acc) => acc.profile == profile.id)
                .reduce((sum, next) => (sum += +next.balance), 0) == 0
            ) {
              navigation.goBack(null);
              dispatch(removeProfileFromCompanyAction(profile));
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

  const onBackHandler = () => {
    dispatch(generateHomeData());
    navigation.navigate("Home");
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
          onTarget={onBackHandler}
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
