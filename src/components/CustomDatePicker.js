import React from "react";
import {
  Modal,
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";

import {
  useTheme,
  RangeCalendar,
  Button,
  NativeDateService,
  Text,
} from "@ui-kitten/components";

import { displayDate } from "../dispayDate";
import { ThemeContext } from "../themes/theme-context";

import { CalendarIcon } from "../themes/icons";
import { useDispatch, useSelector } from "react-redux";
import { setCalendar, clearCalendar } from "../store/actions/calendarAction";
const i18n = {
  dayNames: {
    short: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
    long: [
      "Понедельник",
      "Вторник",
      "Среда",
      "Четверг",
      "Пятница",
      "Суббота",
      "Воскресенье",
    ],
  },
  monthNames: {
    short: [
      "Янв",
      "Февр",
      "Марта",
      "Фпр",
      "Мая",
      "Июня",
      "Июля",
      "Фвг",
      "Сент",
      "Окт",
      "Нояб",
      "Дек",
    ],
    long: [
      "января",
      "февраля",
      "марта",
      "апреля",
      "мая",
      "июня",
      "июля",
      "августа",
      "сентября",
      "октября",
      "ноября",
      "декабря",
    ],
  },
};

const dateService = new NativeDateService("ru", { i18n });

export const CustomDatePicker = () => {
  const dispatch = useDispatch();
  const { startDate, endDate } = useSelector((store) => store.calendar);

  const themeContext = React.useContext(ThemeContext);
  const kittenTheme = useTheme();
  const [modalVisible, setModalVisible] = React.useState(false);

  const [range, setRange] = React.useState({
    startDate: null,
    endDate: null,
  });

  React.useEffect(() => {
    setRange({
      startDate,
      endDate,
    });
  }, [startDate]);

  const clearRangeHandler = (range) => {
    dispatch(clearCalendar());
    setModalVisible(false);
  };

  const selectRangeHandler = () => {
    dispatch(setCalendar(range));
    setModalVisible(false);
  };

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Modal
        onRequestClose={() => setModalVisible(false)}
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <TouchableOpacity
          onPressOut={() => setModalVisible(false)}
          style={styles.centeredView}
        >
          <View
            style={{
              ...styles.modalView,
              backgroundColor:
                kittenTheme[
                  `color-basic-${themeContext.theme === "light" ? 200 : 900}`
                ],
            }}
          >
            <TouchableWithoutFeedback>
              <>
                <RangeCalendar
                  dateService={dateService}
                  range={range}
                  onSelect={setRange}
                />
                <View
                  style={{
                    marginTop: 20,
                    flexDirection: "row",
                  }}
                >
                  <Button
                    style={{ marginRight: 20 }}
                    onPress={selectRangeHandler}
                    status="info"
                  >
                    Выбрать
                  </Button>
                  <Button onPress={clearRangeHandler} appearance="outline">
                    Сбросить
                  </Button>
                </View>
              </>
            </TouchableWithoutFeedback>
          </View>
        </TouchableOpacity>
      </Modal>

      <TouchableOpacity
        style={{ flexDirection: "row", alignItems: "center" }}
        onPressOut={() => setModalVisible(true)}
      >
        <CalendarIcon
          fill={
            kittenTheme[
              `color-primary-${themeContext.theme === "light" ? 800 : 100}`
            ]
          }
          style={{
            width: 22,
            height: 22,
          }}
        />
        <Text
          style={{
            marginTop: 1,
            marginLeft: 8,
          }}
          category="p1"
        >
          {`${displayDate(startDate)} – ${displayDate(
            endDate !== null ? endDate : startDate
          )}`}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalView: {
    margin: 20,
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
