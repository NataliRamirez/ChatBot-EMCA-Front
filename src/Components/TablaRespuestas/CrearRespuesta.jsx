import './Modal.css';
import { useState } from "react";

export default function CrearRespuesta({ cerrar, onExito }) {
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
                alert(data.mensaje || "Respuesta creada exitosamente");
                if (onExito) onExito(); 
                cerrar();
            } else {
                alert(data.mensaje || "Error al guardar");
            }
        } catch (error) {
            console.error(error);
            alert("Error de conexión con el backend");
        }
    };

    return (
        <div className='overlay'>
            <div className='Modal'>
                <h2>Panel De Creación Respuesta</h2>

                <label htmlFor="Nradicado">Ingrese el número de radicado:</label>
                <input id="Nradicado" type="text" value={Nradicado} onChange={(e) => setNradicado(e.target.value)} />

                <label htmlFor="Titulo">Ingrese el título de la respuesta:</label>
                <input id="Titulo" type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} />

                <label htmlFor="nombre">Ingrese el nombre del usuario:</label>
                <input id="nombre" type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />

                <label htmlFor="Telefono">Ingrese el número de teléfono del usuario:</label>
                <input id="Telefono" type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} />

                <label htmlFor="TelefonoEmpresa">Ingrese el número de la empresa:</label>
                <input id="TelefonoEmpresa" type="text" value={telefonoEmpresa} onChange={(e) => setTelefonoEmpresa(e.target.value)} />

                <label htmlFor="tipoRespuesta">Ingrese el tipo de la respuesta:</label>
                <input id="tipoRespuesta" type="text" value={tipoRespuesta} onChange={(e) => setTipoRespuesta(e.target.value)} />

                <label htmlFor="estado">Seleccione un estado:</label>
                <select id="estado" value={estados} onChange={(e) => setEstados(e.target.value)}>
                    <option value="">Seleccione un estado</option>
                    <option value="Pendiente">Pendiente</option>
                    <option value="En proceso">En proceso</option>
                    <option value="Finalizada">Finalizada</option>
                </select>

                <label htmlFor="descripcion">Ingrese la descripción:</label>
                <textarea id="descripcion" placeholder="Descripción" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />

                <label htmlFor="fechaInicio">Ingrese la fecha inicial:</label>
                <input id="fechaInicio" type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} />

                <label htmlFor="fechaFinal">Ingrese la fecha final:</label>
                <input id="fechaFinal" type="date" value={fechaFinal} onChange={(e) => setFechaFinal(e.target.value)} />

                <div className='btn_botones'>
                    <button className='btn_Guardar' onClick={TablascrearRespuestas}>Guardar</button>
                    <button className='btn_Cerrar' onClick={cerrar}>Cerrar</button>
                </div>
            </div>
        </div>
    );
}