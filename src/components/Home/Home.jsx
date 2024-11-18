import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import api from "../../api/api";
import Header from "../Header/Header";
import useAppContext from "../../hooks/useAppContext";
import { Figure } from "react-bootstrap";
import Features from "../Features/Features.jsx";
import "./home.scss";
import Footer from "../Footer/Footer";
import { handleApiResponse, verifyCookie } from "../../utils/utils";
import Hero from "../Hero/Hero.jsx";

function Home() {
  let navigate = useNavigate();
  const { auth, setAuth, setUser, loading, setLoading } = useAppContext();

  useEffect(() => {
    if (auth) {
      navigate("/app/dashboard");
    }
  }, []);

  const loginDetails = {
    email: `${process.env.REACT_APP_DEMO_EMAIL}`,
    password: `${process.env.REACT_APP_DEMO_PASSWORD}`,
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    try {
      await verifyCookie();
      let response = await handleApiResponse(() => api.post("/api/login", { ...loginDetails }));
      const { data } = response;
      const { user } = data;
      const { id, name, email } = user;
      setLoading(false);
      setAuth(true);
      setUser({ id, name, email });
      navigate("/app/tasks", { replace: true });
    } catch (err) {
      console.log(err);
      setAuth(false);
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <>
      <Header />
      <div className="tl-home-section__home-wrapper">
        <div className="tl-home-section__hero-wrapper">
          <Hero handleDemoLogin={handleDemoLogin} />
        </div>
      </div>
      <section className="tl-home-section__features">
        <Features />
      </section>
      <Footer />
    </>
  );
}

export default Home;
