import "./Modal.css";

export default function ModalEliminar({ datos, cerrar }) {

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
                alert(data.mensaje);
                cerrar();
            } else {
                alert(data.mensaje || "No se pudo eliminar la bitácora");
            }

        } catch (error) {
            console.error(error);
            alert("Error de conexión con el servidor");
        }

    };

    return (
        <div className="overlay">
            <div className="modals">
                <div className="contenido_Eliminar">

                    <h2>Eliminar Bitácora</h2>

                    <p>¿Desea eliminar la bitácora?</p>

                    <button
                        className="btnEliminarSi"
                        onClick={eliminar}
                    >
                        Sí
                    </button>

                    <button
                        className="btnEliminarNo"
                        onClick={cerrar}
                    >
                        No
                    </button>

                </div>
            </div>
        </div>
    );

}