import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Moment from "react-moment";

import { getAgencyAgents, toggleAgentAcc } from "../../actions/advert";
import ManagersList from "./ManagersList";
import AddNewAdvert from "../addnewadvert/AddNewAdvert";
// import PaymentWraper from "../pay/PaymentWraper";


import HouseType from "../housetypes/HouseType";

import "./managerpage.css";
import { Stack } from "@mui/material";
import HouseTypesList from "../housetypes/HouseTypesList";

const initialState = {
  topUp: false,
  success: false,
  amountInEUR: 0,
  error: ""
};

class SuPage extends Component {
  state = initialState;

  componentDidMount() {
    if (this.props.user) {
      // this.props.getAgencyAgents();
    }
  }

  toggleAccount = (agentId, action) => {
    this.props.toggleAgentAcc(agentId, action);
  };

  topUp = () => {
    if (this.state.amountInEUR < 1) {
      this.setState({
        error: "Please input value in Ksh.."
      });
      return;
    }
    this.setState({
      topUp: true,
      success: false,
      error: ""
    });
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.user.agency.advertBalance !==
      this.props.user.agency.advertBalance
    ) {
      this.setState({ ...initialState, success: true });
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const favoriteAdverts = this.props.user.advertUserLikes.length;
    return (
      <div className="row mt-3">
        <div className="col-12 col-sm-12 col-md-12 col-xl-3">
          <div className="card">
            <div className="card-body">
              <h4>RevolveRent Super Admin</h4>
              <h5 className="card-title">{this.props.user.username}, </h5>
              <ul className="list-group list-group-flush">
               

      
                <li className="list-group-item">
                  Registered:{" "}
                  <Moment fromNow ago>
                    {this.props.user.createdAt}
                  </Moment>
                </li>
                <li className="list-group-item">
                  Email: {this.props.user.email}
                </li>
                {+this.props.user.phoneNumber ? (
                  <li className="list-group-item">
                    Phone: {this.props.user.phoneNumber}
                  </li>
                ) : (
                  <li className="list-group-item">
                    You have not published your phone number.
                  </li>
                )}
               
              </ul>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-12 col-md-12 col-xl-9">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title greenUnderline">
                Top Up your Company Balance
              </h5>

              {this.state.success ? (
                <div className="alert alert-success mt-3" role="alert">
                  Withdraw Funds
                </div>
              ) : this.state.topUp ? (
                // <PaymentWraper amountInCents={+this.state.amountInEUR * 100} />
                <p>Payment Wrapper</p>

              ) : (
                <div className="row">
                  <div className="input-group mb-3 col-12 col-sm-12 col-lg-5 col-xl-5">
                    <div className="input-group-prepend">
                      <span className="input-group-text">Ksh.</span>
                    </div>
                    <input
                      type="number"
                      className="form-control"
                      name="amountInEUR"
                      placeholder=""
                      min="1"
                      max="100"
                      step="1"
                      value={this.state.amountInEUR}
                      onChange={this.handleChange}
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">.00</span>
                    </div>
                  </div>
                  {this.state.error ? (
                    <div className="input-group mb-3">
                      <small className="text-danger col-12">
                        {this.state.error}
                      </small>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="input-group mb-3">
                    <button
                      onClick={this.topUp}
                      className="btn btn-sm btn-success ml-3"
                    >
                      Deposit Funds
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <hr className="my-3" />
          

          <AddNewAdvert />
              
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
                <HouseTypesList/>
           </Stack>
          {/* <hr className="my-3" />
          <ManagersList
            agents={this.props.agents}
            toggleAccount={this.toggleAccount}
          /> */}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer.user,
    agents: state.advertReducer.agencyAgents
  };
}

export default connect(mapStateToProps, {
  getAgencyAgents,
  toggleAgentAcc
})(SuPage);
