import { useEffect, useState } from "react";
import axios from "axios";

const url = "http://localhost:8080/usuario";

function useGetUsuario(idusario){
    const [usuario, setUsuario] = useState({});

    useEffect(()=>{
        handleGetUsuario(idusario);
    }, []);

    const handleGetUsuario = async (idusario)=>{
        var {data} = await axios.get(`${url}/${idusario}`);
        setUsuario(data.usuarios);
    }

    return usuario;
}

export default useGetUsuario;