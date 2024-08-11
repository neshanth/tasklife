import React from "react";
import "./profile.css";
const Profile = ({ user }) => {
  return (
    <section className="account padding">
      <div className="profile-img">
        <div></div>
      </div>
      <div className="profile-details">
        <p className="profile-name">{user.name}</p>
        <p className="profile-email">{user.email}</p>
      </div>
    </section>
  );
};
export default Profile;
