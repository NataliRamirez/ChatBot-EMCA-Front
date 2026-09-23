import React, { useState } from 'react';
import './Modal.css';

export default function ModalResponder({ datos, cerrar, onRespuestaEnviada }) {
  const [respuesta, setRespuesta] = useState('');
  const [cargando, setCargando] = useState(false);

  if (!datos) return null;

  const enviar = async () => {
    if (!respuesta.trim()) {
      alert('Por favor ingrese el texto de la respuesta.');
      return;
    }

    setCargando(true);

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://127.0.0.1:4000/v1/solicitudes/${datos.id}/responder`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          respuesta: respuesta,
          solicitudId: datos.id
        })
      });

      const data = await res.json();

      if (res.ok) {
        alert('Respuesta enviada exitosamente.');
        if (onRespuestaEnviada) onRespuestaEnviada();
        cerrar();
      } else {
        alert(data.mensaje || 'Error al enviar la respuesta.');
      }
    } catch (error) {
      console.error('Error al responder solicitud:', error);
      alert('Error de conexión con el servidor.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="overlay">
      <div className="modal">
        <h2>Responder Solicitud</h2>
        <p><strong>Radicado:</strong> #{datos.radicado || datos.id}</p>
        <p><strong>Ciudadano:</strong> {datos.ciudadano || datos.nombre_usuario}</p>
        <p><strong>Asunto:</strong> {datos.asunto}</p>

        <textarea
          placeholder="Escriba la respuesta oficial para el ciudadano..."
          value={respuesta}
          onChange={(e) => setRespuesta(e.target.value)}
          disabled={cargando}
          rows={5}
        />

        <div className="botones">
          <button
            type="button"
            className="btnCancelar"
            onClick={cerrar}
            disabled={cargando}
          >
            Cancelar
          </button>
          <button
            type="button"
            className="btnGuardar"
            onClick={enviar}
            disabled={cargando}
          >
            {cargando ? 'Enviando...' : 'Enviar Respuesta'}
          </button>
        </div>
      </div>
    </div>
  );
}