import React, { memo, useCallback } from "react";
import { useTheme, Button, Layout } from "@ui-kitten/components";
import {
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import "moment/locale/ru";
moment.locale("ru");

import { CustomDatePicker } from "../../components/CustomDatePicker";
import { Toolbar } from "../../components/navigation/Toolbar";
import { ScreenTemplate } from "../../components/ScreenTemplate";
import { ThemeContext } from "../../themes/theme-context";
import { getShortName } from "../../getShortName";
import { BackIcon } from "../../themes/icons";
import { getOperationAction } from "../../store/actions/apiAction";
import { clearCalendar } from "../../store/actions/calendarAction";
import { CustomSearchWithSelect } from "../../ui/CustomSearchWithSelect";

const viewStyles = { marginHorizontal: 8 };

export const FilterOperationScreen = memo(({ navigation }) => {
  const dispatch = useDispatch();
  const themeContext = React.useContext(ThemeContext);
  const kittenTheme = useTheme();

  const goBack = () => navigation.goBack();

  const store = useSelector((store) => store);

  const { profile } = store.profile;
  const { company } = store.company;
  const { filterParams, operationTypeData } = store.layout;

  const initProfileData =
    profile !== null && profile.is_admin ? company.profiles : [profile];

  const profileData = initProfileData.map((elem, index) => ({
    index,
    text: getShortName(elem.first_name + " " + elem.last_name),
    title: getShortName(elem.first_name + " " + elem.last_name),
    id: elem.id,
    is_admin: elem.is_admin,
  }));

  const [profileList, setProfileList] = React.useState(
    filterParams !== null
      ? [...filterParams.profile]
      : profileData.find((prof) => prof.id === profile.id)
      ? [profileData.find((prof) => prof.id === profile.id)]
      : []
  );

  const { accounts } = useSelector((store) => store.account);

  const accountData = []
    .concat(
      ...profileList.map((selProf) =>
        accounts.filter((acc) => acc.profile == selProf.id)
      )
    )
    .map((elem, index) => {
      const textTitle =
        profileList.length == 1
          ? `${elem.account_name}`
          : `${elem.account_name} (${
              profileData.find((prof) => elem.profile == prof.id).text
            })`;

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
    filterParams !== null ? [...filterParams.account] : []
  );

  const { categories } = useSelector((store) => store.category);

  const categoryData = categories.map((elem, index) => ({
    index,
    text: elem.category_name,
    title: elem.category_name,
    id: elem.id,
  }));

  const [categoryList, setCategoryList] = React.useState(
    filterParams !== null ? [...filterParams.category] : []
  );

  const { tags } = useSelector((store) => store.tag);

  const tagData = tags.map((elem, index) => ({
    index,
    text: elem.tag_name,
    title: elem.tag_name,
    id: elem.id,
  }));

  const [tagList, setTagList] = React.useState(
    filterParams !== null ? [...filterParams.tag] : []
  );

  const [operationTypeList, setOperationTypeList] = React.useState(
    filterParams !== null ? [...filterParams.type] : []
  );

  const onReset = () => {
    setProfileList([]);
    setAccountList([]);
    setCategoryList([]);
    setTagList([]);
    setOperationTypeList([]);

    dispatch(clearCalendar());
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
  }, [profileList, accountList, categoryList, tagList, operationTypeList]);

  const mainLayoutStyles = {
    ...styles.flexOne,
    backgroundColor:
      kittenTheme[`color-basic-${themeContext.theme === "light" ? 200 : 900}`],
  };

  const mainViewStyles = {
    height: 30,
    marginTop: 20,
    marginBottom: 20,
    backgroundColor:
      kittenTheme[`color-basic-${themeContext.theme === "light" ? 200 : 900}`],
  };

  const secondaryLayoutStyles = {
    ...styles.flexOne,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 8,
  };

  return (
    <ScreenTemplate>
      <Toolbar
        navigation={navigation}
        title="Фильтр операций"
        TargetIcon={BackIcon}
        onTarget={goBack}
        isMenu={false}
      />
      <Layout style={mainLayoutStyles}>
        <View style={mainViewStyles}>
          <CustomDatePicker />
        </View>
        <Layout style={secondaryLayoutStyles}>
          <KeyboardAvoidingView
            behavior="position"
            keyboardVerticalOffset={100}
          >
            <ScrollView>
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
              <Button
                style={{ marginTop: 24, marginHorizontal: 8 }}
                onPress={onSubmit}
              >
                Применить
              </Button>
              <Button
                style={{ marginVertical: 16, marginHorizontal: 8 }}
                onPress={onReset}
                appearance="outline"
              >
                Сбросить
              </Button>
            </ScrollView>
          </KeyboardAvoidingView>
        </Layout>
      </Layout>
    </ScreenTemplate>
  );
});

const styles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
});
