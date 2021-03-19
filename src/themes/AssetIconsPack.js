import React from "react";
import { Image } from "react-native";
import LogoutIcon from "../assets/logout.png";
import MoneyIcon from "../assets/ruble.png";

const IconProvider = (source) => ({
  toReactElement: ({ animation, ...style }) => (
    <Image style={style.style} source={source} />
  ),
});

export const AssetIconsPack = {
  name: "assets",
  icons: {
    logout: IconProvider(LogoutIcon),
    money: IconProvider(MoneyIcon),
  },
};
