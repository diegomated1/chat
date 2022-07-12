import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import Registro from './logeo/Registro.js';
import Login from './logeo/Login.js';
import Dashboard from './dashboard/Dashboard.js';

import useLoggedStatus from './logeo/useLoggedStatus.js';

function App() {
  
  const isLogged = useLoggedStatus(1);

  return (
    <div className="App">
      
      <BrowserRouter>
        <Routes>
          
          <Route exact path='/' element={(isLogged===null) ? <p>Loading...</p> : (isLogged) ? <Navigate to={'/dashboard'}/> : <Navigate to={'/login'}/>}/>

          <Route path='registrarse' element={(isLogged) ? <Navigate to={'/dashboard'}/> : <Registro/>}/>
          <Route path='login' element={(isLogged) ? <Navigate to={'/dashboard'}/> : <Login/>}/>

          <Route path='dashboard' element={<Dashboard/>}/>

          <Route path="*" element={<div><h1>404</h1></div>}/>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
