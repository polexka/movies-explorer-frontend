import React from "react";
import { Route, Redirect } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const ProtectedRoute = ({ component: Component, loggedIn, mainSection, ...props }) => {
  return (
    <Route>
      {() =>
        loggedIn ? (
          <>
            <Header loggedIn={loggedIn} />
            <Component {...props} />
            {mainSection ? (<Footer />) : (<></>)}
          </>
        ) :
          <Redirect to="/" />
      }
    </Route>
  );
};

export default ProtectedRoute;