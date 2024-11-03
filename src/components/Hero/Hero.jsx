import { Link } from "react-router-dom";
import heroImg from "../../assets/Images/v2/hero.png";
import "./hero.scss";

const Hero = ({ handleDemoLogin }) => {
  return (
    <div className="tl-hero">
      <section className="tl-hero__hero-content">
        <div className="tl-hero__text-content">
          <h1 className="tl-hero__hero-title">The ultimate task management app for your work and life</h1>
          <p className="tl-hero__hero-text">Tasklife is an easy-to-use app for organising, tracking and managing your daily tasks, goals and overall productivity.</p>
          <div className="tl-hero__hero-buttons">
            <Link className="tl-btn tl-btn--primary" to="/login">
              Get Started
            </Link>
            <button className="tl-btn tl-btn--secondary" onClick={handleDemoLogin}>
              Demo Tasklife
            </button>
          </div>
        </div>
        <div className="tl-hero__hero-content-img-wrapper">
          <div className="tl-hero__hero-content-img"></div>
        </div>

        {/* <img src={heroImg} alt="Hero" /> */}
        {/* <Figure.Image alt="Hero Image" src={require("../../assets/Images/hero.png")} /> */}
      </section>
    </div>
  );
};
export default Hero;
