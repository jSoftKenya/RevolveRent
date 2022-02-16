import React, { Component } from "react";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";
import store from "./store";

import Header from "./components/header/Header";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import UserPage from "./components/userpage/UserPage";
import MainPage from "./components/mainpage/MainPage";
import SelectedAdvert from "./components/selectedadvert/SelectedAdvert";
import FavoriteAdverts from "./components/userpage/FavoriteAdverts";
import MyAdverts from "./components/userpage/MyAdverts";
import MyAppointments from "./components/appointment/MyAppointments";
import SearchedBy from "./components/mainpage/SearchedBy";



// Switch
// import Router from './Switch';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// components
import ScrollToTop from './components_mrk/ScrollToTop';
import { BaseOptionChartStyle } from './components_mrk/charts/BaseOptionChart';


import "bootstrap/dist/css/bootstrap.css";
// import MpesaPay from "./components/addnewadvert/mpesa/MpesaPay";

import CheckoutForm from "./components/pay/CheckoutForm";
import './assets/boxicons-2.0.7/css/boxicons.min.css'
import './assets/css/grid.css'
import './assets/css/theme.css'
import './assets/css/index.css'
import ContactUs from "./components/contactus/ContactUs";
import ContactUsList from "./components/contactus/ContactUsList";
import DashboardApp from "./pages/DashboardApp";
import DashboardLayout from "./layouts/dashboard";




import { createStore } from 'redux'

class App extends Component {
  // render() {
  //   return (
  //     <Provider store={store}>
  //        {/* <Header /> */}
  //       <ThemeConfig>
         
  //         <ScrollToTop />
  //         <GlobalStyles />
  //         <BaseOptionChartStyle />
  //         <Router />
  //       </ThemeConfig>
  //     </Provider>
  //   );
  // }

  render() {
    return (
      <Provider store={store}>
         {/* <ThemeConfig>
         <ScrollToTop />
         <GlobalStyles />
         <BaseOptionChartStyle /> */}
         <Header/>
        <Switch>
          <Route path="/myadverts" component={MyAdverts} />
          <Route path="/favorites" component={FavoriteAdverts} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/user" component={UserPage} />
          <Route path="/advert/:id" component={SelectedAdvert} />
          <Route path="/appointment" exact component={MyAppointments} />
          <Route path="/search/:keyword/:value" component={SearchedBy} />
          <Route path="/" component={MainPage} />
          {/* <Route path="/admin" exact component={Layout} /> */}
          {/* <Route path="/mpesa_pay" exact component={MpesaPay} /> */}
          <Route path="/stripe_pay" exact component={CheckoutForm} />
          <Route path="/contact" component={ContactUs} />
          <Route path="/inbox" component={ContactUsList} />
          <Route path="/dashboard" component={DashboardLayout} />
          
        </Switch>
        {/* </ThemeConfig> */}
      </Provider>
    );
  }



}

export default App;
