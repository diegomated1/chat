import './Logeo.css';
import axios from 'axios';
import {useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';

const url = "http://localhost:8080/registrarse";

function Registro(){
    const navigate = useNavigate();

    const [usuario, setUsuario] = useState('');
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [Contraseña, setContraseña] = useState('');

    const registrar = async (e)=>{
        e.preventDefault();

        var res = await axios.post(url ,{
            usuario: usuario,
            nombre: nombre,
            correo: correo,
            contraseña: Contraseña
        });

        if(res.data.error!==0){
            return alert(res.data.message);
        }
        
        navigate('/dashboard');
    }

    return(
        <div>
            <form onSubmit={registrar}>
                <div id='reg_container'>
                    <div className='container_inp' id='container_usuario'>
                        <div className='icon_inp' id='usuario_icon'/>
                        <input className='reg_inp' id='usuario_inp' placeholder='Usuario' onChange={(e)=>{setUsuario(e.target.value)}} required={true}/>
                    </div>
                    <div className='container_inp' id='container_nombre'>
                        <div className='icon_inp' id='nombre_icon'/>
                        <input className='reg_inp' id='nombre_inp' placeholder='Nombre' onChange={(e)=>{setNombre(e.target.value)}} required={true}/>
                    </div>
                    <div className='container_inp' id='container_correo'>
                        <div className='icon_inp' id='correo_icon'/>
                        <input type={'email'} className='reg_inp' id='correo_inp' placeholder='Correo' onChange={(e)=>{setCorreo(e.target.value)}} required={true}/>
                    </div>
                    <div className='container_inp' id='container_contraseña'>
                        <div className='icon_inp' id='contraseña_icon'/>
                        <input type={'password'} className='reg_inp' id='contraseña_inp' placeholder='Contraseña' onChange={(e)=>{setContraseña(e.target.value)}} required={true}/>
                    </div>
                    <button type={'submit'} id='reg_btn'>Registrarse</button><br/>
                    <Link to={'/login'}>Login</Link>
                </div>
            </form>
        </div>
    )
}

export default Registro;
