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

    try {
      const res = await fetch(`http://127.0.0.1:4000/v1/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'EmcaSecret2026'
        },
        body: JSON.stringify(credentials)
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