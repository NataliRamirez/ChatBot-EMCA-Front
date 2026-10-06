import "./Modal.css";
import { useState, useEffect } from "react";

export default function EditarRespuesta({ datos, cerrar, onExito }) {
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

    useEffect(() => {
        if (datos) {
            setNradicado(datos.Nradicado || "");
            setTitulo(datos.titulo || "");
            setNombre(datos.nombre || "");
            setTelefono(datos.telefono || "");
            setTelefonoEmpresa(datos.telefonoEmpresa || "");
            setTipoRespuesta(datos.tipoRespuesta || "");
            setEstados(datos.estados || "");
            setDescripcion(datos.descripcion || "");
            setFechaInicio(datos.fechaInicio || "");
            setFechaFinal(datos.fechaFinal || "");
        }
    }, [datos]);

    const guardarCambios = async () => {
        if (!datos) return;

        try {
            setCargando(true);

            const res = await fetch(
                `http://127.0.0.1:4000/v1/respuestas/${datos.id}`,
                {
                    method: "PUT",
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
                    "Respuesta actualizada correctamente"
                );

                if (onExito) {
                    onExito();
                }

                cerrar();
            } else {
                alert(
                    data.mensaje ||
                    "No se pudo actualizar"
                );
            }

        } catch (error) {
            console.error(error);
            alert("Error de conexión con el backend");

        } finally {
            setCargando(false);
        }
    };

    if (!datos) return null;

    return (
        <div className="respuesta-modal-overlay">
            <div className="respuesta-modal respuesta-modal-editar">

                <div className="respuesta-modal-header">
                    <h2>Editar Respuesta</h2>

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
                                value={descripcion}
                                onChange={(e) =>
                                    setDescripcion(e.target.value)
                                }
                                placeholder="Descripción"
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
                        onClick={guardarCambios}
                        disabled={cargando}
                        type="button"
                    >
                        {cargando
                            ? "Guardando..."
                            : "Guardar Cambios"}
                    </button>

                </div>

            </div>
        </div>
    );
}