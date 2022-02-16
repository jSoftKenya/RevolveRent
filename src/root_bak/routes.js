import React from 'react';

import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import Blog from './pages/Blog';
import User from './pages/User';
import NotFound from './pages/Page404';
 


//Revolve Rent
import Header from "./components/header/Header";
// import Login from "./components/login/Login";
// import Register from "./components/register/Register";
import UserPage from "./components/userpage/UserPage";
import MainPage from "./components/mainpage/MainPage";
import SelectedAdvert from "./components/selectedadvert/SelectedAdvert";
import FavoriteAdverts from "./components/userpage/FavoriteAdverts";
import MyAdverts from "./components/userpage/MyAdverts";
import MyAppointments from "./components/appointment/MyAppointments";
import SearchedBy from "./components/mainpage/SearchedBy";

import ContactUs from "./components/contactus/ContactUs";
import ContactUsList from "./components/contactus/ContactUsList";

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to='dashboard/app'   replace /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'users', element: <User /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> },
		    { path:  'myadverts' ,  element: <MyAdverts /> },
        { path:  'favorites' ,  element: <FavoriteAdverts />},
        { path:  'login' ,  element: <Login/>},
        { path:  'register' ,  element: <Register />},
        { path:  'user' ,  element: <UserPage /> },
        { path:  'advert/:id' ,  element: <SelectedAdvert /> },
        { path:  'appointment' ,   element: <MyAppointments/> },
        { path:  'search/:keyword/:value' ,  element: <SearchedBy /> },
        { path:  'about' ,   element: <MainPage /> },
        { path:  'contactus' ,   element: <ContactUs/> },
        { path:  'inbox' ,   element: <ContactUsList/> },
        { path:  'featured' ,   element: <MainPage/> },
        { path:  'faq' ,   element: <MainPage/> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        // { path: '/', element: <Navigate to='dashboard'/> },
        { path:  '/' ,   element: <MainPage/> },
        { path: '*', element: <Navigate to='404'/> }
      ]
    },
    { path: '*', element: <Navigate to='404'  replace /> }
  ]);
}



        
