import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import M from "../../node_modules/materialize-css/dist/js/materialize.min.js";

import Place from "./Place";
import Loading from "./Loading";
import FoursquareImage from "../images/Powered-by-Foursquare-one-color-300.png";
import SideMenuError from "./SideMenuError";

export default class SideMenu extends Component {
  state = {
    searchError: "Search for something!"
  };

  static propTypes = {
    filterQuery: PropTypes.string.isRequired,
    searchQuery: PropTypes.string.isRequired,
    places: PropTypes.array.isRequired,
    onShowInfoWindow: PropTypes.func.isRequired,
    onFilterQueryChange: PropTypes.func.isRequired,
    onSearchQueryChange: PropTypes.func.isRequired,
    isPlacesLoading: PropTypes.bool.isRequired,
    fetchPlaces: PropTypes.func.isRequired,
    markerAnimation: PropTypes.number,
    placesError: PropTypes.string,
    center: PropTypes.object
  };

  componentDidMount() {
    const elem = document.querySelector(".sidenav");
    this.sideNavInstance = M.Sidenav.init(elem);
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    const { center, searchQuery, fetchPlaces } = this.props;
    if (center !== prevProps.center) {
      fetchPlaces(`${center.lat},${center.lng}`, searchQuery);
    }
  }

  componentWillUnmount() {
    this.sideNavInstance.destroy();
  }

  onSubmit = e => {
    e.preventDefault();
    const { center, searchQuery, fetchPlaces } = this.props;

    fetchPlaces(`${center.lat},${center.lng}`, searchQuery);
  };

  render() {
    const {
      filterQuery,
      searchQuery,
      places,
      onShowInfoWindow,
      onFilterQueryChange,
      onSearchQueryChange,
      placesError,
      isPlacesLoading,
      fetchPlaces,
      center
    } = this.props;
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
            <i className="material-icons btn-icon">chevron_left</i>
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

        <form
          onSubmit={this.onSubmit}
          className="collection-item row"
          style={{ padding: "10px 0" }}
        >
          <div className="input-field col s10">
            <i className="material-icons prefix">search</i>
            {/* a controlled input component which uses the user input to update the filterQuery state of the app then use this filterQuery state as its own value */}
            <input
              id="search-places"
              type="text"
              value={searchQuery}
              onChange={e => {
                onSearchQueryChange(e.target.value);
              }}
              className={classNames(!searchQuery && "invalid")}
            />
            <label htmlFor="search-places">Search Places</label>
            <span className="helper-text" data-error={this.state.searchError}>
              Search for something.
            </span>
          </div>
          {/* clear the query on click */}
          <button
            type="button"
            aria-label="search places"
            className="waves-effect waves-light btn-floating btn-small grey"
            style={{ marginTop: "24px" }}
            onClick={() => {
              onSearchQueryChange("");
            }}
          >
            <i className="material-icons">close</i>
          </button>
        </form>

        <div className="collection-item row" style={{ padding: "10px 0" }}>
          <div className="input-field col s10">
            <i className="material-icons prefix">filter_list</i>
            {/* a controlled input component which uses the user input to update the filterQuery state of the app then use this filterQuery state as its own value */}
            <input
              id="filter-places"
              type="text"
              value={filterQuery}
              onChange={e => {
                onFilterQueryChange(e.target.value);
              }}
            />
            <label htmlFor="filter-places">Filter Places</label>
          </div>
          {/* clear the query on click */}
          <button
            aria-label="clear filter"
            className="waves-effect waves-light btn-floating btn-small grey"
            style={{ marginTop: "24px" }}
            onClick={() => {
              onFilterQueryChange("");
            }}
          >
            <i className="material-icons">close</i>
          </button>
        </div>

        {/* if there is an error fetching the places or returns empty array show that error in the side menu with a button to refetch them */}
        {placesError ? (
          <React.Fragment>
            <SideMenuError>{placesError}</SideMenuError>
            <button
              className="waves-effect waves-light btn-large"
              style={{ margin: "15%", width: "70%" }}
              onClick={() => {
                fetchPlaces(`${center.lat},${center.lng}`, searchQuery);
              }}
            >
              <i className="material-icons right">refresh</i>Try Again
            </button>
          </React.Fragment>
        ) : /* if there is no error show the loader until the places are fetched to show them */
        isPlacesLoading ? (
          <div className="valign-wrapper loading-container">
            <Loading className="mg-auto" />
          </div>
        ) : places.length ? (
          places.map(place => (
            <Place
              key={place.id}
              place={place}
              onShowInfoWindow={onShowInfoWindow}
            />
          ))
        ) : (
          <SideMenuError>
            No matches found. Please, change your filter text to match existing
            places.
          </SideMenuError>
        )}
      </div>
    );
  }
}
