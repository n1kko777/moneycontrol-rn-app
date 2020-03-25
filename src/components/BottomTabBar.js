import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import {
  BottomNavigation,
  BottomNavigationTab,
  Button,
  useTheme
} from "@ui-kitten/components";

import { THEME } from "../themes/themes";
import {
  HomeIcon,
  OoperationIcon,
  AddIcon,
  TeamIcon,
  MoreIconHorizontal
} from "../themes/icons";
import { ThemeContext } from "../themes/theme-context";

export const BottomTabBar = ({ navigation, state }) => {
  const themeContext = React.useContext(ThemeContext);
  const kittenTheme = useTheme();

  const onSelect = index => {
    navigation.navigate(state.routeNames[index]);
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor:
          kittenTheme[
            `color-basic-${themeContext.theme === "light" ? 100 : 800}`
          ]
      }}
    >
      <BottomNavigation
        appearance="noIndicator"
        selectedIndex={state.index}
        onSelect={onSelect}
      >
        <BottomNavigationTab icon={HomeIcon} title="Главная" />
        <BottomNavigationTab icon={OoperationIcon} title="Операции" />
        <Button icon={AddIcon} style={styles.addButton} status="info" />
        <BottomNavigationTab icon={TeamIcon} title="Команда" />
        <BottomNavigationTab icon={MoreIconHorizontal} title="Еще" />
      </BottomNavigation>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  addButton: {
    marginTop: -25,
    flex: 0,
    width: 60,
    height: 60,
    borderRadius: THEME.BUTTON_RADIUS
  }
});
