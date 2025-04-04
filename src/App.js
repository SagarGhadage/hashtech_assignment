import logo from './logo.svg';
import './App.css';
import Form from './components/Form/Form';
import Table from './components/Table/Table';
import { Button } from '@mui/material';
import { Routes } from "react-router-dom";
import { Route, BrowserRouter } from "react-router-dom";
import { useEffect } from 'react';
import { useState } from 'react';
function App() {
  // const history = useNavigation();
  return (
    <div className="App">
      <header className="App-header">
        <h1>Form Submission and data Representation</h1>
      </header>

      <BrowserRouter>
      <Routes>
       <Route path='/' element={<Table/>}/>
       <Route path='/form' element={<Form/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
