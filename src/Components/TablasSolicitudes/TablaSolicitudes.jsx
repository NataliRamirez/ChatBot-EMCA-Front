import "./TablaSolicitudes.css";

export default function TablaSolicitudes({
    solicitudes,
    buscar,
    onVer,
    onAsignar,
    onHistorial
}) {
    /**FILTRO PARA BUSCAR EL ESTADO DE LA SOLICITUD */
    const filtradas = solicitudes.filter(item =>
        (item.nombre || "")
            .toLowerCase()
            .includes(buscar.toLowerCase())
    );

    return (
        <div className="tablaContainer">
            <table>
                <thead>
                    <tr>
                        <th>Radicado</th>
                        <th>Tipo</th>
                        <th>Ciudadano</th>
                        <th>Asunto</th>
                        <th>Fecha Inicio</th>
                        <th>Fecha Final</th>
                        <th>Cargo</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {filtradas.map(item => (
                        <tr key={item.id}>
                            <td>{item.radicado}</td>
                            <td>{item.tipo}</td>
                            <td>{item.nombre}</td>
                            <td>{item.asunto}</td>
                            <td>{item.fechaInicio}</td>
                            <td>{item.fechaFinal}</td>
                            <td>{item.cargo}</td>

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
                                    {item.estado}
                                </span>
                            </td>

                            <td className="acciones">

                                <button
                                    className="btn_Ver"
                                    onClick={() => onVer(item)}
                                >
                                    Ver
                                </button>

                                <button
                                    className="btn_Editar"
                                    onClick={() => onAsignar(item)}
                                >
                                    Asignar
                                </button>

                                <button
                                    className="btn_Historial"
                                    onClick={() => onHistorial(item)}
                                >
                                    Historial
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}