import axios from "axios";
import { useEffect, useRef, useState } from "react";

var url = "http://localhost:8080/servidor/usuario";
var url_server = "http://localhost:8080/servidor";

function MenuServidores(props){

    const [servidores, setServidores] = useState([]);

    const [addServerDisable, setAddServerDisable] = useState(true);
    const btnAddServer = useRef();

    const MenuAddServer = useRef();

    const [addServidorNombre, setAddServidorNombre] = useState('');

    useEffect(()=>{
        const close = (e)=>{
            if((e.path[0] !== btnAddServer.current) && (!e.path.includes(MenuAddServer.current))){
                setAddServerDisable(true);
            }
        }
        document.body.addEventListener('click', close);
        return () => {
            document.body.removeEventListener('click', close);
        }
    }, [addServerDisable]);

    useEffect(()=>{
        getServidores(props.usuario.id_usuario);
    }, []);

    const getServidores = async(idusuario)=>{
        var {data} = await axios.get(`${url}/${idusuario}`);
        setServidores(data.servidores);
    }

    const handleSetServerSelected = (e)=>{
        props.setServerSelected(e.target.id);
    }

    const handleAddServer = async(e)=>{
        e.preventDefault();

        var {data} = await axios.post(url_server, {
            servidor: addServidorNombre,
            owner_servidor: props.usuario.id_usuario
        });

        await axios.post(`${url_server}/${data.data.id_servidor}/usuario`,{
            id_usuario: props.usuario.id_usuario
        });
        setAddServerDisable(true);
        props.setServerSelected(data.data.id_servidor);
        props.setCanalSelected(null);
        getServidores(props.usuario.id_usuario);
    }

    return(
        <div className="MenuServidores">
            <div className="MenuServidores-servidores">
                <ul className="MenuServidores-lista-servidores">
                    {servidores.map(servidor=>(
                        <li key={servidor.id_servidor} className="MenuServidores-icon-servidores">
                            <button onClick={handleSetServerSelected} className="servidor-icon" id={servidor.id_servidor}></button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="MenuServidores-add-servidor">
                <button ref={btnAddServer} onClick={()=>{setAddServerDisable(!addServerDisable)}} className="btn-add-servidor">+</button>
            </div>
            {(addServerDisable) ? 
                <></> :
                <div ref={MenuAddServer} className="MenuServidores-add-menu">
                    <form onSubmit={handleAddServer}>
                        <div className="MenuServidores-add-input-container">
                            <input onChange={(e)=>{setAddServidorNombre(e.target.value)}} className="MenuServidores-add-input" placeholder="Nombre Servidor"></input>
                        </div>
                        <div className="MenuServidores-add-add-container">
                            <button type={'submit'} className="MenuServidores-add-add">Crear</button>
                        </div>
                    </form>
                </div>
            }
        </div>
    )
}

export default MenuServidores;

