import React, { memo, useCallback } from "react";
import { Layout, Text, useTheme } from "@ui-kitten/components";
import { View } from "react-native";

import { RightIcon } from "../../themes/icons";
import { HomeCardItem } from "./HomeCardItem";

import { ThemeContext } from "../../themes/theme-context";
import { TouchableOpacity } from "react-native-gesture-handler";

export const HomeCard = memo(({ item, navigation, isNavigate }) => {
  const themeContext = React.useContext(ThemeContext);
  const kittenTheme = useTheme();

  const titleNavigationHandler = useCallback(() => {
    navigation.navigate(item.navigate);
  }, [item]);

  return (
    <Layout
      style={{
        borderRadius: 10,
        marginHorizontal: 8,
        marginTop: 15,
        marginBottom: 30,
        padding: 16,
        paddingTop: 8,
      }}
    >
      <TouchableOpacity
        style={{
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
          marginBottom: 20,
        }}
        onPress={isNavigate ? () => titleNavigationHandler() : null}
      >
        <Text category="h5">{item.title}</Text>
        {isNavigate && (
          <RightIcon
            fill={
              kittenTheme[
                `color-primary-${themeContext.theme === "light" ? 800 : 100}`
              ]
            }
            style={{
              width: 30,
              height: 30,
            }}
          />
        )}
      </TouchableOpacity>

      <View>
        {item.data.map((elem) => (
          <HomeCardItem
            navigation={navigation}
            kittenTheme={kittenTheme}
            themeContext={themeContext}
            key={elem.last_updated}
            item={elem}
          />
        ))}
      </View>
    </Layout>
  );
});
