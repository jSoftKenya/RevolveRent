import React, { Component } from "react";
import { Link as RouterLink } from 'react-router-dom';
import holderImg from "../../assets/images/2.jpg";
import { Icon } from '@iconify/react';

import BathtubIcon from '@mui/icons-material/Bathtub';
import OtherHousesIcon from '@mui/icons-material/OtherHouses';



// material
import { Stack, Button, Divider, Typography } from '@mui/material';
import Moment from "react-moment";

export default class AdvertCard extends Component {
  numberWithSpaces = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };



  getLocation = () =>{
	  // this.props.isGeolocationAvailable ? (
		//   this.props.isGeolocationEnabled ? (
		// 	  this.props.coords ? (
		// 		 this.props.lat= this.props.coords.latitude,
		// 		 this.props.lon= this.props.coords.longitude
		// 	  ): (
		// 		 this.props.lat= "",
		// 		 this.props.lon= ""
		// 	  )
		//   :(
		// 	 this.props.lat= "",
		// 	 this.props.lon= ""
		//   )
		//   :(
		//  this.props.lat= "",
		//  this.props.lon= ""
		// )
	}

  render() {
    const { advert } = this.props;
    const advertImage = advert.image || holderImg

    return (
      <div className="advert_wapper col-12 col-md-6 col-lg-4 mt-3">
        <div className="advert_card h-100">
          <img
            className="card-img-top"
            style={{ maxHeight: "30vh", objectFit: "cover" }}
            src={advertImage}
            alt={`${advert.isForRent ? "For rent:" : "For Sale:"} ${
              advert.address
            }, ${advert.city}, ${advert.postcode}`}
          />
          <div className="card-body d-flex flex-column">
          <Stack direction="column" alignItems="center" justifyContent="space-around" sx={{ my: 2 }}>
            <Typography variant="h5" >
              {advert.houseName}, ({advert.houseType}) 
            </Typography>

            <Typography variant="h4">
                {this.numberWithSpaces(advert.price)}{" "}
                {advert.isForRent ? "Shs. Monthly" : "Shs. Price"}
            </Typography>
           </Stack>

          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
            <Typography variant="body" sx={{ color: 'text.seconday' }}>
              Located in {advert.city}
            </Typography>
            <Typography variant="body" sx={{ color: 'text.primary' }}>
              {"Posted "}<Moment fromNow>{advert.createdAt}</Moment>
            </Typography>
          </Stack>
          
          <Divider />
            
            
            <Stack direction="row" spacing={2}>
              <Button fullWidth size="large" color="inherit" variant="none">
                {/* <Icon icon={homeFill} color="green" height={24} /> */}
                <OtherHousesIcon color="primary" />
                {advert.nrOfRooms } &nbsp; Rooms
              </Button>

              <Button fullWidth size="large" color="inherit" variant="none">
                {/* <Icon icon={facebookFill} color="green" height={24} /> */}
                <BathtubIcon color="primary" />
                {advert.nrOfBathrooms } &nbsp; Bathrooms
              </Button>

           
           </Stack>
              <Button
              variant="outlined"
              component={RouterLink}
              to={`/advert/${advert.id}`}
              className="button-link"
              >
            More Details
          </Button>
            {/* <Link to={`/advert/${advert.id}`} className="btn btn-info">
              Details
            </Link> */}
          </div>
        </div>
      </div>
    );
  }
}
