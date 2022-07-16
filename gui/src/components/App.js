import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import Registro from './logeo/Registro.js';
import Login from './logeo/Login.js';
import Dashboard from './dashboard/Dashboard.js';

import useLoggedStatus from './hooks/useLoggedStatus.js';

function App() {
  
  const isLogged = useLoggedStatus(localStorage.getItem('idusuario'));

  return (
    <div className="App">
      
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={(isLogged) ? <Navigate to={'/dashboard'}/> : <Navigate to={'/login'}/>}/>

          <Route path='registrarse' element={<Registro></Registro>}/>
          <Route path='login' element={<Login></Login>}/>

          <Route path='dashboard' element={<Dashboard></Dashboard>}/>

          <Route path="*" element={<div><h1>404</h1></div>}/>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
