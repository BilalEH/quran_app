import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Sowar_Home from './components/sowar/index';
import Header from './components/Header';
import Live_Home from './components/live/index';
import Radio_Home from './components/radio/index';


function App() {
  return (
    <>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/"  element={<Sowar_Home/>}/>
          <Route path="/Live"  element={<Live_Home/>}/>
          <Route path="/Radio"  element={<Radio_Home/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
