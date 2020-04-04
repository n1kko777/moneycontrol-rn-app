import React from "react";
import { TopNavigation, TopNavigationAction } from "@ui-kitten/components";
import { TopMenuOptions } from "./TopMenuOptions";
import { ProfileIcon } from "../../themes/icons";

const ProfileAction = props => (
  <TopNavigationAction {...props} icon={ProfileIcon} />
);

export const Toolbar = ({ title, navigation, style }) => {
  const renderMenuAction = () => <TopMenuOptions navigation={navigation} />;

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
