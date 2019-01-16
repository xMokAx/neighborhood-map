# Map-App
* **Try it now**: https://xmokax.github.io/map-app
## Table of Contents

- [Map-App](#map-app)
  - [Table of Contents](#table-of-contents)
  - [Description](#description)
  - [Installation and Launch](#installation-and-launch)
    - [Development mode](#development-mode)
    - [Production mode](#production-mode)
  - [Used Technologies](#used-technologies)
  - [App Features](#app-features)
  - [License](#license)

## Description

This project is the last project of Udacity Front End Nanodegree.
A [React.js](https://reactjs.org/) SPA (single page application) that allows the user to get information about certain places by clicking the place on the side menu or the place marker.

## Installation and Launch

### Development mode

1.  To install the application clone this git repository or download as zip file

```
$ git clone https://github.com/xMokAx/mapp-app.git
```

2.  Go into the application folder

```
$ cd map-app
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

1. [React.js](https://reactjs.org/)
2. [Google Maps API](https://cloud.google.com/maps-platform/maps/)
3. [Foursquare API](https://developer.foursquare.com/places-api)
4. [Materialize.css](https://materializecss.com/)
5. [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
6. [Progressive Web App](https://developers.google.com/web/progressive-web-apps/)

## App Features

1. When the app starts it will ask for the user location to make it the center of the map and search for places(default is restaurants) around it if the user block the app from getting the location, it will get the location using user's ip if this failed it will use New York as the default location.
2. The user has the ability to change location using to any city, town or neighborhood using the google maps places api.
3. The user can search for any places instead of restaurants.
4. The user can can filter the places list and the markers on the map will be filtered as well.
5. The Service Worker allows the app to works offline by caching app assets.
6. The app is a PWA (progressive web app) which can be installed to home screen and provide a good experience to users on any internet condition.

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
