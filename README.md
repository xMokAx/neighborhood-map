# Neighborhood-Map

## Table of Contents

- [Description](#description)
- [Installation and Launch](#installation-and-launch)
- [Used Technologies](#used-technologies)
- [App Features](#app-features)
- [Features To Add](#features-to-add)
- [License](#license)

## Description

This project is the last project of Udacity Front End Nanodegree.
A [React.js](https://reactjs.org/) SPA (single page application) that allows the user to get information about certain places by clicking the place on the side menu or the place marker.

## Installation and Launch

### Development mode

1.  To install the application clone this git repository or download as zip file

```
$ git clone https://github.com/xMokAx/react-neighborhood-map.git
```

2.  Go into the application folder

```
$ cd react-neighborhood-map
```

3.  Install dependencies using `npm` or `yarn` command line tool

```
$ npm install   or    $ yarn install
```

4.  Run the application, again using `npm` or `yarn`

```
$ npm start    or     $ yarn start
```

**This will open a new browser tab/window with the application running.**

### Production mode

1.  Generate the production build, again using `npm` or `yarn`

```
$ npm run build    or     $ yarn build
```

1.  Open the generated build folder and serve it using a local server. The is easiest way to do so is to use

```
$ yarn global add serve     then   $ serve -s build
```

2.  In production mode you can see the service worker in action.

## Used Technologies

1.  [React.js](https://reactjs.org/)
2.  [Create-React-App](https://github.com/facebook/create-react-app)
3.  [Google Maps API](https://cloud.google.com/maps-platform/maps/)
4.  [Foursquare API](https://developer.foursquare.com/places-api)
5.  [Materialize.css](https://materializecss.com/)
6.  [Lighthouse](https://github.com/GoogleChrome/lighthouse)
7.  [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
8.  [Progressive Web App](https://developers.google.com/web/progressive-web-apps/)

## App Features

1.  When started the app fetch some places(restaurants) from FourSquare API and show them on the side menu and render a marker on google map for each place.
2.  The user can click any place on side menu or a marker to show more information about that place in a google map infowindow.
3.  There is an input field in side menu that allows the user to filter available places list which will filter the map markers too.
4.  The Service Worker allows the app to works offline by caching app assets and dynamically fetched data.
5.  The app is a PWA (progressive web app) which can be installed to home screen and provide a good experience to users on any internet condition.

## Features To Add

1.  Allow the app to know the user location and make it the center of the map.
2.  If the user didn't give the app the permission to know his location give the user the ability to specify the center of the map using google places.
3.  Allow the user to to search for different categories of places using an input and Foursquare API.
4.  Improve the PWA experience.

## License

MIT License

Copyright (c) 2018 Ahmed Mokhtar Mohammed

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
