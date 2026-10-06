import { useState } from "react";
import "./Modal.css";

export default function ModalCrear({ cerrar }) {
    const [titulo, setTitulo] = useState("");
    const [nombre, setNombre] = useState("");
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [cargo, setCargo] = useState("");
    const [estado, setEstado] = useState("");
    const [cargando, setCargando] = useState(false);

    const guardar = async () => {
        try {
            setCargando(true);

            const res = await fetch(
                "http://127.0.0.1:4000/v1/bitacora",
                {
                    method: "POST",
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
                        texto: descripcion,
                        cargo
                    })
                }
            );

            const data = await res.json();

            if (res.ok) {
                alert(data.mensaje || "Bitácora creada");
                cerrar();
            } else {
                alert(data.mensaje || "Error al guardar");
            }

        } catch (error) {
            console.error(error);
            alert("Error al conectar con el servidor");

        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="bitacora-modal-overlay">
            <div className="bitacora-modal bitacora-modal-crear">

                <div className="bitacora-modal-header">
                    <h2>Nueva Bitácora</h2>

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
                                placeholder="Título"
                                value={titulo}
                                onChange={(e) =>
                                    setTitulo(e.target.value)
                                }
                            />
                        </div>

                        <div className="bitacora-form-field">
                            <label>Nombre</label>

                            <input
                                placeholder="Nombre"
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
                            <label>Cargo</label>

                            <input
                                placeholder="Cargo"
                                value={cargo}
                                onChange={(e) =>
                                    setCargo(e.target.value)
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

                        <div className="bitacora-form-field bitacora-form-field-full">
                            <label>Descripción</label>

                            <textarea
                                placeholder="Descripción"
                                value={descripcion}
                                onChange={(e) =>
                                    setDescripcion(e.target.value)
                                }
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
                        onClick={guardar}
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