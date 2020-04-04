import React from "react";
import { TopNavigation, TopNavigationAction } from "@ui-kitten/components";
import { TopMenuOptions } from "./TopMenuOptions";
import { ProfileIcon } from "../../themes/icons";

export const Toolbar = ({
  title,
  navigation,
  style,
  TargetIcon = ProfileIcon,
  onTarget = () => {}
}) => {
  const renderMenuAction = () => <TopMenuOptions navigation={navigation} />;

  const ProfileAction = props => (
    <TopNavigationAction {...props} icon={TargetIcon} />
  );

  const renderProfileAction = () => <ProfileAction onPress={onTarget} />;

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
