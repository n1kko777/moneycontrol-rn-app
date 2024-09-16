import { useTheme, Layout } from '@ui-kitten/components';
import React, { memo } from 'react';

import { ScreenTemplate } from '../components/ScreenTemplate';
import { MenuList } from '../components/menu/MenuList';
import { Toolbar } from '../components/navigation/Toolbar';
import {
  TeamIcon,
  CardIcon,
  CategoryIcon,
  TagIcon,
  OoperationIcon,
  ProfileIcon,
} from '../themes/icons';
import { ThemeContext } from '../themes/theme-context';

export const MenuScreen = memo(({ navigation }) => {
  const themeContext = React.useContext(ThemeContext);
  const kittenTheme = useTheme();

  const menuListData = [
    {
      title: 'Профиль',
      navLink: () => navigation.navigate('Profile'),
      icon: ProfileIcon,
    },
    {
      title: 'Команда',
      navLink: () => navigation.navigate('Team'),
      icon: TeamIcon,
    },
    {
      title: 'Счета',
      navLink: () => navigation.navigate('Account'),
      icon: CardIcon,
    },
    {
      title: 'Категории',
      navLink: () => navigation.navigate('Category'),
      icon: CategoryIcon,
    },
    {
      title: 'Теги',
      navLink: () => navigation.navigate('Tag'),
      icon: TagIcon,
    },
    {
      title: 'Операции',
      navLink: () => navigation.navigate('Operation'),
      icon: OoperationIcon,
    },
  ];

  return (
    <ScreenTemplate>
      <Toolbar navigation={navigation} title="Меню" />
      <Layout
        style={{
          flex: 1,
          backgroundColor: kittenTheme[`color-basic-${themeContext.theme === 'light' ? 200 : 900}`],
        }}>
        <Layout
          style={{
            flex: 1,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            marginTop: 40,
          }}>
          <MenuList data={menuListData} />
        </Layout>
      </Layout>
    </ScreenTemplate>
  );
});
