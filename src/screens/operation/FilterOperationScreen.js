import React, { memo, useCallback } from 'react';
import { useTheme, Button, Layout } from '@ui-kitten/components';
import { View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import 'moment/locale/ru';

import { Toolbar } from '../../components/navigation/Toolbar';
import { ScreenTemplate } from '../../components/ScreenTemplate';
import { ThemeContext } from '../../themes/theme-context';
import { BackIcon } from '../../themes/icons';
import { getOperationAction } from '../../store/actions/apiAction';
import { CustomSearchWithSelect } from '../../ui/CustomSearchWithSelect';
import {
  getAccounts,
  getCategoriesList,
  getLayoutFilterParams,
  getLayoutOperationTypeData,
  getProfile,
  getProfileList,
  getTagsList,
} from '../../store/selectors';
import { FlexibleView } from '../../components/FlexibleView';

moment.locale('ru');

const viewStyles = { marginHorizontal: 8 };

const styles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
});

const secondaryLayoutStyles = {
  ...styles.flexOne,
  padding: 8,
};

export const FilterOperationScreen = memo(({ navigation }) => {
  const themeContext = React.useContext(ThemeContext);
  const kittenTheme = useTheme();

  const mainLayoutStyles = {
    ...styles.flexOne,
    backgroundColor: kittenTheme[`color-basic-${themeContext.theme === 'light' ? 200 : 900}`],
  };

  const dispatch = useDispatch();

  const goBack = useCallback(() => navigation.goBack(), [navigation]);

  const profile = useSelector(getProfile);

  const filterParams = useSelector(getLayoutFilterParams);
  const operationTypeData = useSelector(getLayoutOperationTypeData);

  const profileData = useSelector(getProfileList);

  const initProfileList = useCallback(() => {
    if (filterParams !== null && 'profile' in filterParams) {
      return [...filterParams.profile];
    }
    if (profile !== null && profileData.find((prof) => prof.id === profile.id)) {
      return [profileData.find((prof) => prof.id === profile.id)];
    }
    return [];
  }, [filterParams, profile, profileData]);

  const [profileList, setProfileList] = React.useState(initProfileList());

  const accounts = useSelector(getAccounts);

  const accountData = []
    .concat(...profileList.map((selProf) => accounts.filter((acc) => acc.profile === selProf.id)))
    .map((elem, index) => {
      const textTitle =
        profileList.length === 1
          ? `${elem.account_name}`
          : `${elem.account_name} (${profileData.find((prof) => elem.profile === prof.id).text})`;

      return {
        index,
        balance: elem.balance,
        profile: elem.profile,
        text: textTitle,
        title: textTitle,
        id: elem.id,
      };
    });

  const [accountList, setAccountList] = React.useState(
    filterParams !== null && 'account' in filterParams ? [...filterParams.account] : [],
  );

  const categoryData = useSelector(getCategoriesList);

  const [categoryList, setCategoryList] = React.useState(
    filterParams !== null && 'category' in filterParams ? [...filterParams.category] : [],
  );

  const tagData = useSelector(getTagsList);

  const [tagList, setTagList] = React.useState(
    filterParams !== null && 'tag' in filterParams ? [...filterParams.tag] : [],
  );

  const [operationTypeList, setOperationTypeList] = React.useState(
    filterParams !== null && 'type' in filterParams ? [...filterParams.type] : [],
  );

  const onReset = () => {
    setProfileList([]);
    setAccountList([]);
    setCategoryList([]);
    setTagList([]);
    setOperationTypeList([]);

    dispatch(getOperationAction(null, goBack));
  };

  const onSubmit = useCallback(() => {
    const selectedFilters = {
      profile: profileList,
      account: accountList,
      category: categoryList,
      tag: tagList,
      type: operationTypeList,
    };

    dispatch(getOperationAction(selectedFilters, goBack));
  }, [profileList, accountList, categoryList, tagList, operationTypeList, dispatch, goBack]);

  return (
    <ScreenTemplate>
      <FlexibleView>
        <Toolbar
          navigation={navigation}
          title="Фильтр операций"
          TargetIcon={BackIcon}
          onTarget={goBack}
          isMenu={false}
        />
        <Layout style={mainLayoutStyles}>
          <Layout style={secondaryLayoutStyles}>
            <View style={viewStyles}>
              <CustomSearchWithSelect
                datasets={profileData}
                dataList={profileList}
                setDataList={setProfileList}
                placeholder="Укажите сотрудников"
              />
            </View>
            <View style={viewStyles}>
              <CustomSearchWithSelect
                datasets={accountData}
                dataList={accountList}
                setDataList={setAccountList}
                placeholder="Укажите аккаунт"
              />
            </View>
            <View style={viewStyles}>
              <CustomSearchWithSelect
                datasets={categoryData}
                dataList={categoryList}
                setDataList={setCategoryList}
                placeholder="Укажите категорию"
              />
            </View>
            <View style={viewStyles}>
              <CustomSearchWithSelect
                datasets={tagData}
                dataList={tagList}
                setDataList={setTagList}
                placeholder="Укажите теги"
              />
            </View>
            <View style={viewStyles}>
              <CustomSearchWithSelect
                datasets={operationTypeData}
                dataList={operationTypeList}
                setDataList={setOperationTypeList}
                placeholder="Укажите тип операции"
              />
            </View>
            <View
              style={{
                marginTop: 30,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Button style={{ flex: 1, margin: 10 }} onPress={onReset} appearance="outline">
                Сбросить
              </Button>
              <Button style={{ flex: 1, margin: 10 }} onPress={onSubmit}>
                Применить
              </Button>
            </View>
          </Layout>
        </Layout>
      </FlexibleView>
    </ScreenTemplate>
  );
});
