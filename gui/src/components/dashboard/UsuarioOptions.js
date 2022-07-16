
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const url = "http://localhost:8080/usuario";

function UsuarioOptions(props){
    const navigate = useNavigate();

    const [opcionesDisable, setOpscionesDisable] = useState(true);
    const btnOptions = useRef();

    useEffect(()=>{
        const close = (e)=>{
            if(e.path[0] !== btnOptions.current){
                setOpscionesDisable(true);
            }
        }
        document.body.addEventListener('click', close);
        return () => {
            document.body.removeEventListener('click', close);
        }
    }, [opcionesDisable]);

    const cerrarSesion = async()=>{
        await axios.put(`${url}/${props.usuario.id_usuario}`, {
            logged: false
        });
        navigate('/login');
    }

    return(
        <div className="UsuarioOptions">
            <div className="UsuarioOptions-icon">
                <div className="Usuario-icon">

                </div>
            </div>
            <div className="UsuarioOptions-info-usuario">
                <div className='UsuarioOptions-nombre'>
                    <div className='Usuario-nombre'>
                        {props.usuario.nombre}
                    </div>
                </div>
                <div className='UsuarioOptions-usuario'>
                    <div className='Usuario-usuario'>
                        {`@${props.usuario.usuario}`}
                    </div>
                </div>
            </div>
            <div className='UsuarioOptions-opciones'>
                <div className='Usuario-opciones'>
                    <button ref={btnOptions} onClick={()=>{setOpscionesDisable(!opcionesDisable)}} className='btn-Usuario-opciones'/>
                </div>
            </div>

            {(opcionesDisable) 
                ? <></>
                : 
                <div className='UsuarioOptions-menu-opciones'>
                    <div className='menu-opciones-opciones'>

                    </div>
                    <hr className='menu-opciones-hr'/>
                    <div className='menu-opciones-cerrar-sesion'>
                        <button onClick={()=>{cerrarSesion()}} className='btn-cerrar-sesion'>Cerrar Sesión</button>
                    </div>
                </div>
            }
        </div>
    )
}

export default UsuarioOptions;
