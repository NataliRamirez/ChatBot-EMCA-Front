import "./TablaBitacora.css";

export default function TablaBitacora({
    datos = [],
    onEditar,
    onEliminar,
    onVer
}) {
    // Helper para formatear fechas ISO o cadenas yyyy-mm-dd a formato local
    const formatearFecha = (fechaStr) => {
        if (!fechaStr) return "-";
        const fecha = new Date(fechaStr);
        return isNaN(fecha.getTime())
            ? fechaStr
            : fecha.toLocaleDateString("es-CO", { timeZone: "UTC" });
    };

    // Helper para recortar descripciones largas en la vista tabular
    const recortarTexto = (texto = "", limite = 40) => {
        if (!texto) return "-";
        return texto.length > limite ? `${texto.substring(0, limite)}...` : texto;
    };

    // Helper para asignar clase según el estado
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
                    <th>Título</th>
                    <th>Nombre</th>
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
                            <td><strong>{item.titulo}</strong></td>
                            <td>{item.nombre}</td>
                            <td>{formatearFecha(item.fechaInicio)}</td>
                            <td>{formatearFecha(item.fechaFin)}</td>
                            <td title={item.descripcion}>
                                {recortarTexto(item.descripcion)}
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
                        <td colSpan="8" className="sin-registros">
                            No hay bitácoras registradas.
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}