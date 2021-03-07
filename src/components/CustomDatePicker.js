import React, { memo, useCallback } from "react";
import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";

import { useTheme, RangeCalendar, Button, Text } from "@ui-kitten/components";

import { displayDate } from "../dispayDate";
import { ThemeContext } from "../themes/theme-context";

import { CalendarIcon } from "../themes/icons";
import { useDispatch, useSelector } from "react-redux";
import { setCalendar, clearCalendar } from "../store/actions/calendarAction";
import { dateService } from "../dateService";

export const CustomDatePicker = memo(() => {
  const dispatch = useDispatch();
  const { startDate, endDate } = useSelector((store) => store.calendar);
  const profile = useSelector((store) => store.profile.profile);

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

  const onModalClose = useCallback(() => {
    setModalVisible(false);
  }, []);

  const clearRangeHandler = useCallback(() => {
    dispatch(clearCalendar());
    onModalClose();
  }, []);

  const selectRangeHandler = useCallback(() => {
    dispatch(setCalendar(range));
    onModalClose();
  }, [range]);

  const minDate =
    profile !== null
      ? new Date(profile.created)
      : new Date(new Date().getFullYear() - 1, 0, 1);

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Modal
        onRequestClose={onModalClose}
        animationType="slide"
        transparent={true}
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
});

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
