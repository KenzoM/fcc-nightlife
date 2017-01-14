import React, {PropTypes, Component} from 'react';

import GoogleMap from 'google-map-react';
import MyGreatPlace from './Markers';


const googleAPI = process.env.GOOGLEAPI || require('../../../src/server/config').googleAPI;
console.log(googleAPI)

export default class MyGoogleMap extends Component {
  constructor(props) {
    super(props);
    this.renderMarkers = this.renderMarkers.bind(this);
  }
  renderMarkers({id, location, name}){
    // If Yelp API doesnt provide a coordinate for a club, default to lat and long to 0
    let clubCoordinate = location.coordinate || {latitude: 0, longitude: 0};
    return(
      <MyGreatPlace key={id} name={name} lat={clubCoordinate.latitude} lng={clubCoordinate.longitude} />
    )
  }

  render() {
    const {centerCoordinates, yelpData} = this.props; //props from home.js container
    let center = {lat: centerCoordinates.latitude, lng: centerCoordinates.longitude}
    return (
      <div className="google-map">
        <GoogleMap
          bootstrapURLKeys={{
            key: googleAPI,
            language: 'en'
          }}
          defaultCenter={center}
          defaultZoom={14}
        >
        {yelpData.data.map(this.renderMarkers)}
       </GoogleMap>
      </div>
    );
  }
}
