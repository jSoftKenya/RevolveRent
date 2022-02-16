import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { logMeOut } from "../../actions/user";

import AgentPage from "../agentpage/AgentPage";
import ManagerPage from "../managerpage/ManagerPage";
import PrivatePersPage from "../privateperspage/PrivatePersPage";

import SuPage from "../su-page/SuPage";

import User from "../../pages/User";



import { BrowserRouter, Route } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import DashboardSidebar from "../../layouts/dashboard/DashboardSidebar"



class UserPage extends Component {
  componentDidUpdate() {
    if (this.props.user) {
      if (this.props.user.justRegistered) {
        this.props.logMeOut();
      }
    }
  }

  render() {
    if (!this.props.user) {
      return (
        <div className="row mt-3 text-center">
          <div className="col-12">
            <h4>Now you can Login to access your account.</h4>
          </div>
          <div className="col-12">
            <Link className="btn btn-outline-success" to="/login">
              Login
            </Link>
            <Link className="btn btn-outline-info ml-1" to="/register">
              Sign Up
            </Link>
          </div>
        </div>
      );
    } else {
    
      if (this.props.user.user) {
        if (this.props.user.justRegistered) {
          return <h4>Thank you for registration.</h4>;
        } else {
          switch (this.props.user.user.role) {
            case "suAdmin": {
              return (
                <div className="container">    
                  <SuPage />
                  <User/>
                </div>
              );
            }
            case "agencyAgent": {
              return (
                <div className="container">
                  <AgentPage />
                </div>
              );
            }
            case "agencyManager": {
              return (
                <div >
                    <div className="container">
                        <ManagerPage />
                     
                    </div>
                </div>

              );
            }
            case "privatePerson": {
              return (
                <div className="container">
                  {/* <DashboardSidebar/> */}
                  <PrivatePersPage />
                </div>
              );
            }
            case "tenant": {
              return (
                <div className="container">
                  {/* <DashboardSidebar/> */}
                  <PrivatePersPage />
                </div>
              );
            }


            default:
              return (
                <h1>
                  Something went wrong try log out, and log in one more time.
                </h1>
              );
          }
        }
      } else {
        return <h4>Loading...</h4>;
      }
    }
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer
  };
}

export default connect(mapStateToProps, { logMeOut })(UserPage);
