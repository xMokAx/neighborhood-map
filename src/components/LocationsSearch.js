import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

export default class LocationsSearch extends Component {
  static propTypes = {
    onCenterChange: PropTypes.func.isRequired
  };

  state = { address: "", searchError: "" };

  handleChange = address => {
    this.setState({ address, searchError: "" });
  };

  handleSelect = address => {
    this.setState({
      address,
      searchError: ""
    });
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        this.props.onCenterChange(latLng);
      })
      .catch(error => console.error("Error", error));
  };

  onError = (status, clearSuggestions) => {
    switch (status) {
      case "ZERO_RESULTS":
        this.setState({
          searchError: "No result was found for this location."
        });
        break;
      case "NOT_FOUND":
        this.setState({
          searchError:
            "The referenced location was not found in the locations database."
        });
        break;
      default:
        this.setState({
          searchError: "Oops something went wrong, please try again later."
        });
    }
    clearSuggestions();
  };

  render() {
    const { address, searchError } = this.state;
    const { handleChange, handleSelect, onError } = this;
    const searchOptions = {
      types: ["(cities)"]
    };
    return (
      <PlacesAutocomplete
        value={address}
        onChange={handleChange}
        onSelect={handleSelect}
        searchOptions={searchOptions}
        onError={onError}
        googleCallbackName="initMap"
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className="row" style={{ marginBottom: "0" }}>
            <div className="col s12">
              <div className="input-field col s10">
                <i className="material-icons prefix">place</i>
                <input
                  {...getInputProps({
                    id: "locations-autocomplete",
                    className: classNames(
                      suggestions.length
                        ? "valid"
                        : searchError && address
                        ? "invalid"
                        : ""
                    )
                  })}
                />
                <label htmlFor="locations-autocomplete">Change Location</label>

                <span
                  className="helper-text"
                  data-error={searchError}
                  data-success="Places Found"
                >
                  Find a location eg: city or town.
                </span>
                <ul
                  className="collection autocomplete-list"
                  style={{
                    display: suggestions.length ? "block" : "none"
                  }}
                >
                  {loading && <li className="collection-item">Loading...</li>}
                  {suggestions.map(suggestion => {
                    const className = suggestion.active
                      ? "collection-item autocomplete-item active"
                      : "collection-item autocomplete-item";
                    return (
                      <li
                        {...getSuggestionItemProps(suggestion, {
                          className
                        })}
                      >
                        <span>{suggestion.description}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <button
                aria-label="clear filter"
                className="waves-effect waves-light btn-floating btn-small grey"
                style={{ marginTop: "24px" }}
                onClick={() => {
                  handleChange("");
                }}
              >
                <i className="material-icons">close</i>
              </button>
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}
