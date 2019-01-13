const api = "https://api.foursquare.com/v2/venues/";

const client_id = "URQL3ITNRY41AW0LQUQ4OD4YHDCZEGJ1XDJJ0RH5KHS51NSE";
const client_secret = "BIRNVGI5MS4O4HS40R4XMTOJJ5K20J0V4CPE5BZQ50ANZHZY";
const v = "20180620";
const limit = 20;

export const getPlaces = (query, latLong) =>
  fetch(
    `${api}search?client_id=${client_id}&client_secret=${client_secret}&query=${query}&ll=${latLong}&limit=${limit}&v=${v}`
  )
    .then(res => res.json())
    .then(res => {
      return res;
    });

export const getPlace = id =>
  fetch(
    `${api}${id}?client_id=${client_id}&client_secret=${client_secret}&v=${v}`
  )
    .then(res => res.json())
    .then(res => {
      return res;
    });
