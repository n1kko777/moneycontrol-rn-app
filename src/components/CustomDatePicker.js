import React, { memo, useCallback, useMemo } from "react";
import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";

import { useTheme, RangeCalendar, Button, Text } from "@ui-kitten/components";

import { useDispatch, useSelector } from "react-redux";
import { displayDate } from "../dispayDate";
import { ThemeContext } from "../themes/theme-context";

import { CalendarIcon } from "../themes/icons";
import { setCalendar, clearCalendar } from "../store/actions/calendarAction";
import { dateService } from "../dateService";
import {
  getCalendarEndDate,
  getCalendarMinDate,
  getCalendarStartDate,
} from "../store/selectors";

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
    width: Dimensions.get("window").width - 24,
    maxWidth: 600,
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

export const CustomDatePicker = memo(() => {
  const dispatch = useDispatch();

  const startDate = useSelector(getCalendarStartDate);
  const endDate = useSelector(getCalendarEndDate);

  const minDate = useSelector(getCalendarMinDate);

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
  }, [endDate, startDate]);

  const onModalOpen = useCallback(() => setModalVisible(true), []);

  const onModalClose = useCallback(() => {
    setModalVisible(false);
  }, []);

  const clearRangeHandler = useCallback(() => {
    dispatch(clearCalendar());
    onModalClose();
  }, [dispatch, onModalClose]);

  const selectRangeHandler = useCallback(() => {
    dispatch(setCalendar(range));
    onModalClose();
  }, [dispatch, onModalClose, range]);

  const memoDisplayDate = useMemo(
    () =>
      `${displayDate(startDate)} – ${displayDate(
        endDate !== null ? endDate : startDate
      )}`,
    [endDate, startDate]
  );

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Modal
        onRequestClose={onModalClose}
        animationType="slide"
        transparent
        visible={modalVisible}
      >
        <TouchableOpacity onPressOut={onModalClose} style={styles.centeredView}>
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
                  min={minDate}
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
        onPressOut={onModalOpen}
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
          {memoDisplayDate}
        </Text>
      </TouchableOpacity>
    </View>
  );
});
