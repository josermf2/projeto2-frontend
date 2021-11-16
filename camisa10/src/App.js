import React, { useState, useEffect } from 'react';
import Navbar from "./components/Navbar/Navbar";
import {Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Tournament from "./pages/Tournament/Tournament";
import Favorites from "./pages/Favorites/Favorites";
import Cadastro from "./pages/Cadastro/Cadastro";


function App() {
  const [userName, setUserName] = useState('');

  const handleCallback = (childData) => {
    setUserName(childData)
  }

  return (
    <>
        <Navbar  userName={handleCallback}/>
        <Switch>
          <Route path='/' exact >
            <Home userName={userName}/>
          </Route>
          <Route path='/tournament'>
            <Tournament />
          </Route>
          <Route path='/favorites' exact >
            <Favorites userName={userName}/>
          </Route>
          <Route path='/cadastro' exact >
            <Cadastro />
          </Route>
        </Switch>
    </>
   );
}

  export default App;