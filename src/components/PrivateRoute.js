import React, { useEffect } from "react";
import { Navigate, Route } from "react-router-dom";
import { useLRAuth } from "loginradius-react";
import AdminPage from "./adminpage";
import HomePage from "./homePage";
import Loading from "./loading";

 const PrivateRoute = ({ action}) => {

    const { isLoading, isAuthenticated, user } =
  useLRAuth();

  console.log(useLRAuth(),user);
  let role ;
    if(!isLoading){role = user?.Roles.includes(action)}

  console.log(role,action);
   if(!isLoading){ return (
        role && isAuthenticated ? action === "Admin" ? <AdminPage/> : <HomePage /> : <Navigate to="/intro" />
    );}
    else if(Loading){
     return <Loading />
    }
};



export default PrivateRoute;