import Icons from "../Icons/Icons";
import "./breadCrumb.scss";
const BreadCrumb = ({ page, showClose = false, handleCloseBtnClick }) => {
  return (
    <section className="tl-tasks__breadcrumb">
      <p className="tl-tasks__breadcrumb-item">
        <span className="tl-tasks__breadcrumb-item-app-name">Tasklife / </span>
        <span className="tl-tasks__breadcrumb-item-page">{page}</span>
      </p>
      {showClose && (
        <div onClick={handleCloseBtnClick} className="tl-tasks__breadcrumb-close">
          <Icons type="close" />
        </div>
      )}
    </section>
  );
};
export default BreadCrumb;
