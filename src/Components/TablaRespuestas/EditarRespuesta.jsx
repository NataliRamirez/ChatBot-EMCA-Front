import './Modal.css';
import { useState } from "react";


export default function CrearRespuesta({cerrar}){

     const [Nradicado, setNradicado] = useState("");
     const [titulo, setTitulo] = useState("");
     const [nombre, setNombre] = useState("");
     const [telefono, setTelefono] = useState("");
     const [telefonoEmpresa, setTelefonoEmpresa] = useState("");
     const [tipoRespuesta, setTipoRespuesta] = useState("");
     const [estados, setEstados] = useState("");
     const [descripcion, setDescripcion] = useState("");
     const [fechaInicio, setFechaInicio] = useState("");
     const [fechaFinal, setFechaFinal] = useState("");
     

      const TablascrearRespuestas = async () => {
         try {
        const res = await fetch("http://127.0.0.1:4000/v1/respuestas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": "EmcaSecret2026"
            },
            body: JSON.stringify({
                Nradicado,
                titulo,
                nombre,
                telefono,
                telefonoEmpresa,
                tipoRespuesta,
                estados,
                descripcion,
                fechaInicio,
                fechaFinal
            })
        });

        const data = await res.json();

        if (res.ok) {
            alert(data.mensaje);     
            cerrar();                
        } else {
            alert(data.mensaje);
        }

    } catch (error) {
        console.log(error);
        alert("Error de conexión con el backend");
    }
};
    return(
           <div className='overlay'>
             <div className='Modal'>
                  <h2>Panel De Creación Respuesta</h2>
                
                    <label htmlFor="Nradicado">Ingrese el numero de radicado:</label>
                   <input type="text" value={Nradicado} onChange={(e) => setNradicado(e.target.value)}/>
                  
                  <label htmlFor="Titulo">Ingrese El titulo de la respuesta:</label>
                  <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)}/>

                  <label htmlFor="nombre">Ingrese el nombre del usuario</label>
                  <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)}/>

                  <label htmlFor="Telefono">Ingrese el numero de telefono del usuario:</label>
                  <input type="text"  value={telefono} onChange={(e) => setTelefono(e.target.value)}/>
                  
                   <label htmlFor="TelefonoEmpresa">Ingrese el numero de la empresa:</label>
                   <input type="text" value={telefonoEmpresa} onChange={(e) => setTelefonoEmpresa(e.target.value)}/>

                   <label htmlFor="tipoRespuesta">Ingrese el tipo de la respuesta:</label>
                   <input type="text" value={tipoRespuesta} onChange={(e) => setTipoRespuesta(e.target.value)}/>


                    <label htmlFor="estado">Seleccione un estado</label>
                    <select
                        value={estados}
                        onChange={(e) => setEstados(e.target.value)}
                    >
                        <option value="">Seleccione un estados</option>
                        <option value="Pendiente">Pendiente</option>
                        <option value="En proceso">En proceso</option>
                        <option value="Finalizada">Finalizada</option>
                    </select>


                     <label htmlFor="descripcion">Ingrese la descripcion</label>
                    <textarea
                        placeholder="Descripción"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                    />

                    <label htmlFor="fechaInicio">Ingrese la fecha Inicial</label>
                    <input type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} />
                   
                    <label htmlFor="fechaFinal">Ingrese la fecha final</label>
                    <input type="date" value={fechaFinal} onChange={(e) => setFechaFinal(e.target.value)}/>
                  
                  <div className='btn_botones'>
                       <button className='btn_Guardar' onClick={TablascrearRespuestas}>Guardar</button>
                       <button className='btn_Cerrar' onClick={cerrar}>Cerrar</button>
                  </div>
             </div>
           </div>
    )
}