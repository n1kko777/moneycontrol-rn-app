import React from "react";
import { Spinner, Modal, Layout } from "@ui-kitten/components";
import { useSelector } from "react-redux";
import { StyleSheet, View } from "react-native";

export const LoadingSpinner = () => {
  const { loader } = useSelector((store) => store.api);

  const renderModalElement = () => (
    <View style={styles.modalView}>
      <Spinner status="primary" />
    </View>
  );
  return (
    <Modal backdropStyle={styles.centeredView} visible={loader}>
      {renderModalElement()}
    </Modal>
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
    backgroundColor: "white",
    borderRadius: 20,
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
});
