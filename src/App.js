import React, { Component } from "react";
import escapeRegExp from "escape-string-regexp";
import sortBy from "sort-by";
import classNames from "classnames";

import * as FoursquareAPI from "./utils/FoursquareAPI";

import "./App.css";

import Header from "./components/Header";
import Map from "./components/Map";
import Loading from "./components/Loading";
import SideMenu from "./components/SideMenu";
import LocationsSearch from "./components/LocationsSearch";

export default class App extends Component {
  state = {
    places: [],
    searchQuery: "restaurant",
    filterQuery: "",
    infoWindowPos: null,
    selectedPlace: null,
    placesError: undefined,
    placeError: undefined,
    // 2 is equal to window.google.maps.Animation.DROP
    markerAnimation: 2,
    isPlacesLoading: true,
    showConnectionStatus: false,
    online: undefined,
    center: undefined
  };

  componentDidMount() {
    if ("geolocation" in navigator) {
      /* geolocation is available */
      navigator.geolocation.getCurrentPosition(
        pos => {
          console.log(pos);
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          this.setState({
            center: { lat, lng }
          });
        },
        err => {
          this.ipLookUp();
        },
        {
          enableHighAccuracy: true,
          // integer (milliseconds]) - amount of time before the error callback is invoked, if 0 it will never invoke.
          // timeout: 10000,
          // integer (milliseconds]) | infinity - maximum cached position age.
          maximumAge: 0
        }
      );
    } else {
      /* geolocation IS NOT available */
      console.log("geolocation IS NOT available");
      this.ipLookUp();
    }

    // to show the offline message when the website is in offline mode
    if (window.navigator.onLine === false) {
      this.setState({
        online: false,
        showConnectionStatus: true
      });
    } else {
      this.setState({
        online: true
      });
    }

    // to show the offline message when the user loses connection
    window.addEventListener("offline", e => {
      this.setState({
        online: false,
        showConnectionStatus: true
      });
    });

    // to show the online message when the user is back online
    window.addEventListener("online", e => {
      this.setState(
        {
          online: true,
          showConnectionStatus: true
        },
        () => {
          setTimeout(() => {
            this.setState({
              showConnectionStatus: false
            });
          }, 1500);
        }
      );
    });
  }

  onCenterChange = center => {
    this.setState({
      center
    });
  };

  onSearchQueryChange = searchQuery => {
    this.setState({
      searchQuery: searchQuery
    });
  };

  ipLookUp = () => {
    fetch("http://ip-api.com/json?fields=lat,lon,status")
      .then(res => res.json())
      .then(res => {
        if (res.status === "success") {
          // if the request is successful set the center to the returned location
          console.log(res);
          this.setState({
            center: {
              lat: res.lat,
              lng: res.lon
            }
          });
        } else {
          // if the ip is (private range, reserved range, invalid query) the status will be fail
          // set the center to New York
          this.setState({
            center: { lat: 40.7127753, lng: -74.0059728 }
          });
        }
      })
      .catch(err => {
        // if the request fails set the center to New York
        this.setState({
          center: { lat: 40.7127753, lng: -74.0059728 }
        });
      });
  };

  fetchPlaces = (latLong, searchQuery = this.state.searchQuery) => {
    searchQuery = searchQuery ? searchQuery : "google";
    const escapedSearchQuery = new RegExp(
      escapeRegExp(searchQuery.trim()),
      "i"
    );
    // fetch the places from foursquare api
    this.setState({
      isPlacesLoading: true
    });
    FoursquareAPI.getPlaces(escapedSearchQuery, latLong)
      .then(res => {
        // if response code wasn't 200 set the placesError to equal error detail
        if (res.meta.code !== 200) {
          this.setState({
            placesError: "Oops something went wrong, please try again later."
          });
          // if response code is 200 set the places to be venues
        } else {
          if (res.response.venues.length === 0) {
            this.setState({
              placesError: "No places found nearby this location."
            });
          } else {
            this.setState({
              places: res.response.venues,
              placesError: ""
            });
          }
        }
      })
      // set the isPlacesLoading to false to remove the preloader
      .then(() => {
        this.setState({
          isPlacesLoading: false
        });
      })
      // if the request wasn't made successfully the error is prob because of internet issue
      .catch(err => {
        this.setState({
          placesError:
            "There was an error fetching places info, please check your internet connection and try again.",
          isPlacesLoading: false
        });
      });
  };

  // this method is called when a place in side menu or a marker is clicked to handle showing the info window
  onShowInfoWindow = (position, id) => {
    // set the selected place to null to reset the info windo content
    // set the placeError to undefined so if the request is successful this time the new place info is shown not the previous error
    // set the infoWindowPos to null to hide the infowindow immediately when another place or marker is clicked
    this.setState(
      {
        selectedPlace: null,
        placeError: undefined,
        infoWindowPos: null
      },
      () => {
        // in setState callback fetch the place data and handle errors
        FoursquareAPI.getPlace(id)
          .then(res => {
            // if response code wasn't 200 set the error to equal error detail
            if (res.meta.code !== 200) {
              this.setState({
                placeError: "Oops something went wrong, please try again later"
              });
            } else {
              // if response code is 200 set the selectedPlace to be venue
              this.setState({
                selectedPlace: res.response.venue
              });
            }
          })
          .then(() => {
            // set the infoWindowPos to equal position to show the infowindow and set the marker animation to 1 to make it bounce and in setState callback call stopBounceAnimation to stop the bounce animation after 1 second
            this.setState(
              {
                infoWindowPos: position,
                markerAnimation: 1
              },
              this.stopBounceAnimation
            );
          })
          // if the request wasn't made successfully the error is prob because of internet issue
          .catch(err => {
            console.log(err);
            this.setState({
              placeError:
                "There was an error fetching place info, please check your internet connection and try again."
            });
          })
          .then(() => {
            this.setState(
              {
                infoWindowPos: position,
                markerAnimation: 1
              },
              this.stopBounceAnimation
            );
          });
      }
    );
  };

  // set the markerAnimation to be null after 1 second
  stopBounceAnimation = () => {
    setTimeout(() => {
      this.setState({
        markerAnimation: null
      });
    }, 1400);
  };

  // set the infoWindowPos to be null to hide it
  onHideInfoWindow = () => {
    this.setState({
      infoWindowPos: null
    });
  };

  // update the filterQuery
  onFilterQueryChange = filterQuery => {
    this.setState({
      filterQuery: filterQuery
    });
  };

  render() {
    const {
      places,
      infoWindowPos,
      filterQuery,
      searchQuery,
      selectedPlace,
      placesError,
      placeError,
      markerAnimation,
      isPlacesLoading,
      showConnectionStatus,
      online,
      center
    } = this.state;
    const {
      onFilterQueryChange,
      onShowInfoWindow,
      onHideInfoWindow,
      fetchPlaces,
      onCenterChange,
      onSearchQueryChange
    } = this;

    // if there is a filterQuery make the showingPlaces equal to the places that match that filterQuery.
    let showingPlaces;
    if (filterQuery) {
      // The RegExp constructor creates a regular expression object for matching text with a pattern.
      // escapeRegExp is used to escape RegExp special characters
      const match = new RegExp(escapeRegExp(filterQuery.trim()), "i");
      // The test() method executes a search for a match between a regular expression and a specified string(place.name). Returns true or false.
      showingPlaces = places.filter(place => match.test(place.name));
      // if there is no filterQuery the showingPlaces is equal to places.
    } else {
      showingPlaces = places;
    }

    // sort the showingPlaces depending on the name property of each place.
    showingPlaces.sort(sortBy("name"));
    return (
      // React.Fragment let you group a list of children without adding extra nodes (like a div) to the DOM.
      <React.Fragment>
        <Header />
        <main className="main-content">
          {showConnectionStatus && (
            <p
              className={classNames(
                "offline-message darken-2",
                online ? "green" : "red"
              )}
            >
              {online ? "Back Online" : "No Internet Connection"}
            </p>
          )}

          <LocationsSearch onCenterChange={onCenterChange} />

          <Map
            center={center}
            places={showingPlaces}
            onShowInfoWindow={onShowInfoWindow}
            onHideInfoWindow={onHideInfoWindow}
            infoWindowPos={infoWindowPos}
            selectedPlace={selectedPlace}
            placeError={placeError}
            markerAnimation={markerAnimation}
            /* required props for the withScriptjs HOC */
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3&key=AIzaSyCvPm_fBlek4mSSCFbeg1-E3wNhWtKI5lc&libraries=places&callback=initMap"
            loadingElement={<Loading className="loader" />}
            /* required props for the withGoogleMap HOC */
            containerElement={<div className="map-container" />}
            mapElement={
              <div
                tabIndex="0"
                role="application"
                aria-label="Map"
                className="map"
              />
            }
          />
        </main>

        <SideMenu
          onSearchQueryChange={onSearchQueryChange}
          center={center}
          places={showingPlaces}
          onShowInfoWindow={onShowInfoWindow}
          filterQuery={filterQuery}
          searchQuery={searchQuery}
          onFilterQueryChange={onFilterQueryChange}
          placesError={placesError}
          markerAnimation={markerAnimation}
          isPlacesLoading={isPlacesLoading}
          fetchPlaces={fetchPlaces}
        />
      </React.Fragment>
    );
  }
}
