import React from "react";

const CloseButton = ({ handleClick }) => {
  return (
    <div onClick={handleClick} className="close-icon">
      <svg height="20" viewBox="0 0 512 512" width="20" fill="#fff" xmlns="http://www.w3.org/2000/svg">
        <g id="_02_User" data-name="02 User">
          <path d="m25 512a25 25 0 0 1 -17.68-42.68l462-462a25 25 0 0 1 35.36 35.36l-462 462a24.93 24.93 0 0 1 -17.68 7.32z" />
          <path d="m487 512a24.93 24.93 0 0 1 -17.68-7.32l-462-462a25 25 0 0 1 35.36-35.36l462 462a25 25 0 0 1 -17.68 42.68z" />
        </g>
      </svg>
    </div>
  );
};

export default CloseButton;
