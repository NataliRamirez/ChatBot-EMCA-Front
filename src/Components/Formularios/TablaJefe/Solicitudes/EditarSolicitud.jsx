import { useState } from "react"
import './ModalSolicitud.css';


export default function EditarSolicitud (){

    const [radicado, setRadicado] = useState ('');
    const [solicitud, setSolicitud] = useState('');
    const [tipo, setTipo] = useState('');
    const [estado, setEstado] = useState('');
    const [fecha, setFecha] = useState('');
    const [guardar, setGuardar] = useState('');

    return(
        <div className="contentSolicitud">
            <div className="infoSolicitud">
                <h1>Formulario de edicion de datos</h1>

                <label htmlFor="radicado">Ingrese el numero de radicado:</label>
                <input 
                    type="text" 
                    value={radicado} 
                    placeholder="Ingrese el radicado de la solicitud" 
                    onChange={(e) => setRadicado (e.target.value)}
                  />

                <label htmlFor="solicitud">Ingrese el tipo de solicitud:</label>
                <input 
                   type="text" 
                   value={solicitud} 
                   placeholder="Ingrese la el tipo de solicitud" 
                   onChange={(e) => setSolicitud (e.target.value)}
                />

                <label htmlFor="tipo">Ingrese el tipo de la solicitud:</label>
                <input 
                      type="text" 
                      value={tipo} 
                      placeholder="Ingrese el tipo de solicitud" 
                      onChange={(e) => setTipo(e.target.value)}
                />

                <label htmlFor="estado">Ingrese el estado de la solicitud:</label>
                <input 
                     type="text" 
                     value={estado} 
                     placeholder="Ingrese el estado de la solicitud" 
                     onChange={(e) =>setEstado(e.target.value)}
                  />

                <label htmlFor="fecha">Ingrese la fecha:</label>
                <input 
                   type="date" 
                   value={fecha} 
                   placeholder="Ingrese la fecha" 
                   onChange={(e) => setFecha(e.target.value)}
                />

                <button className="btn_GuardarSolicitudes" onClick={(e) => setGuardar (e.target.value)}>Guardar</button>
            </div>
        </div>
    )
}