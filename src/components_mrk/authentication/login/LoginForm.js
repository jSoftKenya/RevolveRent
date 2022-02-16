import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { loginUser } from "../../../actions/user";
import { Link } from "react-router-dom";


import { GoogleLogin } from 'react-google-login';
// import withRouter  from "../../../utils/withRouter";

const clientId = "658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"; //temp

const initialState = {
  email: "",
  password: "",
  redirect: false
};



class LoginForm extends Component {
  state = initialState;



  constructor(){
      super()
      this.redirect= this.redirect.bind(this);
  }

   redirect = () =>{
       if(this.redirect){
          this.props.navigate('/user')
        }
   }


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


   //for google Login
onSuccess = (response) => {
  console.log("[Google Success Login]:",response.profileObj);
};

onFailure = (response) => {
    console.log("[Google Login failed]:",JSON.stringify(response));
};

 

componentDidMount() {
    if (this.props.user) {
      // this.props.history.push("/user");
      // this.setState({
      //   redirect: true
      // });
      // return;
      this.redirect();
    }
  }

  componentDidUpdate() {
    if (this.props.user) {
      // this.props.history.push("/user");
      // this.setState({
      //   redirect: true
      // });
      // return;
      this.redirect();
    }
  }

  render() {
    return (
      <Fragment>
        <div className="d-flex flex-row justify-content-center mt-5">
          <div className="col-12 col-md-8 col-lg-6 col-xl-3">
            <div className="card p-5">
              <h4>Login</h4>
              <form onSubmit={this.login}>
                <div className="form-group">
                  <label htmlFor="username">Email</label>
                  <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    className="form-control"
                    value={this.state.email}
                    onChange={e => this.handleChange(e)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="form-control"
                    value={this.state.password}
                    onChange={e => this.handleChange(e)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="submit"
                    value="LOGIN"
                    className="btn btn-md btn-success"
                  />
                </div>

               
                <GoogleLogin
                    clientId={clientId}
                    buttonText="Login with Google"
                    onSuccess={response =>this.onSuccess(response)}
                    onFailure={response => this.onFailure(response)}
                    cookiePolicy={'single_host_origin'}
                    className="form-group"
                /> 
            
              </form>
              <p>I do not have account</p>
              <Link to="/register">Sign Me Up</Link>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer
  };
}

export default connect(mapStateToProps, { loginUser })(LoginForm);
