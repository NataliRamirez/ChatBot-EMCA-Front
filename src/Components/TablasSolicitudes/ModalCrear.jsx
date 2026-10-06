import { useState } from "react";
import "./Modal.css";

const ModalCrear = ({ cerrar }) => {
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
    if (!titulo.trim()) {
      alert("Por favor ingrese el título.");
      return;
    }

    setCargando(true);

    try {
      const respuesta = await fetch(
        "http://127.0.0.1:4000/v1/solicitudes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "EmcaSecret2026",
          },
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
            observacion,
          }),
        }
      );

      const resultado = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(
          resultado?.message || "No se pudo crear la solicitud."
        );
      }

      alert("Solicitud creada con éxito.");
      cerrar();
    } catch (error) {
      console.error("Error al crear solicitud:", error);
      alert(error.message || "Ocurrió un error al crear la solicitud.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="solicitud-modal-overlay">
      <div className="solicitud-modal solicitud-modal-crear">
        <div className="solicitud-modal-header">
          <h2>Crear solicitud</h2>

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
              <label>Título</label>
              <input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Título de la solicitud"
              />
            </div>

            <div className="solicitud-form-field">
              <label>Nombre</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Nombre del solicitante"
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
              <label>Usuario</label>
              <input
                type="text"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                placeholder="Usuario"
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

            <div className="solicitud-form-field solicitud-form-field-full">
              <label>Asunto</label>
              <textarea
                value={asunto}
                onChange={(e) => setAsunto(e.target.value)}
                placeholder="Ingrese el asunto..."
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
            onClick={guardar}
            disabled={cargando}
          >
            {cargando ? "Guardando..." : "Crear solicitud"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalCrear;