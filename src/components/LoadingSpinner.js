import React from "react";
import { Spinner } from "@ui-kitten/components";
import { useSelector } from "react-redux";
import { Modal, StyleSheet, View } from "react-native";

export const LoadingSpinner = () => {
  const { loader } = useSelector(state => state.api);
  return (
    <Modal animationType="none" transparent={true} visible={loader}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Spinner status="primary" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)"
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
