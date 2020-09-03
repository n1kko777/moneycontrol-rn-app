import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { useTheme, Layout, Text } from "@ui-kitten/components";
import { ThemeContext } from "../../themes/theme-context";

import { Toolbar } from "../../components/navigation/Toolbar";
import { ScreenTemplate } from "../../components/ScreenTemplate";
import { CustomDatePicker } from "../../components/CustomDatePicker";

import { OperationList } from "../../components/operation/OperationList";
import { View } from "react-native";

import { clearFilterParamAction } from "../../store/actions/apiAction";
import { FilterIcon, ActiveFilterIcon } from "../../themes/icons";
import { BalanceComponent } from "../../components/home/BalanceComponent";

export const OperationsScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const themeContext = React.useContext(ThemeContext);
  const kittenTheme = useTheme();

  const store = useSelector((store) => store);

  const { filterParam } = store.layout;

  const { profile } = store.profile;
  const { company } = store.company;

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

  return (
    <ScreenTemplate>
      {
        <Toolbar
          navigation={navigation}
          title={`${profile !== null && profile.is_admin ? "⭐️ " : ""}${
            company !== null ? company.company_name : ""
          }`}
          TargetIcon={isFiltered ? ActiveFilterIcon : FilterIcon}
          onTarget={onFilterOperation}
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
          <OperationList navigation={navigation} />
        </Layout>
      </Layout>
    </ScreenTemplate>
  );
};
