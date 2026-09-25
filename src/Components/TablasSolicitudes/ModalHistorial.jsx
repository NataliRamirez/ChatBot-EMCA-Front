import "./Modal.css";

export default function ModalHistorial({ datos, cerrar }) {
    if (!datos) return null;

    return (
        <div className="overlay">
            <div className="Modal">
                <h2>Historial</h2>

                <div className="timeline">
                    <div className="evento">
                        <h4>Solicitud creada</h4>
                        <p>{datos.fecha}</p>
                        <span>Estado: Pendiente</span>
                    </div>

                    <div className="evento">
                        <h4>Asignada</h4>
                        <p>11/07/2026</p>
                        <span>Funcionario: Administrador</span>
                    </div>

                    <div className="evento">
                        <h4>En proceso</h4>
                        <p>12/07/2026</p>
                        <span>Se encuentra en revisión.</span>
                    </div>
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