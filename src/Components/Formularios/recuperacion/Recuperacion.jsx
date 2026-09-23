import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Recuperacion.css'; 

export default function Recuperacion() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://127.0.0.1:4000/v1/recuperacion/solicitar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (res.ok) {
        alert('Correo de recuperación enviado con éxito');
        navigate('/'); 
      } else {
        alert(`Error: ${data.mensaje}`);
      }
    } catch (error) {
      alert('Error de conexión con el backend');
    }
  };

  return (
    <div className="page-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <div className='Content_recuperacion'>
          <h2>Recuperación de cuenta</h2>

        
          <label htmlFor="emailInput">Correo electrónico</label>
          <input className='btn_input'
            type="email" 
            id="emailInput" 
            name='email' 
            placeholder='Ingrese su correo' 
            onChange={handleChange} 
            required 
          />

          <div className='container_botones'>
            <button type="submit" className='btn_enviarCorreo'>
              Recuperar cuenta
            </button>
            <button  type="button" onClick={() => navigate('/')} className='btn_cancelar'>
              Cancelar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}