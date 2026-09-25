import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import './Register.css';

export const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
    password: '',
    confirmarPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmarPassword, setShowConfirmarPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

<<<<<<< HEAD
    // 1. Validar teléfono (exactamente 10 dígitos)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.telefono)) {
      alert('El número de teléfono debe contener exactamente 10 dígitos numéricos.');
      return;
    }

    // 2. Validar formato de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Por favor, ingresa un correo electrónico válido.');
      return;
    }

    // 3. Validar fuerza de la contraseña (mínimo 8 caracteres, al menos 1 mayúscula, 1 minúscula y 1 número)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      alert('La contraseña debe tener al menos 8 caracteres, incluyendo una letra mayúscula, una minúscula y un número.');
      return;
    }

    // 4. Validar coincidencia de contraseñas
    if (formData.password !== formData.confirmarPassword) {
      alert('Las contraseñas no coinciden.');
=======
    if (formData.password !== formData.confirmarPassword) {
      alert('Las contraseñas no coinciden');
>>>>>>> 9062b6ad61025fe79b83e8cfb65c1fb600ebb306
      return;
    }

    try {
      const res = await fetch(`http://127.0.0.1:4000/v1/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'EmcaSecret2026'
        },
        body: JSON.stringify({
          nombre: formData.nombre,
          apellido: formData.apellido,
          telefono: formData.telefono,
          email: formData.email,
          password: formData.password,
          estado: 'activo',
          rol: 'USUARIO'
        })
      });

      const data = await res.json();

      if (res.ok) {
        alert('¡Asesor registrado correctamente!');
        navigate('/');
      } else {
        alert(data.mensaje || 'No fue posible registrar el usuario.');
      }
    } catch (error) {
      console.error('Error en registro:', error);
      alert('Error de conexión con el servidor al intentar registrar.');
    }
  };

  return (
    <div className="auth-form-register">
      <form onSubmit={handleSubmit} className="card-register">
        <h2>Registro de Asesores</h2>

        <div className="grid-inputs">
          <div className="input-group-reg">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
<<<<<<< HEAD
              value={formData.nombre}
=======
>>>>>>> 9062b6ad61025fe79b83e8cfb65c1fb600ebb306
              placeholder="Nombre completo"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group-reg">
            <label htmlFor="apellido">Apellido</label>
            <input
              type="text"
              id="apellido"
              name="apellido"
<<<<<<< HEAD
              value={formData.apellido}
=======
>>>>>>> 9062b6ad61025fe79b83e8cfb65c1fb600ebb306
              placeholder="Apellidos"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group-reg">
            <label htmlFor="telefono">Teléfono</label>
            <input
<<<<<<< HEAD
              type="tel"
              id="telefono"
              name="telefono"
              maxLength={10}
              value={formData.telefono}
              placeholder="10 dígitos (ej. 3001234567)"
=======
              type="text"
              id="telefono"
              name="telefono"
              placeholder="Número de teléfono"
>>>>>>> 9062b6ad61025fe79b83e8cfb65c1fb600ebb306
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group-reg">
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
<<<<<<< HEAD
              value={formData.email}
=======
>>>>>>> 9062b6ad61025fe79b83e8cfb65c1fb600ebb306
              placeholder="Correo corporativo"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group-reg">
            <label htmlFor="password">Contraseña</label>
            <div className="password-wrapper-reg">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
<<<<<<< HEAD
                value={formData.password}
                placeholder="Mínimo 8 caracteres, 1 mayúscula, 1 número"
=======
                placeholder="Contraseña"
>>>>>>> 9062b6ad61025fe79b83e8cfb65c1fb600ebb306
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="btn-eye"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="input-group-reg">
            <label htmlFor="confirmarPassword">Confirmar contraseña</label>
            <div className="password-wrapper-reg">
              <input
                type={showConfirmarPassword ? 'text' : 'password'}
                id="confirmarPassword"
                name="confirmarPassword"
<<<<<<< HEAD
                value={formData.confirmarPassword}
                placeholder="Repite la contraseña"
=======
                placeholder="Confirmar contraseña"
>>>>>>> 9062b6ad61025fe79b83e8cfb65c1fb600ebb306
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="btn-eye"
                onClick={() => setShowConfirmarPassword(!showConfirmarPassword)}
                tabIndex={-1}
              >
                {showConfirmarPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        </div>

        <div className="actions-register">
          <button type="submit" className="btn-primary-reg">Crear Cuenta</button>
          <button type="button" className="btn-secondary-reg" onClick={() => navigate('/')}>
            Iniciar sesión
          </button>
        </div>
      </form>
    </div>
  );
};