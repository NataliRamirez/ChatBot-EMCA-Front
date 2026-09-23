import React from 'react';
import './Modal.css';

export default function ModalHistorial({ datos, cerrar }) {
  if (!datos) return null;

  // Usa el historial que venga en los datos o un array vacío
  const historialEventos = datos.historial || [
    {
      id: 1,
      titulo: 'Solicitud registrada',
      fecha: datos.fecha_creacion || 'Fecha no disponible',
      detalle: `Estado: ${datos.estado || 'Pendiente'}`
    }
  ];

  return (
    <div className="overlay">
      <div className="modal">
        <h2>Historial de la Solicitud #{datos.radicado || datos.id}</h2>

        <div className="timeline">
          {historialEventos.map((evento, index) => (
            <div key={evento.id || index} className="evento">
              <h4>{evento.titulo || evento.accion}</h4>
              <p>{evento.fecha}</p>
              <span>{evento.detalle || evento.descripcion}</span>
            </div>
          ))}
        </div>

        <div className="botones">
          <button type="button" className="btnCancelar" onClick={cerrar}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}