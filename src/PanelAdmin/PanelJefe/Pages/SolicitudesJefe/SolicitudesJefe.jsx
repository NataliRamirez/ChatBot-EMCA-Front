import { useState, useEffect, useRef } from 'react';
import './SolicitudesJefe.css';

// ===============================================
// FORMATEAR FECHA
// ===============================================
const formatearFecha = (fecha) => {
  if (!fecha || fecha === 'N/A') return 'N/A';

  const fechaStr = String(fecha);

  if (fechaStr.includes('T')) {
    const [fechaParte, horaParte] = fechaStr.split('T');
    const hora = horaParte ? horaParte.substring(0, 5) : '';

    return hora
      ? `${fechaParte} ${hora}`
      : fechaParte;
  }

  return fechaStr.length >= 16
    ? fechaStr.substring(0, 16)
    : fechaStr;
};

// ===============================================
// CONVERTIR FECHA PARA COMPARAR CON DATETIME-LOCAL
// ===============================================
const normalizarFechaFiltro = (fecha) => {
  if (!fecha || fecha === 'N/A') return '';

  const fechaStr = String(fecha);

  if (fechaStr.includes('T')) {
    return fechaStr.substring(0, 16).replace('T', ' ');
  }

  return fechaStr.substring(0, 16);
};

export default function SolicitudesJefe() {
  const [solicitudes, setSolicitudes] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('Todas');
  const [fechaFiltro, setFechaFiltro] = useState('');
  const [solicitudSeleccionada, setSolicitudSeleccionada] = useState(null);
  const [cargando, setCargando] = useState(false);

  const inputFechaRef = useRef(null);

  // ===============================================
  // ABRIR CALENDARIO NATIVO
  // ===============================================
  const abrirCalendario = () => {
    if (!inputFechaRef.current) return;

    if (
      'showPicker' in HTMLInputElement.prototype
    ) {
      inputFechaRef.current.showPicker();
    } else {
      inputFechaRef.current.focus();
    }
  };

  // ===============================================
  // OBTENER SOLICITUDES
  // ===============================================
  const obtenerSolicitudes = async () => {
    setCargando(true);

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
        throw new Error(
          `Error HTTP ${res.status}`
        );
      }

      const data = await res.json();

      setSolicitudes(
        Array.isArray(data)
          ? data
          : data.data || []
      );
    } catch (error) {
      console.error(
        'Error al conectar con la API:',
        error
      );

      setSolicitudes([]);

      alert(
        'Error de conexión con el servidor.'
      );
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerSolicitudes();
  }, []);

  // ===============================================
  // MAPEO DE SOLICITUD
  // ===============================================
  const obtenerValoresSolicitudes = (bit) => {
    const titulo =
      bit.titulo || 'N/A';

    const nombre =
      bit.nombre ||
      bit.empleado_nombre ||
      bit.empleado ||
      bit.usuario_nombre ||
      bit.usuario ||
      'Sin empleado';

    const radicado =
      bit.radicado ||
      bit.Nradicado ||
      'N/A';

    const tipo =
      bit.tipo ||
      bit.tipo_solicitud ||
      'N/A';

    const usuario =
      bit.usuario ||
      bit.usuario_nombre ||
      'N/A';

    const asunto =
      bit.asunto ||
      bit.descripcion_asunto ||
      bit.descripcion ||
      'N/A';

    const fechaInicioOriginal =
      bit.fechaInicio ||
      bit.created_at ||
      bit.createdAt ||
      bit.fecha_registro;

    const fechaFinalOriginal =
      bit.fechaFinal ||
      bit.fecha ||
      bit.updated_at;

    const fechaInicio =
      formatearFecha(fechaInicioOriginal);

    const fechaFinal =
      formatearFecha(fechaFinalOriginal);

    const cargo =
      bit.cargo ||
      bit.rol ||
      bit.puesto ||
      'N/A';

    const estado =
      bit.estado ||
      bit.status ||
      'N/A';

    const observacion =
      bit.observacion ||
      bit.reporte_observacion ||
      'N/A';

    return {
      titulo,
      nombre,
      radicado,
      tipo,
      usuario,
      asunto,
      fechaInicio,
      fechaFinal,
      cargo,
      estado,
      observacion,
      fechaInicioOriginal,
      fechaFinalOriginal
    };
  };

  // ===============================================
  // FILTRAR SOLICITUDES
  // ===============================================
  const solicitudesFiltradas =
    solicitudes.filter((bit) => {
      const data =
        obtenerValoresSolicitudes(bit);

      const texto =
        busqueda
          .toLowerCase()
          .trim();

      const coincideBusqueda =
        !texto ||
        String(data.radicado)
          .toLowerCase()
          .includes(texto) ||
        String(data.nombre)
          .toLowerCase()
          .includes(texto) ||
        String(data.titulo)
          .toLowerCase()
          .includes(texto) ||
        String(data.tipo)
          .toLowerCase()
          .includes(texto) ||
        String(data.usuario)
          .toLowerCase()
          .includes(texto) ||
        String(data.asunto)
          .toLowerCase()
          .includes(texto);

      const coincideEstado =
        filtroEstado === 'Todas' ||
        data.estado
          .toLowerCase()
          .trim() ===
          filtroEstado
            .toLowerCase()
            .trim();

      let coincideFecha = true;

      if (fechaFiltro) {
        const filtro =
          fechaFiltro
            .replace('T', ' ');

        const inicio =
          normalizarFechaFiltro(
            data.fechaInicioOriginal
          );

        const final =
          normalizarFechaFiltro(
            data.fechaFinalOriginal
          );

        coincideFecha =
          inicio.includes(filtro) ||
          final.includes(filtro);
      }

      return (
        coincideBusqueda &&
        coincideEstado &&
        coincideFecha
      );
    });

  // ===============================================
  // LIMPIAR FILTROS
  // ===============================================
  const limpiarFiltros = () => {
    setBusqueda('');
    setFiltroEstado('Todas');
    setFechaFiltro('');
  };

  const hayFiltros =
    busqueda ||
    filtroEstado !== 'Todas' ||
    fechaFiltro;

  // ===============================================
  // GENERAR PDF
  // ===============================================
  const generarPDF = async () => {
    try {
      const res = await fetch(
        'http://127.0.0.1:4000/v1/solicitudes/pdf',
        {
          method: 'GET',
          headers: {
            'x-api-key': 'EmcaSecret2026'
          }
        }
      );

      if (!res.ok) {
        throw new Error(
          'Error al generar PDF'
        );
      }

      const blob =
        await res.blob();

      const url =
        window.URL.createObjectURL(
          blob
        );

      const a =
        document.createElement('a');

      a.href = url;

      a.download =
        `Reporte_Solicitudes_EMCA_${new Date()
          .toISOString()
          .split('T')[0]}.pdf`;

      document.body.appendChild(a);

      a.click();

      a.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);

      alert(
        'Error al obtener el archivo PDF.'
      );
    }
  };

  // ===============================================
  // GENERAR EXCEL
  // ===============================================
  const generarExcel = async () => {
    try {
      const res = await fetch(
        'http://127.0.0.1:4000/v1/solicitudes/excel',
        {
          method: 'GET',
          headers: {
            'x-api-key': 'EmcaSecret2026'
          }
        }
      );

      if (!res.ok) {
        throw new Error(
          'Error al generar Excel'
        );
      }

      const blob =
        await res.blob();

      const url =
        window.URL.createObjectURL(
          blob
        );

      const a =
        document.createElement('a');

      a.href = url;

      a.download =
        `Reporte_Solicitudes_EMCA_${new Date()
          .toISOString()
          .split('T')[0]}.xlsx`;

      document.body.appendChild(a);

      a.click();

      a.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);

      alert(
        'Error al obtener el archivo Excel.'
      );
    }
  };

  return (
    <div className="solicitudes-page">

      {/* =========================================
          HEADER
      ========================================== */}
      <div className="solicitudes-header">
        <div>
          <h2>
            📥 Gestor de Solicitudes
          </h2>

          <p>
            Administra y consulta los
            requerimientos recibidos
          </p>
        </div>

        <button
          className="btn-actualizar"
          onClick={obtenerSolicitudes}
          disabled={cargando}
        >
          {cargando
            ? '⏳ Cargando...'
            : '🔄 Actualizar'}
        </button>
      </div>

      {/* =========================================
          ESTADÍSTICAS
      ========================================== */}
      <div className="stats-grid">

        <div className="stat-card">
          <span>📋</span>

          <div>
            <h3>
              {solicitudes.length}
            </h3>

            <p>
              Solicitudes totales
            </p>
          </div>
        </div>

        <div className="stat-card">
          <span>⏳</span>

          <div>
            <h3>
              {
                solicitudes.filter(
                  (s) =>
                    obtenerValoresSolicitudes(s)
                      .estado
                      .toLowerCase() ===
                    'pendiente'
                ).length
              }
            </h3>

            <p>
              Pendientes
            </p>
          </div>
        </div>

        <div className="stat-card">
          <span>🔄</span>

          <div>
            <h3>
              {
                solicitudes.filter(
                  (s) =>
                    obtenerValoresSolicitudes(s)
                      .estado
                      .toLowerCase() ===
                    'en proceso'
                ).length
              }
            </h3>

            <p>
              En proceso
            </p>
          </div>
        </div>

        <div className="stat-card">
          <span>✅</span>

          <div>
            <h3>
              {
                solicitudes.filter(
                  (s) =>
                    obtenerValoresSolicitudes(s)
                      .estado
                      .toLowerCase() ===
                    'respondida'
                ).length
              }
            </h3>

            <p>
              Respondidas
            </p>
          </div>
        </div>

      </div>

      {/* =========================================
          FILTROS
      ========================================== */}
      <div className="filtros-card">

        <div className="filtros-grid">

          <div className="campo">
            <label>
              Buscar solicitud
            </label>

            <input
              type="text"
              placeholder="🔍 Radicado, título, ciudadano..."
              value={busqueda}
              onChange={(e) =>
                setBusqueda(e.target.value)
              }
            />
          </div>

          <div className="campo">
            <label>
              Estado
            </label>

            <select
              value={filtroEstado}
              onChange={(e) =>
                setFiltroEstado(
                  e.target.value
                )
              }
            >
              <option value="Todas">
                Todos los estados
              </option>

              <option value="Pendiente">
                Pendientes
              </option>

              <option value="En proceso">
                En proceso
              </option>

              <option value="Respondida">
                Respondidas
              </option>
            </select>
          </div>

          <div className="campo">
            <label>
              Fecha y hora
            </label>

            <div className="input-fecha-wrapper">

              <input
                ref={inputFechaRef}
                type="datetime-local"
                value={fechaFiltro}
                onChange={(e) =>
                  setFechaFiltro(
                    e.target.value
                  )
                }
              />

            

            </div>
          </div>

          <div className="campo campo-boton">

            <button
              className="btn-limpiar"
              onClick={limpiarFiltros}
              disabled={!hayFiltros}
            >
               Limpiar filtros
            </button>

          </div>

        </div>

        <div className="resultado-filtros">
          Mostrando{' '}
          <strong>
            {solicitudesFiltradas.length}
          </strong>{' '}
          de{' '}
          <strong>
            {solicitudes.length}
          </strong>{' '}
          solicitudes
        </div>

      </div>

      {/* =========================================
          TABLA
      ========================================== */}
      <div className="tabla-card">

        <div className="tabla-header">
          <div>
            <h3>
              Solicitudes registradas
            </h3>

            <p>
              Consulta la información
              detallada de cada solicitud.
            </p>
          </div>
        </div>

        <div className="tabla-scroll">

          <table className="tabla-solicitudes">

            <thead>
              <tr>
                <th>Título</th>
                <th>Nombre</th>
                <th>Radicado</th>
                <th>Tipo</th>
                <th>Usuario</th>
                <th>Asunto</th>
                <th>Fecha Inicio</th>
                <th>Fecha Final</th>
                <th>Cargo</th>
                <th>Estado</th>
                <th>Observación</th>
                <th>Acción</th>
              </tr>
            </thead>

            <tbody>

              {cargando ? (

                <tr>
                  <td
                    colSpan="12"
                    className="sin-resultados"
                  >
                     Cargando solicitudes...
                  </td>
                </tr>

              ) : solicitudesFiltradas.length > 0 ? (

                solicitudesFiltradas.map(
                  (sol, index) => {

                    const data =
                      obtenerValoresSolicitudes(
                        sol
                      );

                    const estadoClase =
                      data.estado
                        .toLowerCase()
                        .replace(
                          /\s+/g,
                          '-'
                        );

                    return (
                      <tr
                        key={
                          sol.id ||
                          sol.ID ||
                          index
                        }
                      >

                        <td>
                          <strong>
                            {data.titulo}
                          </strong>
                        </td>

                        <td>
                          {data.nombre}
                        </td>

                        <td>
                          <strong className="radicado">
                            {data.radicado}
                          </strong>
                        </td>

                        <td>
                          <span className="badge-tipo">
                            {data.tipo}
                          </span>
                        </td>

                        <td>
                          {data.usuario}
                        </td>

                        <td className="celda-descripcion">
                          {data.asunto}
                        </td>

                        <td>
                          {data.fechaInicio}
                        </td>

                        <td>
                          {data.fechaFinal}
                        </td>

                        <td>
                          {data.cargo}
                        </td>

                        <td>
                          <span
                            className={`badge-estado ${estadoClase}`}
                          >
                            {data.estado}
                          </span>
                        </td>

                        <td className="celda-descripcion">
                          {data.observacion}
                        </td>

                        <td>

                          <button
                            className="btn-accion"
                            onClick={() =>
                              setSolicitudSeleccionada(
                                data
                              )
                            }
                          >
                            👁️ Ver
                          </button>

                        </td>

                      </tr>
                    );
                  }
                )

              ) : (

                <tr>
                  <td
                    colSpan="12"
                    className="sin-resultados"
                  >
                    📭 No se encontraron
                    solicitudes con los
                    filtros seleccionados.
                  </td>
                </tr>

              )}

            </tbody>

          </table>

        </div>

        {/* =========================================
            BOTONES DESCARGA
        ========================================== */}

        <div className="contenidoBotones">

          <button
            className="btn-descargar btn-pdf"
            onClick={generarPDF}
          >
            📄 Descargar PDF
          </button>

          <button
            className="btn-descargar btn-excel"
            onClick={generarExcel}
          >
            📊 Descargar Excel
          </button>

        </div>

      </div>

      {/* =========================================
          MODAL
      ========================================== */}

      {solicitudSeleccionada && (

        <div
          className="modal-overlay"
          onClick={() =>
            setSolicitudSeleccionada(null)
          }
        >

          <div
            className="modal-content"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="modal-header">

              <div>
                <span className="modal-etiqueta">
                  SOLICITUD
                </span>

                <h3>
                  #{solicitudSeleccionada.radicado}
                </h3>
              </div>

            </div>

            <div className="modal-body">

              <div className="detalle-grid">

                <div className="detalle-item">
                  <span>Título</span>
                  <strong>
                    {solicitudSeleccionada.titulo}
                  </strong>
                </div>

                <div className="detalle-item">
                  <span>Ciudadano / Empleado</span>
                  <strong>
                    {solicitudSeleccionada.nombre}
                  </strong>
                </div>

                <div className="detalle-item">
                  <span>Tipo</span>
                  <strong>
                    {solicitudSeleccionada.tipo}
                  </strong>
                </div>

                <div className="detalle-item">
                  <span>Usuario registra</span>
                  <strong>
                    {solicitudSeleccionada.usuario}
                  </strong>
                </div>

                <div className="detalle-item">
                  <span>Cargo</span>
                  <strong>
                    {solicitudSeleccionada.cargo}
                  </strong>
                </div>

                <div className="detalle-item">
                  <span>Fecha inicio</span>
                  <strong>
                    {solicitudSeleccionada.fechaInicio}
                  </strong>
                </div>

                <div className="detalle-item">
                  <span>Fecha final</span>
                  <strong>
                    {solicitudSeleccionada.fechaFinal}
                  </strong>
                </div>

                <div className="detalle-item">
                  <span>Estado</span>
                  <strong>
                    {solicitudSeleccionada.estado}
                  </strong>
                </div>

              </div>

              <div className="detalle-bloque">

                <span>
                  Asunto
                </span>

                <div className="box-detalle">
                  {solicitudSeleccionada.asunto}
                </div>

              </div>

              <div className="detalle-bloque">

                <span>
                  Observación
                </span>

                <div className="box-detalle">
                  {solicitudSeleccionada.observacion}
                </div>

              </div>

            </div>

            <div className="modal-footer">

              <button
                className="btn-secundario"
                onClick={() =>
                  setSolicitudSeleccionada(
                    null
                  )
                }
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
