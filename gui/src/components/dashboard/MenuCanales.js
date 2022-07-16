import axios from "axios";
import { useEffect, useState, useRef } from "react";


var url = "http://localhost:8080/servidor";

function MenuCanales(props){

    const [canales, setCanales] = useState(null);

    const [addCanalDisable, setAddCanalDisable] = useState(true);
    const btnAddCanal = useRef();

    const MenuAddCanal = useRef();

    const [addServidorNombre, setAddServidorNombre] = useState('');

    useEffect(()=>{
        const close = (e)=>{
            if((e.path[0] !== btnAddCanal.current) && (!e.path.includes(MenuAddCanal.current))){
                setAddCanalDisable(true);
            }
        }
        document.body.addEventListener('click', close);
        return () => {
            document.body.removeEventListener('click', close);
        }
    }, [addCanalDisable]);

    useEffect(()=>{
        getCanales();
    }, [props.serverSelected]);

    const getCanales = async()=>{
        if(props.serverSelected===null){
            return
        }else{
            var {data} = await axios.get(`${url}/${props.serverSelected}/canal`);
            setCanales(data.data);
        }
    }

    const hanldeSetCanalSelected = (e)=>{
        props.setCanalSelected(e.target.id);
    }
    
    const handleAddCanal = async(e)=>{
        e.preventDefault();

        var {data} = await axios.post(`${url}/${props.serverSelected}/canal`, {
            canal: addServidorNombre
        });

        props.setCanalSelected(data.data.id_canal);
        getCanales();
    }

    return(
        <div className="MenuCanales">
            <div className="MenuCanales-canales">
                <ul className="MenuCanales-lista-canales">
                    {(canales===null) ? 
                        <li>Selecciona un servidor</li> : 
                        canales.map(canal=>(
                            <li key={canal.id_canal} className="MenuCanales-canal-item">
                                <button onClick={hanldeSetCanalSelected} className="btn-set-selected-canal" id={canal.id_canal}>
                                    {canal.canal}
                                </button>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className="MenuCanales-add-canal">
                <button ref={btnAddCanal} onClick={(e)=>{setAddCanalDisable(!addCanalDisable)}} className="btn-add-canal" disabled={(canales===null) ? true : false}>+</button>
            </div>
            <div className="MenuCanales-server-options">
                <button className="btn-server-options" disabled={(canales===null) ? true : false}>Menu</button>
            </div>
            {(addCanalDisable) ? 
                <></> :
                <div ref={MenuAddCanal} className="MenuServidores-add-menu">
                    <form onSubmit={handleAddCanal}>
                        <div className="MenuServidores-add-input-container">
                            <input onChange={(e)=>{setAddServidorNombre(e.target.value)}} className="MenuServidores-add-input" placeholder="Nombre Canal"></input>
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


export default MenuCanales;