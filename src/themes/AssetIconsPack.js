import React from "react";
import { Image } from "react-native";

const IconProvider = (source) => ({
  toReactElement: ({ animation, ...style }) => (
    <Image style={style.style} source={source} />
  ),
});

export const AssetIconsPack = {
  name: "assets",
  icons: {
    logout: IconProvider(require("../assets/logout.png")),
    money: IconProvider(require("../assets/ruble.png")),
  },
};
