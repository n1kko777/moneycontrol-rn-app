import React from "react";
import { Provider } from "react-redux";
import store from "./src/store";

import { AppContainer } from "./src/components/AppContainer";
import useDisableBack from "./src/hook/useDisableBack";
const App = () => {
  useDisableBack();
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
};

export default App;
