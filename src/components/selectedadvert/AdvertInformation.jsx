import React, { Component, Fragment } from "react";
import Moment from "react-moment";

import { Stack, Button, Divider, Typography } from '@mui/material';
import { Icon } from '@iconify/react';


// import googleFill from '@iconify/icons-eva/google-fill';
// import twitterFill from '@iconify/icons-eva/twitter-fill';
// import facebookFill from '@iconify/icons-eva/facebook-fill';


import BathtubIcon from '@mui/icons-material/Bathtub';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

export default class AdvertInformation extends Component {
  numberWithSpaces = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };
  render() {
    const { advert } = this.props;
    let floorPrefix ="Ground";

    if(advert.locatedOnFloor > 0){
      if (advert.locatedOnFloor === 1) {
        floorPrefix = "st";
      }
      else if (advert.locatedOnFloor === 2) {
        floorPrefix ="2nd" ;
      }
      else if(advert.locatedOnFloor === 3) {
        floorPrefix = "rd";
      }
      else{
        floorPrefix ="th";
      }
    }
  

    return (
      <Fragment>
        <ul className="list-group">
          <li className="list-group-item active">Main</li>
          <li className="list-group-item">
            Price: {this.numberWithSpaces(advert.price)}{" "}
            {advert.isForSale ? "Ksh." : "Ksh./month"}
          </li>
          <li className="list-group-item">
            Price per m<sup>2</sup>:
            {Math.round(advert.price / advert.sqrMeter)} Ksh.
          </li>
          {advert.monthlyContibution ? (
            <li className="list-group-item">
              Monthly Payments: {advert.monthlyContibution} Ksh.
            </li>
          ) : (
            ""
          )}

          <li className="list-group-item">
            Published: <Moment fromNow>{advert.createdAt}</Moment>
          </li>
          <li className="list-group-item">Status: {advert.advertStatus}</li>
        </ul>

        <ul className="list-group mt-3">
          <li className="list-group-item active">Building Information</li>
          <li className="list-group-item">
            Construction Year: {advert.constructionYear}
          </li>
          <li className="list-group-item">
            Last Renovation Year: {advert.renovationYear}
          </li>
        </ul>

        <ul className="list-group mt-3">
          <li className="list-group-item active">RevolveRent Property Dimensions</li>
          <li className="list-group-item">
            Living Space: {advert.sqrMeter} m<sup>2</sup>
          </li>
          <li className="list-group-item">
            Living Volume: {advert.cubicMeter} m<sup>3</sup>
          </li>
        </ul>

        {/* <ul className="list-group mt-3">
          <li className="list-group-item active">RevolveRent Property Layout</li>
          <li className="list-group-item">
            Number of Rooms: {advert.nrOfRooms}
          </li>
          <li className="list-group-item">
            Number of Bathrooms: {advert.nrOfBathrooms}
          </li>
          <li className="list-group-item">
            Located on: {advert.locatedOnFloor} floor
          </li>
          <li className="list-group-item">
            Number of Floors: {advert.nrOfFloors}
          </li>
        </ul> */}

        <Stack direction="row" spacing={2}>
          <Button fullWidth size="large" color="inherit" variant="outlined">
          <BathtubIcon color="primary"/>
            Bathrooms: {advert.nrOfBathrooms}
          </Button>

          <Button fullWidth size="large" color="inherit" variant="outlined">
            <HomeWorkIcon  color="primary"/>
            Located on: {floorPrefix} {advert.locatedOnFloor} floor
          </Button>

          <Button fullWidth size="large" color="inherit" variant="outlined">
           
            <CorporateFareIcon color="primary"/>
            Floors: {advert.nrOfFloors}
          </Button>
       </Stack>

        {/* <ul className="list-group mt-3">
          <li className="list-group-item active">Energy</li>
          <li className="list-group-item">
            Energy Label: {advert.energyLabel}
          </li>
          {advert.heating ? (
            <li className="list-group-item">Heating: {advert.heating}</li>
          ) : (
            ""
          )}
          {advert.warmWater ? (
            <li className="list-group-item">Warm Water: {advert.warmWater}</li>
          ) : (
            ""
          )}
        </ul> */}
        {advert.storage || advert.parking ? (
          <ul className="list-group mt-3">
            <li className="list-group-item active">Storage & Parking</li>
            {advert.storage ? (
              <li className="list-group-item">Storage: {advert.storage}</li>
            ) : (
              ""
            )}
            {advert.parking ? (
              <li className="list-group-item">Parking slots : {advert.parking}</li>
            ) : (
              ""
            )}
          </ul>
        ) : (
          ""
        )}
      </Fragment>
    );
  }
}
