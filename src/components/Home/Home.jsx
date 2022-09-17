import React from "react";
import { useEffect } from "react";
import Login from "../Login/Login";
import Stats from "../Stats/Stats";
import Register from "../Register/Register";
import "./home.css";

function Home() {
  useEffect(() => {
    let authStatus = localStorage.getItem("isAuth");
  }, []);

  return (
    <div className="container home-wrapper">
      {localStorage.getItem("isAuth") === "true" ? (
        <Stats />
      ) : (
        <>
          <Login />
        </>
      )}
    </div>
  );
}

export default Home;
