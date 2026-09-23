import { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import './BitacorasJefe.css';

export default function BitacorasJefe() {
  const [buscarEmpleado, setBuscarEmpleado] = useState('');
  const [modulosOpciones, setModulosOpciones] = useState('Todos');
  const [fechaFiltro, setFechaFiltro] = useState('');
  const [bitacoras, setBitacoras] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [bitacoraSeleccionada, setBitacoraSeleccionada] = useState(null);
  const [tituloFiltro, setTituloFiltro] = useState('');
  const [fechaInicioFiltro, setFechaInicioFiltro] = useState('');
  const [fechaFinalFiltro, setFechaFinalFiltro] = useState('');
  const [cargoFiltro, setCargoFiltro] = useState('');
  const [estadoOpciones, setEstadoOpciones] = useState('Todos');
  const [descripcionFiltro, setDescripcionFiltro] = useState('');

  // ===============================================
  // CARGAR REGISTROS DESDE LA BASE DE DATOS
  // ===============================================
  const cargarBitacoras = async () => {
    setCargando(true);
    try {
      const res = await fetch('http://127.0.0.1:4000/v1/bitacora', {
        headers: {
          'x-api-key': 'EmcaSecret2026'
        }
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();
      setBitacoras(Array.isArray(data) ? data : data.data || []);
    } catch (error) {
      console.error('Error al cargar bitácoras:', error);
      alert('Error de conexión con la base de datos');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarBitacoras();
  }, []);

  // ===============================================
  // MAPEO DE VALORES SEGURO (Múltiples alias)
  // ===============================================
  const obtenerValoresBitacora = (bit) => {
    const titulo = bit.titulo || 'N/A';

    const nombre =
      bit.empleado_nombre ||
      bit.empleado ||
      bit.usuario_nombre ||
      bit.usuario ||
      bit.nombre ||
      bit.user ||
      'Sin empleado';

    const fechaInicio =
      bit.fechaInicio ||
      bit.fechaFinal ||
      bit.created_at ||
      bit.createdAt ||
      bit.fecha_registro ||
      'N/A';

    const fechaFinal =
      bit.fecha ||
      bit.created_at ||
      bit.createdAt ||
      bit.fecha_registro ||
      'N/A';

    const cargo = bit.cargo || bit.rol || bit.puesto || 'N/A';

    const estado = bit.estado || bit.status || 'Completado';

    const descripcion = bit.descripcion || 'N/A';

    return { titulo, nombre, fechaInicio, fechaFinal, cargo, estado, descripcion };
  };

  // ===============================================
  // FILTRADO DINÁMICO
  // ===============================================
  const bitacorasFiltradas = bitacoras.filter((bit) => {
    const { titulo, nombre, fechaInicio, fechaFinal, cargo, estado, descripcion } =
      obtenerValoresBitacora(bit);

    const coincideTitulo =
      !tituloFiltro || titulo.toLowerCase().includes(tituloFiltro.toLowerCase());

    const coincideEmpleado =
      !buscarEmpleado || nombre.toLowerCase().includes(buscarEmpleado.toLowerCase());

    const coincideCargo =
      !cargoFiltro ||
      cargoFiltro === 'Todos' ||
      cargo.toLowerCase().includes(cargoFiltro.toLowerCase());

    const coincideEstado =
      estadoOpciones === 'Todos' ||
      !estadoOpciones ||
      estado.toLowerCase() === estadoOpciones.toLowerCase();

    const coincideFechaInicio =
      !fechaInicioFiltro || (fechaInicio && fechaInicio.includes(fechaInicioFiltro));

    const coincideFechaFinal =
      !fechaFinalFiltro || (fechaFinal && fechaFinal.includes(fechaFinalFiltro));

    const coincideFechaGeneral =
      !fechaFiltro ||
      (fechaInicio && fechaInicio.includes(fechaFiltro)) ||
      (fechaFinal && fechaFinal.includes(fechaFiltro));

    const coincideDescripcion =
      !descripcionFiltro ||
      descripcion.toLowerCase().includes(descripcionFiltro.toLowerCase());

    return (
      coincideTitulo &&
      coincideEmpleado &&
      coincideCargo &&
      coincideEstado &&
      coincideFechaInicio &&
      coincideFechaFinal &&
      coincideFechaGeneral &&
      coincideDescripcion
    );
  });

  // ===============================================
  // GENERAR PDF AUTOMÁTICO
  // ===============================================
  const generarPDF = () => {
    if (bitacorasFiltradas.length === 0) {
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
        'FechaInicio',
        'FechaFinal',
        'Cargo',
        'Estado',
        'Descripcion'
      ];

      const filas = bitacorasFiltradas.map((bit) => {
        const data = obtenerValoresBitacora(bit);
        return [
          data.titulo,
          data.nombre,
          data.fechaInicio,
          data.fechaFinal,
          data.cargo,
          data.estado,
          data.descripcion
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
    if (bitacorasFiltradas.length === 0) {
      alert('No hay registros de bitácoras para descargar.');
      return;
    }

    try {
      const datosExcel = bitacorasFiltradas.map((bit, index) => {
        const data = obtenerValoresBitacora(bit);
        return {
          ID: bit.id || index + 1,
          Titulo: data.titulo,
          Nombre: data.nombre,
          FechaInicio: data.fechaInicio,
          FechaFinal: data.fechaFinal,
          Cargo: data.cargo,
          Estado: data.estado,
          Descripcion: data.descripcion
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
    <div className="bitacoras-page">
      <div className="bitacoras-header">
        <div>
          <h2>📒 Bitácoras del Sistema</h2>
          <p>Consulta las actividades realizadas por los empleados</p>
        </div>

        <button className="btn-primary" onClick={cargarBitacoras}>
          🔄 Actualizar
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span>📝</span>
          <div>
            <h3>{bitacoras.length}</h3>
            <p>Registros Totales</p>
          </div>
        </div>

        <div className="stat-card">
          <span>👥</span>
          <div>
            <h3>
              {[...new Set(bitacoras.map((b) => obtenerValoresBitacora(b).nombre))].length}
            </h3>
            <p>Empleados activos</p>
          </div>
        </div>

        <div className="stat-card">
          <span>📅</span>
          <div>
            <h3>
              {
                bitacoras.filter((b) =>
                  obtenerValoresBitacora(b).fechaInicio?.startsWith(
                    new Date().toISOString().split('T')[0]
                  )
                ).length
              }
            </h3>
            <p>Hoy</p>
          </div>
        </div>

        <div className="stat-card">
          <span>⚠️</span>
          <div>
            <h3>
              {
                bitacoras.filter(
                  (b) => obtenerValoresBitacora(b).estado === 'Revisión'
                ).length
              }
            </h3>
            <p>En revisión</p>
          </div>
        </div>
      </div>

      <div className="filtros-card">
        <div className="filtros-grid">
          <div className="Campos">
            <label>Buscar empleado</label>
            <input
              type="text"
              placeholder="Nombre del empleado"
              value={buscarEmpleado}
              onChange={(e) => setBuscarEmpleado(e.target.value)}
            />
          </div>

          <div className="Campos">
            <label>Módulo</label>
            <select
              value={modulosOpciones}
              onChange={(e) => setModulosOpciones(e.target.value)}
            >
              <option value="Todos">Todos</option>
              <option value="Solicitudes">Solicitudes</option>
              <option value="Respuestas">Respuestas</option>
              <option value="Informes">Informes</option>
              <option value="Configuración">Configuración</option>
            </select>
          </div>

          <div className="Campos">
            <label>Fecha</label>
            <input
              type="date"
              value={fechaFiltro}
              onChange={(e) => setFechaFiltro(e.target.value)}
            />
          </div>
        </div>
      </div>

   
      <div className="contenedor-scroll">
        <div className="tabla-card">
          <div className="tabla-header">
            <h3>Últimos movimientos</h3>
          </div>

          <table className="tabla-bitacoras">
            <thead>
              <tr>
                <th>Titulo</th>
                <th>Nombre</th>
                <th>FechaInicio</th>
                <th>FechaFinal</th>
                <th>Cargo</th>
                <th>Estado</th>
                <th>Descripcion</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {cargando ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '1rem' }}>
                    Cargando bitácoras...
                  </td>
                </tr>
              ) : bitacorasFiltradas.length > 0 ? (
                bitacorasFiltradas.map((bit, index) => {
                  const item = obtenerValoresBitacora(bit);
                  return (
                    <tr key={bit.id || index}>
                      <td className="empleado-info">
                        <div className="avatar-sm">
                          {item.nombre && item.nombre !== 'Sin empleado'
                            ? item.nombre.substring(0, 2).toUpperCase()
                            : 'EM'}
                        </div>
                        <div>
                          <strong>{item.titulo}</strong>
                        </div>
                      </td>
                      <td>{item.nombre}</td>
                      <td>{item.fechaInicio}</td>
                      <td>{item.fechaFinal}</td>
                      <td>{item.cargo}</td>
                      <td>
                        <span
                          className={`badge ${
                            item.estado === 'Completado' ? 'completado' : 'revision'
                          }`}
                        >
                          {item.estado}
                        </span>
                      </td>
                      <td>{item.descripcion}</td>
                      <td className="acciones">
                        <button
                          className="btn_VerBitacoras"
                          onClick={() => setBitacoraSeleccionada(bit)}
                        >
                          👁️ Ver
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '1rem' }}>
                    No se encontraron registros.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          
          <div className="ContainerBotonesGenerar">
            <button className="btnGenerar_PDF" onClick={generarPDF}>
              Generar PDF
            </button>
            <button className="btnGenerar_EXCEL" onClick={generarExcel}>
              Generar Excel
            </button>
          </div>
        </div>
      </div>

      
      {bitacoraSeleccionada && (() => {
        const modalData = obtenerValoresBitacora(bitacoraSeleccionada);
        return (
          <div className="modal-overlay">
            <div className="modals-content">
              <div className="modal-header">
                <div className="btnCerrarContenido">
                </div>
                <h3>Detalle de Bitácora</h3>
              </div>

              <div className="modal-body">
                <p>
                  <strong>Titulo:</strong> {modalData.titulo}
                </p>
                <p>
                  <strong>Nombre:</strong> {modalData.nombre}
                </p>
                <p>
                  <strong>FechaInicio:</strong> {modalData.fechaInicio}
                </p>
                <p>
                  <strong>FechaFinal:</strong> {modalData.fechaFinal}
                </p>
                <p>
                  <strong>Cargo:</strong> {modalData.cargo}
                </p>
                <p>
                  <strong>Estado:</strong> {modalData.estado}
                </p>
                <p>
                  <strong>Descripcion:</strong> {modalData.descripcion}
                </p>
              </div>

              <div className="modal-footer">
                <button
                  className="btn-segundario"
                  onClick={() => setBitacoraSeleccionada(null)}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}