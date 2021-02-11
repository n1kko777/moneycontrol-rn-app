import React, { memo, useCallback } from "react";
import { useTheme, Select, Button, Layout } from "@ui-kitten/components";
import { View } from "react-native";
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

export const FilterOperationScreen = memo(({ navigation }) => {
  const dispatch = useDispatch();
  const themeContext = React.useContext(ThemeContext);
  const kittenTheme = useTheme();

  const goBack = () => navigation.goBack();

  const store = useSelector((store) => store);

  const { profile } = store.profile;
  const { company } = store.company;
  const { filterParams } = store.layout;

  const initProfileData =
    profile !== null && profile.is_admin ? company.profiles : [profile];

  const profileData = initProfileData.map((elem, index) => ({
    index,
    text: getShortName(elem.first_name + " " + elem.last_name),
    id: elem.id,
    is_admin: elem.is_admin,
  }));

  const [selectedProfileOption, setSelectedProfileOption] = React.useState(
    filterParams !== null
      ? [...filterParams.profile]
      : profileData.find((prof) => prof.id === profile.id)
      ? [profileData.find((prof) => prof.id === profile.id)]
      : []
  );

  const { accounts } = useSelector((store) => store.account);

  const accountData = []
    .concat(
      ...selectedProfileOption.map((selProf) =>
        accounts.filter((acc) => acc.profile == selProf.id)
      )
    )
    .map((elem, index) => ({
      index,
      balance: elem.balance,
      profile: elem.profile,
      text:
        selectedProfileOption.length == 1
          ? `${elem.account_name}`
          : `${elem.account_name} (${
              profileData.find((prof) => elem.profile == prof.id).text
            })`,
      id: elem.id,
    }));

  const [selectedAccountOption, setSelectedAccountOption] = React.useState(
    filterParams !== null ? [...filterParams.account] : []
  );

  const { categories } = useSelector((store) => store.category);

  const categoryData = categories.map((elem, index) => ({
    index,
    text: elem.category_name,
    id: elem.id,
  }));

  const [selectedCategoryOption, setSelectedCategoryOption] = React.useState(
    filterParams !== null ? [...filterParams.category] : []
  );

  const { tags } = useSelector((store) => store.tag);

  const tagData = tags.map((elem, index) => ({
    index,
    text: elem.tag_name,
    id: elem.id,
  }));

  const [selectedTagOption, setSelectedTagOption] = React.useState(
    filterParams !== null ? [...filterParams.tag] : []
  );

  const operationTypeData = [
    {
      index: 0,
      text: "Доход",
      id: "action",
    },
    {
      index: 1,
      text: "Расход",
      id: "transaction",
    },
    {
      index: 2,
      text: "Перевод",
      id: "transfer",
    },
  ];

  const [
    selectedOperationTypeOption,
    setSelectedOperationTypeOption,
  ] = React.useState(filterParams !== null ? [...filterParams.type] : []);

  const onSelectTag = React.useCallback((opt) => {
    setSelectedTagOption(opt ? opt : []);
  }, []);

  const onSelectCategory = React.useCallback((opt) => {
    setSelectedCategoryOption(opt ? opt : []);
  }, []);

  const onSelectAccount = React.useCallback((opt) => {
    setSelectedAccountOption(opt ? opt : []);
  }, []);

  const onSelectProfile = React.useCallback((opt) => {
    setSelectedProfileOption(opt ? opt : []);
  }, []);

  const onSelectOperationType = React.useCallback((opt) => {
    setSelectedOperationTypeOption(opt ? opt : []);
  }, []);

  const onReset = () => {
    setSelectedProfileOption([]);
    setSelectedAccountOption([]);
    setSelectedCategoryOption([]);
    setSelectedTagOption([]);
    setSelectedOperationTypeOption([]);

    dispatch(clearCalendar());
    dispatch(getOperationAction(null, goBack));
  };

  const onSubmit = useCallback(() => {
    const selectedFilters = {
      profile: selectedProfileOption,
      account: selectedAccountOption,
      category: selectedCategoryOption,
      tag: selectedTagOption,
      type: selectedOperationTypeOption,
    };

    dispatch(getOperationAction(selectedFilters, goBack));
  }, [
    selectedAccountOption,
    selectedCategoryOption,
    selectedTagOption,
    selectedOperationTypeOption,
  ]);

  return (
    <ScreenTemplate>
      <Toolbar
        navigation={navigation}
        title="Фильтр операций"
        TargetIcon={BackIcon}
        onTarget={goBack}
        isMenu={false}
      />
      <Layout
        style={{
          flex: 1,
          backgroundColor:
            kittenTheme[
              `color-basic-${themeContext.theme === "light" ? 200 : 900}`
            ],
        }}
      >
        <View
          style={{
            height: 30,
            marginTop: 20,
            marginBottom: 20,
            backgroundColor:
              kittenTheme[
                `color-basic-${themeContext.theme === "light" ? 200 : 900}`
              ],
          }}
        >
          <CustomDatePicker />
        </View>
        <Layout
          style={{
            flex: 1,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 8,
          }}
        >
          <Select
            data={profileData}
            placeholder="Укажите сотрудников"
            selectedOption={profileData.filter((elem) =>
              selectedProfileOption
                .map((elem) => elem.index)
                .includes(elem.index)
            )}
            onSelect={onSelectProfile}
            style={{ marginVertical: 8, marginHorizontal: 8 }}
            multiSelect={true}
          />

          <Select
            data={accountData}
            placeholder="Укажите аккаунт"
            selectedOption={accountData.filter((elem) =>
              selectedAccountOption
                .map((elem) => elem.index)
                .includes(elem.index)
            )}
            onSelect={onSelectAccount}
            style={{ marginVertical: 8, marginHorizontal: 8 }}
            multiSelect={true}
          />

          <Select
            data={categoryData}
            placeholder="Укажите категорию"
            selectedOption={categoryData.filter((elem) =>
              selectedCategoryOption
                .map((elem) => elem.index)
                .includes(elem.index)
            )}
            onSelect={onSelectCategory}
            style={{ marginVertical: 8, marginHorizontal: 8 }}
            multiSelect={true}
          />

          <Select
            data={tagData}
            placeholder="Укажите теги"
            selectedOption={tagData.filter((elem) =>
              selectedTagOption.map((elem) => elem.index).includes(elem.index)
            )}
            onSelect={onSelectTag}
            style={{ marginVertical: 8, marginHorizontal: 8 }}
            multiSelect={true}
          />

          <Select
            data={operationTypeData}
            placeholder="Укажите тип операции"
            selectedOption={operationTypeData.filter((elem) =>
              selectedOperationTypeOption
                .map((elem) => elem.index)
                .includes(elem.index)
            )}
            onSelect={onSelectOperationType}
            style={{ marginVertical: 8, marginHorizontal: 8 }}
            multiSelect={true}
          />

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
        </Layout>
      </Layout>
    </ScreenTemplate>
  );
});
