//custom hook
import { useState, useEffect } from "react";

export function useFetch(url) {

    const [data, setData] = useState([])//estado vacio
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [controller, setController] = useState(null)
    const [apiCargada, setApiCargada] = useState(false);

    useEffect(() => {
        const abortController = new AbortController();

        setController(abortController);
        setLoading(true);

        fetch(url, { signal: abortController.signal })//se pasa un objeto con la propiedad signal, vamos a poder controlas la peticion
            .then((response) => response.json())
            .then((data) => setData(data))
            .then(() =>
            setApiCargada(true))
            //.then((data) => setError("Ocurrio un error, por favor aguarde"))
            .catch((error) => {
                if(error.name === "AbortError"){
                    console.log("Peticion cancelada")
            }else{
                setError(error)
            }
        
        })//si hay un error se pone en error para que no se quede cargando mientras se hace la peticion.
            /**
             * el catch atrapa ese error que ha ocurrido y lo guarda en el state error
             */
            .finally(() => setLoading(false))//cuando finalice la peticion se pone en false para que no se quede cargando mientras se hace la peticion.

        return () => abortController.abort();//funcion de limpieza. se ejecute cuando el componente se desmonte.

    }, []);

    const handleCancelRequest = () => {
        if (controller) {
            controller.abort();
            setError("Se ha cancelado la peticion");//seteo el error porque manualmente lo cancelo
           
        }

    };

    return { data, loading, error, apiCargada, handleCancelRequest } //lo devuelvo como objeto ya que es mas facil cuando quiera desectructurarlo

}