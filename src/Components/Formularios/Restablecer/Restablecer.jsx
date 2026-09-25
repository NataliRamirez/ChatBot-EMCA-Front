import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
<<<<<<< HEAD
import { Eye, EyeOff } from 'lucide-react';
=======
import { Eye, EyeOff } from 'lucide-react'; // Importamos los iconos
>>>>>>> 9062b6ad61025fe79b83e8cfb65c1fb600ebb306
import './Restablecer.css';

export default function Restablecer() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';

<<<<<<< HEAD
  const [formData, setFormData] = useState({
    email: '',
=======
  const [passwords, setPasswords] = useState({
>>>>>>> 9062b6ad61025fe79b83e8cfb65c1fb600ebb306
    nuevaPassword: '',
    confirmarPassword: ''
  });

<<<<<<< HEAD
  // Estados para alternar visibilidad de las contraseñas
=======
  // 👁️ Estados para alternar visibilidad independientemente en cada campo
>>>>>>> 9062b6ad61025fe79b83e8cfb65c1fb600ebb306
  const [showNuevaPassword, setShowNuevaPassword] = useState(false);
  const [showConfirmarPassword, setShowConfirmarPassword] = useState(false);

  const handleChange = (e) => {
<<<<<<< HEAD
    setFormData({
      ...formData,
=======
    setPasswords({
      ...passwords,
>>>>>>> 9062b6ad61025fe79b83e8cfb65c1fb600ebb306
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert('El token de recuperación no es válido o falta en la URL.');
      return;
    }

<<<<<<< HEAD
    // 1. Validar formato de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Por favor, ingresa un correo electrónico válido.');
      return;
    }

    // 2. Validar restricciones de contraseña (mínimo 8 caracteres, 1 mayúscula, 1 minúscula y 1 número)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(formData.nuevaPassword)) {
      alert('La contraseña nueva debe tener al menos 8 caracteres, incluyendo una letra mayúscula, una minúscula y un número.');
      return;
    }

    // 3. Validar coincidencia de contraseñas
    if (formData.nuevaPassword !== formData.confirmarPassword) {
      alert('Las contraseñas no coinciden.');
=======
    if (passwords.nuevaPassword !== passwords.confirmarPassword) {
      alert('Las contraseñas no coinciden');
>>>>>>> 9062b6ad61025fe79b83e8cfb65c1fb600ebb306
      return;
    }

    try {
      const res = await fetch('http://127.0.0.1:4000/v1/recuperacion/restablecer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
<<<<<<< HEAD
        body: JSON.stringify({
          token,
          email: formData.email,
          nuevaPassword: formData.nuevaPassword
        })
=======
        body: JSON.stringify({ token, nuevaPassword: passwords.nuevaPassword })
>>>>>>> 9062b6ad61025fe79b83e8cfb65c1fb600ebb306
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

<<<<<<< HEAD
        {/* Campo Correo Electrónico */}
        <div className="Contenido_email">
          <label htmlFor="email">Ingrese el correo electrónico:</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={formData.email}
            placeholder="ejemplo@dominio.com" 
            onChange={handleChange} 
            required
          />
=======
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
>>>>>>> 9062b6ad61025fe79b83e8cfb65c1fb600ebb306
        </div>

        {/* Campo Nueva Contraseña */}
        <div className="input-group">
          <label htmlFor="nuevaPassword">Ingrese la contraseña nueva:</label>
          <div className="password-wrapper">
            <input
              type={showNuevaPassword ? 'text' : 'password'}
              id="nuevaPassword"
              name="nuevaPassword"
<<<<<<< HEAD
              value={formData.nuevaPassword}
              placeholder="Mínimo 8 caracteres, 1 mayúscula, 1 número"
=======
              placeholder="Ingrese su contraseña nueva"
>>>>>>> 9062b6ad61025fe79b83e8cfb65c1fb600ebb306
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
<<<<<<< HEAD
              value={formData.confirmarPassword}
              placeholder="Repite tu nueva contraseña"
=======
              placeholder="Confirme su contraseña nueva"
>>>>>>> 9062b6ad61025fe79b83e8cfb65c1fb600ebb306
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