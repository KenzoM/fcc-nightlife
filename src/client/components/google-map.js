import React, {PropTypes, Component} from 'react';

import GoogleMap from 'google-map-react';

export default class MyGoogleMap extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {centerCoordinates} = this.props;
    let center = {lat: centerCoordinates.latitude, lng: centerCoordinates.longitude}
    return (
      <div className="google-map">
        <GoogleMap
         defaultCenter={center}
         defaultZoom={12}>
       </GoogleMap>
      </div>
    );
  }
}
