import React, {PropTypes, Component} from 'react';

import GoogleMap from 'google-map-react';
import MyGreatPlace from './my_great_place';

const googleAPI = process.env.googleAPI || require('../../../src/server/config').googleAPI;

export default class MyGoogleMap extends Component {
  constructor(props) {
    super(props);
    this.renderMarkers = this.renderMarkers.bind(this);
  }
  renderMarkers({id, location, name}){
    // If Yelp API doesnt provide a coordinate for a club, default to lat and long to 0
    let clubCoordinate = location.coordinate || {latitude: 0, longitude: 0};
    return(
      <MyGreatPlace key={id} lat={clubCoordinate.latitude} lng={clubCoordinate.longitude} />
    )
  }

  _onChildMouseEnter = (key, childProps) => {
    console.log(key, 'this is key')
    console.log(childProps, 'this is childProps')
    // const markerId = childProps.marker.get('id');
    // const index = this.props.markers.findIndex(m => m.get('id') === markerId);
    // if (this.props.onMarkerHover) {
    //   this.props.onMarkerHover(index);
    // }
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
          onChildMouseEnter={this._onChildMouseEnter}
          onChildMouseLeave={() =>console.log('leave mouse')}
          defaultCenter={center}
          defaultZoom={14}
        >
        <MyGreatPlace lat={center.lat} lng={center.lng} text={'My Location'} />
        {yelpData.data.map(this.renderMarkers)}
       </GoogleMap>
      </div>
    );
  }
}
