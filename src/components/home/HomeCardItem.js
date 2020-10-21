import React from "react";
import { splitToDigits } from "../../splitToDigits";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text } from "@ui-kitten/components";
import { useDispatch } from "react-redux";
import { setFilterParamAction } from "../../store/actions/apiAction";

export const HomeCardItem = React.memo(
  ({ kittenTheme, themeContext, item, navigation }) => {
    const { id, name, balance, type, style: color } = item;
    const dispatch = useDispatch();

    const onFilterOperation = () => {
      navigation.navigate("Operation");

      dispatch(
        setFilterParamAction({
          name,
          type,
          id,
        })
      );
    };

    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingBottom: 5,
        }}
        onPress={type !== "profile" ? onFilterOperation : null}
      >
        <Text
          style={{
            fontSize: 16,
            color:
              kittenTheme[
                color !== undefined
                  ? color
                  : `color-primary-${
                      themeContext.theme === "light" ? 800 : 100
                    }`
              ],
            textDecorationLine: type !== "profile" ? "underline" : "none",
          }}
          category="s1"
        >
          {name}
        </Text>
        <Text
          style={{
            fontSize: 16,
            color:
              kittenTheme[
                color !== undefined
                  ? color
                  : `color-primary-${
                      themeContext.theme === "light" ? 800 : 100
                    }`
              ],
          }}
        >
          {balance !== "" && splitToDigits(balance.toString()) + " ₽"}
        </Text>
      </TouchableOpacity>
    );
  }
);
