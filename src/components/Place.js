import React from "react";
import PropTypes from "prop-types";

function Place({ place, onShowInfoWindow }) {
  const { categories, location } = place;
  const { lat, lng } = location;
  return (
    <div className="collection-item" style={{ padding: "0" }}>
      <button
        className="sidenav-close waves-effect waves-light btn-large place-btn"
        /* when a place is clicked call the onShowInfoWindow function with place position and id  */
        onClick={() => {
          onShowInfoWindow({ lat, lng }, place.id);
        }}
      >
        {categories.length ? (
          <img
            className="circle left teal darken-3"
            src={`${categories[0].icon.prefix}32${categories[0].icon.suffix}`}
            alt={categories[0].name}
            style={{
              marginRight: "8px"
            }}
          />
        ) : (
          <i
            className="left material-icons red-text text-darken-3 btn-icon"
            style={{ marginRight: "8px" }}
          >
            error_outline
          </i>
        )}
        <span>{place.name}</span>
      </button>
    </div>
  );
}

Place.propTypes = {
  place: PropTypes.object.isRequired,
  onShowInfoWindow: PropTypes.func.isRequired
};

export default Place;
