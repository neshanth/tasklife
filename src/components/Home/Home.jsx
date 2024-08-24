import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import api from "../../api/api";
import Header from "../Header/Header";
import useAppContext from "../../hooks/useAppContext";
import { Figure } from "react-bootstrap";
import Features from "../Features/Features.jsx";
import "./home.css";
import Footer from "../Footer/Footer";
import { handleApiResponse, verifyCookie } from "../../utils/utils";

function Home() {
  let navigate = useNavigate();
  const { auth, setAuth, setUser, loading, setLoading } = useAppContext();

  useEffect(() => {
    if (auth) {
      navigate("/app/tasks");
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
      <section className="home-section">
        <Header />
        <div className="home-wrapper">
          <div className="hero-wrapper">
            <div className="hero-bg">
              <Container>
                <section className="hero-content">
                  <h1 className="hero-title">Easy-to-use task manager for your work and life</h1>
                  <p className="hero-secondary">TaskLife is the ultimate tool for managing your daily tasks, goals and overall productivity</p>
                  <div className="hero-buttons d-grid gap-2 d-sm-flex justify-content-sm-center flex-column">
                    <Link className="btn btn--primary btn-login" to="/login">
                      Get Started
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right mx-2" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                      </svg>
                    </Link>
                    <button className="btn btn-demo-login" onClick={handleDemoLogin}>
                      Demo Tasklife
                    </button>
                  </div>
                  <Figure className="hero-image text-center">
                    <Figure.Image alt="Hero Image" src={require("../../assets/Images/hero.png")} />
                  </Figure>
                </section>
              </Container>
            </div>
          </div>
        </div>
      </section>
      <Container>
        <section className="features-section">
          <Features />
        </section>
      </Container>
      <Footer />
    </>
  );
}

export default Home;
