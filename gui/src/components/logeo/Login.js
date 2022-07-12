import './Logeo.css';
import axios from 'axios';
import {useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';

const url = "http://localhost:8080/login";


function Login(){
    const navigate = useNavigate();

    const [credencial, setCredencial] = useState('');
    const [contraseña, setContraseña] = useState('');

    const login = async (e)=>{
        e.preventDefault();
        
        var {data} = await axios.post(url, {
            credencial: credencial,
            contraseña: contraseña
        });

        if(data.error!==0){
            return alert(data.message);
        }

        navigate('/dashboard');
    }

    return(
        <div>
            <form onSubmit={login}>
                <div id='log_container'>
                    <div className='container_inp' id='container_usuario'>
                        <div className='icon_inp' id='usuario_icon'/>
                        <input className='reg_inp' id='usuario_inp' placeholder='Usuario' onChange={(e)=>{setCredencial(e.target.value)}} required={true}/>
                    </div>
                    <div className='container_inp' id='container_contraseña'>
                        <div className='icon_inp' id='contraseña_icon'/>
                        <input type={'password'} className='reg_inp' id='contraseña_inp' placeholder='Contraseña' onChange={(e)=>{setContraseña(e.target.value)}} required={true}/>
                    </div>
                    <button type={'submit'} id='reg_btn'>Login</button><br/>
                    <Link to={'/registrarse'}>Registrarse</Link>
                </div>
            </form>
        </div>
    )
}

export default Login;