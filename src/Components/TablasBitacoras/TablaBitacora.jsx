import "./TablaBitacora.css";

export default function TablaBitacora({
    datos = [],
    onEditar,
    onEliminar,
    onVer
}) {
    // Extrae la parte YYYY-MM-DD directamente para evitar desfases de zona horaria
    const formatearFecha = (fechaStr) => {
        if (!fechaStr) return "-";
        return String(fechaStr).split("T")[0];
    };

    const recortarTexto = (texto = "", limite = 40) => {
        if (!texto) return "-";
        return texto.length > limite ? `${texto.substring(0, limite)}...` : texto;
    };

    const obtenerClaseEstado = (estado) => {
        switch (estado?.toLowerCase()) {
            case "pendiente":
                return "badge-pendiente";
            case "en proceso":
                return "badge-proceso";
            case "finalizada":
                return "badge-finalizada";
            default:
                return "badge-default";
        }
    };

    return (
        <table className="tabla-bitacora">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Empleado</th>
                    <th>Nombre</th>
                    <th>Tipo</th>
                    <th>Fecha Inicio</th>
                    <th>Fecha Fin</th>
                    <th>Descripción</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {datos && datos.length > 0 ? (
                    datos.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.empleado_nombre || "N/A"}</td>
                            <td><strong>{item.nombre || "Sin Nombre"}</strong></td>
                            <td>{item.tipo || "General"}</td>
                            <td>{formatearFecha(item.fechaInicio)}</td>
                            <td>{formatearFecha(item.fechaFin)}</td>
                            <td title={item.respuesta}>
                                {recortarTexto(item.respuesta)}
                            </td>
                            <td>
                                <span className={`badge ${obtenerClaseEstado(item.estado)}`}>
                                    {item.estado || "N/A"}
                                </span>
                            </td>
                            <td>
                                <div className="modals_btnBitacoras">
                                    <button
                                        type="button"
                                        className="btnVer"
                                        onClick={() => onVer?.(item)}
                                        title="Ver detalle"
                                    >
                                        Ver
                                    </button>
                                    <button
                                        type="button"
                                        className="btnEditar"
                                        onClick={() => onEditar?.(item)}
                                        title="Editar bitácora"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        type="button"
                                        className="btnEliminar"
                                        onClick={() => onEliminar?.(item)}
                                        title="Eliminar bitácora"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="9" className="sin-registros">
                            No hay bitácoras registradas.
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}