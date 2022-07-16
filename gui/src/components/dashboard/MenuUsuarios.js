import axios from "axios";
import { useEffect, useRef, useState } from "react";

var url = "http://localhost:8080/servidor";

function MenuUsuarios(props){

    const [usuarios, setUsuarios] = useState([]);

    const [usuariosConectados, setUsuariosConectados] = useState([]);
    const [usuariosDesconectados, setusuariosDesconectados] = useState([]);

    const ulUsuariosConectados = useRef();
    const ulUsuariosDesconectados = useRef();

    useEffect(()=>{
        getUsuarios();
    }, [props.serverSelected]);

    useEffect(()=>{
        handleConnectedUsers(usuarios);
    }, [usuarios])

    const getUsuarios = async()=>{
        if(props.serverSelected===null){
            return
        }
        var {data} = await axios.get(`${url}/${props.serverSelected}/usuario`);
        setUsuarios(data.usuarios);
    }

    const handleConnectedUsers = (usuarios)=>{
        if(props.serverSelected===null){
            return
        }
        var conectados = [];
        var desconectados = [];
        for(let i=0;i<usuarios.length;i++){
            if(usuarios[i].logged===1){
                conectados.push(usuarios[i]);
            }else{
                desconectados.push(usuarios[i]);
            }
        }
        var cantConectados = 40 + (40*conectados.length);
        ulUsuariosConectados.current.style.height = `${cantConectados}px`;
        ulUsuariosDesconectados.current.style.height = `calc(100% - ${cantConectados}px)`;
        setUsuariosConectados([...conectados]);
        setusuariosDesconectados([...desconectados]);
    }

    const handleUserSelectedList = ()=>{

    }

    return(
        <div className="MenuUsuarios">
            {(props.serverSelected===null) ? 
                <p>Selecciona un servidor</p> :
                <div className="MenuUsuarios-usuarios">
                    <div ref={ulUsuariosConectados} className="MenuUsuarios-usuarios-container">
                        <div className="MenuUsuarios-usuarios-title">
                            <h4 className="MenuUsuarios-titte-h4">Conectados</h4>
                        </div>
                        <div className="MenuUsuarios-lista-usuarios-container">
                            <ul className="MenuUsuarios-lista-usuarios">
                                {usuariosConectados.map(usuario=>(
                                    <li key={usuario.id_usuario} className="MenuUsuarios-usuario-item">
                                        <div onClick={handleUserSelectedList} className="MenuUsuarios-usuario">
                                            <div className="MenuUsuarios-usuario-icon-container">
                                                <div className="MenuUsuarios-usuario-icon"></div>
                                            </div>
                                            <div className="MenuUsuarios-usuario-nombre-container">
                                                <div className="MenuUsuarios-usuario-nombre">{usuario.nombre}</div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                                
                            </ul>
                        </div>
                    </div>
                    <div ref={ulUsuariosDesconectados} className="MenuUsuarios-usuarios-container">
                    <div className="MenuUsuarios-usuarios-title">
                            <h4 className="MenuUsuarios-titte-h4">Desconectados</h4>
                        </div>
                        <div className="MenuUsuarios-lista-usuarios-container">
                            <ul className="MenuUsuarios-lista-usuarios">
                                {usuariosDesconectados.map(usuario=>(
                                    <li key={usuario.id_usuario} className="MenuUsuarios-usuario-item">
                                        <div onClick={handleUserSelectedList} className="MenuUsuarios-usuario">
                                            <div className="MenuUsuarios-usuario-icon-container">
                                                <div className="MenuUsuarios-usuario-icon"></div>
                                            </div>
                                            <div className="MenuUsuarios-usuario-nombre-container">
                                                <div className="MenuUsuarios-usuario-nombre">{usuario.nombre}</div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}


export default MenuUsuarios;

