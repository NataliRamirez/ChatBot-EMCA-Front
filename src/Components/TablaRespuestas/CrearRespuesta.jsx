import "./Modal.css";
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
    const [cargando, setCargando] = useState(false);

    const TablascrearRespuestas = async () => {
        try {
            setCargando(true);

            const res = await fetch(
                "http://127.0.0.1:4000/v1/respuestas",
                {
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
                }
            );

            const data = await res.json();

            if (res.ok) {
                alert(
                    data.mensaje ||
                    "Respuesta creada exitosamente"
                );

                if (onExito) {
                    onExito();
                }

                cerrar();
            } else {
                alert(
                    data.mensaje ||
                    "Error al guardar"
                );
            }

        } catch (error) {
            console.error(error);
            alert("Error de conexión con el backend");

        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="respuesta-modal-overlay">
            <div className="respuesta-modal respuesta-modal-crear">

                <div className="respuesta-modal-header">
                    <h2>Panel De Creación Respuesta</h2>

                    <button
                        className="respuesta-modal-close"
                        onClick={cerrar}
                        title="Cerrar"
                        type="button"
                    >
                        ✕
                    </button>
                </div>

                <div className="respuesta-modal-body">
                    <div className="respuesta-form-grid">

                        <div className="respuesta-form-field">
                            <label>Número de Radicado</label>

                            <input
                                id="Nradicado"
                                type="text"
                                value={Nradicado}
                                onChange={(e) =>
                                    setNradicado(e.target.value)
                                }
                            />
                        </div>

                        <div className="respuesta-form-field">
                            <label>Título de la Respuesta</label>

                            <input
                                id="Titulo"
                                type="text"
                                value={titulo}
                                onChange={(e) =>
                                    setTitulo(e.target.value)
                                }
                            />
                        </div>

                        <div className="respuesta-form-field">
                            <label>Nombre del Usuario</label>

                            <input
                                id="nombre"
                                type="text"
                                value={nombre}
                                onChange={(e) =>
                                    setNombre(e.target.value)
                                }
                            />
                        </div>

                        <div className="respuesta-form-field">
                            <label>Teléfono del Usuario</label>

                            <input
                                id="Telefono"
                                type="text"
                                value={telefono}
                                onChange={(e) =>
                                    setTelefono(e.target.value)
                                }
                            />
                        </div>

                        <div className="respuesta-form-field">
                            <label>Teléfono de la Empresa</label>

                            <input
                                id="TelefonoEmpresa"
                                type="text"
                                value={telefonoEmpresa}
                                onChange={(e) =>
                                    setTelefonoEmpresa(e.target.value)
                                }
                            />
                        </div>

                        <div className="respuesta-form-field">
                            <label>Tipo de Respuesta</label>

                            <input
                                id="tipoRespuesta"
                                type="text"
                                value={tipoRespuesta}
                                onChange={(e) =>
                                    setTipoRespuesta(e.target.value)
                                }
                            />
                        </div>

                        <div className="respuesta-form-field">
                            <label>Estado</label>

                            <select
                                id="estado"
                                value={estados}
                                onChange={(e) =>
                                    setEstados(e.target.value)
                                }
                            >
                                <option value="">
                                    Seleccione un estado
                                </option>

                                <option value="Pendiente">
                                    Pendiente
                                </option>

                                <option value="En proceso">
                                    En proceso
                                </option>

                                <option value="Finalizada">
                                    Finalizada
                                </option>
                            </select>
                        </div>

                        <div className="respuesta-form-field">
                            <label>Fecha Inicial</label>

                            <input
                                id="fechaInicio"
                                type="date"
                                value={fechaInicio}
                                onChange={(e) =>
                                    setFechaInicio(e.target.value)
                                }
                            />
                        </div>

                        <div className="respuesta-form-field">
                            <label>Fecha Final</label>

                            <input
                                id="fechaFinal"
                                type="date"
                                value={fechaFinal}
                                onChange={(e) =>
                                    setFechaFinal(e.target.value)
                                }
                            />
                        </div>

                        <div className="respuesta-form-field respuesta-form-field-full">
                            <label>Descripción</label>

                            <textarea
                                id="descripcion"
                                placeholder="Descripción"
                                value={descripcion}
                                onChange={(e) =>
                                    setDescripcion(e.target.value)
                                }
                            />
                        </div>

                    </div>
                </div>

                <div className="respuesta-modal-footer">

                    <button
                        className="respuesta-btn respuesta-btn-secondary"
                        onClick={cerrar}
                        disabled={cargando}
                        type="button"
                    >
                        Cancelar
                    </button>

                    <button
                        className="respuesta-btn respuesta-btn-primary"
                        onClick={TablascrearRespuestas}
                        disabled={cargando}
                        type="button"
                    >
                        {cargando ? "Guardando..." : "Guardar"}
                    </button>

                </div>

            </div>
        </div>
    );
}