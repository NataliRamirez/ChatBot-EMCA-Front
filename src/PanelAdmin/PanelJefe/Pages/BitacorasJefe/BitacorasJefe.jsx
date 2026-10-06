import { useState, useEffect, useRef } from 'react';
import './BitacorasJefe.css';

// =========================================================
// FORMATEAR FECHA Y HORA
// =========================================================

const formatearFechaHora = (fecha) => {
  if (!fecha || fecha === 'N/A') {
    return 'N/A';
  }

  const fechaStr = String(fecha);

  if (fechaStr.includes('T')) {
    const [partFecha, partHora] =
      fechaStr.split('T');

    const horaLimpia = partHora
      ? partHora.substring(0, 5)
      : '';

    return horaLimpia
      ? `${partFecha} ${horaLimpia}`
      : partFecha;
  }

  return fechaStr.length >= 10
    ? fechaStr.substring(0, 16)
    : fechaStr;
};

export default function BitacorasJefe() {

  const [buscarEmpleado, setBuscarEmpleado] =
    useState('');

  const [modulosOpciones, setModulosOpciones] =
    useState('Todos');

  const [fechaFiltro, setFechaFiltro] =
    useState('');

  const [bitacoras, setBitacoras] =
    useState([]);

  const [cargando, setCargando] =
    useState(true);

  const [bitacoraSeleccionada, setBitacoraSeleccionada] =
    useState(null);

  const inputFechaRef =
    useRef(null);

  // =========================================================
  // ABRIR CALENDARIO
  // =========================================================

  const abrirCalendario = () => {

    if (!inputFechaRef.current) {
      return;
    }

    if (
      typeof inputFechaRef.current.showPicker ===
      'function'
    ) {
      inputFechaRef.current.showPicker();
    } else {
      inputFechaRef.current.focus();
    }
  };

  // =========================================================
  // CARGAR BITÁCORAS
  // =========================================================

  const cargarBitacoras = async () => {

    setCargando(true);

    try {

      const res = await fetch(
        'http://127.0.0.1:4000/v1/bitacora',
        {
          headers: {
            'x-api-key': 'EmcaSecret2026'
          }
        }
      );

      if (!res.ok) {
        throw new Error(
          `HTTP ${res.status}`
        );
      }

      const data = await res.json();

      setBitacoras(
        Array.isArray(data)
          ? data
          : data.data || []
      );

    } catch (error) {

      console.error(
        'Error al cargar bitácoras:',
        error
      );

      setBitacoras([]);

      alert(
        'Error de conexión con la base de datos'
      );

    } finally {

      setCargando(false);

    }
  };

  useEffect(() => {
    cargarBitacoras();
  }, []);

  // =========================================================
  // OBTENER DATOS DE BITÁCORA
  // =========================================================

  const obtenerValoresBitacora = (bit) => {

    const titulo =
      bit.titulo ||
      'N/A';

    const nombre =
      bit.empleado_nombre ||
      bit.empleado ||
      bit.usuario_nombre ||
      bit.usuario ||
      bit.nombre ||
      bit.user ||
      'Sin empleado';

    const fechaInicio =
      formatearFechaHora(
        bit.fechaInicio ||
        bit.created_at ||
        bit.createdAt ||
        bit.fecha_registro
      );

    const fechaFinal =
      formatearFechaHora(
        bit.fechaFinal ||
        bit.fecha ||
        bit.created_at ||
        bit.createdAt ||
        bit.fecha_registro
      );

    const cargo =
      bit.cargo ||
      bit.rol ||
      bit.puesto ||
      'N/A';

    const estado =
      bit.estado ||
      bit.status ||
      'Completado';

    const descripcion =
      bit.descripcion ||
      'N/A';

    const modulo =
      bit.modulo ||
      bit.tipo ||
      titulo;

    return {
      titulo,
      nombre,
      fechaInicio,
      fechaFinal,
      cargo,
      estado,
      descripcion,
      modulo
    };
  };

  // =========================================================
  // FILTROS
  // =========================================================

  const bitacorasFiltradas =
    bitacoras.filter((bit) => {

      const {
        nombre,
        fechaInicio,
        fechaFinal,
        modulo
      } = obtenerValoresBitacora(bit);

      // ---------------------------------------------
      // EMPLEADO
      // ---------------------------------------------

      const textoEmpleado =
        buscarEmpleado
          .toLowerCase()
          .trim();

      const coincideEmpleado =
        !textoEmpleado ||
        nombre
          .toLowerCase()
          .includes(textoEmpleado);

      // ---------------------------------------------
      // FECHA
      // ---------------------------------------------

      const filtroLimpio =
        fechaFiltro.replace('T', ' ');

      const coincideFechaHora =
        !fechaFiltro ||
        (
          fechaInicio &&
          fechaInicio.includes(filtroLimpio)
        ) ||
        (
          fechaFinal &&
          fechaFinal.includes(filtroLimpio)
        );

      // ---------------------------------------------
      // MÓDULO
      // ---------------------------------------------

      const coincideModulo =
        modulosOpciones === 'Todos' ||
        (
          modulo &&
          modulo
            .toLowerCase()
            .includes(
              modulosOpciones.toLowerCase()
            )
        );

      return (
        coincideEmpleado &&
        coincideFechaHora &&
        coincideModulo
      );
    });

  // =========================================================
  // LIMPIAR FILTROS
  // =========================================================

  const limpiarFiltros = () => {

    setBuscarEmpleado('');
    setModulosOpciones('Todos');
    setFechaFiltro('');

  };

  // =========================================================
  // PDF
  // =========================================================

  const generarPDF = async () => {

    try {

      const res = await fetch(
        'http://127.0.0.1:4000/v1/bitacora/pdf',
        {
          method: 'GET',
          headers: {
            'x-api-key': 'EmcaSecret2026'
          }
        }
      );

      if (!res.ok) {
        throw new Error(
          'Error al generar el PDF'
        );
      }

      const blob =
        await res.blob();

      const url =
        window.URL.createObjectURL(blob);

      const a =
        document.createElement('a');

      a.href = url;

      a.download =
        `Reporte_Bitacoras_EMCA_${new Date()
          .toISOString()
          .split('T')[0]}.pdf`;

      document.body.appendChild(a);

      a.click();

      a.remove();

      window.URL.revokeObjectURL(url);

    } catch (error) {

      console.error(
        'Error al generar PDF:',
        error
      );

      alert(
        'Error al obtener el archivo PDF desde el servidor.'
      );
    }
  };

  // =========================================================
  // EXCEL
  // =========================================================

  const generarExcel = async () => {

    try {

      const res = await fetch(
        'http://127.0.0.1:4000/v1/bitacora/excel',
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
        window.URL.createObjectURL(blob);

      const a =
        document.createElement('a');

      a.href = url;

      a.download =
        `Reporte_Bitacoras_EMCA_${new Date()
          .toISOString()
          .split('T')[0]}.xlsx`;

      document.body.appendChild(a);

      a.click();

      a.remove();

      window.URL.revokeObjectURL(url);

    } catch (error) {

      console.error(
        'Error al generar Excel:',
        error
      );

      alert(
        'Error al obtener el archivo Excel desde el servidor.'
      );
    }
  };

  // =========================================================
  // DATOS ESTADÍSTICAS
  // =========================================================

  const empleadosUnicos =
    new Set(
      bitacoras.map(
        (b) =>
          obtenerValoresBitacora(b).nombre
      )
    ).size;

  const fechaHoy =
    new Date()
      .toISOString()
      .split('T')[0];

  const registrosHoy =
    bitacoras.filter((b) =>
      obtenerValoresBitacora(b)
        .fechaInicio
        ?.startsWith(fechaHoy)
    ).length;

  const registrosRevision =
    bitacoras.filter((b) =>
      obtenerValoresBitacora(b)
        .estado
        .toLowerCase()
        .includes('revisión')
    ).length;

  // =========================================================
  // RENDER
  // =========================================================

  return (

    <div className="bitacoras-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="bitacoras-header">

        <div>

          <h2>
            📒 Bitácoras del Sistema
          </h2>

          <p>
            Consulta las actividades realizadas
            por los empleados
          </p>

        </div>

        <button
          className="btn-primary"
          onClick={cargarBitacoras}
        >
          🔄 Actualizar
        </button>

      </div>

      {/* =====================================================
          ESTADÍSTICAS
      ===================================================== */}

      <div className="stats-grid">

        <div className="stat-card">

          <span>📝</span>

          <div>
            <h3>
              {bitacoras.length}
            </h3>

            <p>
              Registros Totales
            </p>
          </div>

        </div>

        <div className="stat-card">

          <span>👥</span>

          <div>
            <h3>
              {empleadosUnicos}
            </h3>

            <p>
              Empleados activos
            </p>
          </div>

        </div>

        <div className="stat-card">


          <div>
            <h3>
              {registrosHoy}
            </h3>

            <p>
              Hoy
            </p>
          </div>

        </div>

        <div className="stat-card">

          <span>⚠️</span>

          <div>
            <h3>
              {registrosRevision}
            </h3>

            <p>
              En revisión
            </p>
          </div>

        </div>

      </div>

      {/* =====================================================
          FILTROS
      ===================================================== */}

      <div className="filtros-card">

        <div className="filtros-grid">

          {/* EMPLEADO */}

          <div className="campo">

            <label>
              Buscar empleado
            </label>

            <input
              type="text"
              placeholder="Nombre del empleado"
              value={buscarEmpleado}
              onChange={(e) =>
                setBuscarEmpleado(
                  e.target.value
                )
              }
            />

          </div>

          {/* MÓDULO */}

          <div className="campo">

            <label>
              Módulo
            </label>

            <select
              value={modulosOpciones}
              onChange={(e) =>
                setModulosOpciones(
                  e.target.value
                )
              }
            >

              <option value="Todos">
                Todos
              </option>

              <option value="Solicitudes">
                Solicitudes
              </option>

              <option value="Respuestas">
                Respuestas
              </option>

              <option value="Informes">
                Informes
              </option>

              <option value="Configuración">
                Configuración
              </option>

            </select>

          </div>

          {/* FECHA */}

          <div className="campo">

            <label>
              Fecha y Hora
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
                className="input-fecha"
              />

              

            </div>

          </div>

          {/* LIMPIAR */}

          <div className="campo">

            <label>
              Acciones
            </label>

            <button
              className="btn-segundario"
              onClick={limpiarFiltros}
            >
             Limpiar Filtros
            </button>

          </div>

        </div>

      </div>

      {/* =====================================================
          TABLA
      ===================================================== */}

      <div className="contenedor-scroll">

        <div className="tabla-card">

          <div className="tabla-header">

            <h3>
              Últimos movimientos
            </h3>

          </div>

          <table className="tabla-bitacoras">

            <thead>

              <tr>
                <th>Título</th>
                <th>Nombre</th>
                <th>Fecha Inicio</th>
                <th>Fecha Final</th>
                <th>Cargo</th>
                <th>Estado</th>
                <th>Descripción</th>
                <th>Acciones</th>
              </tr>

            </thead>

            <tbody>

              {cargando ? (

                <tr>

                  <td
                    colSpan="8"
                    style={{
                      textAlign: 'center',
                      padding: '40px'
                    }}
                  >
                     Cargando bitácoras...
                  </td>

                </tr>

              ) : bitacorasFiltradas.length > 0 ? (

                bitacorasFiltradas.map(
                  (bit, index) => {

                    const item =
                      obtenerValoresBitacora(bit);

                    const iniciales =
                      item.nombre &&
                      item.nombre !==
                        'Sin empleado'
                        ? item.nombre
                            .substring(0, 2)
                            .toUpperCase()
                        : 'EM';

                    return (

                      <tr
                        key={
                          bit.id ||
                          index
                        }
                      >

                        {/* TÍTULO */}

                        <td className="empleado-info">

                          <div className="avatar-sm">
                            {iniciales}
                          </div>

                          <div>

                            <strong>
                              {item.titulo}
                            </strong>

                          </div>

                        </td>

                        {/* NOMBRE */}

                        <td>
                          {item.nombre}
                        </td>

                        {/* FECHA INICIO */}

                        <td>
                          {item.fechaInicio}
                        </td>

                        {/* FECHA FINAL */}

                        <td>
                          {item.fechaFinal}
                        </td>

                        {/* CARGO */}

                        <td>
                          {item.cargo}
                        </td>

                        {/* ESTADO */}

                        <td>

                          <span
                            className={`badge ${
                              item.estado
                                ?.toLowerCase()
                                .includes(
                                  'completado'
                                )
                                ? 'completado'
                                : 'revision'
                            }`}
                          >
                            {item.estado}
                          </span>

                        </td>

                        {/* DESCRIPCIÓN */}

                        <td>
                          {item.descripcion}
                        </td>

                        {/* ACCIONES */}

                        <td className="acciones">

                          <button
                            className="btn_VerBitacoras"
                            onClick={() =>
                              setBitacoraSeleccionada(
                                bit
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
                    colSpan="8"
                    style={{
                      textAlign: 'center',
                      padding: '40px',
                      color: '#64748b'
                    }}
                  >
                    🔍 No se encontraron
                    registros con los filtros
                    seleccionados.
                  </td>

                </tr>

              )}

            </tbody>

          </table>

          {/* =================================================
              DESCARGAS
          ================================================= */}

          <div className="ContainerBotonesGenerar">

            <button
              className="btnGenerar_PDF"
              onClick={generarPDF}
            >
              📄 Generar PDF
            </button>

            <button
              className="btnGenerar_EXCEL"
              onClick={generarExcel}
            >
              📊 Generar Excel
            </button>

          </div>

        </div>

      </div>

      {/* =====================================================
          MODAL
      ===================================================== */}

      {bitacoraSeleccionada && (

        <div
          className="modal-overlay"
          onClick={() =>
            setBitacoraSeleccionada(null)
          }
        >

          <div
            className="modals-content"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* HEADER */}

            <div className="modal-header">

              <h3>
                📒 Detalle de Bitácora
              </h3>

            </div>

            {/* BODY */}

            <div className="modal-body">

              {(() => {

                const modalData =
                  obtenerValoresBitacora(
                    bitacoraSeleccionada
                  );

                return (
                  <>
                    <p>
                      <strong>
                        Título:
                      </strong>{' '}
                      {modalData.titulo}
                    </p>

                    <p>
                      <strong>
                        Nombre:
                      </strong>{' '}
                      {modalData.nombre}
                    </p>

                    <p>
                      <strong>
                        Fecha Inicio:
                      </strong>{' '}
                      {modalData.fechaInicio}
                    </p>

                    <p>
                      <strong>
                        Fecha Final:
                      </strong>{' '}
                      {modalData.fechaFinal}
                    </p>

                    <p>
                      <strong>
                        Cargo:
                      </strong>{' '}
                      {modalData.cargo}
                    </p>

                    <p>
                      <strong>
                        Estado:
                      </strong>{' '}
                      {modalData.estado}
                    </p>

                    <p>
                      <strong>
                        Módulo:
                      </strong>{' '}
                      {modalData.modulo}
                    </p>

                    <p>
                      <strong>
                        Descripción:
                      </strong>{' '}
                      {modalData.descripcion}
                    </p>
                  </>
                );

              })()}

            </div>

            {/* FOOTER */}

            <div className="modal-footer">

              <button
                className="btn-segundario"
                onClick={() =>
                  setBitacoraSeleccionada(null)
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
