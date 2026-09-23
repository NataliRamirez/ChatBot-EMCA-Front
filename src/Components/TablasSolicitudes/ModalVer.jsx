import "./Modal.css";

export default function ModalVer({ datos, cerrar }) {
    if (!datos) return null;

    return (
        <div className="overlay">
            <div className="modals_ver">
                <h2>Información de la Solicitud</h2>

                <div className="Campos">
                    <label>Radicado</label>
                    <p>{datos.radicado}</p>
                </div>
                <div className="Campos">
                    <label>Tipo</label>
                    <p>{datos.tipo}</p>
                </div>
                <div className="Campos">
                    <label>Nombre:</label>
                    <p>{datos.nombre}</p>
                </div>
                <div className="Campos">
                    <label>Asunto</label>
                    <p>{datos.asunto}</p>
                </div>
                <div className="Campos">
                    <label>Fecha Inicio:</label>
                    <p>{datos.fechaInicio}</p>
                </div>
                <div className="Campos">
                    <label>Fecha Final</label>
                    <p>{datos.fechaFinal}</p>
                </div>
                <div className="Campos">
                    <label>Cargo</label>
                    <p>{datos.cargo}</p>
                </div>

                <div className="botones">
                    <button className="btnCancelarSolicitudes" onClick={cerrar}>
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
}