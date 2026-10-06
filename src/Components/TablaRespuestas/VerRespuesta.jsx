import "./Modal.css";

export default function VerRespuesta({ datos, cerrar }) {
    if (!datos) return null;

    return (
        <div className="respuesta-modal-overlay">
            <div className="respuesta-modal respuesta-modal-ver">

                <div className="respuesta-modal-header">
                    <h2>Información de la Respuesta</h2>

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
                            <p className="respuesta-form-value">
                                {datos.Nradicado || "-"}
                            </p>
                        </div>

                        <div className="respuesta-form-field">
                            <label>Título</label>
                            <p className="respuesta-form-value">
                                {datos.titulo || "-"}
                            </p>
                        </div>

                        <div className="respuesta-form-field">
                            <label>Nombre</label>
                            <p className="respuesta-form-value">
                                {datos.nombre || "-"}
                            </p>
                        </div>

                        <div className="respuesta-form-field">
                            <label>Teléfono</label>
                            <p className="respuesta-form-value">
                                {datos.telefono || "-"}
                            </p>
                        </div>

                        <div className="respuesta-form-field">
                            <label>Teléfono Empresa</label>
                            <p className="respuesta-form-value">
                                {datos.telefonoEmpresa || "-"}
                            </p>
                        </div>

                        <div className="respuesta-form-field">
                            <label>Tipo de Respuesta</label>
                            <p className="respuesta-form-value">
                                {datos.tipoRespuesta || "-"}
                            </p>
                        </div>

                        <div className="respuesta-form-field">
                            <label>Estado</label>
                            <p className="respuesta-form-value">
                                {datos.estados || "-"}
                            </p>
                        </div>

                        <div className="respuesta-form-field">
                            <label>Fecha Inicio</label>
                            <p className="respuesta-form-value">
                                {datos.fechaInicio || "-"}
                            </p>
                        </div>

                        <div className="respuesta-form-field">
                            <label>Fecha Fin</label>
                            <p className="respuesta-form-value">
                                {datos.fechaFinal || "-"}
                            </p>
                        </div>

                        <div className="respuesta-form-field respuesta-form-field-full">
                            <label>Descripción</label>

                            <p className="respuesta-form-value respuesta-form-value-large">
                                {datos.descripcion || "-"}
                            </p>
                        </div>

                    </div>
                </div>

                <div className="respuesta-modal-footer">
                    <button
                        className="respuesta-btn respuesta-btn-primary"
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