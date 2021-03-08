import React, { memo } from "react";
import { Spinner, Modal } from "@ui-kitten/components";
import { connect } from "react-redux";
import { StyleSheet, View } from "react-native";

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

const LoadingSpinner = memo(({ loader }) => (
  <Modal backdropStyle={styles.centeredView} visible={loader}>
    <View style={styles.modalView}>
      <Spinner status="primary" />
    </View>
  </Modal>
));

const mapStateToProps = (store) => ({
  loader: store.api.loader,
});

export default connect(mapStateToProps)(LoadingSpinner);
