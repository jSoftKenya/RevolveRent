import React, { Component, Fragment } from "react";
import Moment from "react-moment";

import "./usercard.css";
import noImage from "../../assets/placeholder/no_profile.png";


export default class UserCard extends Component {
  render() {
    if (this.props.user) {
      const { user } = this.props;
      return (
        <div className="card">
          {user.agency ? (
            <Fragment>
              <div className="card-header">
                {user.agency.name},{" "}
                <span className="font-italic">
                  Published By: {user.username}
                </span>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  Company Registered:{" "}
                  <Moment fromNow>{user.agency.createdAt}</Moment>
                </li>
                <li className="list-group-item">Email: {user.email}</li>
                {+user.phoneNumber ? (
                  <li className="list-group-item">Phone: {user.phoneNumber}</li>
                ) : (
                  ""
                )}
              </ul>
            </Fragment>
          ) : (
            
             <div className="col-12 user_card">
                <div className="col-3">
                  <img src={noImage} alt="Photo" className="photo"/>
                </div>
                <div className="col-6">
                  <h4> {user.username}</h4>
                  Registered: <Moment fromNow>{user.createdAt}</Moment>
                  {user.isVerifiedByAdmin ? (
                  <span className="badge badge-pill badge-success ml-2">
                    Verified Account
                  </span>
                ) : (
                  <span className="badge badge-pill badge-warning ml-2">
                    Not Verified Account
                  </span>
                )}
                </div>
                <div className="col-6">
                <button type="button" class="btn btn-info">Call</button>
                <button type="button" class="btn btn-info">Message</button>
                </div>
             </div>

          )}
        </div>
      );
    } else {
      return <h4>Loading User</h4>;
    }
  }
}
