import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/app.css";
import { UserProvider } from "./context";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import history from "./history";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HistoryRouter history={history}>
      <UserProvider>
        <App />
      </UserProvider>
    </HistoryRouter>
  </React.StrictMode>
);
