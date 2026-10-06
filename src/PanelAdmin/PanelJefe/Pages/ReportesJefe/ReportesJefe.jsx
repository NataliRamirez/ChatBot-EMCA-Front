import './ReportesJefe.css';
import { useEffect, useState } from 'react';

export default function ReportesJefe() {
  const [reportes, setReportes] = useState([]);
  const [empleadoFiltro, setEmpleado] = useState('');
  const [nombreFiltro, setNombre] = useState('');
  const [tipoFiltro, setTipo] = useState('');
  const [fechaInicioFiltro, setFechaInicio] = useState('');
  const [estadoOpciones, setEstadoOpciones] = useState('Todos');
  const [fechaFinalFiltro, setFechaFinal] = useState('');
  const [accionesFiltro, setAcciones] = useState('');

  useEffect(() => {
    cargarReportes();
  }, []);

  const cargarReportes = async () => {
    try {
      const res = await fetch('http://127.0.0.1:4000/v1/informes', {
        headers: {
          'x-api-key': 'EmcaSecret2026'
        }
      });

      if (!res.ok) {
        throw new Error('Error al obtener los reportes');
      }

      const data = await res.json();

      if (Array.isArray(data)) {
        setReportes(data);
      } else {
        setReportes([]);
      }
    } catch (error) {
      console.error('Error al cargar reportes:', error);
    }
  };

  //=============================
  // MAPEO DE REPORTES
  //=============================
  const obtenerValoresReportes = (bit) => {
    const empleado =
      bit.empleado_nombre ||
      bit.empleado ||
      bit.usuario_nombre ||
      bit.nombre ||
      bit.user ||
      'N/A';

    const nombre =
      bit.usuario_nombre ||
      bit.nombre ||
      bit.empleado_nombre ||
      bit.user ||
      'N/A';

    const tipo =
      bit.tipo_respuesta ||
      bit.respuesta ||
      bit.tipo ||
      'N/A';

    const fechaInicio =
      bit.fechaInicio ||
      bit.created_at ||
      bit.createdAt ||
      bit.fecha_registro ||
      'N/A';

    const fechaFinal =
      bit.fechaFin ||
      bit.fechaFinal ||
      bit.created_at ||
      bit.createdAt ||
      'N/A';

    const estado =
      bit.estado_respuesta ||
      bit.respuesta ||
      bit.estado ||
      'N/A';

    const acciones =
      bit.tipo_accion ||
      bit.accion ||
      bit.acciones ||
      'N/A';

    return { empleado, nombre, tipo, fechaInicio, fechaFinal, estado, acciones };
  };

  //============================
  // FILTROS DE REPORTES
  //============================
  const reportesFiltradas = reportes.filter((bit) => {
    const { empleado, nombre, tipo, fechaInicio, fechaFinal, estado, acciones } = obtenerValoresReportes(bit);

    const coincideEmpleado =
      !empleadoFiltro || empleado.toLowerCase().includes(empleadoFiltro.toLowerCase());

    const coincideNombre =
      !nombreFiltro || nombre.toLowerCase().includes(nombreFiltro.toLowerCase());

    const coincideTipo =
      !tipoFiltro ||
      tipoFiltro === 'Todos' ||
      tipo.toLowerCase().includes(tipoFiltro.toLowerCase());

    const coincideFechaInicio =
      !fechaInicioFiltro || (fechaInicio && fechaInicio.includes(fechaInicioFiltro));

    const coincideFechaFinal =
      !fechaFinalFiltro || (fechaFinal && fechaFinal.includes(fechaFinalFiltro));

    const coincideEstado =
      estadoOpciones === 'Todos' ||
      !estadoOpciones ||
      estado.toLowerCase() === estadoOpciones.toLowerCase();

    const coincideAcciones =
      !accionesFiltro || acciones.toLowerCase().includes(accionesFiltro.toLowerCase());

    return (
      coincideEmpleado &&
      coincideNombre &&
      coincideTipo &&
      coincideFechaInicio &&
      coincideFechaFinal &&
      coincideEstado &&
      coincideAcciones
    );
  });

  //=============================
  // DESCARGAR PDF DESDE EL BACKEND
  //=============================
  const generarPDF = async () => {
    try {
      const res = await fetch('http://127.0.0.1:4000/v1/informes/pdf', {
        method: 'GET',
        headers: {
          'x-api-key': 'EmcaSecret2026'
        }
      });

      if (!res.ok) throw new Error('Error al generar el PDF en el servidor');

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Reporte_Bitacoras_EMCA.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error al generar PDF:', error);
      alert('Error al obtener el archivo PDF desde el servidor.');
    }
  };

  //=============================
  // DESCARGAR EXCEL DESDE EL BACKEND
  //=============================
  const generarExcel = async () => {
    try {
      const res = await fetch('http://127.0.0.1:4000/v1/informes/excel', {
        method: 'GET',
        headers: {
          'x-api-key': 'EmcaSecret2026'
        }
      });

      if (!res.ok) throw new Error('Error al generar el archivo Excel en el servidor');

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Reporte_Bitacoras_EMCA.xlsx';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error al generar Excel:', error);
      alert('Error al obtener el archivo Excel desde el servidor.');
    }
  };

  return (
    <div className="reportes-page">
      <div className="reportes-header">
        <div>
          <h2>📊 Reportes de Empleados</h2>
          <p>Visualización de informes generados por los empleados</p>
        </div>
      </div>

      <div className="tabla-card">
        <table className="tabla-reportes">
          <thead>
            <tr>
              <th>Empleado</th>
              <th>Nombre</th>
              <th>Tipo</th>
              <th>Fecha Inicio</th>
              <th>Fecha Final</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {reportesFiltradas.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center' }}>
                  No hay reportes registrados
                </td>
              </tr>
            ) : (
              reportesFiltradas.map((item, index) => {
                const data = obtenerValoresReportes(item);
                return (
                  <tr key={item.id || index}>
                    <td>
                      <strong>{data.empleado}</strong>
                    </td>
                    <td>{data.nombre}</td>
                    <td>{data.tipo}</td>
                    <td>{data.fechaInicio}</td>
                    <td>{data.fechaFinal}</td>
                    <td>{data.estado}</td>
                    <td>{data.acciones}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>

        <div className="BotonesDescargar">
          <button className="btn_PDF" onClick={generarPDF}>
            Generar PDF
          </button>
          <button className="btnEXCEL" onClick={generarExcel}>
            Generar Excel
          </button>
        </div>
      </div>
    </div>
  );
}