import './TablaRespuestas.css';

export default function TablaRespuestas({ respuestas = [], buscar = "", onVer, onEditar, onEliminar }) {
    const filtradas = respuestas.filter(item =>
        (item.nombre || "").toLowerCase().includes(buscar.toLowerCase()) ||
        (item.Nradicado || "").toString().toLowerCase().includes(buscar.toLowerCase())
    );

    return (
        <div className='ContenidoRespuestas'>
            <div className='modal_respuestas'>
                    <table>
                        <thead>
                            <tr>
                                <th>N. Radicado</th>
                                <th>Título</th>
                                <th>Nombre</th>
                                <th>Tipo Respuesta</th>
                                <th>Estado</th>
                                <th>Fecha Inicio</th>
                                <th>Fecha Final</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filtradas.length > 0 ? (
                                filtradas.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.Nradicado}</td>
                                        <td>{item.titulo}</td>
                                        <td>{item.nombre}</td>
                                        <td>{item.tipoRespuesta}</td>
                                        <td>{item.estados}</td>
                                        <td>{item.fechaInicio}</td>
                                        <td>{item.fechaFinal}</td>
                                        <td className="FuncionalidadesRespuestas">
                                            <button className='btn_verRespuesta' onClick={() => onVer(item)}>Ver</button>
                                            <button className='btn_EditarRespuesta' onClick={() => onEditar(item)}>Editar</button>
                                            <button className='btn_EliminarRespuesta' onClick={() => onEliminar(item)}>Eliminar</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" style={{ textAlign: 'center' }}>No se encontraron registros</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
    );
}