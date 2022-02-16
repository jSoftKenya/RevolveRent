import React, { Component, Fragment } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { logMeOut } from "../../actions/user";
import { clearErrors, clearSuccess } from "../../actions/error";

import "./header.css";
import ErrorAlert from "./ErrorAlert";
import SuccessAlert from "./SuccessAlert";


// top nav
import Dropdown from '../dropdown/Dropdown';
import notifications from '../../assets/JsonData/notification.json'

import user_image from '../../assets/images/logo512.png'

import user_menu from '../../assets/JsonData/user_menus.json'


const curr_user = {
    display_name: '',
    image: user_image
}

const renderNotificationItem = (item, index) => (
    <div className="notification-item" key={index}>
        <i className={item.icon}></i>
        <span>{item.content}</span>
    </div>
)

const renderUserToggle = (user) => (
    <div className="topnav__right-user">
        <div className="topnav__right-user__image">
            {/* <img src={user.image} alt="" /> */}
        </div>
        <div className="topnav__right-user__name">
            {user.email}
        </div>
    </div>
)

const renderUserMenu =(item, index) => (
    <Link to='/' key={index}>
        <div className="notification-item">
            <i className={item.icon}></i>
            <span>{item.content}</span>
        </div>
    </Link>
)

// end top nav

class Header extends Component {
  state = {
    search: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  searchByCityname = e => {
    e.preventDefault();
    this.props.history.push(`/search/city/${this.state.search}`);
    // console.log(this.state);
  };

  logoutUser = e => {
    e.preventDefault();
    this.props.logMeOut();
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
    // console.log(this.props.history);
    return (
      <Fragment>
        <nav className="topnav navbar navbar-light navbar-expand-lg navbar-light">
          <div className="" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              {this.props.user ? (
                <Fragment>
                  <li className="nav-item mr-2 my-2">
                    <Link className="text-link" to="/">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item mr-2 my-2">
                    <Link className="text-link" to="/favorites">
                      Favorites
                    </Link>
                  </li>
                  <li className="nav-item mr-2 my-2">
                    <Link className="text-link" to="/myadverts">
                      My Adverts
                    </Link>
                  </li>
                  <li className="nav-item mr-2 my-2">
                    <Link className="text-link" to="/appointment">
                      My Appointments
                    </Link>
                  </li>
                  <li className="nav-item mr-2 my-2">
                    <Link className="text-link" to="/user">
                      My Account
                    </Link>
                  </li>
                  <li className="nav-item mr-2 my-2">
                    <Link className="text-link" to="/dashboard">
                      Dashboard
                    </Link>
                  </li>

                  <li className="nav-item mr-2 my-2">
                    <a className="text-link" onClick={this.logoutUser} href="/">
                      Logout
                    </a>
                  </li>

                
                  {/* <div className="topnav__search">
                      <input type="text" placeholder='Search here...' />
                      <i className='bx bx-search'></i>
                  </div> */}
                  <div className="topnav__right">
                      <div className="topnav__right-item">
                          {/* dropdown here */}
                          <Dropdown
                              customToggle={() => renderUserToggle(curr_user)}
                              contentData={user_menu}
                              renderItems={(item, index) => renderUserMenu(item, index)}
                          />
                      </div>
                      <div className="topnav__right-item">
                          <Dropdown
                              icon='bx bx-bell'
                              badge='12'
                              contentData={notifications}
                              renderItems={(item, index) => renderNotificationItem(item, index)}
                              renderFooter={() => <Link to='/'>View All</Link>}
                          />
                          {/* dropdown here */}
                      </div>
                    
                  </div>
            

                </Fragment>
              ) : (
                <Fragment>
                  <li className="nav-item mr-2 my-2">
                    <Link className="text-link" to="/">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item mr-2 my-2">
                    <Link className="text-link" to="/nearby">
                      Nearby
                    </Link>
                  </li>
                  <li className="nav-item mr-2 my-2">
                    <Link className="text-link" to="/featured">
                      Featured
                    </Link>
                  </li>
                  <li className="nav-item mr-2 my-2">
                    <Link className="text-link" to="/about">
                      About Us
                    </Link>
                  </li>
                  <li className="nav-item mr-2 my-2">
                    <Link className="text-link" to="/faq">
                      FAQ
                    </Link>
                  </li>
                  <li className="nav-item mr-2 my-2">
                    <Link className="text-link" to="/contactus">
                      Contact Us
                    </Link>
                  </li>

                  <li className="nav-item mr-2 my-2">
                    <Link className="text-link" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item mr-2 my-2">
                    <Link className="text-link" to="/register">
                      Register
                    </Link>
                  </li>
                </Fragment>
              )}
            </ul>
            <ul className="navbar-nav ml-auto"></ul>
          </div>
          {/* <form
            className="form-inline ml-auto my-lg-0"
            onSubmit={e => this.searchByCityname(e)}
          >
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Input City Name"
              aria-label="Search"
              name="search"
              onChange={this.handleChange}
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>
          </form> */}
        </nav>
        <ErrorAlert
          error={this.props.error}
          clearErrors={this.props.clearErrors}
        />
        <SuccessAlert
          success={this.props.success}
          clearSuccess={this.props.clearSuccess}
        />
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer,
    error: state.errorReducer,
    success: state.successReducer
  };
}

export default withRouter(
  connect(mapStateToProps, {
    logMeOut,
    clearErrors,
    clearSuccess
  })(Header)
);
