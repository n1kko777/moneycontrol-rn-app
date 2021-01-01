import React, { memo } from "react";
import { TopNavigation, TopNavigationAction } from "@ui-kitten/components";
import { TopMenuOptions } from "./TopMenuOptions";
import { ProfileIcon } from "../../themes/icons";
import { useSelector } from "react-redux";

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
    const { profile } = useSelector((store) => store.profile);
    const { company } = useSelector((store) => store.company);

    return (
      <TopNavigation
        style={{
          ...style,
          position: "relative",
          zIndex: 10,
        }}
        title={
          title
            ? title
            : profile !== null && company !== null
            ? `${profile.is_admin ? "⭐️ " : ""}${company.company_name}`
            : ""
        }
        alignment="center"
        leftControl={renderProfileAction()}
        rightControls={isMenu && renderMenuAction()}
      />
    );
  }
);
