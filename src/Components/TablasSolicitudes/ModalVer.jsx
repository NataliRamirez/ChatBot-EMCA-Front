import "./Modal.css";

const ModalVer = ({ cerrar, datos }) => {
  if (!datos) {
    return null;
  }

  return (
    <div className="solicitud-modal-overlay">
      <div className="solicitud-modal solicitud-modal-ver">
        <div className="solicitud-modal-header">
          <h2>SOLICITUD #{datos.radicado || "-"}</h2>

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
              <div className="solicitud-value">
                {datos.titulo || "-"}
              </div>
            </div>

            <div className="solicitud-form-field">
              <label>Nombre</label>
              <div className="solicitud-value">
                {datos.nombre || "-"}
              </div>
            </div>

            <div className="solicitud-form-field">
              <label>Tipo</label>
              <div className="solicitud-value">
                {datos.tipo || "-"}
              </div>
            </div>

            <div className="solicitud-form-field">
              <label>Radicado</label>
              <div className="solicitud-value">
                {datos.radicado || "-"}
              </div>
            </div>

            <div className="solicitud-form-field">
              <label>Fecha de inicio</label>
              <div className="solicitud-value">
                {datos.fechaInicio || "-"}
              </div>
            </div>

            <div className="solicitud-form-field">
              <label>Fecha final</label>
              <div className="solicitud-value">
                {datos.fechaFinal || "-"}
              </div>
            </div>

            <div className="solicitud-form-field">
              <label>Cargo</label>
              <div className="solicitud-value">
                {datos.cargo || "-"}
              </div>
            </div>

            <div className="solicitud-form-field">
              <label>Estado</label>
              <div className="solicitud-value">
                {datos.estado || "-"}
              </div>
            </div>

            <div className="solicitud-form-field solicitud-form-field-full">
              <label>Asunto</label>
              <div className="solicitud-value solicitud-value-large">
                {datos.asunto || "-"}
              </div>
            </div>

            <div className="solicitud-form-field solicitud-form-field-full">
              <label>Observación</label>
              <div className="solicitud-value solicitud-value-large">
                {datos.observacion || "-"}
              </div>
            </div>
          </div>
        </div>

        <div className="solicitud-modal-footer">
          <button
            type="button"
            className="solicitud-btn solicitud-btn-secondary"
            onClick={cerrar}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalVer;