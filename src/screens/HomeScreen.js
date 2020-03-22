import React, { useEffect, useState } from "react";
import {
  Button,
  Divider,
  Layout,
  Icon,
  Text,
  TopNavigation,
  TopNavigationAction,
  OverflowMenu,
  useTheme,
  ListItem
} from "@ui-kitten/components";
import { ThemeContext } from "../themes/theme-context";

import { ScreenTemplate } from "../components/ScreenTemplate";

import { THEME } from "../themes/themes";
import { useSelector, useDispatch } from "react-redux";
import { getCompany } from "../store/actions/companyAction";
import { logout } from "../store/actions/authAction";
import { Alert, View, StyleSheet } from "react-native";

const ProfileIcon = style => <Icon {...style} name="person-outline" />;

const LogoutIcon = style => <Icon {...style} name="logout" pack="assets" />;

const MenuIcon = style => <Icon {...style} name="more-vertical" />;

const InfoIcon = style => <Icon {...style} name="info" />;

const HideIconBalance = style => <Icon name="eye-outline" {...style} />;
const ShowIconBalance = style => <Icon name="eye-off-outline" {...style} />;

const IncreaseIcon = style => (
  <Icon {...style} width={26} height={26} name="arrow-upward-outline" />
);
const DecreaseIcon = style => (
  <Icon {...style} width={26} height={26} name="arrow-downward-outline" />
);

const ProfileAction = props => (
  <TopNavigationAction {...props} icon={ProfileIcon} />
);

export const HomeScreen = ({ navigation }) => {
  const themeContext = React.useContext(ThemeContext);
  const kittenTheme = useTheme();

  // console.log("kittenTheme :", kittenTheme);

  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const { user } = state.auth;
  const { profile } = state.profile;
  const { company } = state.company;

  const [isVisibleBalance, setIsVisibleBalance] = useState(true);

  // console.log("HOME: company :", company);
  // console.log("HOME: profile :", profile);
  // console.log("HOME: user :", user);

  useEffect(() => {
    dispatch(getCompany());
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
      title: "About",
      icon: InfoIcon
    },
    {
      title: "Logout",
      icon: LogoutIcon
    }
  ];

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const onMenuItemSelect = index => {
    if (index === 1) {
      navigateLogout();
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

  const toggleVisibleBalance = () => {
    setIsVisibleBalance(!isVisibleBalance);
  };

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
          title={company.company_name}
          alignment="center"
          leftControl={renderProfileAction()}
          rightControls={renderMenuAction()}
        />
        <View
          style={{
            ...styles.balanceContainer,
            backgroundColor:
              kittenTheme[
                `color-basic-${themeContext.theme === "light" ? 100 : 800}`
              ]
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 12, textAlign: "center" }}>
              Баланс счетов
            </Text>
            {isVisibleBalance ? (
              <Text
                style={{ fontWeight: "600", textAlign: "center" }}
                category="h2"
              >
                1,000 ₽
              </Text>
            ) : (
              <View
                style={{
                  ...styles.hideBalance,
                  marginVertical: 20,
                  width: 100,
                  backgroundColor: kittenTheme["color-basic-600"]
                }}
              />
            )}
            <Button
              size="large"
              appearance="ghost"
              icon={!isVisibleBalance ? ShowIconBalance : HideIconBalance}
              onPress={toggleVisibleBalance}
            ></Button>
          </View>

          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <View style={styles.creaseItem}>
              <Button
                status="success"
                style={styles.creaseButton}
                icon={IncreaseIcon}
              />
              <View>
                <Text style={{ fontSize: 12 }}>Доход</Text>
                {isVisibleBalance ? (
                  <Text
                    style={{
                      fontWeight: "600",
                      color: kittenTheme["color-success-600"]
                    }}
                    category="h5"
                  >
                    0,00 ₽
                  </Text>
                ) : (
                  <View
                    style={{
                      ...styles.hideBalance,
                      marginVertical: 11,
                      backgroundColor: kittenTheme["color-basic-600"]
                    }}
                  />
                )}
              </View>
            </View>
            <View style={styles.creaseItem}>
              <Button
                status="danger"
                style={styles.creaseButton}
                icon={DecreaseIcon}
              />
              <View>
                <Text style={{ fontSize: 12 }}>Расход</Text>
                {isVisibleBalance ? (
                  <Text
                    style={{
                      fontWeight: "600",
                      color: kittenTheme["color-danger-600"]
                    }}
                    category="h5"
                  >
                    0,00 ₽
                  </Text>
                ) : (
                  <View
                    style={{
                      ...styles.hideBalance,
                      marginVertical: 11,
                      backgroundColor: kittenTheme["color-basic-600"]
                    }}
                  />
                )}
              </View>
            </View>
          </View>
        </View>
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
        >
          <Button
            style={{ marginVertical: 4, borderRadius: THEME.BUTTON_RADIUS }}
            onPress={themeContext.toggleTheme}
          >
            TOGGLE THEME
          </Button>
        </Layout>
      </Layout>
    </ScreenTemplate>
  );
};

const styles = StyleSheet.create({
  balanceContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  hideBalance: {
    minWidth: 50,
    height: 4
  },
  creaseItem: {
    marginLeft: 20,
    flexDirection: "row",
    alignItems: "center",
    flex: 1
  },
  creaseButton: {
    width: 45,
    height: 45,
    borderRadius: THEME.BUTTON_RADIUS,
    marginRight: 10
  }
});
