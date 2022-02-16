import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { fetchAdvert } from "../../actions/advert";
import { likeAdvert } from "../../actions/likes";
import { checkAppointment, cancelAppointment } from "../../actions/appointment";

import AddAppointment from "./AddAppointment";
import ImagesUpload from "../image/ImagesUpload";
import ImageGallery from "../image/imagegallery/ImageGallery";
import AdvertExtras from "../extras/AdvertExtras";
import ViewMap from "../map/ViewMap";
import ShowAppointment from "../appointment/ShowAppointment";
import UserCard from "./UserCard";
import AdvertInformation from "./AdvertInformation";



import "./selectedadvert.css";

import axios from "axios";

// material
import {
  Button,
  Stack,
  Typography,
  Divider,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

let baseUrl = "";
if (process.env.NODE_ENV === "development") {
  baseUrl = "http://localhost:4000";
} else {
  baseUrl = "https://revolverent-backend.herokuapp.com";
}

class SelectedAdvert extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchAdvert(id);
    if (this.props.user && this.props.advert) {
      this.props.checkAppointment();
    }
  }

  likeAdvert = () => {
    const { id } = this.props.match.params;
    this.props.likeAdvert(id);
  };

  requestToRent = () => {
    const { id } = this.props.match.params;
    // this.props.fetchAdvert(id);
    
    if (this.props.user && this.props.advert) {
      const data = {userId: this.props.user.user.id, advertId: this.props.advert.id, message: "Rent request"}
      console.log("User:"+JSON.stringify(this.props.user ));
      console.log("Sending:"+JSON.stringify(data));
        axios
        .post(`${baseUrl}/rentrequest/create`, {
          ...data
        })
        .then(response => {
          console.log("rent Request"+response.data);
        })
        .catch(err => console.log("Rent request error:"+JSON.stringify(err.response)));
      };
        
  };

  cancelAppointment = id => {
    this.props.cancelAppointment(id);
  };

  numberWithSpaces = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  contentForAll = () => {
    return (
      <div className="container mt-3">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/search/city/${this.props.advert.city}`}>
                {this.props.advert.city}
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {this.props.advert.houseName}, {this.props.advert.city}
            
            </li>
          </ol>
        </nav>
        <h1>
          {this.props.advert.houseName}, {this.props.advert.houseType} in {this.props.advert.city}
        </h1>
        <p>{this.props.advert.postcode}</p>
        <hr />

        <div className="row">
          <div className="col-12 col-md-12 col-lg-3 col-xl-3">
            <h2>
              {this.numberWithSpaces(this.props.advert.price)}{" "}
              {this.props.advert.isForSale ? "Ksh." : "Ksh./month"}
            </h2>
            {this.props.user ? (
              this.props.liked ? (
                <button
                  className="btn btn-outline-warning"
                  onClick={this.likeAdvert}
                >
                  DisLike
                </button>
              ) : (
                <button className="btn btn-success" onClick={this.likeAdvert}>
                  Like
                </button>
              )
            ) : (
              ""
            )}
            <hr />

            {this.props.user ? (
              this.props.liked ? (
                  <Button
                  fullWidth
                  size="large"
                  type="submit"
                  variant="outlined"
                  onClick={this.requestToRent}
                >
                  Send rent Request
                </Button>
              ) : (
                <Divider sx={{ my: 3 }}>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  You may send a rent request if you like the add
                </Typography>
              </Divider>
              )
            ) : (
              ""
            )}
           <Divider sx={{ my: 3 }}/>
            <AdvertExtras advert={this.props.advert} myAdvert={false} />
            <div>
              {this.props.user ? (
                this.props.user.user.id !== this.props.advert.userId ? (
                  this.props.isAppointment ? (
                    <h4>you have created appointment for this advertisement</h4>
                  ) : (
                    <AddAppointment />
                  )
                ) : (
                  ""
                )
              ) : (
                "Login to book this property"
              )}
            </div>
          </div>
          <div className="col-12 col-md-12 col-lg-8 col-xl-8 ml-auto">
            <ImageGallery advert={this.props.advert} myAdvert={false} />
            <div className="col-12 mt-3">
              <UserCard user={this.props.advert.user} />
            </div>
            <div className="col-12 mt-3">
              <h4>Description</h4>
              <p>{this.props.advert.description}</p>
            </div>
          </div>
        </div>
        <div className="col-12 mt-3">
          <AdvertInformation advert={this.props.advert} />
        </div>
        <hr />
        <div className="card mb-5 mx-3 mt-3">
          <div className="card-body p-3">
            <h5 className="card-title">Map</h5>
            <ViewMap
              lat={this.props.advert.lat}
              lon={this.props.advert.lon}
              pointer={`${this.props.advert.address}, ${this.props.advert.city}, ${this.props.advert.postcode}`}
            />
          </div>
        </div>
      </div>
    );
  };

  render() {
    if (!this.props.advert) {
      return (
        <div className="mt-2 d-flex justify-content-center">
          <div className="col-6">
            <div className="alert alert-warning" role="alert">
              Looks like you just logged out. And we can not show you this
              advertisement.
            </div>
          </div>
        </div>
      );
    } else if (this.props.advert && this.props.myAdverts) {
      const { id } = this.props.advert;
      if (this.props.myAdvertIds.includes(id)) {
        const mySelectedAdvert = this.props.myAdverts.find(
          advert => advert.id === id
        );
        const activeAppointments = mySelectedAdvert.advertAppointments
          .filter(appCon => {
            if (appCon) {
              if (appCon.appointment.status === "published") {
                return true;
              }
            }
            return false;
          })
          .map(appCon => appCon.appointment);
        const canceledAppointments = mySelectedAdvert.advertAppointments
          .filter(appCon => {
            if (appCon) {
              if (appCon.appointment.status === "canceled") {
                return true;
              }
            }
            return false;
          })
          .map(appCon => appCon.appointment);

        return (
          <div className="container mt-3">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="/user">My Account</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="/myadverts">My ads</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  {mySelectedAdvert.houseName}
                </li>
              </ol>
            </nav>
            <h1>{mySelectedAdvert.houseName}  {mySelectedAdvert.houseType},  {mySelectedAdvert.city}   </h1>
      
            <ImagesUpload />
            <div className="card my-3">
              <div className="card-body">
                <h5 className="card-title activeAppoint">Gallery</h5>
                <ImageGallery advert={this.props.advert} myAdvert={true} />
              </div>
            </div>
            <hr />
            <div className="card">
              <div className="card-body">
                <AdvertExtras advert={this.props.advert} myAdvert={true} />
              </div>
            </div>
            <hr />
            <div className="card">
              <div className="card-body">
                <h5 className="card-title activeAppoint">
                  Active Appointments
                </h5>
                <p>
                 List of Active Appointments for {this.props.advert.houseName}
                </p>
                {activeAppointments.map((app, i) => (
                  <ShowAppointment
                    key={i}
                    appointment={app}
                    cancelAppointment={this.cancelAppointment}
                  />
                ))}
              </div>
            </div>
            <hr />
            <div className="card">
              <div className="card-body">
                <h5 className="card-title canceledAppoint">
                  Canceled Appointments
                </h5>
                <p>
                  Cancelled Appointments display here
                </p>
                {canceledAppointments.map((app, i) => (
                  <ShowAppointment
                    key={i}
                    appointment={app}
                    cancelAppointment={this.cancelAppointment}
                  />
                ))}
              </div>
            </div>
            <hr />
            <div className="card mb-5">
              <div className="card-body p-3">
                <h5 className="card-title">Map</h5>
                <ViewMap
                  lat={this.props.advert.lat}
                  lon={this.props.advert.lon}
                />
              </div>
            </div>
          </div>
        );
      } else {
        return this.contentForAll();
      }
    } else {
      return this.contentForAll();
    }
  }
}

function mapStateToProps(state) {
  if (state.advertReducer.selectedAdvert && state.likeReducer.likedAdverts) {
    return {
      user: state.userReducer,
      advert: state.advertReducer.selectedAdvert,
      myAdverts: state.advertReducer.myAdverts,
      myAdvertIds: state.advertReducer.myAdvertIds,
      liked: state.likeReducer.likedAdverts.find(
        advert => advert.advertId === state.advertReducer.selectedAdvert.id
      ),
      isAppointment: state.appointmentReducer.checkedAppointment
        ? state.appointmentReducer.checkedAppointment.found
        : true
    };
  }
  return {
    user: state.userReducer
  };
}

export default connect(mapStateToProps, {
  fetchAdvert,
  likeAdvert,
  checkAppointment,
  cancelAppointment
})(SelectedAdvert);
