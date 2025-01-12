import Icons from "../Icons/Icons";
import "./notification.scss";

const Notification = ({ text }) => {
  return (
    <div className="tl-notification__container">
      <span className="tl-notification__icon">
        <Icons type="notification" />
      </span>
      <p className="tl-notification__text">{text}</p>
    </div>
  );
};
export default Notification;
