import React, { memo, useCallback } from 'react';
import { SafeAreaView } from 'react-native';
import { BottomNavigation, BottomNavigationTab, useTheme, Divider } from '@ui-kitten/components';
import { HomeIcon, OoperationIcon, TeamIcon, MoreIconHorizontal } from '../../themes/icons';
import { ThemeContext } from '../../themes/theme-context';

import { AddButton } from './AddButton';

export const BottomTabBar = memo(({ navigation, state }) => {
  const themeContext = React.useContext(ThemeContext);
  const kittenTheme = useTheme();

  const onSelect = useCallback(
    (index) => {
      navigation.navigate(state.routeNames[index]);
    },
    [navigation, state.routeNames],
  );

  return (
    <SafeAreaView
      style={{
        backgroundColor: kittenTheme[`color-basic-${themeContext.theme === 'light' ? 100 : 800}`],
      }}
    >
      <Divider />
      <BottomNavigation appearance="noIndicator" selectedIndex={state.index} onSelect={onSelect}>
        <BottomNavigationTab icon={HomeIcon} title="Главная" />
        <BottomNavigationTab icon={OoperationIcon} title="Операции" />
        <AddButton kittenTheme={kittenTheme} navigation={navigation} />
        <BottomNavigationTab icon={TeamIcon} title="Команда" />
        <BottomNavigationTab icon={MoreIconHorizontal} title="Еще" />
      </BottomNavigation>
    </SafeAreaView>
  );
});
