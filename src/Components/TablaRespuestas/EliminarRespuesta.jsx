import './Modal.css';

export default function EliminarRespuesta({ datos, cerrar, onExito }) {
    const eliminarRespuesta = async () => {
        try {
            const res = await fetch(`http://127.0.0.1:4000/v1/respuestas/${datos.id}`, {
                method: "DELETE",
                headers: {
                    "x-api-key": "EmcaSecret2026"
                }
            });

            const data = await res.json();

            if (res.ok) {
                alert(data.mensaje || "Eliminado correctamente");
                if (onExito) onExito();
                cerrar();
            } else {
                alert(data.mensaje || "No se pudo eliminar la respuesta");
            }
        } catch (error) {
            console.error(error);
            alert("Error de conexión con el servidor");
        }
    };

    return (
        <div className='overlay'>
            <div className='Modal_eliminarRespuesta'>
                <div className='containerEliminar_Respuesta'>
                    <h2>Eliminar Bitácora</h2>
                    <p>¿Desea eliminar la bitácora asignada al radicado <strong>{datos?.Nradicado}</strong>?</p>

                    <div className='Contenido_btnRespuestas'>
                        <button className='btn_eliminarRespuestas' onClick={eliminarRespuesta}>Sí</button>
                        <button className='btn_cerrarRespuesta' onClick={cerrar}>No</button>
                    </div>
                </div>
            </div>
        </div>
    );
}