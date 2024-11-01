import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./styles/app.scss";
import "./styles/queries.css";
import { UserProvider } from "./context/context";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import history from "./history/history";
import { ToastContainer } from 'react-toastify';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HistoryRouter history={history}>
      <UserProvider>
        <App />
      </UserProvider>
    </HistoryRouter>
    <ToastContainer />
  </React.StrictMode>
);
