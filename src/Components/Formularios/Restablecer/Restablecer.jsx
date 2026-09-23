import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react'; // Importamos los iconos
import './Restablecer.css';

export default function Restablecer() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';

  const [passwords, setPasswords] = useState({
    nuevaPassword: '',
    confirmarPassword: ''
  });

  // 👁️ Estados para alternar visibilidad independientemente en cada campo
  const [showNuevaPassword, setShowNuevaPassword] = useState(false);
  const [showConfirmarPassword, setShowConfirmarPassword] = useState(false);

  const handleChange = (e) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert('El token de recuperación no es válido o falta en la URL.');
      return;
    }

    if (passwords.nuevaPassword !== passwords.confirmarPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    try {
      const res = await fetch('http://127.0.0.1:4000/v1/recuperacion/restablecer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, nuevaPassword: passwords.nuevaPassword })
      });

      const data = await res.json();

      if (res.ok) {
        alert('RESTABLECIMIENTO DE CREDENCIALES EXITOSO');
        navigate('/');
      } else {
        alert(`Error: ${data.mensaje || 'Token inválido o expirado'}`);
      }
    } catch (error) {
      console.error('Error restablecer:', error);
      alert('Error al conectar con el servidor');
    }
  };

  if (!token) {
    return (
      <div className="auth-form">
        <div className="Container_login">
          <h2>Enlace no válido</h2>
          <label style={{ fontSize: '18px', textAlign: 'center', marginBottom: '20px' }}>
            No se encontró ningún token de recuperación en la URL.
          </label>
          <div className="contenedor_principal">
            <button 
              onClick={() => navigate('/')} 
              className="btn_entrar"
            >
              Ir al Inicio de Sesión
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-form">
      <form onSubmit={handleSubmit} className="Containers_login">
        <h2>Restablecimiento</h2>

        <div className='Contenido_email'>
          <label htmlFor="email">Ingrese el correo electronico:</label>
           <input 
               type="text" 
               id='email' 
               name='email' 
               placeholder='Ingrese el correo' 
               onChange={handleChange} 
               required
              />
        </div>

        {/* Campo Nueva Contraseña */}
        <div className="input-group">
          <label htmlFor="nuevaPassword">Ingrese la contraseña nueva:</label>
          <div className="password-wrapper">
            <input
              type={showNuevaPassword ? 'text' : 'password'}
              id="nuevaPassword"
              name="nuevaPassword"
              placeholder="Ingrese su contraseña nueva"
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="toggle-password-btn"
              onClick={() => setShowNuevaPassword(!showNuevaPassword)}
              tabIndex={-1}
            >
              {showNuevaPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Campo Confirmar Contraseña */}
        <div className="input-group">
          <label htmlFor="confirmarPassword">Confirme su contraseña:</label>
          <div className="password-wrapper">
            <input
              type={showConfirmarPassword ? 'text' : 'password'}
              id="confirmarPassword"
              name="confirmarPassword"
              placeholder="Confirme su contraseña nueva"
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="toggle-password-btn"
              onClick={() => setShowConfirmarPassword(!showConfirmarPassword)}
              tabIndex={-1}
            >
              {showConfirmarPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <div className="contenedor_principal">
          <button type="submit" className="btn_entrar">
            Restablecer contraseña
          </button>
        </div>
      </form>
    </div>
  );
}