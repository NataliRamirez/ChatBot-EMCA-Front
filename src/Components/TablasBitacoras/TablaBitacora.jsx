import "./TablaBitacora.css";

export default function TablaBitacora({
    datos = [],
    onEditar,
    onEliminar,
    onVer
}) {
    // Helper para formatear fechas extrayendo YYYY-MM-DD o usando el formato local
    const formatearFecha = (fechaStr) => {
        if (!fechaStr) return "-";
        if (typeof fechaStr === "string" && fechaStr.includes("T")) {
            return fechaStr.split("T")[0];
        }
        const fecha = new Date(fechaStr);
        return isNaN(fecha.getTime())
            ? fechaStr
            : fecha.toLocaleDateString("es-CO", { timeZone: "UTC" });
    };

    // Helper para recortar descripciones o respuestas largas en la tabla
    const recortarTexto = (texto = "", limite = 40) => {
        if (!texto) return "-";
        return texto.length > limite ? `${texto.substring(0, limite)}...` : texto;
    };

    // Helper para asignar clase CSS según el estado
    const obtenerClaseEstado = (estado) => {
        switch (estado?.toLowerCase()) {
            case "pendiente":
                return "badge-pendiente";
            case "en proceso":
                return "badge-proceso";
            case "finalizada":
            case "completado":
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
                    <th>Título / Nombre</th>
                    <th>Empleado</th>
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
                    datos.map((item, index) => {
                        const tituloNombre = item.titulo || item.nombre || "Sin Nombre";
                        const empleado = item.empleado_nombre || item.empleado || item.usuario || "N/A";
                        const tipo = item.tipo || item.cargo || "General";
                        const fechaInicio = item.fechaInicio || item.fecha_registro || item.created_at;
                        const fechaFin = item.fechaFin || item.fechaFinal || item.fecha;
                        const descripcionTexto = item.descripcion || item.respuesta || "";

                        return (
                            <tr key={item.id || index}>
                                <td>{item.id || index + 1}</td>
                                <td><strong>{tituloNombre}</strong></td>
                                <td>{empleado}</td>
                                <td>{tipo}</td>
                                <td>{formatearFecha(fechaInicio)}</td>
                                <td>{formatearFecha(fechaFin)}</td>
                                <td title={descripcionTexto}>
                                    {recortarTexto(descripcionTexto)}
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
                        );
                    })
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