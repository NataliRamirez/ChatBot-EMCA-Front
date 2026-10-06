import "./Modal.css";

export default function ModalVer({ datos, cerrar }) {
    if (!datos) {
        return null;
    }

    return (
        <div className="bitacora-modal-overlay">
            <div className="bitacora-modal bitacora-modal-ver">

                <div className="bitacora-modal-header">
                    <h2>Detalle de la Bitácora</h2>

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

                            <p className="bitacora-form-value">
                                {datos.titulo || "-"}
                            </p>
                        </div>

                        <div className="bitacora-form-field">
                            <label>Nombre</label>

                            <p className="bitacora-form-value">
                                {datos.nombre || "-"}
                            </p>
                        </div>

                        <div className="bitacora-form-field">
                            <label>Fecha Inicio</label>

                            <p className="bitacora-form-value">
                                {datos.fechaInicio || "-"}
                            </p>
                        </div>

                        <div className="bitacora-form-field">
                            <label>Fecha Fin</label>

                            <p className="bitacora-form-value">
                                {datos.fechaFin || "-"}
                            </p>
                        </div>

                        <div className="bitacora-form-field">
                            <label>Estado</label>

                            <p className="bitacora-form-value">
                                {datos.estado || "-"}
                            </p>
                        </div>

                        <div className="bitacora-form-field">
                            <label>Cargo</label>

                            <p className="bitacora-form-value">
                                {datos.cargo || "-"}
                            </p>
                        </div>

                        <div className="bitacora-form-field bitacora-form-field-full">
                            <label>Descripción</label>

                            <p className="bitacora-form-value bitacora-form-value-large">
                                {datos.descripcion || "-"}
                            </p>
                        </div>

                    </div>
                </div>

                <div className="bitacora-modal-footer">

                    <button
                        className="bitacora-btn bitacora-btn-primary"
                        onClick={cerrar}
                        type="button"
                    >
                        Cerrar
                    </button>

                </div>

            </div>
        </div>
    );
}