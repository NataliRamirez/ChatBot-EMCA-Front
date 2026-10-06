import React from 'react';
import {
  Users,
  UserCog,
  FileText,
  Clock,
  CheckCircle2,
  Droplets,
  Waves,
  Trash2,
  Activity,
  UserPlus,
  ClipboardList,
  BarChart3,
  Settings,
  ArrowUpRight
} from 'lucide-react';
import './dasboarAdmin.css';

const DasboarAdmin = () => {
  const estadisticas = [
    { titulo: 'Usuarios registrados', valor: '248', descripcion: '+12 este mes', icono: Users, clase: 'blue' },
    { titulo: 'Empleados activos', valor: '32', descripcion: 'Personal registrado', icono: UserCog, clase: 'purple' },
    { titulo: 'PQR recibidas', valor: '126', descripcion: '+18 este mes', icono: FileText, clase: 'orange' },
    { titulo: 'Pendientes', valor: '18', descripcion: 'Requieren atención', icono: Clock, clase: 'red' }
  ];

  const actividades = [
    { titulo: 'Nueva PQR registrada', descripcion: 'Solicitud de reporte de fuga de agua', tiempo: 'Hace 8 minutos', tipo: 'pqr' },
    { titulo: 'Nuevo usuario registrado', descripcion: 'Usuario creado correctamente en el sistema', tiempo: 'Hace 24 minutos', tipo: 'usuario' },
    { titulo: 'PQR solucionada', descripcion: 'Solicitud EMCA-2026-0874 fue cerrada', tiempo: 'Hace 1 hora', tipo: 'completado' },
    { titulo: 'Empleado actualizado', descripcion: 'Se modificó la información de un empleado', tiempo: 'Hace 2 horas', tipo: 'empleado' }
  ];

  const servicios = [
    { nombre: 'Acueducto', descripcion: 'Servicio de agua potable', icono: Droplets, estado: 'Operativo', clase: 'success' },
    { nombre: 'Alcantarillado', descripcion: 'Red de saneamiento', icono: Waves, estado: 'Operativo', clase: 'success' },
    { nombre: 'Aseo', descripcion: 'Servicio de recolección', icono: Trash2, estado: 'Operativo', clase: 'success' },
    { nombre: 'Atención ciudadana', descripcion: 'PQR y solicitudes', icono: Activity, estado: 'Operativo', clase: 'success' }
  ];

  const acciones = [
    { titulo: 'Gestionar usuarios', descripcion: 'Consultar y administrar usuarios', icono: Users },
    { titulo: 'Gestionar empleados', descripcion: 'Administrar funcionarios', icono: UserCog },
    { titulo: 'Consultar PQR', descripcion: 'Revisar solicitudes ciudadanas', icono: ClipboardList },
    { titulo: 'Ver reportes', descripcion: 'Consultar estadísticas', icono: BarChart3 },
    { titulo: 'Configuración', descripcion: 'Administrar parámetros', icono: Settings }
  ];

  return (
    <main className="dashboard-container">
      <header className="dashboard-header">
        <div>
          <span className="dashboard-welcome">PANEL ADMINISTRATIVO</span>
          <h1>Bienvenido, Administrador</h1>
          <p>Resumen general de la plataforma administrativa de EMCA.</p>
        </div>
        <div className="dashboard-status">
          <span className="status-dot"></span>
          Sistema operativo
        </div>
      </header>

      <section className="stats-grid">
        {estadisticas.map((item) => {
          const Icon = item.icono;
          return (
            <article className="stat-card" key={item.titulo}>
              <div className="stats-card-header">
                <div className={`stat-icon stat-icon-${item.clase}`}>
                  <Icon size={20} />
                </div>
                <div>
                  <span className="stat-card-title">{item.titulo}</span>
                  <p className="stat-card-value">{item.valor}</p>
                  <span className="stat-description">{item.descripcion}</span>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      <section className="dashboard-main-grid">
        <article className="card-panel">
          <div className="card-panel-header">
            <div>
              <span className="section-overline">GESTIÓN</span>
              <h2 className="card-panel-title">Actividad reciente</h2>
            </div>
            <button className="view-all-button">
              Ver todo <ArrowUpRight size={14} />
            </button>
          </div>
          <div className="activity-list">
            {actividades.map((actividad, index) => (
              <div className="activity-item" key={index}>
                <div className={`activity-icon activity-icon-${actividad.tipo}`}>
                  {actividad.tipo === 'pqr' && <FileText size={18} />}
                  {actividad.tipo === 'usuario' && <UserPlus size={18} />}
                  {actividad.tipo === 'completado' && <CheckCircle2 size={18} />}
                  {actividad.tipo === 'empleado' && <UserCog size={18} />}
                </div>
                <div className="activity-content">
                  <strong>{actividad.titulo}</strong>
                  <p>{actividad.descripcion}</p>
                </div>
                <span className="activity-time">{actividad.tiempo}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="card-panel">
          <div className="card-panel-header">
            <div>
              <span className="section-overline">MONITOREO</span>
              <h2 className="card-panel-title">Estado de servicios</h2>
            </div>
          </div>
          <div className="services-list">
            {servicios.map((servicio) => {
              const Icon = servicio.icono;
              return (
                <div className="service-item" key={servicio.nombre}>
                  <div className="service-main">
                    <div className="service-icon">
                      <Icon size={18} />
                    </div>
                    <div>
                      <strong>{servicio.nombre}</strong>
                      <p>{servicio.descripcion}</p>
                    </div>
                  </div>
                  <span className={`service-status ${servicio.clase}`}>
                    <span className="status-dot-small"></span>
                    {servicio.estado}
                  </span>
                </div>
              );
            })}
          </div>
        </article>
      </section>

      <section className="card-panel pqr-panel">
        <div className="card-panel-header">
          <div>
            <span className="section-overline">ATENCIÓN CIUDADANA</span>
            <h2 className="card-panel-title">Estado de PQR</h2>
          </div>
          <span className="pqr-period">Último mes</span>
        </div>
        <div className="pqr-grid">
          <div className="pqr-stat">
            <span className="pqr-stat-label">Recibidas</span>
            <div className="pqr-progress">
              <span className="received"></span>
            </div>
          </div>
          <div className="pqr-stat">
            <span className="pqr-stat-label">En proceso</span>
            <div className="pqr-progress">
              <span className="process"></span>
            </div>
          </div>
          <div className="pqr-stat">
            <span className="pqr-stat-label">Resueltas</span>
            <div className="pqr-progress">
              <span className="resolved"></span>
            </div>
          </div>
          <div className="pqr-stat">
            <span className="pqr-stat-label">Pendientes</span>
            <div className="pqr-progress">
              <span className="pending"></span>
            </div>
          </div>
        </div>
      </section>

      <section className="card-panel quick-actions-panel">
        <div className="card-panel-header">
          <div>
            <span className="section-overline">ADMINISTRACIÓN</span>
            <h2 className="card-panel-title">Acciones rápidas</h2>
          </div>
        </div>
        <div className="quick-actions-grid">
          {acciones.map((accion) => {
            const Icon = accion.icono;
            return (
              <button className="quick-action" key={accion.titulo}>
                <div className="quick-action-icon">
                  <Icon size={20} />
                </div>
                <div className="quick-action-content">
                  <strong>{accion.titulo}</strong>
                  <span>{accion.descripcion}</span>
                </div>
                <ArrowUpRight className="quick-action-arrow" size={16} />
              </button>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default DasboarAdmin;