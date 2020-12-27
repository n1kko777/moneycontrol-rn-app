import React, { memo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useTheme, Layout, Text } from "@ui-kitten/components";
import { ThemeContext } from "../../themes/theme-context";

import { Toolbar } from "../../components/navigation/Toolbar";
import { ScreenTemplate } from "../../components/ScreenTemplate";
import { CustomDatePicker } from "../../components/CustomDatePicker";

import { OperationList } from "../../components/operation/OperationList";
import { View } from "react-native";

import {
  clearFilterParamAction,
  getDataDispatcher,
} from "../../store/actions/apiAction";
import { FilterIcon, ActiveFilterIcon } from "../../themes/icons";
import { BalanceComponent } from "../../components/home/BalanceComponent";

export const OperationsScreen = memo(({ navigation }) => {
  const dispatch = useDispatch();

  const themeContext = React.useContext(ThemeContext);
  const kittenTheme = useTheme();

  const store = useSelector((store) => store);

  const {
    filterParam,
    operationListData,
    filteredOperationListData,
  } = store.layout;

  const [isFiltered, setIsFiltered] = React.useState(filterParam !== null);

  const onClearFilter = useCallback(() => {
    if (isFiltered) {
      setIsFiltered(false);
      dispatch(clearFilterParamAction());
    }
  }, [isFiltered]);

  React.useEffect(() => {
    setIsFiltered(filterParam !== null);
  }, [filterParam]);

  const onRefreshHandler = useCallback(() => {
    dispatch(getDataDispatcher(navigation));
  }, []);

  return (
    <ScreenTemplate>
      {
        <Toolbar
          navigation={navigation}
          TargetIcon={isFiltered ? ActiveFilterIcon : FilterIcon}
          onTarget={onClearFilter}
        />
      }
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
          style={{ flex: 1, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
        >
          <OperationList
            navigation={navigation}
            dataList={
              isFiltered ? filteredOperationListData : operationListData
            }
            onOperationRefresh={onRefreshHandler}
          />
        </Layout>
      </Layout>
    </ScreenTemplate>
  );
});
