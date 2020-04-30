import React from "react";
import { Button, Select } from "@ui-kitten/components";
import { View } from "react-native";

import { CustomDatePicker } from "../CustomDatePicker";

export const ReportFilter = ({
  kittenTheme,
  themeContext,
  periodData,
  filteredPeriodData,
  onSelectPeriod,
  profileData,
  filteredProfileData,
  onSelectProfile,
  accountData,
  filteredAccountData,
  onSelectAccount,
  categoryData,
  filteredCategoryData,
  onSelectCategory,
  tagData,
  filteredTagData,
  onSelectTag,
  onReset,
}) => {
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
        <Select
          data={periodData}
          placeholder="Укажите месяца"
          selectedOption={filteredPeriodData}
          onSelect={onSelectPeriod}
          style={{ marginVertical: 10 }}
          multiSelect={true}
        />

        <Select
          data={profileData}
          placeholder="Укажите сотрудников"
          selectedOption={filteredProfileData}
          onSelect={onSelectProfile}
          style={{ marginVertical: 10 }}
          multiSelect={true}
        />

        <Select
          data={accountData}
          placeholder="Укажите аккаунт"
          selectedOption={filteredAccountData}
          onSelect={onSelectAccount}
          style={{ marginVertical: 10 }}
          multiSelect={true}
        />

        <Select
          data={categoryData}
          placeholder="Укажите категорию"
          selectedOption={filteredCategoryData}
          onSelect={onSelectCategory}
          style={{ marginVertical: 10 }}
          multiSelect={true}
        />

        <Select
          data={tagData}
          placeholder="Укажите теги"
          selectedOption={filteredTagData}
          onSelect={onSelectTag}
          style={{ marginVertical: 10 }}
          multiSelect={true}
        />

        <Button onPress={onReset} appearance="outline">
          Сбросить
        </Button>
      </View>
    </View>
  );
};
