import React, { memo, useCallback, useMemo, useState } from "react";
import { View } from "react-native";

import {
  Layout,
  Select,
  SelectItem,
  IndexPath,
  Text,
  useTheme,
  Button,
} from "@ui-kitten/components";

import { useDispatch, useSelector } from "react-redux";

import moment from "moment";
import DatePicker from "../libs/react-native-date-picker";
import { Toolbar } from "../components/navigation/Toolbar";
import { ScreenTemplate } from "../components/ScreenTemplate";
import { BackIcon } from "../themes/icons";
import {
  getCalendarEndDate,
  getCalendarMinDate,
  getCalendarStartDate,
  getLayoutFilterParams,
} from "../store/selectors";
import { clearCalendar, setCalendar } from "../store/actions/calendarAction";
import { getOperationAction } from "../store/actions/apiAction";
import { FlexibleView } from "../components/FlexibleView";
import { displayDate } from "../dispayDate";

const PERIOD_DATA = [
  "Сегодня",
  "Вчера",
  "Текущая неделя",
  "Прошлая неделя",
  "Текущий месяц",
  "Прошлый месяц",
  "Квартал",
  "Год",
  "Произвольный период",
];

const initialSelectedItem = new IndexPath(PERIOD_DATA.length - 1);

export const PeriodPickerScreen = memo(({ navigation }) => {
  const dispatch = useDispatch();
  const kittenTheme = useTheme();

  const filterParams = useSelector(getLayoutFilterParams);

  const startDate = useSelector(getCalendarStartDate);
  const endDate = useSelector(getCalendarEndDate);

  const minDate = useSelector(getCalendarMinDate);

  const onNavigateBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const [selectedPeriodIndex, setSelectedPeriodIndex] = React.useState(
    initialSelectedItem
  );

  const [isDisabled, setIsDisabled] = useState(false);

  const selectedPeriodValue = PERIOD_DATA[selectedPeriodIndex.row];

  const [period, setPeriod] = useState({
    startDate: moment(startDate),
    endDate: moment(endDate),
  });

  const onSelectPeriod = useCallback((index) => {
    setSelectedPeriodIndex(index);

    switch (index.row) {
      case 0:
        setPeriod({
          startDate: moment(),
          endDate: moment(),
        });
        break;
      case 1:
        setPeriod({
          startDate: moment().subtract(1, "days"),
          endDate: moment().subtract(1, "days"),
        });
        break;
      case 2:
        setPeriod({
          startDate: moment().isoWeekday(1).startOf("week").startOf("day"),
          endDate: moment().isoWeekday(1).endOf("week").startOf("day"),
        });
        break;
      case 3:
        setPeriod({
          startDate: moment()
            .subtract(1, "weeks")
            .isoWeekday(1)
            .startOf("week")
            .startOf("day"),
          endDate: moment()
            .subtract(1, "weeks")
            .isoWeekday(1)
            .endOf("week")
            .startOf("day"),
        });
        break;
      case 4:
        setPeriod({
          startDate: moment().startOf("month").startOf("day"),
          endDate: moment().endOf("month").startOf("day"),
        });
        break;
      case 5:
        setPeriod({
          startDate: moment()
            .subtract(1, "months")
            .startOf("month")
            .startOf("day"),
          endDate: moment().subtract(1, "months").endOf("month").startOf("day"),
        });
        break;
      case 6:
        setPeriod({
          startDate: moment().startOf("quarter").startOf("day"),
          endDate: moment().endOf("quarter").startOf("day"),
        });
        break;
      case 7:
        setPeriod({
          startDate: moment().startOf("year").startOf("day"),
          endDate: moment().endOf("year").startOf("day"),
        });
        break;
      default:
        break;
    }
    setIsDisabled(index.row !== PERIOD_DATA.length - 1);
  }, []);

  const memoSelectPeriod = useMemo(
    () =>
      Object.keys(PERIOD_DATA).map((elPeriod) => (
        <SelectItem key={PERIOD_DATA[elPeriod]} title={PERIOD_DATA[elPeriod]} />
      )),
    []
  );

  const onChangeStartDate = useCallback((newDate) => {
    setPeriod((prevState) => ({ ...prevState, startDate: moment(newDate) }));
  }, []);

  const onChangeEndDate = useCallback((newDate) => {
    setPeriod((prevState) => ({ ...prevState, endDate: moment(newDate) }));
  }, []);

  const onCancelPress = useCallback(() => {
    dispatch(clearCalendar());
    dispatch(getOperationAction(filterParams));
    navigation.goBack();
  }, [dispatch, filterParams, navigation]);

  const onSubmitPress = useCallback(() => {
    dispatch(setCalendar(period));
    dispatch(getOperationAction(filterParams));
    navigation.goBack();
  }, [dispatch, filterParams, navigation, period]);

  return (
    <ScreenTemplate>
      <FlexibleView>
        <Toolbar
          navigation={navigation}
          title="Период"
          TargetIcon={BackIcon}
          onTarget={onNavigateBack}
          isMenu={false}
        />
        <Layout
          style={{
            flex: 1,
            marginHorizontal: 16,
            marginVertical: 8,
          }}
        >
          <Text style={{ marginBottom: 8 }} category="s2">
            Выберите период:
          </Text>
          <Select
            value={selectedPeriodValue}
            selectedIndex={selectedPeriodIndex}
            onSelect={onSelectPeriod}
            style={{ marginBottom: 20 }}
          >
            {memoSelectPeriod}
          </Select>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 24,
            }}
          >
            <Text style={{ marginBottom: 8 }} category="s1">
              Начальная дата:
            </Text>
            <Text style={{ marginBottom: 8 }} category="s1">
              {period.startDate ? displayDate(period.startDate) : ""}
            </Text>
          </View>
          {!isDisabled ? (
            <DatePicker
              value={period.startDate}
              onChange={onChangeStartDate}
              textColor={kittenTheme["text-basic-color"]}
              markColor={kittenTheme["background-basic-color-2"]}
              fadeColor={kittenTheme["background-basic-color-1"]}
              startYear={moment(minDate).year()}
              endYear={moment().year()}
              height={160}
            />
          ) : null}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 24,
            }}
          >
            <Text style={{ marginBottom: 8 }} category="s1">
              Конечная дата:
            </Text>
            <Text style={{ marginBottom: 8 }} category="s1">
              {period.endDate ? displayDate(period.endDate) : ""}
            </Text>
          </View>
          {!isDisabled ? (
            <DatePicker
              value={period.endDate}
              onChange={onChangeEndDate}
              textColor={kittenTheme["text-basic-color"]}
              markColor={kittenTheme["background-basic-color-2"]}
              fadeColor={kittenTheme["background-basic-color-1"]}
              startYear={moment(minDate).year()}
              endYear={moment().year()}
              height={160}
            />
          ) : null}
          <View
            style={{
              marginTop: 30,
              marginHorizontal: -10,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Button style={{ flex: 1, margin: 10 }} onPress={onSubmitPress}>
              Применить
            </Button>
            <Button
              style={{ flex: 1, margin: 10 }}
              onPress={onCancelPress}
              appearance="outline"
            >
              Сбросить
            </Button>
          </View>
        </Layout>
      </FlexibleView>
    </ScreenTemplate>
  );
});
