import "./Modal.css";

const ModalHistorial = ({ cerrar, datos }) => {
  if (!datos) {
    return null;
  }

  return (
    <div className="solicitud-modal-overlay">
      <div className="solicitud-modal solicitud-modal-historial">
        <div className="solicitud-modal-header">
          <h2>Historial</h2>

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
          <div className="solicitud-timeline">
            <div className="solicitud-evento">
              <div className="solicitud-evento-indicador"></div>

              <div className="solicitud-evento-contenido">
                <h3>Solicitud creada</h3>

                <span className="solicitud-evento-fecha">
                  {datos.fecha || "-"}
                </span>

                <p>
                  <strong>Estado:</strong> Pendiente
                </p>
              </div>
            </div>

            <div className="solicitud-evento">
              <div className="solicitud-evento-indicador"></div>

              <div className="solicitud-evento-contenido">
                <h3>Asignada</h3>

                <span className="solicitud-evento-fecha">
                  11/07/2026
                </span>

                <p>
                  <strong>Funcionario:</strong> Administrador
                </p>
              </div>
            </div>

            <div className="solicitud-evento">
              <div className="solicitud-evento-indicador"></div>

              <div className="solicitud-evento-contenido">
                <h3>En proceso</h3>

                <span className="solicitud-evento-fecha">
                  12/07/2026
                </span>

                <p>Se encuentra en revisión.</p>
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

export default ModalHistorial;