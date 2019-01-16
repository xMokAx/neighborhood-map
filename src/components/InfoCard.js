import React from "react";
import PropTypes from "prop-types";

const InfoCard = ({ selectedPlace }) => {
  return (
    <div className="info-card">
      <div className="card teal darken-3">
        {selectedPlace.bestPhoto ? (
          <div className="card-image">
            <img
              src={
                selectedPlace.bestPhoto.prefix +
                "width260" +
                selectedPlace.bestPhoto.suffix
              }
              alt={selectedPlace.name}
            />
            <h2 className="card-title">{selectedPlace.name}</h2>
          </div>
        ) : (
          <h2 className="card-title white-text">{selectedPlace.name}</h2>
        )}

        <div className="card-content white-text">
          <p>
            <strong>Address:</strong> {selectedPlace.location.formattedAddress}.
          </p>
          {selectedPlace.contact.formattedPhone && (
            <p>
              <strong>Phone:</strong> {selectedPlace.contact.formattedPhone}
            </p>
          )}
          <p>
            <strong>Likes:</strong> {selectedPlace.likes.count}
          </p>
          {selectedPlace.rating && (
            <p>
              <strong>Rating:</strong> {selectedPlace.rating}
            </p>
          )}
          {selectedPlace.hours && (
            <React.Fragment>
              <p>Opening hours:</p>
              {selectedPlace.hours.timeframes.map((timeframe, index) => (
                <span key={index}>
                  <em>{timeframe.days}</em>:<br />
                  {timeframe.open.map((time, index) => (
                    <span key={index}>
                      {time.renderedTime}
                      <br />
                    </span>
                  ))}
                </span>
              ))}
            </React.Fragment>
          )}
        </div>
        {selectedPlace.url && (
          <div className="card-action">
            <a
              href={selectedPlace.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>Website</strong>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

InfoCard.propTypes = {
  selectedPlace: PropTypes.object.isRequired
};

export default InfoCard;
