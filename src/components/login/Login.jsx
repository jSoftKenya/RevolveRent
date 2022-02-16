
import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import { loginUser } from "../../actions/user";
import { Link } from "react-router-dom";

import ForgotPassword from "./ForgotPassword";



//MRK
// material
import { styled } from '@mui/material/styles';
// layouts
import AuthLayout from '../../layouts/AuthLayout';
// components
import Page from '../../components_mrk/Page';
import { MHidden } from '../../components_mrk/@material-extend';


import AuthSocial from '../../components_mrk/authentication/AuthSocial';

import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';



// material
import {
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel, Box, Card, Container, Typography, Button, Divider 
} from '@mui/material';

import { LoadingButton } from '@mui/lab';
import * as Yup from 'yup';

import { clearErrors, clearSuccess } from "../../actions/error";


// import ErrorAlert from "../../components/header/ErrorAlert";
// import SuccessAlert from "../../components/header/SuccessAlert";

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


//Formirk
const showPassword = false;

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  // const formik = useFormik({
  //   initialValues: {
  //     email: '',
  //     password: '',
  //     remember: true
  //   },
  //   validationSchema: LoginSchema,
  //   onSubmit: () => {
  //     navigate('/dashboard', { replace: true });
  //   }
  // });

  // const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  // const handleShowPassword = () => {
  //   setShowPassword((show) => !show);
  // };


//data init
const initialState = {
  email: "",
  password: "",
  isSubmitting: false,
  showPassword: false
};



class LoginForm extends Component {
  state = initialState;

  login = e => {
    e.preventDefault();
    this.props.loginUser(this.state);
    this.setState(initialState);
  };

  handleChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };


  handleSubmitting = isSubmitting=> {
    this.setState({
      isSubmitting: !isSubmitting
    });
  };
  
  
  handleShowPassword = (e) => {
    e.preventDefault();
    this.setState({
      showPassword: !showPassword
    });
  };

  componentDidMount() {
    if (this.props.user) {
      this.props.history.push("/user");
    }
  }

  componentDidUpdate() {
    if (this.props.user) {
      this.props.history.push("/user");
    }

    if (this.handleTimer) {
      clearTimeout(this.handleTimer);
    }
    if (this.props.success) {
      this.handleTimer = setTimeout(this.props.clearSuccess, 3000);
    }

    if (this.props.error) {
      if (this.handleTimer) {
        clearTimeout(this.handleTimer);
      }
      this.handleTimer = setTimeout(this.props.clearErrors, 3000);
    }
  }


  

  render() {
    return (
      <RootStyle title="RevolveRent | Login">
      <AuthLayout>
        New to revolverent? &nbsp;
        <Link to="/register" underline="none" variant="subtitle2" >
          Sign up  Here
        </Link>
      </AuthLayout>

      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
           Karibu tena
          </Typography>
          <img alt="register" src="/static/illustrations/illustration_register.png" />
        </SectionStyle>
      </MHidden>
     
      <Container>
        <ContentStyle>
        <Box sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Login to manage your account
            </Typography>
         
          </Box>
          <AuthSocial />

    
            <div className="card p-5">
           
              <h4>Login Here</h4>
              <form onSubmit={this.login}>
               <Stack spacing={3}>
               
                

                    <TextField
                      
                      id="email"
                      label="Email"
                      type="text"
                      name="email"
                      value={this.state.email}
                      onChange={e => this.handleChange(e)}
                      fullWidth
                      variant="standard"
                    />
              
               
                 
                    <TextField
                      
                      id="password"
                      label="Password"
                      name="password"
                      type={this.state.showPassword ? 'text' : 'password'}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={this.handleShowPassword} edge="end">
                              <Icon icon={this.state.showPassword ? eyeFill : eyeOffFill} />
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                      value={this.state.password}
                      onChange={e => this.handleChange(e)}
                      fullWidth
                      variant="standard"
                    />
                  
                  
                  </Stack>
               <LoadingButton
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  onClick={e => this.handleSubmitting(e)}
                  loading={this.state.isSubmitting}
                >
                  Login
                </LoadingButton>


                    <Divider sx={{ my: 3 }} />
                    <ForgotPassword/>
               
              </form>
          
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

export default connect(mapStateToProps, { loginUser })(LoginForm);
