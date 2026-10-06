import "./Modal.css";

export default function EliminarRespuesta({ datos, cerrar, onExito }) {
    if (!datos) return null;

    const eliminarRespuesta = async () => {
        try {
            const res = await fetch(
                `http://127.0.0.1:4000/v1/respuestas/${datos.id}`,
                {
                    method: "DELETE",
                    headers: {
                        "x-api-key": "EmcaSecret2026"
                    }
                }
            );

            const data = await res.json();

            if (res.ok) {
                alert(data.mensaje || "Eliminado correctamente");

                if (onExito) {
                    onExito();
                }

                cerrar();
            } else {
                alert(
                    data.mensaje ||
                    "No se pudo eliminar la respuesta"
                );
            }
        } catch (error) {
            console.error(error);
            alert("Error de conexión con el servidor");
        }
    };

    return (
        <div className="respuesta-modal-overlay">
            <div className="respuesta-modal respuesta-modal-eliminar">

                <div className="respuesta-modal-header">
                    <h2>Eliminar Bitácora</h2>

                    <button
                        className="respuesta-modal-close"
                        onClick={cerrar}
                        title="Cerrar"
                        type="button"
                    >
                        ✕
                    </button>
                </div>

                <div className="respuesta-modal-body respuesta-modal-body-confirmacion">
                    <p className="respuesta-confirmacion-texto">
                        ¿Desea eliminar la Respuesta asignada al radicado{" "}
                        <strong>
                            {datos.Nradicado || "-"}
                        </strong>
                        ?
                    </p>
                </div>

                <div className="respuesta-modal-footer">

                    <button
                        className="respuesta-btn respuesta-btn-danger"
                        onClick={eliminarRespuesta}
                        type="button"
                    >
                        Sí, eliminar
                    </button>

                    <button
                        className="respuesta-btn respuesta-btn-secondary"
                        onClick={cerrar}
                        type="button"
                    >
                        No, cancelar
                    </button>

                </div>

            </div>
        </div>
    );
}