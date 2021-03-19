import React, { memo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useTheme, Layout } from "@ui-kitten/components";
import { View } from "react-native";
import { ThemeContext } from "../../themes/theme-context";

import { Toolbar } from "../../components/navigation/Toolbar";
import { ScreenTemplate } from "../../components/ScreenTemplate";
import { CustomDatePicker } from "../../components/CustomDatePicker";

import { OperationList } from "../../components/operation/OperationList";

import { getDataDispatcher } from "../../store/actions/apiAction";
import { FilterIcon, ActiveFilterIcon } from "../../themes/icons";
import { BalanceComponent } from "../../components/home/BalanceComponent";
import {
  getLayoutFilterParams,
  getLayoutOperationListData,
} from "../../store/selectors";

export const OperationsScreen = memo(({ navigation }) => {
  const dispatch = useDispatch();

  const themeContext = React.useContext(ThemeContext);
  const kittenTheme = useTheme();

  const operationListData = useSelector(getLayoutOperationListData);
  const filterParams = useSelector(getLayoutFilterParams);

  const navigateFilter = useCallback(() => {
    navigation.navigate("FilterOperation");
  }, [navigation]);

  const onRefreshHandler = useCallback(() => {
    dispatch(getDataDispatcher(navigation));
  }, [dispatch, navigation]);

  return (
    <ScreenTemplate>
      <Toolbar
        navigation={navigation}
        TargetIcon={filterParams !== null ? ActiveFilterIcon : FilterIcon}
        onTarget={navigateFilter}
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
        <BalanceComponent />
        <View style={{ height: 30, marginTop: 10, marginBottom: 20 }}>
          <CustomDatePicker />
        </View>
        <Layout
          style={{
            flex: 1,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
        >
          <OperationList
            navigation={navigation}
            dataList={operationListData}
            onOperationRefresh={onRefreshHandler}
          />
        </Layout>
      </Layout>
    </ScreenTemplate>
  );
});
