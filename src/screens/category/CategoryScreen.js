import React, { memo, useCallback } from "react";
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

  const onNavigateHome = useCallback(() => navigation.navigate("Home"), [
    navigation,
  ]);

  const onNavigateCreateCategory = useCallback(
    () => navigation.navigate("CreateCategory"),
    [navigation]
  );

  return (
    <ScreenTemplate>
      <Toolbar
        navigation={navigation}
        title="Категории"
        TargetIcon={BackIcon}
        onTarget={onNavigateHome}
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
            onPress={onNavigateCreateCategory}
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
