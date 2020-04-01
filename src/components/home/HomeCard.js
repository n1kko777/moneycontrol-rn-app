import React from "react";
import { Layout, Text, useTheme } from "@ui-kitten/components";
import { View } from "react-native";

import { RightIcon } from "../../themes/icons";
import { HomeCardItem } from "./HomeCardItem";

import { ThemeContext } from "../../themes/theme-context";
import { TouchableOpacity } from "react-native-gesture-handler";

export const HomeCard = ({ item, navigation }) => {
  const themeContext = React.useContext(ThemeContext);
  const kittenTheme = useTheme();

  const titleNavigationHandler = () => {
    navigation.navigate(item.navigate);
  };

  return (
    <Layout
      style={{
        borderRadius: 10,
        marginHorizontal: 8,
        marginTop: 15,
        marginBottom: 30,
        padding: 16,
        paddingTop: 8
      }}
    >
      <TouchableOpacity
        style={{
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
          marginBottom: 20
        }}
        onPress={titleNavigationHandler}
      >
        <Text category="h5">{item.title}</Text>
        <RightIcon
          fill={
            kittenTheme[
              `color-primary-${themeContext.theme === "light" ? 800 : 100}`
            ]
          }
          style={{
            width: 30,
            height: 30
          }}
        />
      </TouchableOpacity>

      <View>
        {item.data.map(elem => (
          <HomeCardItem
            kittenTheme={kittenTheme}
            themeContext={themeContext}
            key={elem.id}
            name={elem.name}
            amount={elem.balance}
            color={elem.style}
          />
        ))}
      </View>
    </Layout>
  );
};
