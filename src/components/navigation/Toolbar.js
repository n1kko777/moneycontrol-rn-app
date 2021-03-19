import React, { memo } from "react";
import { TopNavigation, TopNavigationAction } from "@ui-kitten/components";
import { useSelector } from "react-redux";
import { TopMenuOptions } from "./TopMenuOptions";
import { ProfileIcon } from "../../themes/icons";
import { getToolbarTitle } from "../../store/selectors";

export const Toolbar = memo(
  ({
    title,
    navigation,
    style,
    TargetIcon = ProfileIcon,
    onTarget = () => {
      navigation.navigate("Profile");
    },
    isMenu = true,
  }) => {
    const renderMenuAction = () => <TopMenuOptions navigation={navigation} />;

    const ProfileAction = (props) => (
      <TopNavigationAction {...props} icon={TargetIcon} />
    );

    const renderProfileAction = () => <ProfileAction onPress={onTarget} />;
    const toolbarTitle = useSelector(getToolbarTitle);

    return (
      <TopNavigation
        style={{
          ...style,
          position: "relative",
          zIndex: 10,
        }}
        title={title || toolbarTitle}
        alignment="center"
        leftControl={renderProfileAction()}
        rightControls={isMenu && renderMenuAction()}
      />
    );
  }
);
