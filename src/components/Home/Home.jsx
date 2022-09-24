import React from "react";
import Login from "../Login/Login";
import Stats from "../Stats/Stats";
import "./home.css";

function Home() {
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
