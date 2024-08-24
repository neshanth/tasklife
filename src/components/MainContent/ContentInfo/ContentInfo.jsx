import "./contentInfo.scss";

const ContentInfo = ({ sectionHeading, sectionInfo }) => {
  return (
    <section className="content-info-container">
      <p className="content-info__section-heading">{sectionHeading}</p>
      <p className="content-info__section-info">{sectionInfo}</p>
    </section>
  );
};
export default ContentInfo;
