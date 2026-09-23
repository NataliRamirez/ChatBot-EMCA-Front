import { useState } from "react";
import "./Modal.css";

export default function ModalAsignar({ datos, cerrar }) {
    /**DEFINICION DE desestructuración de arreglos */
    const [nombre, setNombre] = useState("");
    const [estado, setEstado] = useState(datos?.estado || "Pendiente");
    const [observacion, setObservacion] = useState("");
    const [cargo, setCargo] = useState("");
    const [tipo, setTipo] = useState("");
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFinal, setFechaFinal] = useState("");
    const [radicado, setRadicado] = useState(datos?.radicado || "");
    const [cargando, setCargando] = useState(false);

    const AsignarSolicitud = async () => {
        try {
            setCargando(true);
            const res = await fetch(`http://127.0.0.1:4000/v1/solicitudes/${datos.id}/asignar`, {
                method: "POST",
                headers: {
                    /**LLAVES DE ACCESO */
                    "Content-Type": "application/json",
                    "x-api-key": "EmcaSecret2026"
                },
                /**CAMPOS DE LA TABLA A HACER CONSULTAS */
                body: JSON.stringify({
                    nombre,
                    estado,
                    observacion,
                    cargo,
                    tipo,
                    fechaInicio,
                    fechaFinal,
                    radicado
                })
            });

            const data = await res.json();

            if (res.ok) {
                alert("Asignación de solicitud realizada con éxito");
                cerrar();
            } else {
                alert(data.mensaje || "Error de validación");
            }
        } catch (error) {
            alert("Error de conexión con el servidor");
            console.error(error);
        } finally {
            setCargando(false);
        }
    };

    return (

        /**MODAL */
        <div className="overlay">
            <div className="Modal">
                <h2>Asignar Solicitud</h2>

                <label>Funcionario</label>
                <input
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Nombre"
                />

                <label>Estado</label>
                <select value={estado} onChange={(e) => setEstado(e.target.value)}>
                    <option>Pendiente</option>
                    <option>En proceso</option>
                    <option>Respondida</option>
                </select>

                <label>Observación</label>
                <textarea
                    value={observacion}
                    onChange={(e) => setObservacion(e.target.value)}
                    placeholder="Observación"
                />

                <label>Cargo</label>
                <input
                    value={cargo}
                    onChange={(e) => setCargo(e.target.value)}
                    placeholder="Cargo"
                />

                <label>Tipo</label>
                <input
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                    placeholder="Tipo"
                />

                <label>Fecha Inicial</label>
                <input
                    type="date"
                    value={fechaInicio}
                    onChange={(e) => setFechaInicio(e.target.value)}
                />

                <label>Fecha Final</label>
                <input
                    type="date"
                    value={fechaFinal}
                    onChange={(e) => setFechaFinal(e.target.value)}
                />

                <label>Radicado</label>
                <input
                    value={radicado}
                    onChange={(e) => setRadicado(e.target.value)}
                    placeholder="Radicado"
                />

                <div className="Botones">
                    <button className="btnCancelarSolicitudes" onClick={cerrar} disabled={cargando}>
                        Cancelar
                    </button>
                    <button className="btn_Guardar" onClick={AsignarSolicitud} disabled={cargando}>
                        {cargando ? "Guardando..." : "Guardar"}
                    </button>
                </div>
            </div>
        </div>
    );
}