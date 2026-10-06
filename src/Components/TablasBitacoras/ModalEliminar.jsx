import "./Modal.css";

export default function ModalEliminar({ datos, cerrar }) {
    if (!datos) {
        return null;
    }

    const eliminar = async () => {
        try {
            const res = await fetch(
                `http://127.0.0.1:4000/v1/bitacora/${datos.id}`,
                {
                    method: "DELETE",
                    headers: {
                        "x-api-key": "EmcaSecret2026"
                    }
                }
            );

            const data = await res.json();

            if (res.ok) {
                alert(
                    data.mensaje ||
                    "Eliminado correctamente"
                );

                cerrar();
            } else {
                alert(
                    data.mensaje ||
                    "No se pudo eliminar"
                );
            }

        } catch (error) {
            console.error(error);
            alert("Error de conexión con el servidor");
        }
    };

    return (
        <div className="bitacora-modal-overlay">
            <div className="bitacora-modal bitacora-modal-eliminar">

                <div className="bitacora-modal-header">
                    <h2>Eliminar Bitácora</h2>

                    <button
                        className="bitacora-modal-close"
                        onClick={cerrar}
                        title="Cerrar"
                        type="button"
                    >
                        ✕
                    </button>
                </div>

                <div className="bitacora-modal-body bitacora-confirmacion-body">

                    <p className="bitacora-confirmacion-texto">
                        ¿Desea eliminar la bitácora{" "}
                        <strong>
                            {datos.titulo || ""}
                        </strong>
                        ?
                    </p>

                </div>

                <div className="bitacora-modal-footer">

                    <button
                        className="bitacora-btn bitacora-btn-secondary"
                        onClick={cerrar}
                        type="button"
                    >
                        No, cancelar
                    </button>

                    <button
                        className="bitacora-btn bitacora-btn-danger"
                        onClick={eliminar}
                        type="button"
                    >
                        Sí, eliminar
                    </button>

                </div>

            </div>
        </div>
    );
}