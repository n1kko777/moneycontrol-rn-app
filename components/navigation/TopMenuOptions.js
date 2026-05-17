import { MenuItem, TopNavigationAction, useTheme } from '@ui-kitten/components';
import React, { memo, useCallback } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { alert } from 'utils';

import { getDataDispatcher } from '../../store/actions/apiAction';
import { logout } from '../../store/actions/authAction';
import {
  MoreIconHorizontal,
  LogoutIcon,
  LightIcon,
  DarkIcon,
  UpdateIcon,
} from '../../themes/icons';
import { ThemeContext } from '../../themes/theme-context';

export const TopMenuOptions = memo(({ navigation }) => {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const kittenTheme = useTheme();

  const getData = useCallback(() => {
    dispatch(getDataDispatcher(navigation));
  }, [dispatch, navigation]);

  const themeContext = React.useContext(ThemeContext);
  const [menuVisible, setMenuVisible] = React.useState(false);

  const openMenu = useCallback(() => {
    setMenuVisible(true);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuVisible(false);
  }, []);

  const logoutHandler = useCallback(() => {
    dispatch(logout(navigation));
  }, [dispatch, navigation]);

  const navigateLogout = useCallback(() => {
    alert(
      'Выход',
      'Вы уверены, что хотите выйти из учетной записи?',
      [
        {
          text: 'Отмена',
          style: 'cancel',
        },
        { text: 'Выйти', onPress: logoutHandler },
      ],
      {
        cancelable: false,
      }
    );
  }, [logoutHandler]);

  const onUpdatePress = useCallback(() => {
    closeMenu();
    getData();
  }, [closeMenu, getData]);

  const onChangeThemePress = useCallback(() => {
    closeMenu();
    themeContext.toggleTheme();
  }, [closeMenu, themeContext]);

  const onExitPress = useCallback(() => {
    closeMenu();
    navigateLogout();
  }, [closeMenu, navigateLogout]);

  return (
    <>
      <TopNavigationAction icon={MoreIconHorizontal} onPress={openMenu} />
      <Modal animationType="fade" transparent visible={menuVisible} onRequestClose={closeMenu}>
        <View style={styles.modalRoot}>
          <Pressable style={StyleSheet.absoluteFill} onPress={closeMenu} />
          <View
            style={[
              styles.menu,
              {
                top: insets.top + 56,
                right: Math.max(insets.right, 8),
                backgroundColor: kittenTheme['background-basic-color-1'],
                borderColor: kittenTheme['border-basic-color-3'],
              },
            ]}>
            <MenuItem title="Обновить" accessoryLeft={UpdateIcon} onPress={onUpdatePress} />
            <MenuItem
              title={`${themeContext.theme === 'light' ? 'Темная' : 'Светлая'} тема`}
              accessoryLeft={themeContext.theme === 'light' ? DarkIcon : LightIcon}
              onPress={onChangeThemePress}
            />
            <MenuItem title="Выйти" accessoryLeft={LogoutIcon} onPress={onExitPress} />
          </View>
        </View>
      </Modal>
    </>
  );
});

const styles = StyleSheet.create({
  modalRoot: {
    flex: 1,
  },
  menu: {
    position: 'absolute',
    width: 190,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 4,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 8,
  },
});
