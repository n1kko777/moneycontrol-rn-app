import React, { memo, useCallback } from "react";
import { View } from "react-native";
import { useTheme, Layout, Button } from "@ui-kitten/components";

import { THEME } from "../../themes/themes";
import { ThemeContext } from "../../themes/theme-context";

import { Toolbar } from "../../components/navigation/Toolbar";
import { AccountList } from "../../components/account/AccountList";
import { ScreenTemplate } from "../../components/ScreenTemplate";
import { BackIcon } from "../../themes/icons";

export const AccountScreen = memo(({ navigation }) => {
  const themeContext = React.useContext(ThemeContext);
  const kittenTheme = useTheme();

  const onNavigateHome = useCallback(() => navigation.navigate("Home"), [
    navigation,
  ]);

  const onNavigateCreateAccount = useCallback(
    () => navigation.navigate("CreateAccount"),
    [navigation]
  );

  return (
    <ScreenTemplate>
      <Toolbar
        navigation={navigation}
        title="Счета"
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
            onPress={onNavigateCreateAccount}
          >
            Добавить счет
          </Button>
        </View>
        <Layout
          style={{ flex: 1, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
        >
          <AccountList navigation={navigation} />
        </Layout>
      </Layout>
    </ScreenTemplate>
  );
});
