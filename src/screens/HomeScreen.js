import React, { useEffect, useState } from "react";
import {
  Layout,
  Icon,
  TopNavigation,
  TopNavigationAction,
  OverflowMenu,
  useTheme
} from "@ui-kitten/components";
import { ThemeContext } from "../themes/theme-context";

import { ScreenTemplate } from "../components/ScreenTemplate";
import { BalanceComponent } from "../components/BalanceComponent";
import { useSelector, useDispatch } from "react-redux";
import { getCompany } from "../store/actions/companyAction";
import { logout } from "../store/actions/authAction";
import { Alert } from "react-native";

const ProfileIcon = style => <Icon {...style} name="person-outline" />;

const LogoutIcon = style => <Icon {...style} name="logout" pack="assets" />;

const MenuIcon = style => <Icon {...style} name="more-vertical" />;

const LightIcon = style => <Icon {...style} name="sun-outline" />;
const DarkIcon = style => <Icon {...style} name="moon-outline" />;

const ProfileAction = props => (
  <TopNavigationAction {...props} icon={ProfileIcon} />
);

export const HomeScreen = ({ navigation }) => {
  const themeContext = React.useContext(ThemeContext);
  const kittenTheme = useTheme();

  // console.log("kittenTheme :", kittenTheme);

  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const { company } = state.company;

  const getData = async () => {
    await dispatch(getCompany());
  };

  useEffect(() => {
    getData();
  }, [dispatch]);

  const logoutHandler = async () => {
    await dispatch(logout()).then(() => {
      navigation.navigate("Login");
    });
  };

  const navigateLogout = () => {
    Alert.alert(
      "Выход",
      "Вы уверены что хотите выйти из учетной записи?",
      [
        {
          text: "Отмена",
          style: "cancel"
        },
        { text: "Выйти", onPress: logoutHandler }
      ],
      {
        cancelable: false
      }
    );
  };

  const [menuVisible, setMenuVisible] = React.useState(false);

  const menuData = [
    {
      title: `${themeContext.theme === "light" ? "Темная" : "Светлая"} тема`,
      icon: themeContext.theme === "light" ? DarkIcon : LightIcon
    },
    {
      title: "Выйти",
      icon: LogoutIcon
    }
  ];

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const onMenuItemSelect = index => {
    switch (index) {
      case 0:
        themeContext.toggleTheme();
        break;
      case 1:
        navigateLogout();
        break;

      default:
        break;
    }

    setMenuVisible(false);
  };

  const renderMenuAction = () => (
    <OverflowMenu
      visible={menuVisible}
      data={menuData}
      onSelect={onMenuItemSelect}
      onBackdropPress={toggleMenu}
    >
      <TopNavigationAction icon={MenuIcon} onPress={toggleMenu} />
    </OverflowMenu>
  );

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
