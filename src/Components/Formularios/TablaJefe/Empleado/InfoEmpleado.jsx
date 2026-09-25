import '';
import { useState } from "react";

export default function infoEmpleado (){

    const [nombre, setNombre] = useState ('');
    const [cedula, setCedula] = useState ('');
    const [email, setEmail] = useState('');
    const [rol, setRol] = useState('');
    const [estado, setestado] = useState('');
    const [cerrar, setCerrar] = useState('');
     
    return(
        <div className="ContaineEmpleado">
            <div className="contenidoInfo">
                 <h2>Información general de los datos del empleado</h2>
                 <p>En este apartado podra hacer un Crud compledo sobre la información del usuario</p>

                  <div className="contenedor-scroll"> 
                       
                       <label htmlFor="nombre">Ingrese el nombre:</label>
                       <input 
                           type="text"  
                           value={nombre} 
                           placeholder="Ingrese su nombre" 
                           onChange={(e) => setNombre(e.target.value)} 
                        />

                        <label htmlFor="cedula">Ingrese el numero de identidad:</label>
                        <input 
                             type="text" 
                             value={cedula} 
                             placeholder="Ingrese el documento de identidad" 
                             onChange={(e) => setCedula (e.target.value)}
                        />

                        <label htmlFor="email">Ingrese el correo electronico:</label>
                        <input 
                             type="text" 
                             value={email} 
                             placeholder="Ingrese el correo electronico" 
                             onChange={(e) => setEmail (e.target.value)}
                          />

                          <label htmlFor="rol">Ingrese el rol de la persona:</label>
                          <input 
                               type="text" 
                               value={rol} 
                               placeholder="Ingrese el rol de la persona" 
                               onChange={(e) => setRol (e.target.value)}
                          />

                          <label htmlFor="estado">Ingrese el estado en el que esta la persona:</label>
                          <input 
                              type="text"  
                              value={estado} 
                              placeholder="Ingrese el estado en el que esta la persona" 
                              onChange={(e) => setEstado (e.target.value)}
                          />

                          <button className="btn_cerrarEmpleado" onClick={(e) => setCerrar (true)}>Cerrar</button>
                  </div>
            </div>
        </div>
    )
}