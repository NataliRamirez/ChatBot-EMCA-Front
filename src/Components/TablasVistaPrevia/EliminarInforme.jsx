import "./Modal.css";

export default function EliminarInforme({ informe, onEliminar, onClose }) {
    if (!informe) return null;

    return (
        <div className="overlay">
            <div className="modalInforme_eliminar">
                <h2>Eliminar Informe</h2>

                <p>
                    ¿Desea eliminar el informe <b>{informe.nombre || `#${informe.id}`}</b>?
                </p>

                <div className="botonesModal">
                    <button
                        className="btn_Eliminar"
                        onClick={() => onEliminar(informe.id)}
                    >
                        Eliminar
                    </button>
                    <button className="btn_Cancelar" onClick={onClose}>
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
}