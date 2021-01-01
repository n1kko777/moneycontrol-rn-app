import React, { memo } from "react";
import { View } from "react-native";
import { useTheme, Layout, Button } from "@ui-kitten/components";

import { THEME } from "../../themes/themes";
import { ThemeContext } from "../../themes/theme-context";

import { Toolbar } from "../../components/navigation/Toolbar";
import { CategoryList } from "../../components/category/CategoryList";
import { ScreenTemplate } from "../../components/ScreenTemplate";
import { BackIcon } from "../../themes/icons";

export const CategoryScreen = memo(({ navigation }) => {
  const themeContext = React.useContext(ThemeContext);
  const kittenTheme = useTheme();

  return (
    <ScreenTemplate>
      <Toolbar
        navigation={navigation}
        title="Категории"
        TargetIcon={BackIcon}
        onTarget={() => navigation.navigate("Home")}
      />
      <Layout
        style={{
          flex: 1,
          backgroundColor:
            kittenTheme[
              `color-basic-${themeContext.theme === "light" ? 200 : 900}`
            ],
        }}
      >
        <View style={{ marginVertical: 20 }}>
          <Button
            style={{
              alignSelf: "center",
              paddingHorizontal: 20,
              borderRadius: THEME.BUTTON_RADIUS,
            }}
            status="info"
            onPress={() => navigation.navigate("CreateCategory")}
          >
            Добавить категорию
          </Button>
        </View>
        <Layout
          style={{ flex: 1, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
        >
          <CategoryList navigation={navigation} />
        </Layout>
      </Layout>
    </ScreenTemplate>
  );
});
