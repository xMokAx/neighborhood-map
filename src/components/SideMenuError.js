import React from "react";
import PropTypes from "prop-types";

function SideMenuError({ children }) {
  return (
    <div className="collection-item white red-text text-darken-2 row">
      <i className="col s2 material-icons red-text text-darken-3 btn-icon">
        error
      </i>
      <strong className="col s10">{children}</strong>
    </div>
  );
}

SideMenuError.propTypes = {
  children: PropTypes.string.isRequired
};

export default SideMenuError;
