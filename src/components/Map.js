import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  withGoogleMap,
  GoogleMap,
  InfoWindow,
  Marker
} from "react-google-maps";
import { MAP } from "react-google-maps/lib/constants";

import InfoCard from "./InfoCard";

class Map extends Component {
  static contextTypes = { [MAP]: PropTypes.object };

  static propTypes = {
    places: PropTypes.array.isRequired,
    onShowInfoWindow: PropTypes.func.isRequired,
    onHideInfoWindow: PropTypes.func.isRequired,
    selectedPlace: PropTypes.object,
    placeError: PropTypes.string,
    infoWindowPos: PropTypes.object,
    error: PropTypes.string,
    markerAnimation: PropTypes.number
  };

  render() {
    const {
      center,
      places,
      onShowInfoWindow,
      onHideInfoWindow,
      infoWindowPos,
      selectedPlace,
      placeError,
      markerAnimation
    } = this.props;
    const google = window.google;
    return (
      <GoogleMap
        defaultZoom={14}
        center={center}
        /* onTilesLoaded={() => {
          document.querySelector("iframe").title = "New York City Map";
        }} */
      >
        {/* map through the places array and create a marker for each place */}
        {places.length &&
          places.map(place => {
            const { lat, lng } = place.location;
            const position = { lat, lng };
            const id = place.id;
            let animation;
            /* if the markerAnimation changes check which marker has the same position as the infoWindowPos and set its animation to be the new markerAnimation (bounce) and the rest of markers to have no animation (null) */
            if (markerAnimation !== 2) {
              animation =
                infoWindowPos && infoWindowPos.lat === position.lat
                  ? markerAnimation
                  : null;
              /* by default when app starts animation equals markerAnimation which is DROP animation */
            } else {
              animation = markerAnimation;
            }
            return (
              <Marker
                key={id}
                position={position}
                animation={animation}
                /* when a marker is clicked call the onShowInfoWindow function with place position and id*/
                onClick={() => {
                  onShowInfoWindow(position, id);
                }}
              />
            );
          })}
        {/* check if infoWindowPos is not null and then show the infowindow at this position */}
        {infoWindowPos && (
          <InfoWindow
            options={{
              maxWidth: 260,
              /* position the infowindow above the marker */
              pixelOffset: new google.maps.Size(0, -45)
            }}
            position={infoWindowPos}
            onCloseClick={onHideInfoWindow}
          >
            {/* check if selectedPlace isn't null and there is no error while fetcing place data and then show the infoCard inside the infowindow and if not show the error*/}
            {selectedPlace && !placeError ? (
              <InfoCard selectedPlace={selectedPlace} />
            ) : (
              <p className="error-text">{placeError}</p>
            )}
          </InfoWindow>
        )}
      </GoogleMap>
    );
  }
}

// Pass the Map function to the withGoogleMap HOC to give the map a container element and a map element.
// Then pass the result to the withScriptjs HOC to load the google maps api and show a loading element while loading.
export default withGoogleMap(Map);
