import React from "react";
import FoursquareImage from "../images/Powered-by-Foursquare-one-color-300.png";

const Header = () => {
  return (
    <header className="navbar-fixed" style={{ height: "0" }}>
      <nav className="teal darken-3">
        <div className="nav-wrapper">
          <button
            data-target="slide-out"
            className="sidenav-trigger waves-effect waves-light hide-on-large-only btn-flat white-text"
            aria-label="open side menu"
          >
            <i className="material-icons">menu</i>
          </button>
          <a
            href="/"
            className="brand-logo waves-effect waves-light left-align"
          >
            Neighborhood Map
          </a>
        </div>
      </nav>
      <a
        href="https://developer.foursquare.com/"
        className="foursquare-attr teal lighten-3 hide-on-small-only"
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
    </header>
  );
};

export default Header;
