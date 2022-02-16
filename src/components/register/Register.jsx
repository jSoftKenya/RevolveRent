import React, { Component, Fragment } from "react";
import { createUser } from "../../actions/user";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";
import axios from "axios";
// import './register.css'
import TermsDialog from "../terms/TermsDialog";
import { Checkbox, FormControlLabel, FormGroup, Radio, TextField ,FormControl, FormLabel,RadioGroup} from "@mui/material";

import { Stack, Button, Divider } from '@mui/material';
import { Icon } from '@iconify/react';
import googleFill from '@iconify/icons-eva/google-fill';
import twitterFill from '@iconify/icons-eva/twitter-fill';
import facebookFill from '@iconify/icons-eva/facebook-fill';

//MRK
// material
import { styled } from '@mui/material/styles';
import { Box, Card, Container, Typography } from '@mui/material';
// layouts
import AuthLayout from '../../layouts/AuthLayout';
// components
import Page from '../../components_mrk/Page';
import { MHidden } from '../../components_mrk/@material-extend';

import { RegisterForm } from '../../components_mrk/authentication/register';
import AuthSocial from '../../components_mrk/authentication/AuthSocial';


import { Link } from "react-router-dom";

import {
  IconButton,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';

// import welcomeImage from "/static/illustrations/welcome.jpg"

import baseUrl from "../../utils/common";
import CustomSnackbar from "../../utils/CustomizedSnackbars";

const initialState = {
  username: "",
  email: "",
  phoneNumber: "",
  password: "",
  repeatPassword: "",
  role: "",
  showPrivateMenu: false,
  showTenantMenu: false,
  showCompanyMenu: false,
  error: "",
  companyName: "",
  companyArr: [],
  companySelected: false,
  kvkNumber: 0
};


const footer = (
  <div>
    <button
      label='Yes'
      icon='pi pi-check'
      onClick={e => this.setState({ visible: false })}
    >Yes</button>
    <button
      label='No'
      icon='pi pi-times'
      onClick={e => this.setState({ visible: false })}
      className='p-button-secondary'
    >No</button>
  </div>
);


const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

class SignUpForm extends Component {
  state = initialState;

  signUpValidation = e => {
    e.preventDefault();
    if (!this.state.role) {
      return this.setState({
        ...this.state,
        error: "Please select account type you want create"
      });
    }
    if (!this.state.password || this.state.password.length < 8) {
      return this.setState({
        ...this.state,
        error: "Password should be 8 symbols long or more"
      });
    }
    if (this.state.password !== this.state.repeatPassword) {
      return this.setState({
        ...this.state,
        password: "",
        repeatPassword: "",
        error: "Passwords does not match. Re-enter the password again..."
      });
    }
    this.canSignUp();
  };

  canSignUp = () => {
    this.props.createUser(this.state);
    this.setState(initialState);
    this.props.history.push("/user");
  };

  handleChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleRadiobutton = e => {
    this.setState({
      role: e.target.value
    });
  };



  handleTenantOrCustomer = (e) =>{
    e.preventDefault();
    const value = e.target.value;

    console.log("Role:"+value);
    if(value === "tenant"){
      this.showTenantMenu();
    }
    else if(value === "privatePerson"){
      this.showPrivPersMenu();
    }
    else if(value === "company"){
      this.showMenuForCompany();
    }
   
  }


  showPrivPersMenu = () => {
    this.setState({
      ...this.state,
      showPrivateMenu: true,
      showTenantMenu: false,
      showCompanyMenu: false,
      error: "",
      role: "privatePerson"
    });
  };


  showTenantMenu = () => {
    this.setState({
      ...this.state,
      showTenantMenu: true,
      showCompanyMenu: false,
      showPrivateMenu: false,
      error: "",
      role: "tenant"
    });
  };


  showMenuForCompany = () => {
    this.setState({
      ...this.state,
      showPrivateMenu: false,
      showTenantMenu: false,
      showCompanyMenu: true,
      error: "",
      role: ""
    });
  };

  searchAgency = () => {
    axios
      .get(`${baseUrl}/agency/findby?name=${this.state.companyName}`)
      .then(res => {
        this.setState({
          ...this.state,
          companyArr: res.data
        });
      })
      .catch(err => console.log(err));
  };

  selectCompany = companyName => {
    this.setState({
      ...this.state,
      companyArr: [],
      companySelected: true,
      error: "",
      companyName
    });
  };

  
  componentDidUpdate = () => {
    if (this.handleTimer) {
      clearTimeout(this.handleTimer);
    }
    if (this.props.success) {
      this.handleTimer = setTimeout(this.props.clearSuccess, 5000);
    }

    if (this.props.error) {
      if (this.handleTimer) {
        clearTimeout(this.handleTimer);
      }
      this.handleTimer = setTimeout(this.props.clearErrors, 5000);
    }
  };


  render() {
    if(this.props.user){
      this.setState({
        ...this.state,
        user: this.props.user
      });
    };
    return (
      <RootStyle title="RevolveRent | Register">
      <AuthLayout>
        Already have an account? &nbsp;
        <Link to="/login" underline="none" variant="subtitle2" >
          Login
        </Link>
      </AuthLayout>

      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
           Welcome to RevolveRent
          </Typography>
          <Typography variant="h5" sx={{ px: 5 }}>
           3200+ Happy customers and still growing...
          </Typography>
          <img alt="register" src={"/static/illustrations/welcome.jpg"} />
        </SectionStyle>
      </MHidden>
     
      <Container>
        <ContentStyle>
        <Box sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Create your free account
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              No Registration fee required...
            </Typography>
          </Box>
          <AuthSocial />

         {/* <div className="col-12"> */}
         {/* <div className="d-flex flex-row justify-content-center mt-5"> */}
       
            <div className="card p-5">

                  <div className="error_div">
                {this.state.error ? (
                  // <div className="alert alert-warning" role="alert">
                  //   {this.state.error}
                  // </div>
                  <CustomSnackbar isOpen={true} severity="error" message=  {this.state.error}  />
                ) : (
                  ""
                )}
              </div>
              
              <form onSubmit={this.signUpValidation}>
                <div className="form-group">
                  {/* <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    className="form-control"
                    autoComplete="email"
                    value={this.state.email}
                    onChange={e => this.handleChange(e)}
                    required
                  /> */}

                    
                  <TextField
                      margin="dense"
                      label="Email"
                      name="email"
                      type="email"
                      value={this.state.email}
                      onChange={e => this.handleChange(e)}
                      fullWidth
                      variant="standard"
                      required
                    />

                </div>
                <div className="form-group">
                  {/* <label htmlFor="username">Your Full Name</label>
                  <input
                    type="text"
                    name="username"
                    placeholder="Full Name"
                    className="form-control"
                    autoComplete="name"
                    value={this.state.username}
                    onChange={e => this.handleChange(e)}
                    required
                  /> */}

                       
                  <TextField
                      margin="dense"
                      label="Full Name"
                      name="username"
                      type="text"
                      value={this.state.username}
                      onChange={e => this.handleChange(e)}
                      fullWidth
                      variant="standard"
                      required
                    />

                  <small className="form-text text-muted">
                    Please, enter your full name
                  </small>
                </div>
                <div className="form-group">
                  {/* <label htmlFor="phoneNumber">Safaricom Phone Number</label>
                  <input
                    type="text"
                    placeholder="Phone Number"
                    name="phoneNumber"
                    className="form-control"
                    value={this.state.phoneNumber}
                    onChange={e => this.handleChange(e)}
                  /> */}


                          
                <TextField
                      margin="dense"
                      label="Safaricom Phone Number"
                      name="phoneNumber"
                      type="text"
                      value={this.state.phoneNumber}
                      onChange={e => this.handleChange(e)}
                      fullWidth
                      variant="standard"
                      required
                    />

                </div>
                <div className="form-group">
                  
                {/* <label>Sign Up as: */}
                {/* <Button  variant="outlined" 
                    
                    onClick={this.showPrivPersMenu}
                  >
                    An Individual
                  </Button> */}


                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">I want to</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="role"
                      value={""}
                      label="I want to"
                      onChange={this.handleTenantOrCustomer}
                    >

                      <MenuItem value={"privatePerson"}>Advertise my house(Individual)</MenuItem>
                      <MenuItem value={"company"}>Advertise my house(Company)</MenuItem>
                      <MenuItem value={"tenant"} >Find a house</MenuItem>
                    </Select>
                  </FormControl>


{/* 
                  <Button variant="outlined" 
    
                    onClick={this.showMenuForCompany}
                  >
                    A Company
                  </Button> */}

                  {this.state.showPrivateMenu ? (
                    <div className="alert alert-success mt-3" role="alert">
                      <small>You'll be Signed Up as an individual Customer</small>
                    </div>
                  ) : this.state.showTenantMenu ? (
                    <div className="alert alert-success mt-3" role="alert">
                      <small>You'll be Signed Up as an individual Tenant</small>
                    </div>
                  ): this.state.showCompanyMenu ? (
                    <div className="mt-3">
                      {/* <label>
                        Real Estate Company Manager
                        <input
                          type="radio"
                          name="agencyManager"
                          value="agencyManager"
                          autoComplete="organization"
                          onChange={this.handleRadiobutton}
                        /> */}

                        <FormControl component="fieldset">
                          <FormLabel component="legend">Company User Type</FormLabel>
                          <RadioGroup row aria-label="gender" name="row-radio-buttons-group">
                            <FormControlLabel value="agencyManager" control={<Radio />} label="Manager" autoComplete="organization"
                          onChange={this.handleRadiobutton}/>
                            <FormControlLabel value="agencyAgent" control={<Radio />} label="Agent"   autoComplete="organization"
                          onChange={this.handleRadiobutton}/>
                           
  
                          </RadioGroup>
                        </FormControl>

                    </div>
                  ) : (
                    ""
                  )}

                  {this.state.role === "agencyAgent" ? (
                    <div className="form-group">
                      {/* <div className="text-center">
                        <label htmlFor="companyName">Company Name</label>
                      </div>
                      <input
                        type="text"
                        name="companyName"
                        placeholder="Company Name"
                        className="form-control"
                        value={this.state.companyName}
                        onChange={e => this.handleChange(e)}
                        required
                      /> */}

                      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
                  <TextField
                     fullWidth
                      margin="dense"
                      label="Company Name"
                      name="companyName"
                      type="text"
                      value={this.state.companyName}
                      onChange={e => this.handleChange(e)}
                      variant="standard"
                    />
                      <div className="text-center">
                      <Button type="submit" size="large" variant="outlined" 
                          type="button"
                          className="btn btn-sm btn-info mt-2"
                          onClick={this.searchAgency}
                        >
                          Search
                        </Button>
                      </div>
                     </Stack>

                      {this.state.companyArr.length !== 0 ? (
                        <div>
                          {this.state.companyArr.map((company, i) => (
                             <Button type="submit" size="large" variant="outlined" >
                              key={i}
                              className="btn btn-sm btn-outline-info mt-1 ml-1"
                              onClick={() => this.selectCompany(company.name)}
                            >
                              {company.name}
                            </Button>
                          ))}
                        </div>
                      ) : this.state.companySelected ? (
                        ""
                      ) : (
                        <div className="mt-2">
                          <small>
                            <ol>
                              <li>Type company name and click search</li>
                              <li>Select your Company from search result</li>
                            </ol>
                          </small>
                        </div>
                      )}
                    </div>
                  ) : this.state.role === "agencyManager" ? (
                    <div className="form-group">
                      {/* <label htmlFor="companyName">Company Name</label>
                      <input
                        type="text"
                        name="companyName"
                        placeholder="Company Name"
                        className="form-control"
                        value={this.state.companyName}
                        onChange={e => this.handleChange(e)}
                        required
                      /> */}
                   <TextField
                      margin="dense"
                      id="companyName"
                      label="Company Name"
                      name="companyName"
                      type="text"
                      value={this.state.companyName}
                      onChange={e => this.handleChange(e)}
                      fullWidth
                      variant="standard"
                    />


                    </div>
                  ) : (
                    ""
                  )}

              
                </div>
                <div className="form-group">
                  {/* <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="form-control"
                    autoComplete="new-password"
                    value={this.state.password}
                    onChange={e => this.handleChange(e)}
                    required
                  /> */}
                   <TextField
                      margin="dense"
                      id="password"
                      label="Enter Password"
                      name="password"
                      type="password"
                      value={this.state.password}
                      onChange={e => this.handleChange(e)}
                      fullWidth
                      variant="standard"
                    />


                  <small className="form-text text-muted">
                    Choose password for your account
                  </small>
                </div>
                <div className="form-group">
                  {/* <label htmlFor="repeatPassword">Repeat Password</label>
                  <input
                    type="password"
                    name="repeatPassword"
                    placeholder="Repeat Password"
                    className="form-control"
                    autoComplete="new-password"
                    value={this.state.repeatPassword}
                    onChange={e => this.handleChange(e)}
                    required
                  /> */}
                    <TextField
                      margin="dense"
                      id="repeatPassword"
                      label="Confrim Password"
                      name="repeatPassword"
                      type="password"
                      value={this.state.repeatPassword}
                      onChange={e => this.handleChange(e)}
                      fullWidth
                      variant="standard"
                    />


                  <small className="form-text text-muted">
                    Repeat password for your account
                  </small>
                </div>
               
          

                {/* <FormGroup className="terms">
                <FormControlLabel control={<Checkbox defaultChecked />} label="I agree to RevolveRent" className="check"/>
                <TermsDialog className="terms_dialog"/>
              </FormGroup> */}
                
                <div className="form-group text-center">
                 

                <Button type="submit" fullWidth size="large" variant="outlined" >
                          {/* <Icon icon={googleFill} color="#DF3E30" height={24} /> */}
                          Sign Up
                    </Button>
                </div>
              </form>
              {/* <p >Having an account? <Link to="/login">Login</Link> </p> */}
        
            {/* </div>
        </div> */}
        <Typography variant="body2" align="center" sx={{ color: 'text.secondary', mt: 3 }} className="d-flex row" >
             By registering, I agree to RevolveRent &nbsp;
            <TermsDialog/>
  
          </Typography>
       </div>
     
    
       </ContentStyle>
      </Container>
    </RootStyle>
  
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer
  };
}

export default connect(mapStateToProps, { createUser })(SignUpForm);
