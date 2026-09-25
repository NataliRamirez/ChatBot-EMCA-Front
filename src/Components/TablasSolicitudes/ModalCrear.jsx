import { useState } from "react";
import "./Modal.css";

export default function ModalCrear({ cerrar }) {
    /**DEFINICION DE desestructuración de arreglos */
    const [titulo, setTitulo] = useState("");
    const [nombre, setNombre] = useState("");
    const [radicado, setRadicado] = useState("");
    const [tipo, setTipo] = useState("");
    const [usuario, setUsuario] = useState("");
    const [asunto, setAsunto] = useState("");
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFinal, setFechaFinal] = useState("");
    const [cargo, setCargo] = useState("");
    const [estado, setEstado] = useState("Pendiente");
    const [observacion, setObservacion] = useState("");
    const [cargando, setCargando] = useState(false);

    const guardar = async () => {
        try {
            setCargando(true);
            const res = await fetch("http://127.0.0.1:4000/v1/solicitudes", {
                method: "POST",
                headers: {
                     /**LLAVES DE ACCESO */
                    "Content-Type": "application/json",
                    "x-api-key": "EmcaSecret2026"
                },
                /**CAMPOS DE LA TABLA A HACER CONSULTAS */
                body: JSON.stringify({
                    titulo,
                    nombre,
                    radicado,
                    tipo,
                    usuario,
                    asunto,
                    fechaInicio,
                    fechaFinal,
                    cargo,
                    estado,
                    observacion
                })
            });

            const data = await res.json();

            if (res.ok) {
                alert(data.mensaje || "Solicitud creada con éxito");
                cerrar();
            } else {
                alert(data.mensaje || "Error al crear la solicitud");
            }
        } catch (error) {
            console.error(error);
            alert("Error de conexión con el servidor");
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="overlay">
            <div className="Modal_crear">
                <h2>Nueva Solicitud</h2>

                <label htmlFor="titulo">Ingrese el título:</label>
                <input id="titulo" placeholder="Título" value={titulo} onChange={(e) => setTitulo(e.target.value)} />

                <label htmlFor="nombre">Ingrese el nombre:</label>
                <input id="nombre" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />

                <label htmlFor="radicado">Ingrese número de radicado:</label>
                <input id="radicado" placeholder="Radicado" value={radicado} onChange={(e) => setRadicado(e.target.value)} />

                <label htmlFor="tipo">Ingrese el tipo de radicado:</label>
                <input id="tipo" placeholder="Tipo" value={tipo} onChange={(e) => setTipo(e.target.value)} />

                <label htmlFor="usuario">Ingrese el nombre del usuario:</label>
                <input id="usuario" placeholder="Usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)} />

                <label htmlFor="asunto">Ingrese el asunto:</label>
                <textarea id="asunto" placeholder="Asunto" value={asunto} onChange={(e) => setAsunto(e.target.value)} />

                <label htmlFor="fechaInicio">Ingrese fecha inicio:</label>
                <input id="fechaInicio" type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} />

                <label htmlFor="fechaFinal">Ingrese fecha final:</label>
                <input id="fechaFinal" type="date" value={fechaFinal} onChange={(e) => setFechaFinal(e.target.value)} />

                <label htmlFor="cargo">Ingrese el cargo:</label>
                <input id="cargo" placeholder="Cargo" value={cargo} onChange={(e) => setCargo(e.target.value)} />

                <label htmlFor="estado">Ingrese el estado de la solicitud:</label>
                <select id="estado" value={estado} onChange={(e) => setEstado(e.target.value)}>
                    <option>Pendiente</option>
                    <option>En proceso</option>
                    <option>Finalizada</option>
                </select>

                <label htmlFor="observacion">Ingrese la observación:</label>
                <textarea id="observacion" placeholder="Observación" value={observacion} onChange={(e) => setObservacion(e.target.value)} />

                <div className="Containers_modal">
                    <button className="btn_Guardar" onClick={guardar} disabled={cargando}>
                        {cargando ? "Guardando..." : "Guardar"}
                    </button>
                    <button className="btnCancelarSolicitudes" onClick={cerrar} disabled={cargando}>
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
}