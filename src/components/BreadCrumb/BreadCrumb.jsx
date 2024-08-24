import "./breadCrumb.scss";
const BreadCrumb = ({ page }) => {
  return (
    <section className="tl-tasks__breadcrumb">
      <p className="tl-tasks__breadcrumb-item">
        <span className="tl-tasks__breadcrumb-item-app-name">Tasklife / </span>
        <span className="tl-tasks__breadcrumb-item-page">{page}</span>
      </p>
    </section>
  );
};
export default BreadCrumb;
