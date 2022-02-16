import React, { Component } from "react";
 
// Importing geolocated reducer function
import { geolocated } from "react-geolocated";


import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

 
class LocationFinder extends Component {
  render() {
 
    // Check geolocation supported in
    // browser or not
    return this.props.isGeolocationAvailable ? (
 
      // Check location is enable in
      // browser or not
      this.props.isGeolocationEnabled ? (
 
        // Check coordinates of current
        // location is available or not
        this.props.coords ? (
          // <div>
          //   <h3 style={{ color: "red" }}>
          //     We think you're here({this.props.coords.latitude}, longitude : {this.props.coords.longitude})
          //   </h3>
           
          // </div>

              <Stack direction="column" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
               <h3 style={{ color: "red" }}>
                 We think you're here(latitude: {this.props.coords.latitude}, longitude : {this.props.coords.longitude})
               </h3>
              </Stack>
        ) : (
          <h1>Getting the location data</h1>
        )
      ) : (
        <h1>Please enable location on your browser</h1>
      )
    ) : (
      <h1>Please, update your or change the browser </h1>
    );
  }
}
 
// Binding geolocated() reducer function to
// App component, while exporting it
export default geolocated()(LocationFinder);