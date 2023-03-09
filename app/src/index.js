import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { AppProvider } from "./Context/index.js";
import { Provider } from "react-redux";
import store from "./store/index.js";
import i18next from "i18next";
import ru from "./locales/ru.js";
import { initReactI18next, I18nextProvider } from "react-i18next";
const init = async () => {
  i18next.use(initReactI18next).init({
    lng: "ru",
    debug: true,
    resources: { ru },
  });
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <I18nextProvider i18n={i18next}>
          <AppProvider>
            <App />
          </AppProvider>
        </I18nextProvider>
      </Provider>
    </React.StrictMode>
  );
};

init();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
