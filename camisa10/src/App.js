import React from "react";
import Navbar from "./components/Navbar/Navbar";
import {Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Tournament from "./pages/Tournament/Tournament";
import Favorites from "./pages/Favorites/Favorites";


function App() {
  return (
    <>
        <Navbar />
        <Switch>
          <Route path='/' exact >
            <Home />
          </Route>
          <Route path='/tournament'>
            <Tournament />
          </Route>
          <Route path='/favorites' exact >
            <Favorites />
          </Route>
        </Switch>
    </>
   );
}

  export default App;