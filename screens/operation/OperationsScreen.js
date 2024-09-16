import { useTheme, Layout } from '@ui-kitten/components';
import React, { memo, useCallback } from 'react';
import { View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { CustomDatePicker } from '../../components/CustomDatePicker';
import { ScreenTemplate } from '../../components/ScreenTemplate';
import { BalanceComponent } from '../../components/home/BalanceComponent';
import { Toolbar } from '../../components/navigation/Toolbar';
import { OperationList } from '../../components/operation/OperationList';
import { getDataDispatcher } from '../../store/actions/apiAction';
import { getLayoutFilterParams, getLayoutOperationListData } from '../../store/selectors';
import { FilterIcon, ActiveFilterIcon } from '../../themes/icons';
import { ThemeContext } from '../../themes/theme-context';

export const OperationsScreen = memo(({ navigation }) => {
  const dispatch = useDispatch();

  const themeContext = React.useContext(ThemeContext);
  const kittenTheme = useTheme();

  const operationListData = useSelector(getLayoutOperationListData);
  const filterParams = useSelector(getLayoutFilterParams);

  const navigateFilter = useCallback(() => {
    navigation.navigate('FilterOperation');
  }, [navigation]);

  const onRefreshHandler = useCallback(() => {
    dispatch(getDataDispatcher(navigation));
  }, [dispatch, navigation]);

  return (
    <ScreenTemplate>
      <Toolbar
        navigation={navigation}
        TargetIcon={filterParams !== null ? ActiveFilterIcon : FilterIcon}
        onTarget={navigateFilter}
      />
      <Layout
        style={{
          flex: 1,
          backgroundColor: kittenTheme[`color-basic-${themeContext.theme === 'light' ? 200 : 900}`],
        }}>
        <BalanceComponent />
        <View style={{ height: 30, marginTop: 10, marginBottom: 20 }}>
          <CustomDatePicker navigation={navigation} />
        </View>
        <Layout
          style={{
            flex: 1,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}>
          <OperationList
            navigation={navigation}
            dataList={operationListData}
            onOperationRefresh={onRefreshHandler}
          />
        </Layout>
      </Layout>
    </ScreenTemplate>
  );
});
