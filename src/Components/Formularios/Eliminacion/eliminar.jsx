import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './eliminar.css';

export default function Eliminar() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!window.confirm('¿Está seguro de que desea eliminar su cuenta? Esta acción no se puede deshacer.')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://127.0.0.1:4000/v1/auth/eliminar-cuenta', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        alert('Cuenta eliminada correctamente.');
        localStorage.clear();
        navigate('/');
      } else {
        alert(data.mensaje || 'No se pudo eliminar la cuenta.');
      }
    } catch (error) {
      console.error('Error al eliminar cuenta:', error);
      alert('Error al conectar con el servidor.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <div className="container_eliminar">
        <h2>Eliminar cuenta</h2>

        <label htmlFor="email">Ingrese su correo electrónico:</label>
        <input
          type="email"
          name="email"
          placeholder="Ingrese su correo"
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Ingrese su contraseña:</label>
        <input
          type="password"
          name="password"
          placeholder="Ingrese su contraseña"
          onChange={handleChange}
          required
        />

        <button type="submit" className="btn_delete">Eliminar cuenta definitivamente</button>
      </div>
    </form>
  );
}