import { useState, useEffect } from "react";
import "./Modal.css";

export default function EditarInforme({ informe, onGuardar, onClose }) {
  const [datos, setDatos] = useState({});
  const [errores, setErrores] = useState({});

  useEffect(() => {
    if (informe) {
      setDatos(informe);
      setErrores({});
    }
  }, [informe]);

  if (!informe) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatos((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Quitar error al escribir
    if (errores[name]) {
      setErrores((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validarCampos = () => {
    const nuevosErrores = {};
    if (!datos.nombre?.trim()) nuevosErrores.nombre = "El nombre es obligatorio";
    if (!datos.tipo?.trim()) nuevosErrores.tipo = "El tipo es obligatorio";
    if (!datos.fechaInicio) nuevosErrores.fechaInicio = "Selecciona fecha de inicio";
    return nuevosErrores;
  };

  const handleSave = () => {
    const nuevosErrores = validarCampos();
    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }
    // Aseguramos que el ID no se pierda
    onGuardar({ ...datos, id: informe.id });
  };

  return (
    <div className="overlay">
      <div className="modalInforme">
        <h2>Editar Informe</h2>

        <div className="gruposModal">
          <label>Nombre *</label>
          <input
            name="nombre"
            value={datos.nombre || ""}
            onChange={handleChange}
            className={errores.nombre ? "inputError" : ""}
          />
          {errores.nombre && <span className="textoError">{errores.nombre}</span>}
        </div>

        <div className="gruposModal">
          <label>Tipo *</label>
          <input
            name="tipo"
            value={datos.tipo || ""}
            onChange={handleChange}
            className={errores.tipo ? "inputError" : ""}
          />
          {errores.tipo && <span className="textoError">{errores.tipo}</span>}
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
          <label>Fecha Inicio *</label>
          <input
            type="date"
            name="fechaInicio"
            value={datos.fechaInicio || ""}
            onChange={handleChange}
            className={errores.fechaInicio ? "inputError" : ""}
          />
          {errores.fechaInicio && <span className="textoError">{errores.fechaInicio}</span>}
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
          <button className="btn_Cancelar" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}