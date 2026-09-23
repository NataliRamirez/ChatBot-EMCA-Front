import { useState, useEffect } from 'react';
import './Empleados.css';

export default function PanelEmpleados() {

  const [empleados, setEmpleados] = useState([]);
  const [cargando, setCargando] = useState(true);

  // =========================
  // CARGAR EMPLEADOS
  // =========================
  const cargarEmpleados = async () => {

    try {

      const res = await fetch(
        'http://127.0.0.1:4000/v1/employe',
        {
          headers: {
            'x-api-key': 'EmcaSecret2026'
          }
        }
      );

      if (!res.ok) {
        throw new Error('Error al cargar empleados');
      }

      const data = await res.json();

      setEmpleados(data);

    } catch (error) {

      console.error(error);

      setEmpleados([]);

    } finally {

      setCargando(false);

    }
  };

  useEffect(() => {
    cargarEmpleados();
  }, []);

  return (

    <div className="empleados-page">

      {/* Encabezado */}
      <div className="empleados-header">

        <div>
          <h2>👥 Gestión de Personal y Usuarios</h2>
          <p>
            Consulta los empleados registrados en EMCA
          </p>
        </div>

        <button
          className="btn_primarys"
          onClick={cargarEmpleados}
        >
          🔄 Actualizar
        </button>

      </div>

      {/* Resumen */}
      <div className="stats-grid">

        <div className="stat-card">
          <span>👥</span>
          <div>
            <h3>{empleados.length}</h3>
            <p>Total empleados</p>
          </div>
        </div>

        <div className="stat-card">
          <span>✅</span>
          <div>
            <h3>
              {
                empleados.filter(e => e.estado === 'Activo').length
              }
            </h3>
            <p>Activos</p>
          </div>
        </div>

        <div className="stat-card">
          <span>⏸️</span>
          <div>
            <h3>
              {
                empleados.filter(e => e.estado === 'Inactivo').length
              }
            </h3>
            <p>Inactivos</p>
          </div>
        </div>

      </div>

      {/* Tabla */}
      <div className="contenedor-scroll">

        <div className="tabla-card">

          <table className="tabla-empleados">

            <thead>

              <tr>
                <th>Empleado</th>
                <th>Cargo</th>
                <th>Estado</th>
                <th>Último Acceso</th>
              </tr>

            </thead>

            <tbody>

              {cargando ? (

                <tr>
                  <td colSpan="4" style={{ textAlign: 'center' }}>
                    Cargando empleados...
                  </td>
                </tr>

              ) : empleados.length > 0 ? (

                empleados.map((emp) => (

                  <tr key={emp.id}>

                    <td className="empleado-info">

                      <div className="avatar-sm">
                        {emp.nombre?.substring(0, 2).toUpperCase()}
                      </div>

                      <div>
                        <strong>{emp.nombre}</strong>
                        <p>{emp.email}</p>
                      </div>

                    </td>

                    <td>{emp.cargo}</td>

                    <td>

                      <span
                        className={`badge ${
                          emp.estado === 'Activo'
                            ? 'completado'
                            : 'revision'
                        }`}
                      >
                        {emp.estado}
                      </span>

                    </td>

                    <td>
                      {emp.ultimo_acceso || 'Sin registro'}
                    </td>

                  </tr>

                ))

              ) : (

                <tr>
                  <td colSpan="4" style={{ textAlign: 'center' }}>
                    No hay empleados registrados.
                  </td>
                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}