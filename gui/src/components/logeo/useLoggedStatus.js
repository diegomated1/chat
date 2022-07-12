import {useState, useEffect} from 'react';
import axios from 'axios';

const url = "http://localhost:8080/usuario";

function useLoggedStatus(idusuario){
    const [isLogged, setIsLogged] = useState(null);

    useEffect(()=>{
        getStatus(idusuario);
    });

    const getStatus = async(idusuario)=>{
        var {data} = await axios.get(`${url}/${idusuario}`);
        setIsLogged(data.usuarios.logged);
    }

    return isLogged
}

export default useLoggedStatus;

