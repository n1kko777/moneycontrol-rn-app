import { TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import React, { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { TopMenuOptions } from './TopMenuOptions';
import { getToolbarTitle } from '../../store/selectors';
import { ProfileIcon } from '../../themes/icons';

export const Toolbar = memo(
  ({
    title,
    navigation,
    style,
    TargetIcon = ProfileIcon,
    onTarget = () => {
      navigation.navigate('Profile');
    },
    isMenu = true,
  }) => {
    const renderMenuAction = useCallback(
      () => <TopMenuOptions navigation={navigation} />,
      [navigation]
    );

    const ProfileAction = useCallback(
      (props) => <TopNavigationAction {...props} icon={TargetIcon} />,
      [TargetIcon]
    );

    const renderProfileAction = () => <ProfileAction onPress={onTarget} />;
    const toolbarTitle = useSelector(getToolbarTitle);

    return (
      <TopNavigation
        style={{
          ...style,
          position: 'relative',
          zIndex: 10,
        }}
        title={title || toolbarTitle}
        alignment="center"
        accessoryLeft={renderProfileAction}
        accessoryRight={isMenu ? renderMenuAction : null}
      />
    );
  }
);
