import { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import './RespuestasJefe.css';

export default function RespuestasJefe() {
  const [respuestas, setRespuestas] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);

  // =========================
  // CARGAR RESPUESTAS
  // =========================
  const cargarRespuestas = async () => {
    try {
      const res = await fetch('http://127.0.0.1:4000/v1/respuestas', {
        headers: {
          'x-api-key': 'EmcaSecret2026'
        }
      });

      if (!res.ok) {
        throw new Error('Error al cargar respuestas');
      }

      const data = await res.json();
      setRespuestas(data);
    } catch (error) {
      console.error('Error al obtener respuestas:', error);
      setRespuestas([]);
    }
  };

  useEffect(() => {
    cargarRespuestas();
  }, []);

  // ==========================
  // MAPEO DE VALORES (Extrae los datos sin importar la estructura del JSON backend)
  // ==========================
  const obtenerValoresRespuesta = (bit) => {
    const Nradicado = bit.Nradicado || bit.radicado || 'N/A';
    const titulo = bit.titulo || 'N/A';
    const nombre =
      bit.empleado_nombre ||
      bit.empleado ||
      bit.usuario_nombre ||
      bit.usuario ||
      bit.nombre ||
      bit.user ||
      'Sin empleado';

    const telefono = bit.numero_telefono || bit.telefono || 'N/A';
    const telefonoEmpresa = bit.numero_empresa || bit.numero || 'N/A';
    const tipoRespuesta = bit.texto_respuesta || bit.texto || bit.tipoRespuesta || 'N/A';
    const estados = bit.estado || bit.status || bit.estados || 'N/A';
    const descripcion = bit.descripcion || 'N/A';
    const fechaInicio =
      bit.fechaInicio ||
      bit.created_at ||
      bit.createdAt ||
      bit.fecha_registro ||
      'N/A';
    const fechaFinal =
      bit.fechaFinal ||
      bit.fecha ||
      bit.updated_at ||
      'N/A';

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

  // =========================
  // FILTRO GLOBAL UNIFICADO (Usa la variable 'busqueda')
  // =========================
  const filtradas = respuestas.filter((bit) => {
    const texto = busqueda.toLowerCase().trim();
    if (!texto) return true;

    const data = obtenerValoresRespuesta(bit);

    return (
      data.Nradicado.toString().toLowerCase().includes(texto) ||
      data.titulo.toLowerCase().includes(texto) ||
      data.nombre.toLowerCase().includes(texto) ||
      data.telefono.toLowerCase().includes(texto) ||
      data.telefonoEmpresa.toLowerCase().includes(texto) ||
      data.tipoRespuesta.toLowerCase().includes(texto) ||
      data.estados.toLowerCase().includes(texto)
    );
  });

  // ===============================================
  // GENERAR PDF AUTOMÁTICO
  // ===============================================
  const generarPDF = () => {
    if (filtradas.length === 0) {
      alert('No hay registros de respuestas para descargar.');
      return;
    }

    try {
      const doc = new jsPDF();
      doc.setFontSize(14);
      doc.text('Reporte de Respuestas del Sistema', 14, 15);

      const columnas = [
        'Radicado',
        'Título',
        'Nombre',
        'Teléfono',
        'Tipo Resp.',
        'Estado',
        'Fecha Inicio'
      ];

      const filas = filtradas.map((bit) => {
        const data = obtenerValoresRespuesta(bit);
        return [
          data.Nradicado,
          data.titulo,
          data.nombre,
          data.telefono,
          data.tipoRespuesta,
          data.estados,
          data.fechaInicio
        ];
      });

      autoTable(doc, {
        startY: 22,
        head: [columnas],
        body: filas,
        styles: { fontSize: 8 },
        headStyles: { fillColor: [41, 128, 185] }
      });

      doc.save(`Respuestas_${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error('Error al generar PDF:', error);
      alert('Ocurrió un error al generar el archivo PDF.');
    }
  };

  // ===============================================
  // GENERAR EXCEL AUTOMÁTICO
  // ===============================================
  const generarExcel = () => {
    if (filtradas.length === 0) {
      alert('No hay registros de respuestas para descargar.');
      return;
    }

    try {
      const datosExcel = filtradas.map((bit, index) => {
        const data = obtenerValoresRespuesta(bit);
        return {
          ID: bit.id || index + 1,
          Radicado: data.Nradicado,
          Titulo: data.titulo,
          Nombre: data.nombre,
          Telefono: data.telefono,
          TelefonoEmpresa: data.telefonoEmpresa,
          TipoRespuesta: data.tipoRespuesta,
          Estados: data.estados,
          Descripcion: data.descripcion,
          FechaInicio: data.fechaInicio,
          FechaFinal: data.fechaFinal
        };
      });

      const hojaTrabajo = XLSX.utils.json_to_sheet(datosExcel);
      const libroTrabajo = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(libroTrabajo, hojaTrabajo, 'Respuestas');

      XLSX.writeFile(
        libroTrabajo,
        `Respuestas_${new Date().toISOString().split('T')[0]}.xlsx`
      );
    } catch (error) {
      console.error('Error al generar Excel:', error);
      alert('Ocurrió un error al generar el archivo Excel.');
    }
  };

  return (
    <div className="respuestas-page">
      <div className="respuestas-header">
        <div>
          <h2>✉️ Respuestas Oficiales</h2>
          <p>Consulta las respuestas enviadas a los usuarios</p>
        </div>

        <button className="btn-actualizar" onClick={cargarRespuestas}>
          🔄 Actualizar
        </button>
      </div>

      {/* Buscador */}
      <div className="filtros-bar">
        <input
          type="text"
          placeholder="🔍 Buscar por radicado, título o ciudadano..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="input-busqueda"
        />
      </div>

      {/* Tabla */}
      <div className="tabla-card">
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
              filtradas.map((item, index) => {
                const data = obtenerValoresRespuesta(item);
                return (
                  <tr key={item.id || index}>
                    <td>
                      <strong>{data.Nradicado}</strong>
                    </td>
                    <td>{data.titulo}</td>
                    <td>{data.nombre}</td>
                    <td>{data.telefono}</td>
                    <td>{data.telefonoEmpresa}</td>
                    <td>{data.tipoRespuesta}</td>
                    <td>
                      <span
                        className={`badge-estado ${data.estados
                          ?.toLowerCase()
                          .replace(/\s+/g, '-')}`}
                      >
                        {data.estados}
                      </span>
                    </td>
                    <td>{data.descripcion}</td>
                    <td>{data.fechaInicio}</td>
                    <td>{data.fechaFinal}</td>
                    <td>
                      <button
                        className="btn-ver"
                        onClick={() => setRespuestaSeleccionada(data)}
                      >
                        👁️ Ver
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="11" className="sin-resultados">
                  No hay respuestas registradas.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="containerBotones">
          <button className="btn_PDFdescargar" onClick={generarPDF}>
            Descargar PDF
          </button>
          <button className="btn_EXCELdescargar" onClick={generarExcel}>
            Descargar EXCEL
          </button>
        </div>
      </div>

      {/* Modal detalle */}
      {respuestaSeleccionada && (
        <div className="modal-overlay">
          <div className="modals-contents">
            <div className="modal-header">
              <div className="btnCerrar">
              </div>
              <h3>Respuesta #{respuestaSeleccionada.Nradicado}</h3>
            </div>

            <div className="modal-body">
              <p>
                <strong>Título:</strong> {respuestaSeleccionada.titulo}
              </p>
              <p>
                <strong>Nombre:</strong> {respuestaSeleccionada.nombre}
              </p>
              <p>
                <strong>Teléfono:</strong> {respuestaSeleccionada.telefono}
              </p>
              <p>
                <strong>Teléfono Empresa:</strong>{' '}
                {respuestaSeleccionada.telefonoEmpresa}
              </p>
              <p>
                <strong>Tipo de Respuesta:</strong>{' '}
                {respuestaSeleccionada.tipoRespuesta}
              </p>
              <p>
                <strong>Estado:</strong> {respuestaSeleccionada.estados}
              </p>
  
              <p>
                <strong>Descripción:</strong>
              </p>
              <div className="box-detalle">
                {respuestaSeleccionada.descripcion}
              </div>
          
              <p>
                <strong>Fecha Inicio:</strong>{' '}
                {respuestaSeleccionada.fechaInicio}
              </p>
              <p>
                <strong>Fecha Final:</strong>{' '}
                {respuestaSeleccionada.fechaFinal}
              </p>
            </div>

            <div className="modal-footer">
              <button
                className="btn_segundario"
                onClick={() => setRespuestaSeleccionada(null)}
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