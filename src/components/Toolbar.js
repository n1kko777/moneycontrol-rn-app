import React from "react";
import {
  TopNavigation,
  TopNavigationAction,
  Icon
} from "@ui-kitten/components";
import { MenuOptions } from "./MenuOptions";
import { ProfileIcon } from "../themes/icons";

const ProfileAction = props => (
  <TopNavigationAction {...props} icon={ProfileIcon} />
);

export const Toolbar = ({ title, navigation, getData, style }) => {
  const renderMenuAction = () => (
    <MenuOptions navigation={navigation} getData={getData} />
  );

  const renderProfileAction = () => <ProfileAction onPress={() => {}} />;

  return (
    <TopNavigation
      style={{
        ...style,
        position: "relative",
        zIndex: 10
      }}
      title={title}
      alignment="center"
      leftControl={renderProfileAction()}
      rightControls={renderMenuAction()}
    />
  );
};
