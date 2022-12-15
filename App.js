import React from "react";
import Header from "./components/Header";
import LogIn from "./components/LogIn";
import Update from "./components/Update";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Trips from "./components/Trips";

function App(){
   return (
<BrowserRouter>
    <Routes>
      <Route path = '/' element = {<Header/>}> </Route>
      <Route path = '/LogIn' element = {<LogIn/>}> </Route>
      <Route path = '/Trips' element = {<Trips/>}> </Route>
      <Route path = '/Update' element = {<Update/>}> </Route>
    </Routes>
</BrowserRouter>
 );
  
}

export default App
