import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import './login.css';

export const Login = ({ setAuth }) => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

<<<<<<< HEAD
    // 1. Validar formato de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(credentials.email)) {
      alert('Por favor, ingresa un correo electrónico válido.');
      return;
    }

    // 2. Validar restricciones de contraseña (mínimo 8 caracteres, 1 mayúscula, 1 minúscula y 1 número)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(credentials.password)) {
      alert('La contraseña debe contener al menos 8 caracteres, incluyendo una mayúscula, una minúscula y un número.');
      return;
    }

    try {
      // Corregido: 'fetch' en lugar de 'fetcha'
      const res = await fetch('http://127.0.0.1:4000/v1/auth/login', {
=======
    try {
      const res = await fetch(`http://127.0.0.1:4000/v1/auth/login`, {
>>>>>>> 9062b6ad61025fe79b83e8cfb65c1fb600ebb306
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'EmcaSecret2026'
        },
<<<<<<< HEAD
        body: JSON.stringify({
          email: credentials.email.trim(),
          password: credentials.password
        })
=======
        body: JSON.stringify(credentials)
>>>>>>> 9062b6ad61025fe79b83e8cfb65c1fb600ebb306
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('usuario', JSON.stringify(data.empleado));

        if (setAuth) setAuth(true);

        const userRol = data.empleado?.rol?.toUpperCase();

        if (userRol === 'ADMIN') {
          navigate('/panel-admin');
        } else if (userRol === 'JEFE') {
          navigate('/panel-jefe');
        } else if (userRol === 'ASESOR' || userRol === 'USUARIO') {
          navigate('/panel-usuario');
        } else {
          alert(`Rol no asignado o desconocido: ${userRol}`);
          navigate('/');
        }
      } else {
        alert(data.mensaje || 'Credenciales incorrectas');
      }
    } catch (error) {
      console.error('Error Login:', error);
      alert('Error al conectar con el servidor');
    }
  };

  return (
    <div className="auth-form">
      <form onSubmit={handleSubmit} className="Containers_login">
        <h2>Iniciar Sesión</h2>

        <div className="input-group">
          <label htmlFor="correo">Ingrese su correo electrónico:</label>
          <input
            type="email"
            id="correo"
            name="email"
<<<<<<< HEAD
            value={credentials.email}
=======
>>>>>>> 9062b6ad61025fe79b83e8cfb65c1fb600ebb306
            placeholder="Correo"
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Ingrese su contraseña:</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
<<<<<<< HEAD
              value={credentials.password}
=======
>>>>>>> 9062b6ad61025fe79b83e8cfb65c1fb600ebb306
              placeholder="Contraseña"
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="toggle-password-btn"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <div className="contenedor_principal">
          <button type="submit" className="btn_entrar">Entrar al Sistema</button>
          <button type="button" onClick={() => navigate('/registro')} className="btn_entrar">Regístrese</button>
          <button type="button" onClick={() => navigate('/recuperar')} className="btn_entrar" style={{ color: '#dce7ff' }}>¿Olvidó su contraseña?</button>
        </div>
      </form>
    </div>
  );
};