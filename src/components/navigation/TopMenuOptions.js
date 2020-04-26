import React from "react";
import { TopNavigationAction, OverflowMenu } from "@ui-kitten/components";
import { Alert } from "react-native";

import { ThemeContext } from "../../themes/theme-context";
import {
  MoreIconHorizontal,
  LogoutIcon,
  LightIcon,
  DarkIcon,
  UpdateIcon,
} from "../../themes/icons";
import { logout } from "../../store/actions/authAction";
import { useDispatch } from "react-redux";
import {
  startLoader,
  getDataDispatcher,
  endLoader,
} from "../../store/actions/apiAction";

export const TopMenuOptions = ({ navigation }) => {
  const dispatch = useDispatch();

  const getData = async () => {
    dispatch(startLoader());
    await dispatch(getDataDispatcher()).then(() => {
      dispatch(endLoader());
    });
  };

  const themeContext = React.useContext(ThemeContext);
  const [menuVisible, setMenuVisible] = React.useState(false);

  const menuData = [
    {
      title: "Обновить",
      icon: UpdateIcon,
    },
    {
      title: `${themeContext.theme === "light" ? "Темная" : "Светлая"} тема`,
      icon: themeContext.theme === "light" ? DarkIcon : LightIcon,
    },
    {
      title: "Выйти",
      icon: LogoutIcon,
    },
  ];

  const logoutHandler = async () => {
    await navigation.navigate("Login");
    dispatch(logout());
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const onMenuItemSelect = (index) => {
    switch (index) {
      case 0:
        getData();
        break;
      case 1:
        themeContext.toggleTheme();
        break;
      case 2:
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
          style: "cancel",
        },
        { text: "Выйти", onPress: logoutHandler },
      ],
      {
        cancelable: false,
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
      <TopNavigationAction icon={MoreIconHorizontal} onPress={toggleMenu} />
    </OverflowMenu>
  );
};
