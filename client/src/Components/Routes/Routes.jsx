import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "../../Pages/Home/Home";
import SignIn from "../../Pages/SignIn/SignIn";
import SignUp from "../../Pages/SignUp/SignUp";
import AuthLayout from "../LayOut/AuthLayout";
import HomeLayout from "../LayOut/HomeLayout";
import JobDetails from "../../Pages/JobDetails/JobDetails";


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout/>,
    children:[
     {
          path:"/",
          element:<Home/>,
     },
     {
          path:"/jobDetails/:id",
          element:<JobDetails/>,
     },
     
    ]
  },
  {
     path:"/",
     element:<AuthLayout/>,
     children:[
          {
            path:"/signIn",
            element:<SignIn/>
          },
          {
            path:"/signUp",
            element:<SignUp/>
          },
     ]
  }
]);

export default router;