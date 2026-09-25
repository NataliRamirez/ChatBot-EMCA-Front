import "./TablasVistaPrevia.css";

export default function TablaVistaPrevia({
    datos = [],
    generarPDF,
    generarExcel,
    editarInforme,
    eliminarInforme,
    verInforme
}) {
    if (!Array.isArray(datos) || datos.length === 0) {
        return (
            <div className="sinDatos">
                <h3>No hay registros para mostrar.</h3>
            </div>
        );
    }

    return (
        <div className="tablaVistaPrevia">
            <h2>Vista Previa del Informe</h2>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Empleado</th>
                        <th>Nombre</th>
                        <th>Tipo</th>
                        <th>Fecha Inicio</th>
                        <th>Fecha Fin</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {datos.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.empleado_nombre || "Sin empleado"}</td>
                            <td>{item.nombre || "Sin nombre"}</td>
                            <td>{item.tipo || "N/A"}</td>
                            <td>{item.fechaInicio || "N/A"}</td>
                            <td>{item.fechaFin || item.fechaFinal || "N/A"}</td>
                            <td>
                                <span
                                    className={
                                        item.estado === "Pendiente"
                                            ? "pendiente"
                                            : item.estado === "En proceso"
                                            ? "proceso"
                                            : "respondida"
                                    }
                                >
                                    {item.estado || "Pendiente"}
                                </span>
                            </td>
                            <td className="accionesTabla">
                                {verInforme && (
                                    <button className="btn_verInforme" onClick={() => verInforme(item)}>
                                        Ver
                                    </button>
                                )}
                                {editarInforme && (
                                    <button className="btn_editarVista" onClick={() => editarInforme(item)}>
                                        Editar
                                    </button>
                                )}
                                {eliminarInforme && (
                                    <button className="btn_eliminarVista" onClick={() => eliminarInforme(item)}>
                                        Eliminar
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="content_btn_vista">
                <button className="btnPDF" onClick={generarPDF}>
                    Generar PDF
                </button>
                <button className="btnExcel" onClick={generarExcel}>
                    Generar Excel
                </button>
            </div>
        </div>
    );
}