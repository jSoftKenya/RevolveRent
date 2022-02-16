import React, { Component } from "react";
import { connect } from "react-redux";
import { createAdvert } from "../../actions/advert";
import AdvertForm from "./AdvertForm";

// import "./addnew.css";

import { Stack, Button, Divider, Typography } from '@mui/material';

const initialState = {
  houseName: "",
  houseType: "",
  description: "",
  isForSale: false,
  isForRent: false,
  price: 0,
  address: "",
  city: "",
  postcode: "",
  sqrMeter: 0,
  cubicMeter: 0,
  nrOfRooms: 0,
  nrOfBathrooms: 0,
  nrOfFloors: 0,
  locatedOnFloor: 0,
  advertStatus: "published",
  monthlyContribution: 0,
  constructionYear: 2010,
  renovationYear: 2010,
  energyLabel: "",
  heating: "",
  warmWater: "",
  storage: "",
  parking: "",
  showAddForm: false,
  error: "",
  lat: -1.285790,
  lon: 36.820030
};

class AddNewAdvert extends Component {
  state = initialState;

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitNewAdvert = e => {
    e.preventDefault();
    if (!this.state.isForRent && !this.state.isForSale) {
      this.setState({
        error: "Please select property purpose"
      });
      return;
    }
    this.props.createAdvert(this.state);
    this.setState(initialState);
  };

  forRentForSale = action => {
    if (action === "sale") {
      this.setState({
        ...this.state,
        isForSale: true,
        isForRent: false,
        error: ""
      });
    }
    if (action === "rent") {
      this.setState({
        ...this.state,
        isForSale: false,
        isForRent: true,
        error: ""
      });
    }
  };

  showAdvertForm = () => {
    this.setState({
      showAddForm: !this.state.showAddForm
    });
  };


  getUserLocation= () => {

  return  this.props.isGeolocationAvailable ? (

    // Check location is enable in
    // browser or not
    this.props.isGeolocationEnabled ? (

      // Check coordinates of current
      // location is available or not
      this.props.coords ? (
          
            this.setState({
              ...this.state,
              lat: this.props.coords.latitude,
              lon: this.props.coords.longitude
             
            })     

      ) : (
        <h1>Getting the location data</h1>
      )
    ) : (
      <h1>Please enable location on your browser</h1>
    )
  ) : (
    <h1>Please, update your or change the browser to get location </h1>
  );
}

  render() {
    return (
      <div className="container">
        <div className="card-body">
          <h5 className="card-title greenUnderline">New Listing</h5>
          {this.state.showAddForm ? (
            <div className="card-body">
              <button
                className="btn btn-md brn btn-warning"
                type="button"
                onClick={this.showAdvertForm}
              >
                Hide form
              </button>
              <hr />
              {this.state.error ? (
                <div className="alert alert-danger my-3 mx-5" role="alert">
                  {this.state.error}
                </div>
              ) : (
                ""
              )}
              <AdvertForm
                submitNewAdvert={this.submitNewAdvert}
                handleChange={this.handleChange}
                formValues={this.state}
                forRentForSale={this.forRentForSale}
              />
            </div>
          ) : (
            <div className="my-3">
              <button
                className="btn btn-sm btn-info"
                type="button"
                onClick={this.showAdvertForm}
              >
               Post New Advert
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default connect(null, { createAdvert })(AddNewAdvert);
