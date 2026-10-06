import { useState } from "react";
import "./Modal.css";

const ModalAsignar = ({ cerrar, datos }) => {
  const [nombre, setNombre] = useState("");
  const [estado, setEstado] = useState(datos?.estado || "Pendiente");
  const [observacion, setObservacion] = useState("");
  const [cargo, setCargo] = useState("");
  const [tipo, setTipo] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFinal, setFechaFinal] = useState("");
  const [radicado, setRadicado] = useState(datos?.radicado || "");
  const [cargando, setCargando] = useState(false);

  if (!datos) {
    return null;
  }

  const asignarSolicitud = async () => {
    if (!nombre.trim()) {
      alert("Por favor ingrese el nombre del funcionario.");
      return;
    }

    setCargando(true);

    try {
      const respuesta = await fetch(
        `http://127.0.0.1:4000/v1/solicitudes/${datos.id}/asignar`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "EmcaSecret2026",
          },
          body: JSON.stringify({
            nombre,
            estado,
            observacion,
            cargo,
            tipo,
            fechaInicio,
            fechaFinal,
            radicado,
          }),
        }
      );

      const resultado = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(
          resultado?.message || "No se pudo asignar la solicitud."
        );
      }

      alert("Asignación de solicitud realizada con éxito.");
      cerrar();
    } catch (error) {
      console.error("Error al asignar solicitud:", error);
      alert(error.message || "Ocurrió un error al asignar la solicitud.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="solicitud-modal-overlay">
      <div className="solicitud-modal solicitud-modal-asignar">
        <div className="solicitud-modal-header">
          <h2>Asignar solicitud</h2>

          <button
            type="button"
            className="solicitud-modal-close"
            onClick={cerrar}
            aria-label="Cerrar"
          >
            ×
          </button>
        </div>

        <div className="solicitud-modal-body">
          <div className="solicitud-form-grid">
            <div className="solicitud-form-field">
              <label>Funcionario</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Nombre del funcionario"
              />
            </div>

            <div className="solicitud-form-field">
              <label>Cargo</label>
              <input
                type="text"
                value={cargo}
                onChange={(e) => setCargo(e.target.value)}
                placeholder="Cargo"
              />
            </div>

            <div className="solicitud-form-field">
              <label>Tipo</label>
              <input
                type="text"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                placeholder="Tipo de solicitud"
              />
            </div>

            <div className="solicitud-form-field">
              <label>Estado</label>
              <select
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
              >
                <option value="Pendiente">Pendiente</option>
                <option value="Asignada">Asignada</option>
                <option value="En proceso">En proceso</option>
                <option value="Resuelta">Resuelta</option>
                <option value="Cerrada">Cerrada</option>
              </select>
            </div>

            <div className="solicitud-form-field">
              <label>Fecha de inicio</label>
              <input
                type="date"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
              />
            </div>

            <div className="solicitud-form-field">
              <label>Fecha final</label>
              <input
                type="date"
                value={fechaFinal}
                onChange={(e) => setFechaFinal(e.target.value)}
              />
            </div>

            <div className="solicitud-form-field">
              <label>Radicado</label>
              <input
                type="text"
                value={radicado}
                onChange={(e) => setRadicado(e.target.value)}
                placeholder="Número de radicado"
              />
            </div>

            <div className="solicitud-form-field solicitud-form-field-full">
              <label>Observación</label>
              <textarea
                value={observacion}
                onChange={(e) => setObservacion(e.target.value)}
                placeholder="Ingrese una observación..."
              />
            </div>
          </div>
        </div>

        <div className="solicitud-modal-footer">
          <button
            type="button"
            className="solicitud-btn solicitud-btn-secondary"
            onClick={cerrar}
            disabled={cargando}
          >
            Cancelar
          </button>

          <button
            type="button"
            className="solicitud-btn solicitud-btn-primary"
            onClick={asignarSolicitud}
            disabled={cargando}
          >
            {cargando ? "Asignando..." : "Asignar solicitud"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalAsignar;