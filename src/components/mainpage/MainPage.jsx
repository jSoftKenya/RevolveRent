import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { fetchAdverts } from "../../actions/advert";
import AdvertCard from "../advertcard/AdvertCard";
import LocationFinder from "../map/LocationFinder";
import SearchBar from "../searchbar/SearchBar";
// material
import { Stack, Button, Divider, Typography } from '@mui/material';

import "./mainpage.css";


import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import ListIcon from '@mui/icons-material/List';


import axios from "axios";
import NoMoreAds from "./NoMoreAds";
import ScrollablePropertyTypes from "./ScollablePropertyTypes";
import RevolveMap from "../googlemaps/RevolveMaps";


let baseUrl = "";
if (process.env.NODE_ENV === "development") {
  baseUrl = "http://localhost:4000";
} else {
  baseUrl = "https://revolverent-backend.herokuapp.com";
}

const initialState = {
  offset: 0,
  limit: 12,
  noMoreAdverts: false,
  propertyTypes: [{}],
  showMap: false,
  iconClass: "primary"
};
class MainPage extends Component {
  state = initialState;

  componentDidMount() {
    
    this.fetchPropertyTypes();
    setTimeout(() => {
      if (this.props.allAdverts.length !== 0) {
        this.setState({
          ...this.state,
          offset: this.props.allAdverts.length,
          noMoreAdverts: true
        });
      } else {
        this.setState(initialState);
        this.props.fetchAdverts(this.state.offset);
        this.setState({
          offset: this.state.offset + this.state.limit,
          noMoreAdverts: true
        });
      }
    }, 500);
  }




  loadMore = () => {
    this.props.fetchAdverts(this.state.offset);
    this.setState({ offset: this.state.offset + this.state.limit });
  };

  toggleMap = () => {
    this.setState({showMap: !this.state.showMap, iconClass: (this.state.showMap == true ? "primary" : "secondary")});
  };

  fetchPropertyTypes = () => {
    axios
    .get(`${baseUrl}/type/all`)
    .then(res => {
      console.log("Propertytypes data:"+JSON.stringify(res.data));
      this.setState({ propertyTypes: res.data});
    })
    .catch(err => {
      console.log("Propertytypes Error:"+JSON.stringify(err));

    });
  };

  // IF USER PUSH LOGOUT, CLEAR STATE OF ADVERT IN REDUCER, AND FETCH ONE MORE TIME
  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
      this.props.fetchAdverts(0);
    }
    

  }

  render() {
    if (!this.props.allAdverts) {
      return (
        <NoMoreAds message="Oops! Looks like we have no Ads... Signup to advertise!"/>
      );
    } else {
      return (
        <Fragment>
          
            
          <div className="main-page-top">
              
              <Typography variant="h1" sx={{ color: 'text.secondary' }}>
                Welcome to RevoveRent
              </Typography>
              <h4>Search, book, rent & manage your Rentals easily</h4>
              <LocationFinder/>
              <SearchBar history={this.props.history} />
          </div>

            <Divider sx={{ my: 3 }}>
                <Typography variant="h3" sx={{ color: 'green' }}>
                  Find the property of your choice
                </Typography>
              </Divider> 

              <Stack direction="row" justifyContent="space-around" >
                <ScrollablePropertyTypes propertyTypes={this.state.propertyTypes}/>
              </Stack>

              <Stack direction="row" alignItems="flex-end" justifyContent="space-around" >
              <Typography variant="subtitle" sx={{ color: 'green' }}>
                      {this.props.allAdverts.length} Properties found
              </Typography>
          </Stack>

              {/* <div className="properties">
                <PropertyTypesBadges propertyTypes={this.state.propertyTypes}/>
              </div> */}


        <Stack direction="row" justifyContent="flex-end" >
              <Button
                type="button"
                variant="outlined"
                onClick={this.toggleMap}
                
                >

                {this.state.iconClass == "primary" ? (
                    <EditLocationAltIcon color={this.state.iconClass}/>
                ):(
                  <ListIcon color={this.state.iconClass}/>  
                
                )
              
                }  
                
                </Button>
        </Stack>

          {this.state.showMap == true ? 
            (
               <div className="row mt-3 d-flex justify-content-center">
                
                <RevolveMap allAdverts= {this.props.allAdverts} />
              </div>
              )
            : (
           <>    
              <div className="row mt-3 d-flex justify-content-center">
              {this.props.allAdverts.map((advert, i) => (
                <AdvertCard advert={advert} key={i} />
              ))}
            </div>

            <div className="d-flex justify-content-center mt-3 mb-5">
              {this.props.advertsCount <= this.state.offset ? (
                <div>
                  {this.state.noMoreAdverts
                    ? <NoMoreAds message="That's all we have!"/>
                    : "Loading listed houses..."}
                </div>
              ) : (
                <Button className="btn btn-primary" onClick={this.loadMore}>
                  View More
                </Button>
              )}
            </div>
            </>  
            )   
          }

        </Fragment>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    allAdverts: state.advertReducer.allAdverts,
    advertsCount: state.advertReducer.advertsCount,
    user: state.userReducer
  };
}

export default connect(mapStateToProps, { fetchAdverts })(MainPage);
