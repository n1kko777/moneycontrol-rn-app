import React from "react";
import { useTheme } from "@ui-kitten/components";

import { ThemeContext } from "../themes/theme-context";

import { Toolbar } from "../components/navigation/Toolbar";
import { ScreenTemplate } from "../components/ScreenTemplate";
import { BackIcon } from "../themes/icons";
import { View, ScrollView, RefreshControl } from "react-native";

import { useSelector, useDispatch } from "react-redux";

import { getShortName } from "../getShortName";

import { getDataDispatcher } from "../store/actions/apiAction";

import { ReportFilter } from "../components/report/ReportFilter";
import { ChartCompany } from "../components/report/ChartCompany";
import moment from "moment";

import "moment/locale/ru";
moment.locale("ru");

export const ReportScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const themeContext = React.useContext(ThemeContext);
  const kittenTheme = useTheme();

  const store = useSelector((store) => store);

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
    month: +elem.month > 9 ? elem.month : "0" + elem.month,
  }));

  const [selectedPeriodOption, setSelectedPeriodOption] = React.useState([
    ...periodData.sort((a, b) => +a.month > +b.month),
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

  const periodPart = [].concat(
    ...selectedPeriodOption.map((elem) =>
      selectedPeriodOption.length > 1
        ? ["01." + elem.month, "10." + elem.month, "20." + elem.month]
        : [
            "01." + elem.month,
            "10." + elem.month,
            "20." + elem.month,
            "01." +
              (parseInt(elem.month) + 1 > 9
                ? parseInt(elem.month) + 1
                : "0" + (parseInt(elem.month) + 1)),
          ]
    )
  );

  const chartTransactions = {
    title: "Команда",
    subtitle: "Расходы",
    color: "danger",
    labels: periodPart,
    data:
      selectedPeriodOption.length !== 0
        ? periodPart.map((month, monthIndex) =>
            transMonth
              .filter((oper) => {
                const periodArray = [
                  `${month}.${moment().year()}`,
                  `${
                    periodPart[
                      monthIndex + 1 === periodPart.length
                        ? monthIndex
                        : monthIndex + 1
                    ]
                  }.${moment().year()}`,
                ];

                return moment(oper.last_updated).isBetween(
                  moment(periodArray[0], "DD.MM.YYYY"),
                  moment(periodArray[1], "DD.MM.YYYY")
                );
              })
              .filter((oper) =>
                selectedAccountOption.map((ac) => ac.id).includes(oper.account)
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
    labels: periodPart,
    data:
      selectedPeriodOption.length !== 0
        ? periodPart.map((month, monthIndex) =>
            actsMonth
              .filter((oper) => {
                const periodArray = [
                  `${month}.${moment().year()}`,
                  `${
                    periodPart[
                      monthIndex + 1 === periodPart.length
                        ? monthIndex
                        : monthIndex + 1
                    ]
                  }.${moment().year()}`,
                ];
                return moment(oper.last_updated).isBetween(
                  moment(periodArray[0], "DD.MM.YYYY"),
                  moment(periodArray[1], "DD.MM.YYYY")
                );
              })
              .filter((oper) =>
                selectedAccountOption.map((ac) => ac.id).includes(oper.account)
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

  const refreshData = () => {
    dispatch(getDataDispatcher(navigation));
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
          {selectedProfileOption.map((elProf, elProfIndex) => (
            <ChartCompany
              key={elProf.id}
              kittenTheme={kittenTheme}
              themeContext={themeContext}
              transactions={{
                title: elProfIndex === 0 ? "Баланс" : null,
                subtitle: elProf.text,
                color: "basic",
                labels: periodPart,
                data:
                  selectedPeriodOption.length !== 0
                    ? periodPart.map((month, monthIndex) =>
                        totalMonth
                          .filter((oper) => {
                            const periodArray = [
                              `${month}.${moment().year()}`,
                              `${
                                periodPart[
                                  monthIndex + 1 === periodPart.length
                                    ? monthIndex
                                    : monthIndex + 1
                                ]
                              }.${moment().year()}`,
                            ];

                            return moment(oper.last_updated).isBetween(
                              moment(periodArray[0], "DD.MM.YYYY"),
                              moment(periodArray[1], "DD.MM.YYYY")
                            );
                          })
                          .filter((oper) =>
                            selectedAccountOption
                              .filter((ac) => ac.profile === elProf.id)
                              .map((ac) => ac.id)
                              .includes(oper.account)
                          )
                          .map((oper) => {
                            const newOper = { ...oper };
                            newOper.transaction_amount !== undefined &&
                              (newOper.transaction_amount =
                                newOper.transaction_amount * -1);
                            return newOper;
                          })
                      )
                    : [],
                totalAmount: selectedAccountOption
                  .filter((ac) => ac.profile === elProf.id)
                  .reduce((acc, next) => (acc += +next.balance), 0),
              }}
              accountData={selectedAccountOption.filter(
                (ac) => ac.profile === elProf.id
              )}
              startBalance={
                selectedAccountOption
                  .filter((ac) => ac.profile === elProf.id)
                  .reduce((acc, next) => (acc += +next.balance), 0) -
                (selectedPeriodOption.length !== 0
                  ? selectedPeriodOption
                      .map((elem) => elem.shortText)
                      .map((month) =>
                        totalMonth
                          .filter(
                            (oper) =>
                              moment(oper.last_updated).month() ==
                              moment().month(month).format("M") - 1
                          )
                          .filter((oper) =>
                            selectedAccountOption
                              .filter((ac) => ac.profile === elProf.id)
                              .map((ac) => ac.id)
                              .includes(oper.account)
                          )
                          .reduce((oper, prev) => {
                            oper =
                              oper +
                              (prev.transaction_amount !== undefined
                                ? +prev.transaction_amount * -1
                                : +prev.action_amount);

                            return oper;
                          }, 0)
                      )
                      .reduce((sum, next) => sum + next, 0)
                  : 0)
              }
            />
          ))}
        </View>
      </ScrollView>
    </ScreenTemplate>
  );
};
