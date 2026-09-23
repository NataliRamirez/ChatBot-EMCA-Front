import { useState, useEffect } from 'react';
import './SolicitudesJefe.css';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

export default function SolicitudesJefe() {

  const [solicitudes, setSolicitudes] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('Todas');
  const [solicitudSeleccionada, setSolicitudSeleccionada] = useState(null);

  const [tituloFiltro, setTitulo] = useState('');
  const [nombreFiltro, setNombre] = useState('');
  const [radicadoFiltro, setRadicado] = useState('');
  const [tipoFiltro, setTipo] = useState('');
  const [usuarioFiltro, setUsuario] = useState('');
  const [asuntoFiltro, setAsunto] = useState('');
  const [fechaInicioFiltro, setFechaInicio] = useState('');
  const [fechaFinalFiltro, setFechaFinal] = useState('');
  const [cargoFiltro, setCargo] = useState('');
  const [estadoFiltro, setEstado] = useState('');
  const [estadoOpciones, setEstadoOpciones] = useState('Todos');
  const [observacionFiltro, setObservacion] = useState('');

  // =========================
  // OBTENER SOLICITUDES
  // =========================
  const obtenerSolicitudes = async () => {

    try {

      const res = await fetch(
        'http://127.0.0.1:4000/v1/solicitudes',
        {
          headers: {
            'x-api-key': 'EmcaSecret2026'
          }
        }
      );

      if (!res.ok) {
        throw new Error('Error al obtener solicitudes');
      }

      const data = await res.json();

      setSolicitudes(data);

    } catch (error) {

      console.error('Error al conectar con la API:', error);

      setSolicitudes([]);

    }
  };

  useEffect(() => {
    obtenerSolicitudes();
  }, []);


  //===============================
  //MAPEO DE SOLICITUDES
  //===============================
  const obtenerValoresSolicitudes = (bit) =>{
       
     const titulo = bit.titulo ||
       'N/A'
      

       //TENER EN CUENTA ES VALIDAR ESTOS DATOS , asi como bienen del panel admin deben 
       // llegar al panel del jefe y n caso de que no concidan llegara nulo
     const nombre =
       bit.empleado_nombre ||
       bit.empleado ||
       bit.usuario_nombre ||
       bit.usuario ||
       bit.nombre ||
       bit.user ||
       'Sin empleado'

       const radicado =
         bit.Nradicado ||
         bit.radicado ||
         'N/A'

         const tipo =
          bit.tipo_solicitud ||
          bit.tipo  ||
          bit.radicado_solicitud ||
          bit.radicado ||
          'N/A'

         const usuario =
           bit.usuario_nombre ||
           bit.usuario_nombre ||
           bit.nombre ||
           bit.user ||
           'N/A'

           const asunto =
            bit.descripcion_asunto ||
            bit.descripcion ||
            bit.asunto ||
            'N/A'


           const fechaInicio =
           bit.fechaInicio ||
             bit.fechaFinal ||
             bit.created_at ||
             bit.createdAt  ||
             bit.fecha_registro ||
             'N/A';

             const fechaFinal =
               bit.fecha ||
               bit.created_at ||
               bit.createdAt ||
               bit.fecha_registro ||
               'N/A'

               const cargo =
                 bit.cargo ||
                 bit.rol  ||
                 bit.puesto ||
                 'N/A'

                 const estado =
                   bit.estado ||
                   bit.status ||
                   '';

                   const observacion =
                     bit.reporte_observacion ||
                     bit.reporte ||
                     bit.observacion ||
                     bit.descripcion ||
                     'N/A'

    return { titulo, nombre, radicado, tipo, usuario, asunto, fechaInicio, fechaFinal, cargo, estado, observacion}
  }

  // =========================
  // FILTROS
  // =========================
const solicitudesFiltradas = solicitudes.filter((bit) =>{
  const {titulo, nombre, radicado, tipo, usuario, asunto, fechaInicio, fechaFinal, cargo, estado, observacion} = 
  obtenerValoresSolicitudes(bit);

  const coincideTitulo =
    !tituloFiltro || titulo.toLowerCase().includes(tituloFiltro);

  const coincideNombre =
    !nombreFiltro || nombre.toLowerCase().includes(nombreFiltro);

  const coincideRadicado =
    !radicadoFiltro || radicado.toLowerCase().includes(radicadoFiltro);

  const coincideTipo =
    !tipoFiltro || tipo.toLocaleLowerCase().includes(tipoFiltro);
  
  const coincideUsuario =
    !usuario || usuario.toLocaleLowerCase().includes(usuarioFiltro);

  const coincideAsunto =
     !asuntoFiltro || asunto.toLocaleLowerCase().includes(asuntoFiltro);

  const coincideFechaInicio =
    !fechaInicio || (fechaInicio && fechaInicio.includes(fechaInicioFiltro));
  
  const coincideFechaFinal = 
    !fechaFinal || (fechaFinal && fechaFinal.includes(fechaFinalFiltro));

  const coincideCargo =
    !cargoFiltro ||
    cargoFiltro =='todos' ||
    cargo.toLowerCase() === estadoOpciones.toLowerCase();

  const coincideEstado =
    !estadoFiltro
    estadoFiltro ||
    estado.toLowerCase()===estadoOpciones.toLowerCase();

  const coincideObservacion = 
   !observacionFiltro || observacion.toLocaleLowerCase().includes(observacionFiltro);

  return (coincideTitulo && coincideNombre && coincideRadicado && coincideTipo && coincideUsuario && coincideAsunto && coincideFechaInicio && coincideFechaFinal && coincideCargo && coincideEstado && coincideObservacion);
})

//============================
//Generar PDF
//============================

const generarPDF = () => {
    if (solicitudesFiltradas.length === 0) {
      alert('No hay registros de bitácoras para descargar.');
      return;
    }

    try {
      const doc = new jsPDF();
      doc.setFontSize(14);
      doc.text('Reporte de Bitácoras del Sistema', 14, 15);

      const columnas = [
        'Titulo',
        'Nombre',
        'Radicado',
        'Tipo',
        'Usuario',
        'asunto',
        'FechaInicio',
        'FechaFinal',
        'Cargo',
        'Estado',
        'Observacion'
      ];

      const filas = solicitudesFiltradas.map((bit) => {
        const data = obtenerValoresSolicitudes(bit);
        return [
          data.titulo,
          data.nombre,
          data.radicado,
          data.tipo,
          data.usuario,
          data.asunto,
          data.fechaInicio,
          data.fechaFinal,
          data.cargo,
          data.estado,
          data.observacion
        ];
      });

      autoTable(doc, {
        startY: 22,
        head: [columnas],
        body: filas,
        styles: { fontSize: 8 },
        headStyles: { fillColor: [41, 128, 185] }
      });

      doc.save(`Bitacoras_${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error('Error al generar PDF:', error);
      alert('Ocurrió un error al generar el archivo PDF.');
    }
  };

  // ===============================================
  // GENERAR EXCEL AUTOMÁTICO
  // ===============================================
  const generarExcel = () => {
    if (solicitudesFiltradas.length === 0) {
      alert('No hay registros de bitácoras para descargar.');
      return;
    }

    try {
      const datosExcel = solicitudesFiltradas.map((bit, index) => {
        const data = obtenerValoresSolicitudes(bit);
        return {
          ID: bit.id || index + 1,
          Titulo: data.titulo,
          Nombre: data.nombre,
          Radicado: data.radicado,
          Tipo: data.tipo,
          Usuario: data.usuario,
          Asunto: data.Asunto,
          FechaInicio: data.fechaInicio,
          FechaFinal: data.fechaFinal,
          Cargo: data.cargo,
          Estado: data.estado,
          Observacion: data.observacion
        };
      });

      const hojaTrabajo = XLSX.utils.json_to_sheet(datosExcel);
      const libroTrabajo = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(libroTrabajo, hojaTrabajo, 'Bitácoras');

      XLSX.writeFile(
        libroTrabajo,
        `Bitacoras_${new Date().toISOString().split('T')[0]}.xlsx`
      );
    } catch (error) {
      console.error('Error al generar Excel:', error);
      alert('Ocurrió un error al generar el archivo Excel.');
    }
  };
  return (

    <div className="solicitudes-page">

      <div className="solicitudes-header">

        <div>
          <h2>📥 Gestor de Solicitudes</h2>
          <p>
            Administra y consulta los requerimientos recibidos
          </p>
        </div>

        <button
          className="btn-actualizar"
          onClick={obtenerSolicitudes}
        >
          🔄 Actualizar
        </button>

      </div>

      {/* Filtros */}
      <div className="filtros-bar">

        <input
          type="text"
          placeholder="🔍 Buscar por radicado o ciudadano..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="input-busqueda"
        />

        <div className="grupo-select">

          <label>Filtrar por Estado:</label>

          <select
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
          >

            <option value="Todas">Todas</option>
            <option value="Pendiente">Pendientes</option>
            <option value="En proceso">En proceso</option>
            <option value="Respondida">Respondidas</option>

          </select>

        </div>

      </div>

      {/* Tabla */}
      <div className="tablas-card">

        <table className="tablas-solicitudes">

          <thead>

            <tr>
              <th>Titulo</th>
              <th>Nombre</th>
              <th>Radicado</th>
              <th>tipo</th>
              <th>usuario</th>
              <th>Asunto</th>
              <th>Fecha Inicio</th>
              <th>Fecha Final</th>
              <th>Cargo</th>
              <th>Estado</th>
              <th>Observaciones</th>
            </tr>

          </thead>

          <tbody>

            {solicitudesFiltradas.length > 0 ? (

              solicitudesFiltradas.map((sol) => (

                <tr key={sol.id}>

                  <td>
                    <strong>{sol.titulo}</strong>
                  </td>

                  <td>
                      <strong>{sol.nombre}</strong>
                  </td>

                  <td>
                    <strong>{sol.radicado}</strong>
                  </td>
                    
                  <td>
                    <span className="badge-tipo">
                      {sol.tipo}
                    </span>
                  </td>

                  <td>
                    <strong>{sol.asunto}</strong>
                  </td>

                  <td>
                    <strong>{sol.fechaInicio}</strong>
                  </td>

                  <td>
                    <strong>{sol.fechaFinal}</strong>
                  </td>

                  <td>
                    <strong>{sol.cargo}</strong>
                  </td>

                  <td>

                    <span
                      className={`badge-estado ${sol.estado
                        .toLowerCase()
                        .replace(' ', '-')}`}
                    >
                      {sol.estado}
                    </span>

                  </td>

                  <td>
                    <strong>{sol.Observacion}</strong>
                  </td>

                  <td>

                    <button
                      className="btn-accion"
                      onClick={() => setSolicitudSeleccionada(sol)}
                    >
                      👁️ Ver
                    </button>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="8"
                  className="sin-resultados"
                >
                  No se encontraron solicitudes.
                </td>

              </tr>

            )}

          </tbody>
        </table>
               
               <div className='contenidoBotones'>
                    <button className='btn_descagarPDF' onClick={generarPDF}>Descargar PDF</button>
                    <button className='btn_descargarEXCEL' onClick={generarExcel}>Descargar Excel</button>
               </div>
      </div>

      {/* Modal */}
      {solicitudSeleccionada && (

        <div className="modal-overlay">
          <div className="modal-content">

            <div className="modal-header">
                <div className='Contenido_Cerrar'>
                </div>
              <h3>
                Solicitud {solicitudSeleccionada.radicado}
              </h3>
            </div>

            <div className="modal-body">

              <p>
                <strong>Ciudadano:</strong>{' '}
                {solicitudSeleccionada.nombre}
              </p>

              <p>
                <strong>Tipo:</strong>{' '}
                {solicitudSeleccionada.tipo}
              </p>

              <p>
                <strong>Fecha Inicio:</strong>{' '}
                {solicitudSeleccionada.fechaInicio}
              </p>

              <p>
                <strong>Fecha Final:</strong>{' '}
                {solicitudSeleccionada.fechaFinal}
              </p>

              <p>
                <strong>Estado:</strong>{' '}
                {solicitudSeleccionada.estado}
              </p>

              

              <p>
                <strong>Asunto:</strong>
              </p>

              <div className="box-detalle">
                {solicitudSeleccionada.asunto}
              </div>

            

              <p>
                <strong>Observación:</strong>
              </p>

              <div className="box-detalle">
                {solicitudSeleccionada.observacion}
              </div>

            </div>

            <div className="modal-footer">

              <button
                className="btn-segundario"
                onClick={() => setSolicitudSeleccionada(null)}
              >
                Cerrar
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}