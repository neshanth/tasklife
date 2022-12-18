import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/app.css";
import { UserProvider } from "./context/context";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import history from "./history/history";
import { TaskProvider } from "./context/taskContext.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HistoryRouter history={history}>
      <UserProvider>
        <TaskProvider>
          <App />
        </TaskProvider>
      </UserProvider>
    </HistoryRouter>
  </React.StrictMode>
);
