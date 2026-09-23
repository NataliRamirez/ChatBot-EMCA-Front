import './Modal.css';

export default function VerRespuesta({ datos, cerrar }) {
    if (!datos) return null;

    return (
        <div className="overlay">
            <div className="Modal">
                <h2>Información de la Respuesta</h2>

                <label>Número de Radicado</label>
                <input type="text" value={datos.Nradicado || ""} readOnly />

                <label>Título</label>
                <input type="text" value={datos.titulo || ""} readOnly />

                <label>Nombre</label>
                <input type="text" value={datos.nombre || ""} readOnly />

                <label>Teléfono</label>
                <input type="text" value={datos.telefono || ""} readOnly />

                <label>Teléfono Empresa</label>
                <input type="text" value={datos.telefonoEmpresa || ""} readOnly />

                <label>Tipo de Respuesta</label>
                <input type="text" value={datos.tipoRespuesta || ""} readOnly />

                <label>Estado</label>
                <input type="text" value={datos.estados || ""} readOnly />

                <label>Descripción</label>
                <textarea value={datos.descripcion || ""} readOnly />

                <label>Fecha Inicio</label>
                <input type="date" value={datos.fechaInicio || ""} readOnly />

                <label>Fecha Fin</label>
                <input type="date" value={datos.fechaFinal || ""} readOnly />

               <div className='content'>
                    <button className="btn_CerrarModal" onClick={cerrar}>
                       Cerrar
                   </button>
               </div>
            </div>
        </div>
    );
}