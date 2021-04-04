import React, { memo, useCallback } from "react";
import {
  TopNavigationAction,
  OverflowMenu,
  MenuItem,
} from "@ui-kitten/components";
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

export const TopMenuOptions = memo(({ navigation }) => {
  const dispatch = useDispatch();

  const getData = useCallback(() => {
    dispatch(getDataDispatcher(navigation));
  }, [dispatch, navigation]);

  const themeContext = React.useContext(ThemeContext);
  const [menuVisible, setMenuVisible] = React.useState(false);

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

  const renderAnchor = useCallback(
    () => (
      <TopNavigationAction icon={MoreIconHorizontal} onPress={toggleMenu} />
    ),
    [toggleMenu]
  );

  const onUpdatePress = useCallback(() => {
    getData();
    toggleMenu();
  }, [getData, toggleMenu]);

  const onChangeThemePress = useCallback(() => {
    themeContext.toggleTheme();
    toggleMenu();
  }, [themeContext, toggleMenu]);

  const onExitPress = useCallback(() => {
    navigateLogout();
    toggleMenu();
  }, [navigateLogout, toggleMenu]);

  return (
    <OverflowMenu
      visible={menuVisible}
      anchor={renderAnchor}
      onBackdropPress={toggleMenu}
      style={{ width: 180 }}
    >
      <MenuItem
        title="Обновить"
        accessoryLeft={UpdateIcon}
        onPress={onUpdatePress}
      />
      <MenuItem
        title={`${themeContext.theme === "light" ? "Темная" : "Светлая"} тема`}
        accessoryLeft={themeContext.theme === "light" ? DarkIcon : LightIcon}
        onPress={onChangeThemePress}
      />
      <MenuItem
        title="Выйти"
        accessoryLeft={LogoutIcon}
        onPress={onExitPress}
      />
    </OverflowMenu>
  );
});
