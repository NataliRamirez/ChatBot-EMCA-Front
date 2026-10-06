import { useState } from "react";
import "./Modal.css";

export default function ModalEditar({ datos, cerrar }) {
    const [titulo, setTitulo] = useState(datos?.titulo || "");
    const [nombre, setNombre] = useState(datos?.nombre || "");
    const [fechaInicio, setFechaInicio] = useState(
        datos?.fechaInicio || ""
    );
    const [fechaFin, setFechaFin] = useState(
        datos?.fechaFin || ""
    );
    const [estado, setEstado] = useState(datos?.estado || "");
    const [descripcion, setDescripcion] = useState(
        datos?.descripcion || ""
    );
    const [texto, setTexto] = useState(
        (datos?.texto ?? datos?.descripcion) || ""
    );
    const [cargando, setCargando] = useState(false);

    if (!datos) {
        return null;
    }

    const actualizar = async () => {
        try {
            setCargando(true);

            const res = await fetch(
                `http://127.0.0.1:4000/v1/bitacora/${datos.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "x-api-key": "EmcaSecret2026"
                    },
                    body: JSON.stringify({
                        titulo,
                        nombre,
                        fechaInicio,
                        fechaFin,
                        estado,
                        descripcion,
                        texto
                    })
                }
            );

            const data = await res.json();

            if (res.ok) {
                alert(
                    data.mensaje ||
                    "Bitácora actualizada"
                );

                cerrar();

                window.location.reload();
            } else {
                alert(
                    data.mensaje ||
                    "Error al actualizar"
                );
            }

        } catch (error) {
            console.error(error);
            alert("Error de conexión con el servidor");

        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="bitacora-modal-overlay">
            <div className="bitacora-modal bitacora-modal-editar">

                <div className="bitacora-modal-header">
                    <h2>Editar Bitácora</h2>

                    <button
                        className="bitacora-modal-close"
                        onClick={cerrar}
                        title="Cerrar"
                        type="button"
                    >
                        ✕
                    </button>
                </div>

                <div className="bitacora-modal-body">
                    <div className="bitacora-form-grid">

                        <div className="bitacora-form-field">
                            <label>Título</label>

                            <input
                                value={titulo}
                                onChange={(e) =>
                                    setTitulo(e.target.value)
                                }
                            />
                        </div>

                        <div className="bitacora-form-field">
                            <label>Nombre</label>

                            <input
                                value={nombre}
                                onChange={(e) =>
                                    setNombre(e.target.value)
                                }
                            />
                        </div>

                        <div className="bitacora-form-field">
                            <label>Fecha Inicio</label>

                            <input
                                type="date"
                                value={fechaInicio}
                                onChange={(e) =>
                                    setFechaInicio(e.target.value)
                                }
                            />
                        </div>

                        <div className="bitacora-form-field">
                            <label>Fecha Final</label>

                            <input
                                type="date"
                                value={fechaFin}
                                onChange={(e) =>
                                    setFechaFin(e.target.value)
                                }
                            />
                        </div>

                        <div className="bitacora-form-field">
                            <label>Estado</label>

                            <select
                                value={estado}
                                onChange={(e) =>
                                    setEstado(e.target.value)
                                }
                            >
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

                        <div className="bitacora-form-field">
                            <label>Texto</label>

                            <input
                                value={texto}
                                onChange={(e) =>
                                    setTexto(e.target.value)
                                }
                            />
                        </div>

                        <div className="bitacora-form-field bitacora-form-field-full">
                            <label>Descripción</label>

                            <textarea
                                value={descripcion}
                                onChange={(e) => {
                                    setDescripcion(e.target.value);
                                    setTexto(e.target.value);
                                }}
                            />
                        </div>

                    </div>
                </div>

                <div className="bitacora-modal-footer">

                    <button
                        className="bitacora-btn bitacora-btn-secondary"
                        onClick={cerrar}
                        disabled={cargando}
                        type="button"
                    >
                        Cancelar
                    </button>

                    <button
                        className="bitacora-btn bitacora-btn-primary"
                        onClick={actualizar}
                        disabled={cargando}
                        type="button"
                    >
                        {cargando
                            ? "Actualizando..."
                            : "Actualizar"}
                    </button>

                </div>

            </div>
        </div>
    );
}