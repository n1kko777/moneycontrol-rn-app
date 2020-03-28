import React from "react";
import { StyleSheet } from "react-native";
import { Modal, Spinner, Layout } from "@ui-kitten/components";

export const LoadingSpinner = ({ loading }) => {
  const renderModalElement = () => (
    <Layout level="3" style={styles.modalContainer}>
      <Spinner status="primary" />
    </Layout>
  );
  return (
    <Modal backdropStyle={styles.backdrop} visible={loading}>
      {renderModalElement()}
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    borderRadius: 10,
    padding: 16
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  }
});
