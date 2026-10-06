import { useState, useEffect, useRef } from 'react';
import './RespuestasJefe.css';

// =========================================================
// FORMATEAR FECHA Y HORA
// =========================================================
const formatearFechaHora = (fecha) => {
  if (!fecha || fecha === 'N/A') return 'N/A';

  const fechaStr = String(fecha);

  if (fechaStr.includes('T')) {
    const [partFecha, partHora] = fechaStr.split('T');

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

export default function RespuestasJefe() {
  const [respuestas, setRespuestas] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [fechaFiltro, setFechaFiltro] = useState('');
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);

  const inputFechaRef = useRef(null);

  // =========================================================
  // ABRIR CALENDARIO
  // =========================================================
  const abrirCalendario = () => {
    if (!inputFechaRef.current) return;

    if (
      typeof inputFechaRef.current.showPicker === 'function'
    ) {
      inputFechaRef.current.showPicker();
    } else {
      inputFechaRef.current.focus();
    }
  };

  // =========================================================
  // CARGAR RESPUESTAS
  // =========================================================
  const cargarRespuestas = async () => {
    try {
      const res = await fetch(
        'http://127.0.0.1:4000/v1/respuestas',
        {
          headers: {
            'x-api-key': 'EmcaSecret2026'
          }
        }
      );

      if (!res.ok) {
        throw new Error('Error al cargar respuestas');
      }

      const data = await res.json();

      setRespuestas(
        Array.isArray(data)
          ? data
          : []
      );
    } catch (error) {
      console.error(
        'Error al obtener respuestas:',
        error
      );

      setRespuestas([]);
    }
  };

  useEffect(() => {
    cargarRespuestas();
  }, []);

  // =========================================================
  // MAPEO DE DATOS
  // =========================================================
  const obtenerValoresRespuesta = (bit) => {
    const Nradicado =
      bit.Nradicado ||
      bit.radicado ||
      'N/A';

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

    const telefono =
      bit.numero_telefono ||
      bit.telefono ||
      'N/A';

    const telefonoEmpresa =
      bit.numero_empresa ||
      bit.numero ||
      'N/A';

    const tipoRespuesta =
      bit.texto_respuesta ||
      bit.texto ||
      bit.tipoRespuesta ||
      'N/A';

    const estados =
      bit.estado ||
      bit.status ||
      bit.estados ||
      'N/A';

    const descripcion =
      bit.descripcion ||
      'N/A';

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
        bit.updated_at
      );

    return {
      Nradicado,
      titulo,
      nombre,
      telefono,
      telefonoEmpresa,
      tipoRespuesta,
      estados,
      descripcion,
      fechaInicio,
      fechaFinal
    };
  };

  // =========================================================
  // FILTRADO
  // =========================================================
  const filtradas = respuestas.filter((bit) => {
    const data = obtenerValoresRespuesta(bit);

    const texto = busqueda
      .toLowerCase()
      .trim();

    const coincideTexto =
      !texto ||
      String(data.Nradicado)
        .toLowerCase()
        .includes(texto) ||
      data.titulo
        .toLowerCase()
        .includes(texto) ||
      data.nombre
        .toLowerCase()
        .includes(texto) ||
      data.telefono
        .toLowerCase()
        .includes(texto) ||
      data.telefonoEmpresa
        .toLowerCase()
        .includes(texto) ||
      data.tipoRespuesta
        .toLowerCase()
        .includes(texto) ||
      data.estados
        .toLowerCase()
        .includes(texto) ||
      data.descripcion
        .toLowerCase()
        .includes(texto);

    // =====================================================
    // FILTRO FECHA Y HORA
    // =====================================================

    const filtroLimpio =
      fechaFiltro.replace('T', ' ');

    const coincideFechaHora =
      !fechaFiltro ||
      (
        data.fechaInicio &&
        data.fechaInicio.includes(filtroLimpio)
      ) ||
      (
        data.fechaFinal &&
        data.fechaFinal.includes(filtroLimpio)
      );

    return (
      coincideTexto &&
      coincideFechaHora
    );
  });

  // =========================================================
  // LIMPIAR FILTROS
  // =========================================================
  const limpiarFiltros = () => {
    setBusqueda('');
    setFechaFiltro('');
  };

  // =========================================================
  // PDF
  // =========================================================
  const generarPDF = async () => {
    try {
      const res = await fetch(
        'http://127.0.0.1:4000/v1/respuestas/pdf',
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

      const blob = await res.blob();

      const url =
        window.URL.createObjectURL(blob);

      const a =
        document.createElement('a');

      a.href = url;

      a.download =
        `Reporte_Respuestas_EMCA_${new Date()
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
        'http://127.0.0.1:4000/v1/respuestas/excel',
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

      const blob = await res.blob();

      const url =
        window.URL.createObjectURL(blob);

      const a =
        document.createElement('a');

      a.href = url;

      a.download =
        `Reporte_Respuestas_EMCA_${new Date()
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
  // RENDER
  // =========================================================

  return (
    <div className="respuestas-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="respuestas-header">

        <div>
          <h2>
            ✉️ Respuestas Oficiales
          </h2>

          <p>
            Consulta las respuestas enviadas a los usuarios
          </p>
        </div>

        <button
          className="btn-actualizar"
          onClick={cargarRespuestas}
        >
          🔄 Actualizar
        </button>

      </div>

      {/* =====================================================
          FILTROS
      ===================================================== */}

      <div className="filtros-bar">

        {/* BUSCADOR */}

        <input
          type="text"
          placeholder="🔍 Buscar por radicado, título o ciudadano..."
          value={busqueda}
          onChange={(e) =>
            setBusqueda(e.target.value)
          }
          className="input-busqueda"
        />

        {/* FECHA */}

        <div className="filtro-fecha">

          <input
            ref={inputFechaRef}
            type="datetime-local"
            value={fechaFiltro}
            onChange={(e) =>
              setFechaFiltro(e.target.value)
            }
            className="input-fecha"
          />

        

        </div>

        {/* LIMPIAR */}

        {(busqueda || fechaFiltro) && (
          <button
            className="btn-limpiar"
            onClick={limpiarFiltros}
          >
            🧹 Limpiar
          </button>
        )}

      </div>

      {/* =====================================================
          TABLA
      ===================================================== */}

      <div className="tabla-card">

        <div className="tabla-scroll">

          <table className="tabla-respuestas">

            <thead>
              <tr>
                <th>Radicado</th>
                <th>Título</th>
                <th>Nombre</th>
                <th>Teléfono</th>
                <th>Tel. Empresa</th>
                <th>Tipo Respuesta</th>
                <th>Estado</th>
                <th>Descripción</th>
                <th>Fecha Inicio</th>
                <th>Fecha Final</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>

              {filtradas.length > 0 ? (

                filtradas.map(
                  (item, index) => {

                    const data =
                      obtenerValoresRespuesta(item);

                    return (
                      <tr
                        key={
                          item.id ||
                          item.Nradicado ||
                          index
                        }
                      >

                        <td>
                          <strong>
                            {data.Nradicado}
                          </strong>
                        </td>

                        <td>
                          {data.titulo}
                        </td>

                        <td>
                          {data.nombre}
                        </td>

                        <td>
                          {data.telefono}
                        </td>

                        <td>
                          {data.telefonoEmpresa}
                        </td>

                        <td>
                          {data.tipoRespuesta}
                        </td>

                        <td>
                          <span
                            className={`badge-estado ${data.estados
                              ?.toLowerCase()
                              .replace(
                                /\s+/g,
                                '-'
                              )}`}
                          >
                            {data.estados}
                          </span>
                        </td>

                        <td>
                          {data.descripcion}
                        </td>

                        <td>
                          {data.fechaInicio}
                        </td>

                        <td>
                          {data.fechaFinal}
                        </td>

                        <td>

                          <button
                            className="btn-ver"
                            onClick={() =>
                              setRespuestaSeleccionada(
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
                    colSpan="11"
                    className="sin-resultados"
                  >
                    No hay respuestas que coincidan
                    con los filtros.
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

        {/* ===================================================
            DESCARGAS
        =================================================== */}

        <div className="containerBotones">

          <button
            className="btn_PDFdescargar"
            onClick={generarPDF}
          >
            📄 Descargar PDF
          </button>

          <button
            className="btn_EXCELdescargar"
            onClick={generarExcel}
          >
            📊 Descargar Excel
          </button>

        </div>

      </div>

      {/* =====================================================
          MODAL
      ===================================================== */}

      {respuestaSeleccionada && (

        <div
          className="modal-overlay"
          onClick={() =>
            setRespuestaSeleccionada(null)
          }
        >

          <div
            className="modals-contents"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* HEADER MODAL */}

            <div className="modal-header">

              <h3>
                Respuesta #
                {respuestaSeleccionada.Nradicado}
              </h3>

              <button
                className="btnCerrar"
                onClick={() =>
                  setRespuestaSeleccionada(null)
                }
                title="Cerrar modal"
              >
                ✕
              </button>

            </div>

            {/* BODY */}

            <div className="modal-body">

              <p>
                <strong>
                  Título:
                </strong>{' '}
                {respuestaSeleccionada.titulo}
              </p>

              <p>
                <strong>
                  Nombre:
                </strong>{' '}
                {respuestaSeleccionada.nombre}
              </p>

              <p>
                <strong>
                  Teléfono:
                </strong>{' '}
                {respuestaSeleccionada.telefono}
              </p>

              <p>
                <strong>
                  Teléfono Empresa:
                </strong>{' '}
                {respuestaSeleccionada.telefonoEmpresa}
              </p>

              <p>
                <strong>
                  Tipo de Respuesta:
                </strong>{' '}
                {respuestaSeleccionada.tipoRespuesta}
              </p>

              <p>
                <strong>
                  Estado:
                </strong>{' '}
                {respuestaSeleccionada.estados}
              </p>

              <p>
                <strong>
                  Descripción:
                </strong>
              </p>

              <div className="box-detalle">
                {respuestaSeleccionada.descripcion}
              </div>

              <p>
                <strong>
                  Fecha Inicio:
                </strong>{' '}
                {respuestaSeleccionada.fechaInicio}
              </p>

              <p>
                <strong>
                  Fecha Final:
                </strong>{' '}
                {respuestaSeleccionada.fechaFinal}
              </p>

            </div>

            {/* FOOTER */}

            <div className="modal-footer">

              <button
                className="btn_segundario"
                onClick={() =>
                  setRespuestaSeleccionada(null)
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
