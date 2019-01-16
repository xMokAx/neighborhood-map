import React from "react";
import PropTypes from "prop-types";

const Loading = ({ className }) => {
  return (
    <div className={`preloader-wrapper active ${className}`}>
      <div className="spinner-layer spinner-teal-only">
        <div className="circle-clipper left">
          <div className="circle" />
        </div>
        <div className="gap-patch">
          <div className="circle" />
        </div>
        <div className="circle-clipper right">
          <div className="circle" />
        </div>
      </div>
    </div>
  );
};

Loading.propTypes = {
  className: PropTypes.string
};

export default Loading;
