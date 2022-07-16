import axios from "axios";
import { useEffect, useRef, useState } from "react";
import dt from 'date-and-time';

var url = "http://localhost:8080/servidor";

function Chat(props){

    const [canal, setCanal] = useState(null);
    const [mensajes, setMensajes] = useState(null);
    const [mensaje, setMensaje] = useState('');

    const inputMensaje = useRef();

    useEffect(()=>{
        getCanal();
    }, [props.canalSelected]);

    useEffect(()=>{
        getMensajes();
    }, [canal]);

    const getCanal = async()=>{
        var {data} = await axios.get(`${url}/${props.serverSelected}/canal/${props.canalSelected}`);
        setCanal(data.data);
    }

    const getMensajes = async()=>{
        var {data} = await axios.get(`${url}/${props.serverSelected}/canal/${props.canalSelected}/mensaje`);
        setMensajes(data.data); 
    }

    const hanldeSendMessage = async(e)=>{
        e.preventDefault();
        
        await axios.post(`${url}/${props.serverSelected}/canal/${props.canalSelected}/mensaje`,{
            mensaje: mensaje,
            id_usuario: props.usuario.id_usuario,
            fecha_envio: dt.format(new Date(), 'YYYY/MM/DD HH:mm:ss')
        });

        inputMensaje.current.value = '';
        getMensajes();
    }

    return(
        <div className="Chat">
            <div className="Chat-info">
                <div className="Chat-canal-nombre">
                    {(canal===null) ?
                        <h4>Selecciona un canal</h4> :
                        <h4>{canal.canal}</h4>
                    }
                </div>
            </div>
            <div className="Chat-chat">
                {(mensajes===null) ?
                    <p style={{margin: '0px'}}>Cargando Mensajes...</p> :
                    <div className="Chat-container-mensajes">
                        <ul className="Chat-lista-mensajes">
                            {mensajes.map(mensaje=>(
                                (mensaje.id_usuario!==props.usuario.id_usuario) ?
                                    <li key={mensaje.id_mensaje} className="Chat-mensaje-owner">
                                       <div className="Chat-mensaje-icon-usuario-container">
                                            <div className="Chat-mensaje-icon-usuario"></div>
                                        </div>
                                        <div className="Chat-mensaje-info-container">
                                            <p className="Chat-mensaje-info">
                                                <strong>{`${mensaje.id_usuario} - ${mensaje.fecha_envio}`}</strong>
                                            </p>
                                        </div>
                                        <div className="Chat-mensaje-mensaje-container">
                                            <p className="Chat-mensaje-mensaje">
                                                {mensaje.mensaje}
                                            </p>
                                        </div>
                                    </li> :
                                    <li key={mensaje.id_mensaje} className="Chat-mensaje-owner">
                                        <div className="Chat-mensaje-icon-usuario-container other">
                                            <div className="Chat-mensaje-icon-usuario other"></div>
                                        </div>
                                        <div className="Chat-mensaje-info-container other">
                                            <p className="Chat-mensaje-info other">
                                                <strong>{`${mensaje.fecha_envio} - ${mensaje.id_usuario}`}</strong>
                                            </p>
                                        </div>
                                        <div className="Chat-mensaje-mensaje-container other">
                                            <p className="Chat-mensaje-mensaje other">
                                                {mensaje.mensaje}
                                            </p>
                                        </div>
                                    </li>
                            ))}
                        </ul>
                    </div>
                }
            </div>
            <div className="Chat-barra-chat">
                <form onSubmit={hanldeSendMessage}>
                    <div className="Chat-barra-input">
                        <input ref={inputMensaje} onChange={(e)=>{setMensaje(e.target.value)}} className="Chat-input" disabled={(canal) ? false : true}></input>
                    </div>
                    <div className="Chat-enviar-mensaje">
                        <button className="Chat-btn-send" disabled={(canal) ? false : true}>Enviar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default Chat;
