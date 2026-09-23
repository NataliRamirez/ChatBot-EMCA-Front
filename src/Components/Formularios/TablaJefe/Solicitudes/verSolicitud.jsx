import { useState } from "react";
import './ModalSolicitud.css';

export default function EditarSolicitud (campo, cerrar){

    const [cerrar, setCerrar] = useState('');
   
    return(
        <div className="contentSolicitud">
            <div className="infoSolicitud">
                <h1>Formulario de edicion de datos</h1>
                 
                 <div className="solicitud">
                    <strong>Radicado:</strong>
                    <p>{campo.radicado}</p>
                 </div>

                 <div className="solicitud">
                    <strong>Tipo:</strong>
                    <p>{campo.tipo}</p>
                 </div>

                  <div className="solicitud">
                    <strong>Solicitud:</strong>
                    <p>{campo.solicitud}</p>
                  </div>

                  <div className="solicitud">
                    <strong>Estado:</strong>
                    <p>{campo.estado}</p>
                  </div>

                  <div className="solicitud">
                    <strong>Fecha:</strong>
                    <p>{campo.fecha}</p>
                  </div>
               
                <button className="btn_CerrarSolicitudes" onClick={(e) => setCerrar (e.target.value)}>Cerrar</button>
            </div>
        </div>
    )
}