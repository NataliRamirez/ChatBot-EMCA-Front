import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import './panelJefe.css';

export default function PanelJefe() {
  const navigate = useNavigate();
  const location = useLocation();

  // Función para determinar si el botón del menú coincide con la ruta actual
  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    // Si usas localStorage/sessionStorage para tokens, límpialos aquí
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    navigate('/');
  };

  return (
    <div className="panel">

      {/* Sidebar de Navegación del Jefe */}
      <aside className="sidebar">

        <div className="logo">
          <h2>EMCA</h2>
          <span>Panel Administrativo</span>
        </div>

        <nav className="menu">

          <button
            className={`menu-btn ${isActive('/panel-jefe/panel-usuario') ? 'active' : ''}`}
            onClick={() => navigate('/panel-usuario')}
          >
            🏠 <span>Chat en vivo</span>
          </button>

          <button
            className={`menu-btn ${isActive('/panel-jefe/empleados') ? 'active' : ''}`}
            onClick={() => navigate('/panel-jefe/empleados')}
          >
            👥 <span>Empleados</span>
          </button>

          <button
            className={`menu-btn ${isActive('/panel-jefe/reportes') ? 'active' : ''}`}
            onClick={() => navigate('/panel-jefe/reportes')}
          >
            📊 <span>Informes / Reportes</span>
          </button>

          <button
            className={`menu-btn ${isActive('/panel-jefe/solicitudes') ? 'active' : ''}`}
            onClick={() => navigate('/panel-jefe/solicitudes')}
          >
            📋 <span>Solicitudes y PQRs</span>
          </button>

          <button
            className={`menu-btn ${isActive('/panel-jefe/respuestas') ? 'active' : ''}`}
            onClick={() => navigate('/panel-jefe/respuestas')}
          >
            💬 <span>Respuestas</span>
          </button>

          <button
            className={`menu-btn ${isActive('/panel-jefe/bitacoras') ? 'active' : ''}`}
            onClick={() => navigate('/panel-jefe/bitacoras')}
          >
            📒 <span>Bitácoras</span>
          </button>

          <button
               className={`menu-btn ${isActive('/panel-jefe/perfil') ? 'active' : ''}`}
               onClick={() => navigate('/panel-jefe/perfil')}
               >
             👤 <span>Perfil</span>
          </button>

          <div className="menu-divider"></div>

        </nav>
      </aside>

      {/* Contenido Principal */}
      <section className="principal">

        <header className="header_admin">
          <div className="header_left">
            <div className="header_title">
              <h2>Panel Jefe</h2>
              <span>Empresas Públicas de Calarcá - EMCA</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              className="header-btn"
              onClick={() => navigate('/panel-jefe/configuracion')}
            >
              ⚙️ Configuración
            </button>

            <button
              className="header-btn logout-header"
              onClick={handleLogout}
            >
              🚪 Cerrar sesión
            </button>
          </div>
        </header>

        {/* Contenido dinámico renderizado por React Router */}
        <main className="contenido">
          <Outlet />
        </main>

        {/* Footer institucional */}
        <footer className="footer_admin">
          <span>
            © 2026 EMCA - Empresas Públicas de Calarcá. Todos los derechos reservados.
          </span>
        </footer>

      </section>
    </div>
  );
}