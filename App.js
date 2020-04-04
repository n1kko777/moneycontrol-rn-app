import React from "react";
import { Provider } from "react-redux";
import store from "./src/store";

import { AppContainer } from "./src/components/AppContainer";
import { BackHandler } from "react-native";

const App = () => {
  BackHandler.addEventListener("hardwareBackPress", function() {
    return true;
  });

  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
};

export default App;
