import React from "react";
import "./profile.scss";

const Profile = ({ user }) => {
  return (
    <section className="tl-profile tl-padding">
      <div className="tl-profile__img">
        <div></div>
      </div>
      <div className="tl-profile__details">
        <p className="tl-profile__name tl-heading">{user.name}</p>
        <p className="tl-profile__email">{user.email}</p>
      </div>
    </section>
  );
};
export default Profile;
