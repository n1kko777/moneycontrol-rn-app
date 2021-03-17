import React, { memo, useCallback } from "react";
import { Layout, Text, useTheme } from "@ui-kitten/components";
import { View } from "react-native";

import { TouchableOpacity } from "react-native-gesture-handler";
import { AddSmallIcon, RightIcon } from "../../themes/icons";
import { HomeCardItem } from "./HomeCardItem";

import { ThemeContext } from "../../themes/theme-context";

export const HomeCard = memo(({ item, navigation, isNavigate }) => {
  const themeContext = React.useContext(ThemeContext);
  const kittenTheme = useTheme();

  const titleNavigationHandler = useCallback(() => {
    navigation.navigate(item.navigate);
  }, [item.navigate, navigation]);

  const navigateToAll = useCallback(() => {
    navigation.navigate(item.navigate.replace("Create", ""));
  }, [item.navigate, navigation]);

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
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          marginBottom: 20,
        }}
      >
        <Text category="h5">{item.title}</Text>
        {isNavigate && (
          <TouchableOpacity
            style={{
              marginTop: 5,
              width: 24,
              height: 24,
              alignItems: "center",
              justifyContent: "center",
              alignSelf: "center",
            }}
            onPress={() => titleNavigationHandler()}
          >
            {item.navigate !== "Operation" ? (
              <AddSmallIcon
                fill={
                  kittenTheme[
                    `color-primary-${
                      themeContext.theme === "light" ? 800 : 100
                    }`
                  ]
                }
                width={24}
                height={24}
              />
            ) : (
              <RightIcon
                fill={
                  kittenTheme[
                    `color-primary-${
                      themeContext.theme === "light" ? 800 : 100
                    }`
                  ]
                }
                width={30}
                height={30}
              />
            )}
          </TouchableOpacity>
        )}
      </View>

      <View>
        {item.data.length !== 0 ? (
          item.data.map((elem) => (
            <HomeCardItem
              kittenTheme={kittenTheme}
              themeContext={themeContext}
              key={elem.last_updated}
              item={elem}
            />
          ))
        ) : (
          <Text>Список пуст</Text>
        )}
      </View>
      <View
        style={{
          alignSelf: "flex-start",
          marginTop: 10,
        }}
      >
        {isNavigate && (
          <TouchableOpacity onPress={navigateToAll}>
            <Text
              style={{
                fontWeight: "bold",
                color:
                  kittenTheme[
                    `color-primary-${
                      themeContext.theme === "light" ? 800 : 100
                    }`
                  ],
              }}
            >
              Смотреть все
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </Layout>
  );
});
