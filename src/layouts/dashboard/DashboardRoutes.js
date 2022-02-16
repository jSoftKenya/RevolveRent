import React from 'react'

import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";

import Register from "../../components/register/Register";
import UserPage from "../../components/userpage/UserPage";
import MainPage from "../../components/mainpage/MainPage";
import SelectedAdvert from "../../components/selectedadvert/SelectedAdvert";
import FavoriteAdverts from "../../components/userpage/FavoriteAdverts";
import MyAdverts from "../../components/userpage/MyAdverts";
import MyAppointments from "../../components/appointment/MyAppointments";
import SearchedBy from "../../components/mainpage/SearchedBy";


// import CheckoutForm from "../../components/pay/CheckoutForm";
import ContactUs from "../../components/contactus/ContactUs";
import ContactUsList from "../../components/contactus/ContactUsList";

// import DashboardLayout from './layouts/dashboard';


const DashboardRoutes = () => {
    return (
        <Switch>
         <Route path="/dashboard//myadverts" component={MyAdverts} />
          <Route path="/dashboard/favorites" component={FavoriteAdverts} />
          <Route path="/dashboard/user" component={UserPage} />
          <Route path="/dashboard/advert/:id" component={SelectedAdvert} />
          <Route path="/dashboard/appointment" exact component={MyAppointments} />
          <Route path="/dashboard/search/:keyword/:value" component={SearchedBy} />
          {/* <Route path="/" component={Dashboard} /> */}
          {/* <Route path="/admin" exact component={Layout} /> */}
          {/* <Route path="/mpesa_pay" exact component={MpesaPay} /> */}
          {/* <Route path="/stripe_pay" exact component={CheckoutForm} /> */}
          <Route path="/dashboard/contact" component={ContactUs} />
          <Route path="/dashboard/inbox" component={ContactUsList} />
          {/* <Route path="/dashboard" component={DashboardLayout} /> */}

        </Switch>
    )
}

export default DashboardRoutes
