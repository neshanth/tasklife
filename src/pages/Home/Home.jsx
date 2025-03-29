import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner.jsx";
import api from "../../api/api.js";
import Header from "../../components/Header/Header.jsx";
import useAppContext from "../../hooks/useAppContext.js";
import { Figure } from "react-bootstrap";
import Features from "../../components/Features/Features.jsx";
import "./home.scss";
import Footer from "../../components/Footer/Footer.jsx";
import { handleApiResponse, verifyCookie } from "../../utils/utils.js";
import Hero from "../../components/Hero/Hero.jsx";

function Home() {
  let navigate = useNavigate();
  const { auth, setAuth, setUser, loading, setLoading } = useAppContext();

  useEffect(() => {
    if (auth) {
      navigate("/app/dashboard");
    }
  }, []);

  const loginDetails = {
    email: `${import.meta.env.VITE_DEMO_EMAIL}`,
    password: `${import.meta.env.VITE_DEMO_PASSWORD}`,
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
      <section className="tl-section tl-home__wrapper">
        <div className="tl-wrapper tl-home__hero-wrapper">
          <Hero handleDemoLogin={handleDemoLogin} />
        </div>
      </section>
      <section className="tl-section tl-home__features">
        <Features />
      </section>
      <Footer />
    </>
  );
}

export default Home;
