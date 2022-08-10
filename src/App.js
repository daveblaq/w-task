import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { store } from "./components/redux/store";
import { Provider } from "react-redux";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Provider>
  );
};



export default App; 
