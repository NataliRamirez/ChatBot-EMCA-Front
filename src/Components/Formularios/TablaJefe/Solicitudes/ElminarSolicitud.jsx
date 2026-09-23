import '';
import { useState } from "react";


export default function EliminarSolicitud(){

    const [eliminar, setEliminar] = useState('');
    const [cerrar, setCerrar] = useState('');

    return(
        <div className="ContentEliminarSolicitud">
            <div className="infoEliminarSolicitud">
                <h2>Eliminar contenido de solicitud</h2>
                 <p>Una vez eliminada la solicitud queda eliminada del historial y por ese motivo se recomienda imprimir o guardar antes de eliminar</p>

                 <button className="btn_eliminarSolicitudes" onClick={(e) => setEliminar}>Si</button>
                 <button className="btn_cancelarSolicitudes" onClick={(e) => setCerrar(true)}>No</button>
                
            </div>
        </div>
    )
}