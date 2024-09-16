import { Layout, useTheme, Button } from '@ui-kitten/components';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { ScrollView, View, RefreshControl } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { splitToDigits, alert } from 'utils';

import { ScreenTemplate } from '../../components/ScreenTemplate';
import { HomeList } from '../../components/home/HomeList';
import { Toolbar } from '../../components/navigation/Toolbar';
import {
  clearProfileListData,
  getDataDispatcher,
  getProfileListData,
  removeProfileFromCompanyAction,
} from '../../store/actions/apiAction';
import { logout } from '../../store/actions/authAction';
import { clearFilterParams } from '../../store/actions/layoutAction';
import { getLayoutProfileData } from '../../store/selectors';
import { BackIcon } from '../../themes/icons';
import { ThemeContext } from '../../themes/theme-context';

export const CompanyMemberScreen = memo(({ navigation, route }) => {
  const { profile } = route.params;

  const dispatch = useDispatch();

  const themeContext = React.useContext(ThemeContext);
  const kittenTheme = useTheme();

  const profileData = useSelector(getLayoutProfileData);

  const [homeListData, setHomeListData] = useState([]);
  const [totalBalance, setTotalBalance] = useState(null);

  useEffect(() => {
    if (profileData !== null) {
      const { data, balance } = profileData;
      setHomeListData(data);
      setTotalBalance(balance);
    } else {
      setHomeListData([]);
      setTotalBalance(null);
    }
  }, [profileData]);

  homeListData.isNavigate = false;

  const refreshData = useCallback(() => {
    if (profile !== null) {
      dispatch(getProfileListData(profile.id));
    } else {
      dispatch(logout(navigation));
    }
  }, [dispatch, navigation, profile]);

  const onSuccessDelete = useCallback(() => {
    dispatch(clearProfileListData());
    dispatch(getDataDispatcher(navigation));
  }, [dispatch, navigation]);

  const onDeleteMember = useCallback(() => {
    alert(
      'Удаление сотрудника',
      `Вы уверены, что хотите удалить сотрудника ${`${profile.first_name} ${profile.last_name}`}?`,
      [
        {
          text: 'Отмена',
          style: 'cancel',
        },
        {
          text: 'Удалить',
          onPress: () => {
            if (totalBalance === null || totalBalance === 0) {
              navigation.goBack(null);
              dispatch(removeProfileFromCompanyAction(profile, onSuccessDelete));
            } else {
              alert(
                'Невозможно удалить сотрудника',
                'Баланс сотрудника должен быть равен 0!',
                [{ text: 'OK' }],
                {
                  cancelable: false,
                }
              );
            }
          },
        },
      ],
      {
        cancelable: false,
      }
    );
  }, [dispatch, navigation, onSuccessDelete, profile, totalBalance]);

  const onBackHandler = useCallback(() => {
    navigation.navigate('Home');
    dispatch(clearFilterParams());
    dispatch(clearProfileListData());
  }, [dispatch, navigation]);

  return (
    <ScreenTemplate>
      <Layout
        style={{
          backgroundColor: kittenTheme[`color-basic-${themeContext.theme === 'light' ? 200 : 900}`],
        }}>
        <Toolbar
          navigation={navigation}
          title={`${profile.first_name} ${profile.last_name} (Баланс: ${splitToDigits(
            totalBalance
          )} ₽)`}
          TargetIcon={BackIcon}
          onTarget={onBackHandler}
          isMenu={false}
        />
      </Layout>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={refreshData} tintColor="transparent" />
        }
        style={{
          flex: 1,
          backgroundColor: kittenTheme[`color-basic-${themeContext.theme === 'light' ? 200 : 900}`],
        }}>
        <View onStartShouldSetResponder={() => true}>
          <HomeList navigation={navigation} dataList={homeListData} />
          {!profile.is_admin && (
            <Button onPress={onDeleteMember} style={{ margin: 8 }} status="danger">
              Удалить сотрудника
            </Button>
          )}
        </View>
      </ScrollView>
    </ScreenTemplate>
  );
});
