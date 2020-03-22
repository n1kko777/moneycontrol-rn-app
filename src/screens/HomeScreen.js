import React, { useEffect } from "react";
import {
  Layout,
  Icon,
  TopNavigation,
  TopNavigationAction,
  useTheme
} from "@ui-kitten/components";
import { ThemeContext } from "../themes/theme-context";

import { ScreenTemplate } from "../components/ScreenTemplate";
import { BalanceComponent } from "../components/BalanceComponent";
import { MenuOptions } from "../components/MenuOptions";

import { useSelector, useDispatch } from "react-redux";
import { getCompany } from "../store/actions/companyAction";

const ProfileIcon = style => <Icon {...style} name="person-outline" />;

const ProfileAction = props => (
  <TopNavigationAction {...props} icon={ProfileIcon} />
);

export const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const themeContext = React.useContext(ThemeContext);
  const kittenTheme = useTheme();

  const state = useSelector(state => state);
  const { company } = state.company;

  const getData = async () => {
    await dispatch(getCompany());
  };

  useEffect(() => {
    getData();
  }, [dispatch]);

  const renderMenuAction = () => <MenuOptions navigation={navigation} />;

  const renderProfileAction = () => <ProfileAction onPress={() => {}} />;

  return (
    <ScreenTemplate>
      <Layout
        style={{
          flex: 1,
          backgroundColor:
            kittenTheme[
              `color-basic-${themeContext.theme === "light" ? 200 : 900}`
            ]
        }}
      >
        <TopNavigation
          style={{ position: "relative", zIndex: 10, elevation: 5 }}
          title={company.company_name}
          alignment="center"
          leftControl={renderProfileAction()}
          rightControls={renderMenuAction()}
        />
        <BalanceComponent />
        <Layout
          style={{
            flex: 1,
            backgroundColor:
              kittenTheme[
                `color-basic-${themeContext.theme === "light" ? 200 : 900}`
              ],
            justifyContent: "center",
            alignItems: "center"
          }}
        ></Layout>
      </Layout>
    </ScreenTemplate>
  );
};
