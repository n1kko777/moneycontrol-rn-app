import { useTheme, Layout, Button } from '@ui-kitten/components';
import React, { memo, useCallback, useMemo } from 'react';
import { View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { ScreenTemplate } from '../../components/ScreenTemplate';
import { CompanyProfileList } from '../../components/company/CompanyProfileList';
import { Toolbar } from '../../components/navigation/Toolbar';
import { getDataDispatcher } from '../../store/actions/apiAction';
import { getCompanyList, getProfile } from '../../store/selectors';
import { EditIcon, ProfileIcon } from '../../themes/icons';
import { ThemeContext } from '../../themes/theme-context';
import { THEME } from '../../themes/themes';

export const TeamsScreen = memo(({ navigation }) => {
  const dispatch = useDispatch();
  const themeContext = React.useContext(ThemeContext);
  const kittenTheme = useTheme();

  const profile = useSelector(getProfile);

  const companyList = useSelector(getCompanyList);

  const onCompanyRefresh = useCallback(() => {
    dispatch(getDataDispatcher(navigation));
  }, [dispatch, navigation]);

  const inviteToTeam = useCallback(() => {
    navigation.navigate('InviteMember');
  }, [navigation]);

  const onEditCompanyName = useCallback(() => {
    navigation.navigate('ChangeCompanyName');
  }, [navigation]);

  const onNavigateToProfile = useCallback(() => {
    navigation.navigate('Profile');
  }, [navigation]);

  const memoTargetIcon = useMemo(
    () => (profile !== null && profile.is_admin ? EditIcon : ProfileIcon),
    [profile]
  );

  const onTargetIconPress = useCallback(
    () => (profile !== null && profile.is_admin ? onEditCompanyName() : onNavigateToProfile()),
    [onEditCompanyName, onNavigateToProfile, profile]
  );

  return (
    <ScreenTemplate>
      <Toolbar navigation={navigation} TargetIcon={memoTargetIcon} onTarget={onTargetIconPress} />
      <Layout
        style={{
          flex: 1,
          backgroundColor: kittenTheme[`color-basic-${themeContext.theme === 'light' ? 200 : 900}`],
        }}>
        <View
          style={{
            height: profile !== null && profile.is_admin ? 45 : 0,
            marginVertical: 20,
          }}>
          {profile !== null && profile.is_admin && (
            <Button
              onPress={inviteToTeam}
              style={{
                alignSelf: 'center',
                paddingHorizontal: 20,
                borderRadius: THEME.BUTTON_RADIUS,
              }}
              status="info">
              Добавить сотрудника
            </Button>
          )}
        </View>
        <Layout style={{ flex: 1, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
          <CompanyProfileList
            onCompanyRefresh={onCompanyRefresh}
            dataList={companyList}
            navigation={navigation}
          />
        </Layout>
      </Layout>
    </ScreenTemplate>
  );
});
