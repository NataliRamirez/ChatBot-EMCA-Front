import { useState, useEffect } from "react";
import "./Modal.css";

export default function EditarInforme({ informe, onGuardar, onClose }) {
    const [datos, setDatos] = useState(informe || {});

    useEffect(() => {
        setDatos(informe || {});
    }, [informe]);

    if (!informe) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDatos((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = () => {
        onGuardar(datos);
    };

    return (
        <div className="overlay">
            <div className="modalInforme">
                <h2>Editar Informe</h2>

                <div className="gruposModal">
                    <label>Nombre</label>
                    <input
                        name="nombre"
                        value={datos.nombre || ""}
                        onChange={handleChange}
                    />
                </div>

                <div className="gruposModal">
                    <label>Tipo</label>
                    <input
                        name="tipo"
                        value={datos.tipo || ""}
                        onChange={handleChange}
                    />
                </div>

                <div className="gruposModal">
                    <label>Respuesta</label>
                    <textarea
                        rows={4}
                        name="respuesta"
                        value={datos.respuesta || ""}
                        onChange={handleChange}
                    />
                </div>

                <div className="gruposModal">
                    <label>Fecha Inicio</label>
                    <input
                        type="date"
                        name="fechaInicio"
                        value={datos.fechaInicio || ""}
                        onChange={handleChange}
                    />
                </div>

                <div className="gruposModal">
                    <label>Fecha Final</label>
                    <input
                        type="date"
                        name="fechaFin"
                        value={datos.fechaFin || ""}
                        onChange={handleChange}
                    />
                </div>

                <div className="gruposModal">
                    <label>Estado</label>
                    <select
                        name="estado"
                        value={datos.estado || "Pendiente"}
                        onChange={handleChange}
                    >
                        <option value="Pendiente">Pendiente</option>
                        <option value="En proceso">En proceso</option>
                        <option value="Respondida">Respondida</option>
                    </select>
                </div>

                <div className="botonesModal">
                    <button className="btn_Guardar" onClick={handleSave}>
                        Guardar
                    </button>
                    <button className="btnCancelar" onClick={onClose}>
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
}