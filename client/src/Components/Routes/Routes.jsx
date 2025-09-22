import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "../../Pages/Home/Home";
import SignIn from "../../Pages/SignIn/SignIn";
import SignUp from "../../Pages/SignUp/SignUp";
import AuthLayout from "../LayOut/AuthLayout";
import HomeLayout from "../LayOut/HomeLayout";
import JobDetails from "../../Pages/JobDetails/JobDetails";
import Error from "../../Pages/ErrorPage/Error";
import AddJob from "../../Pages/AddJob/AddJob";
import MyPostedJob from "../../Pages/MyPostedJOb/MyPostedJob";
import MyBids from "../../Pages/MyBids/MyBids";


const router = createBrowserRouter([
  {
    path: "/",
    errorElement:<Error></Error>,
    element: <HomeLayout/>,
    children:[
     {
          path:"/",
          errorElement:<Error></Error>,
          element:<Home/>,
     },
     {
          path:"/jobDetails/:id",
          errorElement:<Error></Error>,
          element:<JobDetails/>,
          loader:({params}) =>fetch(`${import.meta.env.VITE_api}/job/${params.id}`)
     },
     {
      path:"/add-job",
      errorElement:<Error></Error>,
      element:<AddJob/>
     },
     {
      path:"/my-posted-job",
      errorElement:<Error></Error>,
      element:<MyPostedJob/>
     },
     {
      path:" ",
      errorElement:<Error></Error>,
      element:<MyBids/>
     },
     
    ]
  },
  {
     path:"/",
     errorElement:<Error></Error>,
     element:<AuthLayout/>,
     children:[
          {
            path:"/signIn",
            errorElement:<Error></Error>,
            element:<SignIn/>
          },
          {
            path:"/signUp",
            errorElement:<Error></Error>,
            element:<SignUp/>
          },
     ]
  }
]);

export default router;