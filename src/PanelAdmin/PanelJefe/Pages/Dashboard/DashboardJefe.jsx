import { useNavigate } from 'react-router-dom';
import './DashboardJefe.css';

export default function DashboardJefe() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-jefe">
      {/* Bienvenida */}
      <div className="welcome-card">
        <div>
          <h2>👋 Bienvenido, Juan David</h2>
          <p>Gestiona el sistema EMCA y supervisa la atención al usuario.</p>
        </div>

        <button
          className="chatbot-btn"
          onClick={() => navigate('/panel-jefe/chatbot')}
        >
          💬 Ver conversaciones
        </button>
      </div>

      {/* Tarjetas resumen */}
      <div className="stats-grid">
        <div className="stat-card">
          <span>📋</span>
          <div>
            <h3>128</h3>
            <p>Solicitudes</p>
          </div>
        </div>

        <div className="stat-card">
          <span>💬</span>
          <div>
            <h3>84</h3>
            <p>Respuestas</p>
          </div>
        </div>

        <div className="stat-card">
          <span>👥</span>
          <div>
            <h3>24</h3>
            <p>Empleados</p>
          </div>
        </div>

        <div className="stat-card">
          <span>📥</span>
          <div>
            <h3>156</h3>
            <p>Comprobantes</p>
          </div>
        </div>
      </div>

      {/* Accesos rápidos */}
      <div className="quick-grid">
        <button onClick={() => navigate('/panel-jefe/chatbot')}>💬 Chatbot</button>
        <button onClick={() => navigate('/panel-jefe/solicitudes')}>📋 Solicitudes</button>
        <button onClick={() => navigate('/panel-jefe/respuestas')}>📄 Respuestas</button>
        <button onClick={() => navigate('/panel-jefe/empleados')}>👥 Empleados</button>
      </div>

      {/* Contenido principal */}
      <div className="dashboard-grid">
        {/* Actividad reciente */}
        <div className="card activity-card">
          <div className="card-header">
            <h3>🕒 Actividad reciente</h3>
          </div>

          <div className="activity-list">
            <div className="activity-item">
              <div className="dot green"></div>
              <div>
                <strong>Nueva solicitud registrada</strong>
                <p>Hace 5 minutos</p>
              </div>
            </div>

            <div className="activity-item">
              <div className="dot blue"></div>
              <div>
                <strong>Respuesta aprobada</strong>
                <p>Hace 12 minutos</p>
              </div>
            </div>

            <div className="activity-item">
              <div className="dot orange"></div>
              <div>
                <strong>Comprobante verificado</strong>
                <p>Hace 25 minutos</p>
              </div>
            </div>

            <div className="activity-item">
              <div className="dot green"></div>
              <div>
                <strong>Empleado inició sesión</strong>
                <p>Hace 40 minutos</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pendientes */}
        <div className="card pending-card">
          <div className="card-header">
            <h3>⚠️ Pendientes</h3>
          </div>

          <div className="pending-item">
            <span>Solicitudes por revisar</span>
            <strong>12</strong>
          </div>

          <div className="pending-item">
            <span>Respuestas por aprobar</span>
            <strong>5</strong>
          </div>

          <div className="pending-item">
            <span>Comprobantes pendientes</span>
            <strong>14</strong>
          </div>

          <div className="pending-item">
            <span>Bitácoras en revisión</span>
            <strong>3</strong>
          </div>
        </div>
      </div>

      {/* Gráfico simple */}
      <div className="card chart-card">
        <div className="card-header">
          <h3>📈 Solicitudes por mes</h3>
        </div>

        <div className="chart-placeholder">
          <div className="bars">
            <div className="bar" style={{ height: '45%' }}></div>
            <div className="bar" style={{ height: '60%' }}></div>
            <div className="bar" style={{ height: '75%' }}></div>
            <div className="bar" style={{ height: '90%' }}></div>
            <div className="bar" style={{ height: '70%' }}></div>
            <div className="bar" style={{ height: '100%' }}></div>
          </div>

          <div className="months">
            <span>Feb</span>
            <span>Mar</span>
            <span>Abr</span>
            <span>May</span>
            <span>Jun</span>
            <span>Jul</span>
          </div>
        </div>
      </div>

      {/* Empleados conectados */}
      <div className="card employees-card">
        <div className="card-header">
          <h3>🟢 Empleados conectados</h3>
          <span>8 en línea</span>
        </div>

        <div className="employees-list">
          <div className="employee">
            <div className="avatar">JD</div>
            <div>
              <strong>Juan David</strong>
              <p>Jefe Administrativo</p>
            </div>
          </div>

          <div className="employee">
            <div className="avatar">CA</div>
            <div>
              <strong>Carlos Admin</strong>
              <p>Administrador</p>
            </div>
          </div>

          <div className="employee">
            <div className="avatar">MR</div>
            <div>
              <strong>María Ruiz</strong>
              <p>Auxiliar</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}