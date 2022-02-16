import React, { Component, Fragment } from "react";

// material
import {
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel, Box, Card, Container, Typography, Button, Divider 
} from '@mui/material';

import axios from "axios";
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import RevolveMap from "../googlemaps/RevolveMaps";

let baseUrl = "";
if (process.env.NODE_ENV === "development") {
  baseUrl = "http://localhost:4000";
} else {
  baseUrl = "https://revolverent-backend.herokuapp.com";
}


const initialState = {
  isSubmitting: false,
  propertyTypes: [{}],
  showMap: false
};



export default class AdvertForm extends Component {
  state = initialState;

  handleSubmitting = isSubmitting=> {
    this.setState({
      ...this.state,
      isSubmitting: isSubmitting
    });
  };

  
  toggleShowMap = ()=> {
    console.log("SHOW MAP:"+this.state.showMap);
    this.setState({
      ...this.state,
      showMap : !this.state.showMap    
    });
  };
  
  fetchPropertyTypes = () => {
    axios
    .get(`${baseUrl}/type/all`)
    .then(res => {
      console.log("Propertytypes data:"+JSON.stringify(res.data));
      this.setState({...this.state, propertyTypes: res.data});
    })
    .catch(err => {
      console.log("Propertytypes Error:"+JSON.stringify(err));

    });
  };


  componentDidMount() {
    this.fetchPropertyTypes();
  }
  componentDidUpdate(prevProps) {
   
    // if ( this.state.propertyTypes.length === 0) {
    //   this.fetchPropertyTypes();
    // }

  }


  
  render() {
    return (
      <div className="container">
        <form onSubmit={this.props.submitNewAdvert}>
          <div className="input-group my-3">
            {this.props.formValues.isForSale ? (
              <button
                className="btn btn-sm btn-success mr-3"
                type="button"
                onClick={() => this.props.forRentForSale("sale")}
              >
                For Sale
              </button>
            ) : (
              <button
                className="btn btn-sm btn-warning mr-3"
                type="button"
                onClick={() => this.props.forRentForSale("sale")}
              >
                For Sale
              </button>
            )}
            {this.props.formValues.isForRent ? (
              <button
                type="button"
                className="btn btn-sm btn-success"
                onClick={() => this.props.forRentForSale("rent")}
              >
                For Rent
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-sm btn-warning"
                onClick={() => this.props.forRentForSale("rent")}
              >
                For Rent
              </button>
            )}
          </div>

        {/* AddNewAdvert */}

        <div className="input-group mb-3">
            <label htmlFor="houseType" className="col-12">
              Property Type
              <select
                className="form-control"
                name="houseType"
                onChange={this.props.handleChange}
                value={this.props.formValues.houseType}
                required
              >
                {
                  this.state.propertyTypes.map((p,id) =>{
                    return (
                      <option value={p.name} key={id}>{p.name}</option>
                    )
                  })

                }

               </select>
               </label> 
{/* 
              <label htmlFor="postcode" className="col-6">
              House Name <span className="text-danger">*</span>
              <input
                type="text"
                name="houseName"
                className="form-control"
                value={this.props.formValues.houseName}
                onChange={this.props.handleChange}
                placeholder="House Name"
                required
              />
            </label> */}

            
                <TextField
                      
                      id="houseName"
                      label="House Title"
                      type="text"
                      name="houseName"
                      alue={this.props.formValues.houseName}
                      onChange={this.props.handleChange}
                      fullWidth
                      variant="standard"
                      required
                    />
              
        </div>

          <div className="input-group mb-3">
            <small>Please, Select is it For Sale or For Rent</small>
          </div>
          {/* <div className="input-group mb-3">
            <label htmlFor="price" className="col-6">
              Price <span className="text-danger">*</span>
              <input
                type="number"
                name="price"
                className="form-control"
                min="1"
                step="1"
                value={this.props.formValues.price}
                onChange={this.props.handleChange}
                required
              />
              {this.props.formValues.isForSale
                ? "Ksh."
                : this.props.formValues.isForRent
                ? "Ksh./Month"
                : ""}
            </label>
            <label htmlFor="postcode" className="col-6">
              Town Name <span className="text-danger">*</span>
              <input
                type="text"
                name="city"
                className="form-control"
                value={this.props.formValues.city}
                onChange={this.props.handleChange}
                placeholder="City Name"
                required
              />
            </label>
          </div> */}

          <Stack direction="row" alignItems="center" justifyContent="space-around" sx={{ my: 2 }}>
              <TextField
                fullWidth
                autoComplete="username"
                type="number"
                label="Price"
                name="price" 
                value={this.props.formValues.price}
                onChange={this.props.handleChange}
              />
              {this.props.formValues.isForSale ? "Ksh.": this.props.formValues.isForRent ? "Ksh./Month"   : ""}
              
            <TextField
                fullWidth
                autoComplete="username"
                type="text"
                label="City/Town"
                name="city"  
                value={this.props.formValues.city}
                onChange={this.props.handleChange}
              />
         


        </Stack>
         
          
     



          <div className="input-group mb-3">
            <label htmlFor="postcode" className="col-8">
              Address <span className="text-danger">*</span>
              <input
                type="text"
                name="address"
                className="form-control"
                value={this.props.formValues.address}
                onChange={this.props.handleChange}
                placeholder="Address"
                required
              />
            </label>
            <label htmlFor="postcode" className="col-4">
              Postcode <span className="text-danger">*</span>
              <input
                type="text"
                name="postcode"
                className="form-control"
                value={this.props.formValues.postcode}
                onChange={this.props.handleChange}
                placeholder="Postcode"
                required
              />
            </label>
          </div>

         
                  

          <div className="input-group mb-3">
            <label htmlFor="cionstructionYear" className="col-6">
              Construction Year
              <input
                type="number"
                className="form-control"
                name="constructionYear"
                min="0"
                step="1"
                value={this.props.formValues.constructionYear}
                onChange={this.props.handleChange}
              />
            </label>
            <label htmlFor="renovationYear" className="col-6">
              Renovation Year
              <input
                type="number"
                className="form-control"
                name="renovationYear"
                min="0"
                step="1"
                value={this.props.formValues.renovationYear}
                onChange={this.props.handleChange}
              />
            </label>
          </div>
          <div className="input-group mb-3">
            <label htmlFor="sqrMeter" className="col-3">
              Floor Size(Square Meter) <span className="text-danger">*</span>
              <input
                type="number"
                className="form-control"
                name="sqrMeter"
                min="1"
                step="1"
                value={this.props.formValues.sqrMeter}
                onChange={this.props.handleChange}
                required
              />
            </label>
            <label htmlFor="cubicMeter" className="col-3">
              Cubic Meter
              <input
                type="number"
                className="form-control"
                name="cubicMeter"
                min="1"
                step="1"
                value={this.props.formValues.cubicMeter}
                onChange={this.props.handleChange}
              />
            </label>
            <label htmlFor="numberOfRooms" className="col-3">
              Number of Rooms
              <input
                type="number"
                className="form-control"
                name="nrOfRooms"
                min="1"
                step="1"
                value={this.props.formValues.nrOfRooms}
                onChange={this.props.handleChange}
              />
            </label>
            <label htmlFor="numberOfBathrooms" className="col-3">
              Number of Bathrooms
              <input
                type="number"
                className="form-control"
                name="nrOfBathrooms"
                min="1"
                step="1"
                value={this.props.formValues.nrOfBathrooms}
                onChange={this.props.handleChange}
              />
            </label>
          </div>
          <div className="input-group mb-3">
            <label htmlFor="numberOfFloors" className="col-3">
              Number of Floors
              <input
                type="number"
                className="form-control"
                name="nrOfFloors"
                min="1"
                step="1"
                value={this.props.formValues.nrOfFloors}
                onChange={this.props.handleChange}
              />
            </label>


            <label htmlFor="locatedOnFloor" className="col-3">
              Located on Floor
              <input
                type="number"
                className="form-control"
                name="locatedOnFloor"
                min="1"
                step="1"
                value={this.props.formValues.locatedOnFloor}
                onChange={this.props.handleChange}
              />
            </label>
            <label htmlFor="monthlyPayment" className="col-3">
              Monthly Payments
              <input
                type="number"
                className="form-control"
                name="monthlyContribution"
                min="0"
                step="1"
                value={this.props.formValues.monthlyContribution}
                onChange={this.props.handleChange}
              />
            </label>
            {/* <label htmlFor="energyLabel" className="col-3">
              Energy Label
              <input
                type="text"
                className="form-control"
                name="energyLabel"
                maxLength="1"
                value={this.props.formValues.energyLabel}
                onChange={this.props.handleChange}
                
              />
            </label> */}
          </div>
          {/* <div className="input-group mt-3">
            <label htmlFor="heating" className="col-6">
              Heating
              <input
                type="text"
                className="form-control"
                name="heating"
                value={this.props.formValues.heating}
                onChange={this.props.handleChange}
              />
            </label>
            <label htmlFor="warmWater" className="col-6">
              Warm Water
              <input
                type="text"
                className="form-control"
                name="warmWater"
                value={this.props.formValues.warmWater}
                onChange={this.props.handleChange}
              />
            </label>
          </div> */}
          <div className="input-group mt-3">
            <label htmlFor="storage" className="col-6">
              Storage
              <input
                type="text"
                className="form-control"
                name="storage"
                value={this.props.formValues.storage}
                onChange={this.props.handleChange}
              />
            </label>

            <label htmlFor="parking" className="col-6">
              Parking Slots
              <input
                type="text"
                className="form-control"
                name="parking"
                value={this.props.formValues.parking}
                onChange={this.props.handleChange}
              />
            </label>
          </div>
          <div className="form-group col-12 mt-3">
            <label htmlFor="description">
              Description <span className="text-danger">*</span>
            </label>
            <textarea
              className="form-control"
              id="description"
              rows="7"
              name="description"
              value={this.props.formValues.description}
              onChange={this.props.handleChange}
              placeholder="Description"
              required
            />
          </div>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
            
            <TextField
                type="text"
                label="Latitude"
                name="lat" 
                value={this.props.formValues.lat}
                onChange={this.props.lat}
              />
            <TextField
                type="text"
                label="Longitude"
                name="lon"  
                value={this.props.formValues.lon}
                onChange={this.props.handleChange}   
              />

             <Button
              variant="outlined"
              onClick={this.toggleShowMap} >
               <EditLocationAltIcon color="primary"/>
            </Button>


            <Stack direction="row" alignItems="center" justifyContent="space-around" sx={{ my: 2 }}>
              {(this.state.showMap == true) ? (
                    
                    <div className="row">
                        <RevolveMap/>
                      </div>
                  
                  
                ): (
                    ""
                )
                }

              </Stack>
           </Stack>


            <Stack direction="row" alignItems="center" alignItems="baseline" sx={{ my: 2 }}>
            <Button
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                   
                  >
                    Post Advert
                  </Button>
                  </Stack>
        </form>
      </div>
    );
  }
}
