import React, { memo, useCallback } from "react";

import { useSelector, useDispatch } from "react-redux";

import { Layout, useTheme } from "@ui-kitten/components";

import { ScrollView, View, RefreshControl } from "react-native";
import { ThemeContext } from "../themes/theme-context";

import { ScreenTemplate } from "../components/ScreenTemplate";

import { BalanceComponent } from "../components/home/BalanceComponent";
import { HomeList } from "../components/home/HomeList";
import { Toolbar } from "../components/navigation/Toolbar";

import { CustomDatePicker } from "../components/CustomDatePicker";

import { getDataDispatcher } from "../store/actions/apiAction";
import { getLayoutHomeListData } from "../store/selectors";

export const HomeScreen = memo(({ navigation }) => {
  const dispatch = useDispatch();

  const themeContext = React.useContext(ThemeContext);
  const kittenTheme = useTheme();

  const homeListData = useSelector(getLayoutHomeListData);
  homeListData.isNavigate = true;

  const refreshData = useCallback(() => {
    dispatch(getDataDispatcher(navigation));
  }, [dispatch, navigation]);

  React.useEffect(() => {
    refreshData();
  }, [refreshData]);

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
        <Toolbar navigation={navigation} />
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
          <BalanceComponent isBalance />

          <View style={{ height: 30, marginVertical: 10 }}>
            <CustomDatePicker />
          </View>

          <HomeList navigation={navigation} dataList={homeListData} />
        </View>
      </ScrollView>
    </ScreenTemplate>
  );
});
