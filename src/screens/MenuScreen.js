import React from "react";
import { View } from "react-native";
import { useTheme, Layout, Button } from "@ui-kitten/components";

import {
  ChartIcon,
  TeamIcon,
  CardIcon,
  CategoryIcon,
  TagIcon
} from "../themes/icons";
import { THEME } from "../themes/themes";
import { ThemeContext } from "../themes/theme-context";

import { Toolbar } from "../components/navigation/Toolbar";
import { MenuList } from "../components/menu/MenuList";
import { ScreenTemplate } from "../components/ScreenTemplate";

export const MenuScreen = ({ navigation }) => {
  const themeContext = React.useContext(ThemeContext);
  const kittenTheme = useTheme();

  const menuListData = [
    {
      title: "Команда",
      navLink: () => navigation.navigate("Team"),
      icon: TeamIcon
    },
    {
      title: "Счета",
      navLink: () => navigation.navigate("Account"),
      icon: CardIcon
    },
    {
      title: "Категории",
      navLink: () => navigation.navigate("Category"),
      icon: CategoryIcon
    },
    {
      title: "Теги",
      navLink: () => navigation.navigate("Tag"),
      icon: TagIcon
    }
  ];

  return (
    <ScreenTemplate>
      <Toolbar navigation={navigation} title="Меню" />
      <Layout
        style={{
          flex: 1,
          backgroundColor:
            kittenTheme[
              `color-basic-${themeContext.theme === "light" ? 200 : 900}`
            ]
        }}
      >
        <View style={{ marginVertical: 20 }}>
          <Button
            style={{
              alignSelf: "center",
              paddingHorizontal: 20,
              borderRadius: THEME.BUTTON_RADIUS
            }}
            icon={ChartIcon}
            status="info"
          >
            Сформировать отчет
          </Button>
        </View>
        <Layout
          style={{ flex: 1, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
        >
          <MenuList data={menuListData} />
        </Layout>
      </Layout>
    </ScreenTemplate>
  );
};
