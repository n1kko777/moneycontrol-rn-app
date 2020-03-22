import React from "react";
import { TopNavigationAction, OverflowMenu } from "@ui-kitten/components";
import { Alert } from "react-native";

import { ThemeContext } from "../themes/theme-context";
import { MenuIcon, LogoutIcon, LightIcon, DarkIcon } from "../themes/icons";
import { logout } from "../store/actions/authAction";
import { useDispatch } from "react-redux";

export const MenuOptions = ({ navigation }) => {
  const dispatch = useDispatch();

  const themeContext = React.useContext(ThemeContext);
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

  const logoutHandler = async () => {
    await dispatch(logout()).then(() => {
      navigation.navigate("Login");
    });
  };

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

  return (
    <OverflowMenu
      visible={menuVisible}
      data={menuData}
      onSelect={onMenuItemSelect}
      onBackdropPress={toggleMenu}
    >
      <TopNavigationAction icon={MenuIcon} onPress={toggleMenu} />
    </OverflowMenu>
  );
};
