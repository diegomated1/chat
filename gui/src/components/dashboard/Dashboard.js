import useGetUsuario from '../hooks/useGetUsuario.js';

import UsuarioOptions from './UsuarioOptions.js';
import MenuServidores from './MenuServidores.js';
import MenuCanales from './MenuCanales.js';
import MenuUsuarios from './MenuUsuarios.js';
import Chat from './Chat.js';
import ZonaExtra from './ZonaExtra.js';

import './Dashboard.css';
import useLoggedStatus from '../hooks/useLoggedStatus.js';

import {Navigate} from 'react-router-dom';
import { useState } from 'react';

function Dashboard(){

    const isLogged = useLoggedStatus(localStorage.getItem('idusuario'));
    const usuario = useGetUsuario(localStorage.getItem('idusuario'));

    const [serverSelected, setServerSelected] = useState(null);
    const [canalSelected, setCanalSelected] = useState(null);

    return(
        (isLogged==null) ?
        <h1>Loading...</h1> :
        (isLogged) ? 
        <div>
            <UsuarioOptions usuario={usuario}/>
            <MenuServidores
                usuario={usuario}
                serverSelected={serverSelected} setServerSelected={setServerSelected}
                setCanalSelected={setCanalSelected}
            />
            <MenuCanales
                serverSelected={serverSelected}
                setCanalSelected={setCanalSelected}
            />
            <MenuUsuarios
                serverSelected={serverSelected}
                canalSelected={canalSelected}
            />
            <Chat
                usuario={usuario}
                serverSelected={serverSelected}
                canalSelected={canalSelected}
            />
            <ZonaExtra/>
        </div> :
        <Navigate to={'/login'}></Navigate>
    )
}

export default Dashboard;
