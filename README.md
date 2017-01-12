# NightLife Coordination App
A single-web-page app that utilizes `React`/`Redux` and `Node.js` to allow users search local bars near their desired area.

## Getting Started

[Live Demo](https://night-app-life-app-fcc.herokuapp.com/)

The app is based on one of [FreeCodeCamp's challenges](https://www.freecodecamp.com/challenges/build-a-nightlife-coordination-app).

It meets the following criteria

>User Story: As an unauthenticated user, I can view all bars in my area

>User Story: As an authenticated user, I can add myself to a bar to indicate I am going there tonight.

>User Story: As an authenticated user, I can remove myself from a bar if I no longer want to go there.

>User Story: As an unauthenticated user, when I login I should not have to search again.

This app was made possible by [Yelp's API](https://www.yelp.com/developers/v2/manage_api_keys)

### Prerequisites

In essence, this app is architectured MERN stack. It utilizes
- `MongoDB` for handling models
- `Express.js`  is for handling app's routing
- `React` for handling UI front-end aspects
- `Node.js` handles the server side for the application

### Installing

1. Clone the repository
2. `npm install`
3. Run your local mongo via terminal:  `mongod`
4. `npm run dev` for development environment
5. `npm start` for production environment

## Built With

* [Material-UI](https://github.com/callemall/material-ui) - The css framework used
* [Redux-Reform](https://github.com/erikras/redux-form) - Form validation and handler
* [google-map-react](https://github.com/istarkov/google-map-react) - Google Map API


## Authors

* **Kenzo Mendoza** - *Initial work* - [Neotriz](https://github.com/neotriz)
