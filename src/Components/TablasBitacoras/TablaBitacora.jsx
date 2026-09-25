import "./TablaBitacora.css";

export default function TablaBitacora({
    datos = [],
    onEditar,
    onEliminar,
    onVer
}) {
<<<<<<< HEAD
    // Extrae la parte YYYY-MM-DD directamente para evitar desfases de zona horaria
    const formatearFecha = (fechaStr) => {
        if (!fechaStr) return "-";
        return String(fechaStr).split("T")[0];
    };

=======
    // Helper para formatear fechas ISO o cadenas yyyy-mm-dd a formato local
    const formatearFecha = (fechaStr) => {
        if (!fechaStr) return "-";
        const fecha = new Date(fechaStr);
        return isNaN(fecha.getTime())
            ? fechaStr
            : fecha.toLocaleDateString("es-CO", { timeZone: "UTC" });
    };

    // Helper para recortar descripciones largas en la vista tabular
>>>>>>> 9062b6ad61025fe79b83e8cfb65c1fb600ebb306
    const recortarTexto = (texto = "", limite = 40) => {
        if (!texto) return "-";
        return texto.length > limite ? `${texto.substring(0, limite)}...` : texto;
    };

<<<<<<< HEAD
=======
    // Helper para asignar clase según el estado
>>>>>>> 9062b6ad61025fe79b83e8cfb65c1fb600ebb306
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
<<<<<<< HEAD
                    <th>Empleado</th>
                    <th>Nombre</th>
                    <th>Tipo</th>
=======
                    <th>Título</th>
                    <th>Nombre</th>
>>>>>>> 9062b6ad61025fe79b83e8cfb65c1fb600ebb306
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
<<<<<<< HEAD
                            <td>{item.empleado_nombre || "N/A"}</td>
                            <td><strong>{item.nombre || "Sin Nombre"}</strong></td>
                            <td>{item.tipo || "General"}</td>
                            <td>{formatearFecha(item.fechaInicio)}</td>
                            <td>{formatearFecha(item.fechaFin)}</td>
                            <td title={item.respuesta}>
                                {recortarTexto(item.respuesta)}
=======
                            <td><strong>{item.titulo}</strong></td>
                            <td>{item.nombre}</td>
                            <td>{formatearFecha(item.fechaInicio)}</td>
                            <td>{formatearFecha(item.fechaFin)}</td>
                            <td title={item.descripcion}>
                                {recortarTexto(item.descripcion)}
>>>>>>> 9062b6ad61025fe79b83e8cfb65c1fb600ebb306
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
<<<<<<< HEAD
                        <td colSpan="9" className="sin-registros">
=======
                        <td colSpan="8" className="sin-registros">
>>>>>>> 9062b6ad61025fe79b83e8cfb65c1fb600ebb306
                            No hay bitácoras registradas.
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}