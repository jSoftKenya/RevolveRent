import React, { Component } from "react";

import { DropdownButton, Dropdown } from 'react-bootstrap';
import PropertyTypesBadges from "../mainpage/PropertyTypesBadges";
import searchFill from '@iconify/icons-eva/search-fill';
import { Icon } from '@iconify/react';


import {
  Button,
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

const initialState = {
  city: "",
  priceFrom: 1000,
  priceTo: 100000,
  forRent: true,
  forSale: true,
  noSearchTerm: false,
  minMoreThenMax: false,
  noRentNoSale: false,
  isSubmitting: false,
};

export default class SearchBar extends Component {
  state = initialState;

  

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmitting = e => {
    e.preventDefault();
    this.setState({
      isSubmitting: !this.state.isSubmitting
    });
  };

  searchByCityname = e => {
    e.preventDefault();
    if (this.state.priceFrom > this.state.priceTo) {
      this.setState({
        ...this.state,
        minMoreThenMax: true
      });
      return;
    }
    if (!this.state.forRent && !this.state.forSale) {
      this.setState({
        ...this.state,
        noRentNoSale: true
      });
      return;
    }
    if (this.state.city === "") {
      this.props.history.push({
        pathname: `/search/city/any`,
        state: this.state
      });
      return;
    }
    this.props.history.push({
      pathname: `/search/city/${this.state.city}`,
      state: this.state
    });
  };

  forSaleOrRent = action => {
    switch (action) {
      case "RENT":
        this.setState({
          ...this.state,
          forRent: !this.state.forRent
        });
        break;
      case "SALE":
        this.setState({
          ...this.state,
          forSale: !this.state.forSale
        });
        break;
      default:
        break;
    }
  };


  handleForSaleOrRent = (e) =>{
    e.preventDefault();
    this.forSaleOrRent(e.target.value);
  }

  componentWillUnmount() {
    this.setState(initialState);
  }

  render() {
    // console.log(this.props);
    return (
      <div className="search_bar_container">
            <div className="topnav__search">
            <form
              // className="form-inline"
              onSubmit={e => this.searchByCityname(e)}
            >
             <div className="search_bar">
                {/* <label htmlFor="city" className="col-4">
                  Town Name
                 
                 
                  <input
                    className="form-control"
                    type="search"
                    placeholder="Property Location"
                    aria-label="Search"
                    name="city"
                    onChange={this.handleChange}
                    value={this.state.city}
                  />
                </label> */}

                  <TextField
                      fullWidth
                      type="search"
                      label="City of choice"
                      name="city"
                      onChange={this.handleChange}
                      value={this.state.city}
                      />
               
                {/* <label htmlFor="priceFrom" className="col-2">
                  Minimum Price
                  <input
                    className="form-control"
                    type="number"
                    placeholder="Price From"
                    aria-label="Search"
                    name="priceFrom"
                    onChange={this.handleChange}
                    value={this.state.priceFrom}
                    min="1"
                  />
                </label> */}


                  <TextField
                      fullWidth
                      autoComplete="username"
                      type="number"
                      label="Price/Rent from"
                      name="priceFrom"
                      onChange={this.handleChange}
                      value={this.state.priceFrom}
                      min="1000"
                      />    
				
                 
                {/* <label htmlFor="priceTo" className="col-2">
                  Maximum Price
                  <input
                    className="form-control"
                    type="search"
                    placeholder="Price To"
                    aria-label="Search"
                    name="priceTo"
                    onChange={this.handleChange}
                    value={this.state.priceTo}
                    min="0"
                  />
                </label> */}

                    <TextField
                      fullWidth
                      type="number"
                      placeholder="Price To"
                      label="Price/Rent To"
                      name="priceTo"
                      onChange={this.handleChange}
                      value={this.state.priceTo}
                      min="1000"
                      />    
				

              
                  {/* <button
                    type="button"
                    className={`btn btn-sm ${
                      this.state.forRent ? "btn-success" : "btn-outline-warning"
                    }`}
                    onClick={() => this.forSaleOrRent("RENT")}
                  >
                    For Rent
                  </button>
                  <button
                    type="button"
                    className={`btn btn-sm ml-2 ${
                      this.state.forSale ? "btn-success" : "btn-outline-warning"
                    }`}
                    onClick={() => this.forSaleOrRent("SALE")}
                  >
                    For Sale
                  </button> */}

                  {/* <DropdownButton id="dropdown-basic-button" title="House For">
                    <Dropdown.Item onClick={() => this.forSaleOrRent("RENT")}>For Rent</Dropdown.Item>
                    <Dropdown.Item onClick={() => this.forSaleOrRent("SALE")}>For Sale</Dropdown.Item>
                  </DropdownButton> */}

                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Purpose</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="purpose"
                      value={"RENT"}
                      label="Purpose"
                      onChange={this.handleForSaleOrRent}
                    >
              
                      <MenuItem value={"RENT"}>For Rent</MenuItem>
                      <MenuItem value={"SALE"} >For Sale</MenuItem>
                    </Select>
                  </FormControl>


                  {/* <DropdownButton id="dropdown-basic-button" title="House Type">
                    <Dropdown.Item onClick={() => this.forSaleOrRent("RENT")}>For Rent</Dropdown.Item>
                    <Dropdown.Item onClick={() => this.forSaleOrRent("SALE")}>For Sale</Dropdown.Item>
                  </DropdownButton> */}
                
                  {/* <input
                    type="submit"
                    value="Search"
                    className="btn btn-outline-primary ml-auto"
                  /> */}

                <Button fullWidth size="large" variant="outlined">
                      <Icon icon={searchFill} color="green" height={24} />
               
                </Button>



                {/* <LoadingButton
                          fullWidth
                          size="large"
                          type="submit"
                          value="Search"
                          variant="contained"
                          loading={this.state.isSubmitting}
                        >
                          Search
                        </LoadingButton> */}
                  </div>

            </form>
          

          
            <small className="text-danger">
              {this.state.noSearchTerm ? "Please define some search term" : ""}
              {this.state.minMoreThenMax
                ? "Minimal price should be less then maximal"
                : ""}
              {this.state.noRentNoSale
                ? "For Rent or For Sale should be selected"
                : ""}
            </small>  
            </div>
      </div>
    );
  }
}
