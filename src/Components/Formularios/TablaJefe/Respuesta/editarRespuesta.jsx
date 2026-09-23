import '';
import { useState } from "react";

export default function editarRespuesta(){

    const [radicado, setRadicado] = useState('');
    const [solicitud, setSolicitud] = useState('');
    const [tipo, setTipo] = useState('');
    const [estado, setEstado] = useState('');
    const [fecha, setFecha] = useState('');
    const [guardar, setGuardar] = useState('');


    return(
        <div className="ContainerRespuesta">
            <div className="Respuesta">
                <h2>Editarcontenido de la respuesta</h2>

                <label htmlFor="radicado">Ingrese el radicado de respuesta:</label>
                <input 
                     type="text" 
                     value={radicado} 
                     placeholder="Ingrese el radicado" 
                     onChange={(e) =>setRadica (e.target.value)}
                />

                <label htmlFor="solicitud">Ingrese la solicitud del ciudadano:</label>
                <input 
                    type="text" 
                    value={solicitud} 
                    placeholder="Ingrese la solicitud" 
                    onChange={(e) => setSolicitud (e.target.value)}
                  />


                  <label htmlFor="tipo">Ingrese el tipo de Respuesta:</label>
                  <input 
                       type="text" 
                       value={tipo} 
                       placeholder="Ingrese el tipo de respuesta" 
                       onChange={(e) => setTipo (e.target.value)}
                    />

                    <label htmlFor="estado">Ingrese el estado de la respuesta:</label>
                    <input 
                         type="text" 
                         value={estado} 
                         placeholder="Ingrese el estado de la respuesta" 
                         onChange={(e) => setEstado (e.target.value)}
                     />

                     <label htmlFor="fecha">Ingrese la fecha actual:</label>
                     <input 
                          type="date" 
                          value={fecha} 
                          placeholder="Ingrese la fecha" 
                          onChange={(e) => setFecha (e.target.value)}
                    />

                    <button className="btn_guardarInfo" onClick={(e) => setGuardar (e)}>Guardar</button>
            </div>
        </div>
    )
}