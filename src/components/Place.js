import React from "react";
import PropTypes from "prop-types";

function Place({ place, onShowInfoWindow }) {
  const { lat, lng } = place.location;
  return (
    <div className="collection-item " style={{ padding: "0" }}>
      <button
        className="sidenav-close waves-effect waves-light btn place-btn"
        /* when a place is clicked call the onShowInfoWindow function with place position and id  */
        onClick={() => {
          onShowInfoWindow({ lat, lng }, place.id);
        }}
      >
        <img
          className="circle left teal darken-3"
          src={
            place.categories[0].icon.prefix +
            "32" +
            place.categories[0].icon.suffix
          }
          alt={place.categories[0].name}
          style={{
            marginRight: "16px"
          }}
        />
        {place.name}
      </button>
    </div>
  );
}

Place.propTypes = {
  place: PropTypes.object.isRequired,
  onShowInfoWindow: PropTypes.func.isRequired
};

export default Place;
