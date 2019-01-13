import React from "react";
import PropTypes from "prop-types";
import Place from "./Place";
import Loading from "./Loading";
import FoursquareImage from "../images/Powered-by-Foursquare-one-color-300.png";

const SideMenu = ({
  query,
  places,
  onShowInfoWindow,
  updateQuery,
  clearQuery,
  placesError,
  isPlacesLoading,
  fetchPlaces
}) => {
  return (
    <div id="slide-out" className="sidenav sidenav-fixed collection">
      <div
        className="collection-item"
        style={{ minHeight: "64px", padding: "0" }}
      >
        <button
          className="sidenav-close waves-effect waves-light btn hide-on-large-only right"
          aria-label="close side menu"
        >
          <i className="material-icons">chevron_left</i>
        </button>
        <a
          href="https://developer.foursquare.com/"
          className="teal lighten-3 left"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={FoursquareImage}
            alt="powered by foursquare"
            height="34px"
            width="200px"
          />
        </a>
      </div>

      <div className="collection-item row" style={{ padding: "10px 0" }}>
        <div className="input-field col s10">
          <i className="material-icons prefix">filter_list</i>
          {/* a controlled input component which uses the user input to update the query state of the app then use this query state as its own value */}
          <input
            id="filter-places"
            type="text"
            placeholder="Filter Places eg: bocca"
            value={query}
            onChange={e => {
              updateQuery(e.target.value);
            }}
          />
          <label htmlFor="filter-places">Filter Places</label>
        </div>
        {/* clear the query on click */}
        <button
          aria-label="clear filter"
          className="waves-effect waves-light btn col s2"
          style={{ marginTop: "16px" }}
          onClick={clearQuery}
        >
          <i className="material-icons">close</i>
        </button>
      </div>
      {/* if there is an error fetching the places show that error in the side menu with a button to refetch them */}
      {placesError ? (
        <React.Fragment>
          <div className="collection-item error-text">{placesError}</div>
          <button
            className="waves-effect waves-light btn-large"
            style={{ margin: "20%" }}
            onClick={fetchPlaces}
          >
            <i className="material-icons right">refresh</i>Try Again
          </button>
        </React.Fragment>
      ) : /* if there is no error show the loader until the places are fetched to show them */
      isPlacesLoading ? (
        <Loading />
      ) : places.length ? (
        places.map(place => (
          <Place
            key={place.id}
            place={place}
            onShowInfoWindow={onShowInfoWindow}
          />
        ))
      ) : (
        <div className="collection-item error-text">
          No matches found. Please, change your filter text to match existing
          places.
        </div>
      )}
    </div>
  );
};

SideMenu.propTypes = {
  query: PropTypes.string.isRequired,
  places: PropTypes.array.isRequired,
  onShowInfoWindow: PropTypes.func.isRequired,
  updateQuery: PropTypes.func.isRequired,
  clearQuery: PropTypes.func.isRequired,
  isPlacesLoading: PropTypes.bool.isRequired,
  fetchPlaces: PropTypes.func.isRequired,
  placesError: PropTypes.string
};

export default SideMenu;
