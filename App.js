import React from 'react';
import { Provider } from 'react-redux';
import { AppContainer } from './src/components/AppContainer';
import useDisableBack from './src/hook/useDisableBack';
import store from './src/store';

export default function App() {
  useDisableBack();

  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}
