import React from "react";
import { useTheme } from "@ui-kitten/components";

import { ThemeContext } from "../themes/theme-context";

import { Toolbar } from "../components/navigation/Toolbar";
import { ScreenTemplate } from "../components/ScreenTemplate";
import { BackIcon } from "../themes/icons";
import { View, ScrollView, RefreshControl } from "react-native";

import { useSelector, useDispatch } from "react-redux";

import { getShortName } from "../getShortName";

import {
  getDataDispatcher,
  startLoader,
  endLoader,
} from "../store/actions/apiAction";

import { ReportFilter } from "../components/report/ReportFilter";
import { ChartCompany } from "../components/report/ChartCompany";

import moment from "moment";
moment.locale("ru");

export const ReportScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const themeContext = React.useContext(ThemeContext);
  const kittenTheme = useTheme();

  const store = useSelector((state) => state);

  const { transactions } = store.transaction;
  const { actions } = store.action;

  const transYear = transactions.filter(
    (oper) => moment(oper.last_updated).year() === moment().year()
  );

  const actsYear = actions.filter(
    (oper) => moment(oper.last_updated).year() === moment().year()
  );

  const transPeriod = transYear.reduce(
    (months, nextOper) =>
      months
        .map((elem) => elem.short)
        .includes(moment(nextOper.last_updated).format("MMM"))
        ? months
        : [
            ...months,
            {
              short: moment(nextOper.last_updated).format("MMM"),
              normal: moment(nextOper.last_updated).format("MMMM"),
              month: moment(nextOper.last_updated).format("M"),
            },
          ],
    []
  );

  const actsPeriod = actsYear.reduce(
    (months, nextOper) =>
      months
        .map((elem) => elem.short)
        .includes(moment(nextOper.last_updated).format("MMM"))
        ? months
        : [
            ...months,
            {
              short: moment(nextOper.last_updated).format("MMM"),
              normal: moment(nextOper.last_updated).format("MMMM"),
              month: moment(nextOper.last_updated).format("M"),
            },
          ],
    []
  );

  const totalPeriod = [...transPeriod, ...actsPeriod].reduce(
    (months, nex) =>
      months.map((elem) => elem.short).includes(nex.short)
        ? months
        : [...months, nex],
    []
  );

  const periodData = totalPeriod.map((elem, index) => ({
    index,
    text: elem.normal,
    shortText: elem.short,
    month: elem.month,
  }));

  const [selectedPeriodOption, setSelectedPeriodOption] = React.useState([
    ...periodData,
  ]);

  const transMonth = transYear.filter((oper) =>
    selectedPeriodOption
      .map((el) => el.text)
      .includes(moment(oper.last_updated).format("MMMM"))
  );

  const actsMonth = actsYear.filter((oper) =>
    selectedPeriodOption
      .map((el) => el.text)
      .includes(moment(oper.last_updated).format("MMMM"))
  );

  const totalMonth = [...transMonth, ...actsMonth];

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

  const categoryData = categories
    .filter((elem) => totalMonth.map((trs) => trs.category).includes(elem.id))
    .map((elem, index) => ({
      index,
      text: elem.category_name,
      id: elem.id,
    }));

  const [selectedCategoryOption, setSelectedCategoryOption] = React.useState(
    []
  );

  const { tags } = useSelector((store) => store.tag);

  const tagData = tags
    .filter((elem) =>
      [].concat
        .apply(
          [],
          totalMonth.map((trs) => trs.tags)
        )
        .reduce(
          (arr, next) => (arr.some((el) => el == next) ? arr : [...arr, next]),
          []
        )
        .includes(elem.id)
    )
    .map((elem, index) => ({
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

  const onSelectPeriod = React.useCallback((opt) => {
    setSelectedPeriodOption(opt);
  });

  const chartTransactions = {
    title: "Команда",
    subtitle: "Расходы",
    color: "danger",
    labels: [].concat(
      ...selectedPeriodOption.map((elem) => [
        "1 / 4 " + elem.shortText,
        "1 / 2 " + elem.shortText,
        "3 / 4 " + elem.shortText,
        elem.shortText,
      ])
    ),
    data:
      selectedPeriodOption.length !== 0
        ? []
            .concat(
              ...selectedPeriodOption.map((elem) => [
                "1 / 4 " + elem.shortText,
                "1 / 2 " + elem.shortText,
                "3 / 4 " + elem.shortText,
                elem.shortText,
              ])
            )
            .map((month) =>
              transMonth
                .filter((oper) => {
                  const periodArray = month.match(/\d+/gi);

                  return (
                    moment(oper.last_updated).month() ==
                      moment().month(month).format("M") - 1 &&
                    moment(oper.last_updated).isBetween(
                      periodArray !== null
                        ? moment(oper.last_updated).date(
                            parseInt(
                              +moment(oper.last_updated).daysInMonth() /
                                periodArray[0] ==
                                1
                                ? +moment(oper.last_updated).daysInMonth()
                                : +periodArray[0]
                            )
                          )
                        : moment(oper.last_updated).startOf("month"),
                      moment(oper.last_updated).date(
                        parseInt(
                          +moment(oper.last_updated).daysInMonth() /
                            (periodArray !== null ? +periodArray[1] : 1)
                        )
                      )
                    )
                  );
                })
                .filter((oper) =>
                  selectedAccountOption
                    .map((ac) => ac.id)
                    .includes(oper.account)
                )
                .filter((oper) =>
                  selectedCategoryOption.length !== 0
                    ? selectedCategoryOption
                        .map((ac) => ac.id)
                        .includes(oper.category)
                    : oper
                )
                .filter((oper) =>
                  selectedTagOption.length !== 0
                    ? [].concat
                        .apply(
                          [],
                          selectedTagOption.map((trs) => trs.id)
                        )
                        .some((selTag) => oper.tags.includes(selTag))
                    : oper
                )
            )
        : [],
    totalAmount:
      selectedPeriodOption.length !== 0
        ? selectedPeriodOption
            .map((elem) => elem.shortText)
            .map((month) =>
              transMonth
                .filter(
                  (oper) =>
                    moment(oper.last_updated).month() ==
                    moment().month(month).format("M") - 1
                )
                .filter((oper) =>
                  selectedAccountOption
                    .map((ac) => ac.id)
                    .includes(oper.account)
                )
                .filter((oper) =>
                  selectedCategoryOption.length !== 0
                    ? selectedCategoryOption
                        .map((ac) => ac.id)
                        .includes(oper.category)
                    : oper
                )
                .filter((oper) =>
                  selectedTagOption.length !== 0
                    ? [].concat
                        .apply(
                          [],
                          selectedTagOption.map((trs) => trs.id)
                        )
                        .some((selTag) => oper.tags.includes(selTag))
                    : oper
                )
                .reduce((oper, prev) => (oper += +prev.transaction_amount), 0)
            )
            .reduce((sum, next) => sum + next, 0)
        : 0,
  };

  const chartActions = {
    subtitle: "Доходы",
    color: "success",
    labels: [].concat(
      ...selectedPeriodOption.map((elem) => [
        "1 / 4 " + elem.shortText,
        "1 / 2 " + elem.shortText,
        "3 / 4 " + elem.shortText,
        elem.shortText,
      ])
    ),
    data:
      selectedPeriodOption.length !== 0
        ? []
            .concat(
              ...selectedPeriodOption.map((elem) => [
                "1 / 4 " + elem.shortText,
                "1 / 2 " + elem.shortText,
                "3 / 4 " + elem.shortText,
                elem.shortText,
              ])
            )
            .map((month) =>
              actsMonth
                .filter((oper) => {
                  const periodArray = month.match(/\d+/gi);

                  return (
                    moment(oper.last_updated).month() ==
                      moment().month(month).format("M") - 1 &&
                    moment(oper.last_updated).isBetween(
                      periodArray !== null
                        ? moment(oper.last_updated).date(
                            parseInt(
                              +moment(oper.last_updated).daysInMonth() /
                                periodArray[0] ==
                                1
                                ? +moment(oper.last_updated).daysInMonth()
                                : +periodArray[0]
                            )
                          )
                        : moment(oper.last_updated).startOf("month"),
                      moment(oper.last_updated).date(
                        parseInt(
                          +moment(oper.last_updated).daysInMonth() /
                            (periodArray !== null ? +periodArray[1] : 1)
                        )
                      )
                    )
                  );
                })
                .filter((oper) =>
                  selectedAccountOption
                    .map((ac) => ac.id)
                    .includes(oper.account)
                )
                .filter((oper) =>
                  selectedCategoryOption.length !== 0
                    ? selectedCategoryOption
                        .map((ac) => ac.id)
                        .includes(oper.category)
                    : oper
                )
                .filter((oper) =>
                  selectedTagOption.length !== 0
                    ? [].concat
                        .apply(
                          [],
                          selectedTagOption.map((trs) => trs.id)
                        )
                        .some((selTag) => oper.tags.includes(selTag))
                    : oper
                )
            )
        : [],
    totalAmount:
      selectedPeriodOption.length !== 0
        ? selectedPeriodOption
            .map((elem) => elem.shortText)
            .map((month) =>
              actsMonth
                .filter(
                  (oper) =>
                    moment(oper.last_updated).month() ==
                    moment().month(month).format("M") - 1
                )
                .filter((oper) =>
                  selectedAccountOption
                    .map((ac) => ac.id)
                    .includes(oper.account)
                )
                .filter((oper) =>
                  selectedCategoryOption.length !== 0
                    ? selectedCategoryOption
                        .map((ac) => ac.id)
                        .includes(oper.category)
                    : oper
                )
                .filter((oper) =>
                  selectedTagOption.length !== 0
                    ? [].concat
                        .apply(
                          [],
                          selectedTagOption.map((trs) => trs.id)
                        )
                        .some((selTag) => oper.tags.includes(selTag))
                    : oper
                )
                .reduce((oper, prev) => (oper += +prev.action_amount), 0)
            )
            .reduce((sum, next) => sum + next, 0)
        : 0,
  };

  const refreshData = async () => {
    dispatch(startLoader());
    await dispatch(getDataDispatcher());
    dispatch(endLoader());
  };

  const onReset = () => {
    setSelectedPeriodOption([]);
    setSelectedProfileOption([]);
    setSelectedAccountOption([]);
    setSelectedCategoryOption([]);
    setSelectedTagOption([]);
  };

  React.useEffect(() => {
    setSelectedAccountOption(accountData);
  }, [selectedProfileOption]);

  return (
    <ScreenTemplate>
      <Toolbar
        navigation={navigation}
        title="Отчет"
        TargetIcon={BackIcon}
        onTarget={() => navigation.navigate("Home")}
        isMenu={false}
      />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={refreshData}
            tintColor="transparent"
          />
        }
        style={{
          flex: 1,
          backgroundColor:
            kittenTheme[
              `color-basic-${themeContext.theme === "light" ? 200 : 900}`
            ],
        }}
      >
        <View onStartShouldSetResponder={() => true}>
          <ReportFilter
            kittenTheme={kittenTheme}
            themeContext={themeContext}
            periodData={periodData}
            filteredPeriodData={periodData.filter(
              (elem) =>
                selectedPeriodOption !== undefined &&
                selectedPeriodOption
                  .map((elem) => elem.index)
                  .includes(elem.index)
            )}
            onSelectPeriod={onSelectPeriod}
            profileData={profileData}
            filteredProfileData={profileData.filter(
              (elem) =>
                selectedProfileOption !== undefined &&
                selectedProfileOption
                  .map((elem) => elem.index)
                  .includes(elem.index)
            )}
            onSelectProfile={onSelectProfile}
            accountData={accountData}
            filteredAccountData={accountData.filter(
              (elem) =>
                selectedAccountOption !== undefined &&
                selectedAccountOption
                  .map((elem) => elem.index)
                  .includes(elem.index)
            )}
            onSelectAccount={onSelectAccount}
            categoryData={categoryData}
            filteredCategoryData={categoryData.filter(
              (elem) =>
                selectedCategoryOption !== undefined &&
                selectedCategoryOption
                  .map((elem) => elem.index)
                  .includes(elem.index)
            )}
            onSelectCategory={onSelectCategory}
            tagData={tagData}
            filteredTagData={tagData.filter(
              (elem) =>
                selectedTagOption !== undefined &&
                selectedTagOption.map((elem) => elem.index).includes(elem.index)
            )}
            onSelectTag={onSelectTag}
            onReset={onReset}
          />
          <ChartCompany
            kittenTheme={kittenTheme}
            themeContext={themeContext}
            transactions={chartTransactions}
            accountData={selectedAccountOption}
          />
          <ChartCompany
            kittenTheme={kittenTheme}
            themeContext={themeContext}
            transactions={chartActions}
            accountData={selectedAccountOption}
          />
        </View>
      </ScrollView>
    </ScreenTemplate>
  );
};
