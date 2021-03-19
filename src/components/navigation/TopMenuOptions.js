import React, { memo, useCallback } from "react";
import { TopNavigationAction, OverflowMenu } from "@ui-kitten/components";
import { Alert } from "react-native";

import { useDispatch } from "react-redux";
import { ThemeContext } from "../../themes/theme-context";
import {
  MoreIconHorizontal,
  LogoutIcon,
  LightIcon,
  DarkIcon,
  UpdateIcon,
} from "../../themes/icons";
import { logout } from "../../store/actions/authAction";
import { getDataDispatcher } from "../../store/actions/apiAction";

const getMenuData = (theme) => [
  {
    title: "Обновить",
    icon: UpdateIcon,
  },
  {
    title: `${theme === "light" ? "Темная" : "Светлая"} тема`,
    icon: theme === "light" ? DarkIcon : LightIcon,
  },
  {
    title: "Выйти",
    icon: LogoutIcon,
  },
];

export const TopMenuOptions = memo(({ navigation }) => {
  const dispatch = useDispatch();

  const getData = useCallback(() => {
    dispatch(getDataDispatcher(navigation));
  }, [dispatch, navigation]);

  const themeContext = React.useContext(ThemeContext);
  const [menuVisible, setMenuVisible] = React.useState(false);

  const menuData = getMenuData(themeContext.theme);

  const logoutHandler = useCallback(() => {
    dispatch(logout(navigation));
  }, [dispatch, navigation]);

  const toggleMenu = useCallback(() => {
    setMenuVisible(!menuVisible);
  }, [menuVisible]);

  const navigateLogout = useCallback(() => {
    Alert.alert(
      "Выход",
      "Вы уверены, что хотите выйти из учетной записи?",
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
  }, [logoutHandler]);

  const onMenuItemSelect = useCallback(
    (index) => {
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
    },
    [getData, navigateLogout, themeContext]
  );

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
});
