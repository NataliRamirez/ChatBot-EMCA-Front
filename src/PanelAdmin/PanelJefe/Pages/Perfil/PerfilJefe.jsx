import { useState, useEffect, useRef } from 'react';
import './PerfilJefe.css';

export default function PerfilJefe() {
  const [nombre, setNombre] = useState('Juan David Castañeda');
  const [email, setEmail] = useState('juan.castaneda@emca.com');
  const [telefono, setTelefono] = useState('');
  const [documento, setDocumento] = useState('');
  const [cargo, setCargo] = useState('Jefe Administrativo');


  const [fotoPerfil, setFotoPerfil] = useState(null); 
  const [archivoFoto, setArchivoFoto] = useState(null); 
  
 
  const fileInputRef = useRef(null);

  const [contraseñaActual, setContraseñaActual] = useState('');
  const [nuevaContraseña, setNuevaContraseña] = useState('');
  const [confirmarContraseña, setConfirmarContraseña] = useState('');

  const cargarPerfil = async () => {
    try {
      const res = await fetch('http://127.0.0.1:4000/v1/perfil', {
        headers: {
          'x-api-key': 'EmcaSecret2026'
        }
      });
      if (!res.ok) throw new Error('Error al cargar perfil');
      const data = await res.json();
      if (data.nombre) setNombre(data.nombre);
      if (data.foto) setFotoPerfil(data.foto); 
    } catch (error) {
      console.error('Error al consultar la base de datos:', error);
    }
  };

  useEffect(() => {
    cargarPerfil();
  }, []);

  // 📸 1. Manejador para seleccionar la foto desde el explorador
  const handleSeleccionarFoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      setArchivoFoto(file);
      // Generar URL temporal para previsualización inmediata
      setFotoPerfil(URL.createObjectURL(file));
    }
  };

  // 💾 2. Guardar datos y foto en el backend
  const idEmpleado = 1; 

const guardarPerfil = async () => {
  try {
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('email', email);
    formData.append('telefono', telefono);
    formData.append('documento', documento);
    formData.append('cargo', cargo);

    if (archivoFoto) {
      formData.append('foto', archivoFoto);
    }

    // 🟢 Agregamos /${idEmpleado} al final de la URL para que no dé 404
    const res = await fetch(`http://127.0.0.1:4000/v1/perfil/${idEmpleado}`, {
      method: 'PUT',
      headers: {
        'x-api-key': 'EmcaSecret2026'
      },
      body: formData
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.mensaje || 'Error al actualizar');
    alert('✅ Cambios de perfil y foto guardados correctamente');
  } catch (error) {
    console.error(error);
    alert(`❌ ${error.message}`);
  }
};

  const actualizarPassword = async () => {
    if (nuevaContraseña !== confirmarContraseña) {
      alert('❌ Las contraseñas no coinciden');
      return;
    }
    alert('🔑 Contraseña actualizada exitosamente');
  };

  return (
    <div className="perfil-page">
      <div className="perfil-header">
        <h2>👤 Mi Perfil</h2>
        <p>Administra tu información personal y de acceso</p>
      </div>

      <div className="perfil-grid">
        <div className="perfil-card usuario-card">
          
          {/* 🖼️ Muestra la foto si existe o las iniciales si no */}
          {fotoPerfil ? (
            <img src={fotoPerfil} alt="Perfil" className="avatar-xl avatar-img" />
          ) : (
            <div className="avatar-xl">JD</div>
          )}

          <h3>{nombre}</h3>
          <p className="rol">{cargo}</p>
          <span className="estado activo">🟢 Activo</span>

          {/* 🔘 Input file OCULTO */}
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleSeleccionarFoto} 
            accept="image/*" 
            style={{ display: 'none' }} 
          />

          {/* 🔘 Botón que simula el clic sobre el input oculto */}
          <button 
            type="button"
            className="btn-secundario full" 
            onClick={() => fileInputRef.current.click()}
          >
            📷 Cambiar foto
          </button>

          <div className="stats-usuario">
            <div><strong>24</strong><span>Empleados</span></div>
            <div><strong>128</strong><span>Solicitudes</span></div>
            <div><strong>84</strong><span>Respuestas</span></div>
          </div>
        </div>

        <div className="contenedor-scroll">
          <div className="perfil-card info-card">
            <div className="seccion">
              <h3>📋 Información personal</h3>
              <div className="form-grid">
                <div className="campo">
                  <label>Nombre completo</label>
                  <input 
                    type="text" 
                    value={nombre} 
                    onChange={(e) => setNombre(e.target.value)} 
                  />
                </div>

                <div className="campo">
                  <label>Correo electrónico</label>
                  <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                  />
                </div>

                <div className="campo">
                  <label>Teléfono</label>
                  <input 
                    type="text" 
                    value={telefono} 
                    onChange={(e) => setTelefono(e.target.value)} 
                  />
                </div>

                <div className="campo">
                  <label>Documento</label>
                  <input 
                    type="text" 
                    value={documento} 
                    onChange={(e) => setDocumento(e.target.value)} 
                  />
                </div>

                <div className="campo full-width">
                  <label>Cargo</label>
                  <input 
                    type="text" 
                    value={cargo} 
                    onChange={(e) => setCargo(e.target.value)} 
                  />
                </div>
              </div>

              <div className="acciones-form">
                <button className="btn-primary" onClick={guardarPerfil}>
                  💾 Guardar cambios
                </button>
              </div>
            </div>

            <div className="divider"></div>

            <div className="seccion">
              <h3>🔒 Seguridad</h3>
              <div className="form-grid">
                <div className="campo full-width">
                  <label>Contraseña actual</label>
                  <input 
                    type="password" 
                    value={contraseñaActual} 
                    onChange={(e) => setContraseñaActual(e.target.value)} 
                  />
                </div>

                <div className="campo">
                  <label>Nueva contraseña</label>
                  <input 
                    type="password" 
                    value={nuevaContraseña} 
                    onChange={(e) => setNuevaContraseña(e.target.value)} 
                  />
                </div>

                <div className="campo">
                  <label>Confirmar contraseña</label>
                  <input 
                    type="password" 
                    value={confirmarContraseña} 
                    onChange={(e) => setConfirmarContraseña(e.target.value)} 
                  />
                </div>
              </div>

              <div className="acciones-form">
                <button className="btn-primary" onClick={actualizarPassword}>
                  🔑 Actualizar contraseña
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}