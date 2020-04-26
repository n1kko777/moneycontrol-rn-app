import React from "react";
import { Button, Select } from "@ui-kitten/components";
import { View } from "react-native";

import { CustomDatePicker } from "../CustomDatePicker";

import { useSelector } from "react-redux";

import { getShortName } from "../../getShortName";

export const ReportFilter = ({ kittenTheme, themeContext }) => {
  const { profile } = useSelector((store) => store.profile);
  const { company } = useSelector((store) => store.company);

  const initProfileData =
    profile !== null && profile.is_admin ? company.profiles : [profile];

  const profileData = initProfileData
    .filter((elem) => elem !== null)
    .map((elem, index) => ({
      index,
      text: getShortName(elem.first_name + " " + elem.last_name),
      id: elem.id,
      is_admin: elem.is_admin,
    }));

  const [selectedProfileOption, setSelectedProfileOption] = React.useState([
    profileData.find((prof) => prof.id === profile.id),
  ]);

  const { accounts } = useSelector((store) => store.account);

  const accountData = []
    .concat(
      ...selectedProfileOption.map((selProf) =>
        accounts.filter((acc) => acc.profile == selProf.id)
      )
    )
    .map((elem, index) => ({
      index,
      text:
        selectedProfileOption.length == 1
          ? `${elem.account_name}`
          : `${elem.account_name} (${
              profileData.find((prof) => elem.profile == prof.id).text
            })`,
      id: elem.id,
    }));

  const [selectedAccountOption, setSelectedAccountOption] = React.useState([]);

  const { categories } = useSelector((store) => store.category);

  const categoryData = categories.map((elem, index) => ({
    index,
    text: elem.category_name,
    id: elem.id,
  }));

  const [selectedCategoryOption, setSelectedCategoryOption] = React.useState(
    []
  );

  const { tags } = useSelector((store) => store.tag);

  const tagData = tags.map((elem, index) => ({
    index,
    text: elem.tag_name,
    id: elem.id,
  }));

  const [selectedTagOption, setSelectedTagOption] = React.useState([]);

  const onSelectTag = React.useCallback((opt) => {
    setSelectedTagOption(opt);
  });

  const onSelectCategory = React.useCallback((opt) => {
    setSelectedCategoryOption(opt);
  });

  const onSelectAccount = React.useCallback((opt) => {
    setSelectedAccountOption(opt);
  });

  const onSelectProfile = React.useCallback((opt) => {
    setSelectedProfileOption(opt);
  });

  React.useEffect(() => {
    setSelectedAccountOption(accountData);
  }, [selectedProfileOption]);

  const onReset = () => {
    setSelectedProfileOption([]);
    setSelectedAccountOption([]);
    setSelectedCategoryOption([]);
    setSelectedTagOption([]);
  };
  return (
    <View
      style={{
        flex: 1,
        borderRadius: 10,
        marginHorizontal: 8,
        marginTop: 15,
        marginBottom: 30,
        padding: 16,
        paddingTop: 8,
        backgroundColor:
          kittenTheme[
            `color-basic-${themeContext.theme === "light" ? 100 : 800}`
          ],
      }}
    >
      <View
        style={{
          width: "95%",
          maxWidth: 720,
          alignSelf: "center",
        }}
      >
        <View style={{ height: 30, marginTop: 10 }}>
          <CustomDatePicker />
        </View>

        <Select
          data={profileData}
          placeholder="Укажите сотрудника"
          selectedOption={profileData.filter(
            (elem) =>
              selectedProfileOption !== undefined &&
              selectedProfileOption
                .map((elem) => elem.index)
                .includes(elem.index)
          )}
          onSelect={onSelectProfile}
          style={{ marginVertical: 10 }}
          multiSelect={true}
        />

        <Select
          data={accountData}
          placeholder="Укажите аккаунт"
          selectedOption={accountData.filter(
            (elem) =>
              selectedAccountOption !== undefined &&
              selectedAccountOption
                .map((elem) => elem.index)
                .includes(elem.index)
          )}
          onSelect={onSelectAccount}
          style={{ marginVertical: 10 }}
          multiSelect={true}
        />

        <Select
          data={categoryData}
          placeholder="Укажите категорию"
          selectedOption={categoryData.filter(
            (elem) =>
              selectedCategoryOption !== undefined &&
              selectedCategoryOption
                .map((elem) => elem.index)
                .includes(elem.index)
          )}
          onSelect={onSelectCategory}
          style={{ marginVertical: 10 }}
          multiSelect={true}
        />

        <Select
          data={tagData}
          placeholder="Укажите теги"
          selectedOption={tagData.filter(
            (elem) =>
              selectedTagOption !== undefined &&
              selectedTagOption.map((elem) => elem.index).includes(elem.index)
          )}
          onSelect={onSelectTag}
          style={{ marginVertical: 10 }}
          multiSelect={true}
        />

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            marginTop: 15,
            justifyContent: "space-around",
          }}
        >
          <Button status="info">Применить</Button>
          <Button onPress={onReset} appearance="outline">
            Сбросить
          </Button>
        </View>
      </View>
    </View>
  );
};
