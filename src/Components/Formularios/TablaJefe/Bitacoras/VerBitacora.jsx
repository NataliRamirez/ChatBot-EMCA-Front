import 'Modalsjefe.css';

export default function VerBitacora (){

    return(
         <div className="tablaContainer">
            <table>
                <thead>
                    <tr>
                        <th>Empleado</th>
                        <th>Módulo</th>
                        <th>Accion</th>
                        <th>Fecha</th>
                        <th>Estado</th>
                        <th>Accion</th>
                    </tr>
                </thead>

                <tbody>
                    {filtradas.map(item => (
                        <tr key={item.id}>
                            <td>{item.empleado}</td>
                            <td>{item.módulo}</td>
                            <td>{item.accion}</td>
                            <td>{item.fecha}</td>
                            <td>{item.estado}</td>
                            <td>{item.acciones}</td>

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
                                    className="btnVer"
                                    onClick={() => onVer(item)}
                                >
                                    Ver
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}