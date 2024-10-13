import BreadCrumb from "../BreadCrumb/BreadCrumb";
import "./tlmodal.scss";
const TLModal = ({ children, page, showClose = false, buttons = [], style }) => {
  return (
    <div className="tl-modal">
      <div className="tl-modal__title-container">
        <BreadCrumb page={page} showClose={showClose} />
      </div>
      <div className="tl-modal__body">{children}</div>
      <div className="tl-modal__footer">
        {buttons.map((btn, index) => (
          <button style={style} className={`tl-btn tl-modal__btn ${btn.className}`} type={btn.type} key={index} onClick={btn.action}>
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
};
export default TLModal;
