# Project Name

**Author**: Mohamamd Khalil
**Version**: 1.0.0

## Overview

-this website will give the user data logistic data about the city or country he is looking for.

## Getting Started

### Steps for implementing Feature .1 - Location Explore

1. Sign-up to LocationIQ API.
2. Store the access token you got by signing up to LocationIQ in an .env file.
3. Create two components: a search form component and a location component. In the *search form* component, create a form that contains a text type input for the city name and a submit button. In the *location component*, create the elements you want to display the results in.
4. In App.js component, do the following:
    1. initialize the state.
    2. create a `handleLocation` method to store the user's inputted city name, this method should be passed to the search form component and used as an `onChange` callback for the text input form control.
    3. create a `handleSubmit` method to create a request from the API, this method contains the following:
        1. An object that specifies the request type (method property) and endpoint (baseURL property).
        2. Pass that object to the **axios** method to make a GET request to the LocationIQ API. Since this is an asynchronous function, we will use `.then()` and a callback to get back all of the response data.
        This callback takes one parameter which will be having the response. You can check it using `console.log(res)` and `console.log(res.data)`.
        3. Set the state with the new values retrieved by the GET request.
    The `handleSubmit` will be passed the search form component and used as an `onSubmit` callback in the form tag.
    4. create a `handleSubmit` method to clear the screen. This method should be passed to the search form component and used as an `onClick` callback for the clear button.

### Steps for implementing Feature .2 - Location Map

1. In the location component, add a Bootstrap image component of your choice.
2. The source of the map's image will be: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_API_KEY}&size=600x600&zoom=14&markers=${this.props.lat},${this.props.lon}|icon:large-black-cutout&format=png`

### Steps for implementing Feature .3 - Alert Errors

1. Create a new component named ErrorMessage and add an alert bootstrap component in it.
2. In App.js component, add new properties to the status: error code, error message, error alert flag.
3. Catch the response errors: `axios(config).then(res => {FUNCTION}).catch(error => {FUNCTION}`.
    You can reach the response error using `error.response`, response error data using `error.response.data`.
    Set the state to these new error value.
4. Pass the new state values to ErrorMessage as props and use them there.

## Architecture

- React
- React Bootstrap
- Axios
- LocationIQ API
- CSS

## Change Log

- 12-09-2021 10:50pm - Application now has a location explore functionality, with a GET route for the location resource.
- 12-09-2021 11:55pm - Application now can show map of the requested location.
- 13-09-2021 03:15pm - Application now can alert for errors.

## Credit and Collaborations
<!-- Give credit (and a link) to other people or resources that helped you build this application. -->

[Eslam Akram](https://github.com/eslamakram)

- - -

Name of feature: Link API TO frontend

Estimate of time needed to complete: 3 hours

Start time: 9pm

Finish time: 1pm

Actual time needed to complete: 4 hours

- - -