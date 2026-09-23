import { useState, useEffect } from 'react';
import './Configuracion.css';

export default function Configuracion() {
  const [nombreEmpresa, setNombreEmpresa] = useState('Empresa Públicas de Calarcá - EMCA');
  const [email, setEmail] = useState('contacto@emca.com');
  const [telefono, setTelefono] = useState('(606) 123 4567');

  const obtenerConfiguracion = async () => {
    try {
      const res = await fetch('http://127.0.0.1:4000/v1/configuracion', {
        headers: {
          "x-api-key": "EmcaSecret2026"
        }
      });
      if (!res.ok) throw new Error("Error en la solicitud");
      const data = await res.json();
      if (data.nombreEmpresa) setNombreEmpresa(data.nombreEmpresa);
    } catch (error) {
      console.error("Error de conexión con la base de datos:", error);
    }
  };

  useEffect(() => {
    obtenerConfiguracion();
  }, []);

  return (
    <div className="config-page">
      <div className="config-header">
        <h2>⚙️ Configuración del Sistema</h2>
        <p>Administra las preferencias del panel del jefe</p>
      </div>

      <div className="contenedor-scroll"> 
        <div className="config-card">
          <h3>🏢 Configuración general</h3>

          <div className="form-grid">
            <div className="Campo">
              <label>Nombre de la empresa</label>
              <input 
                type="text" 
                value={nombreEmpresa} 
                onChange={(e) => setNombreEmpresa(e.target.value)} 
              />
            </div>

            <div className="Campo">
              <label>Correo institucional</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>

            <div className="Campo">
              <label>Teléfono</label>
              <input 
                type="text" 
                value={telefono} 
                onChange={(e) => setTelefono(e.target.value)} 
              />
            </div>

            <div className="Campo">
              <label>Zona horaria</label>
              <select defaultValue="America/Bogota">
                <option value="America/Bogota">Colombia (GMT-5)</option>
                <option value="America/Lima">Perú (GMT-5)</option>
                <option value="America/Mexico_City">México (GMT-6)</option>
              </select>
            </div>
          </div>
        </div>

       
        <div className="config-card">
          <h3>🔔 Notificaciones</h3>
          <div className="switch-group">
            <div className="switch-item">
              <div>
                <strong>Nuevas solicitudes</strong>
                <p>Recibir alertas cuando se registre una solicitud</p>
              </div>
              <input type="checkbox" defaultChecked />
            </div>

            <div className="switch-item">
              <div>
                <strong>Respuestas pendientes</strong>
                <p>Avisos sobre respuestas sin aprobar</p>
              </div>
              <input type="checkbox" defaultChecked />
            </div>

            <div className="switch-item">
              <div>
                <strong>Actividad de empleados</strong>
                <p>Notificaciones de cambios importantes en el sistema</p>
              </div>
              <input type="checkbox" />
            </div>
          </div>
        </div>

  
        <div className="config-card">
          <h3>🔒 Seguridad</h3>

          <div className="form-grid">
            <div className="Campo">
              <label>Sesión máxima (minutos)</label>
              <input type="number" defaultValue="60" />
            </div>

            <div className="Campo">
              <label>Intentos de acceso</label>
              <input type="number" defaultValue="5" />
            </div>
          </div>

          <div className="switch-group">
            <div className="switch-item">
              <div>
                <strong>Autenticación en dos pasos</strong>
                <p>Requiere un código adicional al iniciar sesión</p>
              </div>
              <input type="checkbox" />
            </div>
          </div>
        </div>

  
        <div className="config-card">
          <h3>🎨 Apariencia</h3>

          <div className="form-grid">
            <div className="Campo">
              <label>Tema</label>
              <select defaultValue="claro">
                <option value="claro">Claro</option>
                <option value="oscuro">Oscuro</option>
                <option value="sistema">Automático</option>
              </select>
            </div>

            <div className="Campo">
              <label>Color principal</label>
              <input type="color" defaultValue="#22c55e" />
            </div>
          </div>
        </div>

        
        <div className="config-card">
          <h3>ℹ️ Información del sistema</h3>

          <div className="info-grid">
            <div className="info-item">
              <span>Versión</span>
              <strong>EMCA v1.0.0</strong>
            </div>

            <div className="info-item">
              <span>Última actualización</span>
              <strong>02/08/2026</strong>
            </div>

            <div className="info-item">
              <span>Base de datos</span>
              <strong>MySQL 8</strong>
            </div>

            <div className="info-item">
              <span>Servidor</span>
              <strong>Activo 🟢</strong>
            </div>
          </div>
        </div>

        <div className="acciones-finales">
          <button className="btn-secundarios">🔄 Restablecer</button>
          <button className="btn-primarys">💾 Guardar configuración</button>
        </div>
      </div>
    </div>
  );
}