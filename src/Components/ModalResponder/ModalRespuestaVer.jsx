import React from 'react';
import './Modal.css';

export default function ModalVer({ datos, cerrar }) {
  if (!datos) return null;

  return (
    <div className="overlay">
      <div className="modal">
        <h2>Detalle de la Solicitud</h2>

        <div className="detalle_contenido">
          <p><strong>N° Radicado:</strong> #{datos.radicado || datos.id}</p>
          <p><strong>Ciudadano:</strong> {datos.ciudadano || datos.nombre_usuario}</p>
          <p><strong>Teléfono/WhatsApp:</strong> {datos.telefono || 'No registra'}</p>
          <p><strong>Tipo de Solicitud:</strong> {datos.tipo}</p>
          <p><strong>Asunto:</strong> {datos.asunto}</p>
          <p><strong>Descripción:</strong> {datos.descripcion || 'Sin descripción adicional.'}</p>
          <p><strong>Estado Actual:</strong> <span className={`badge estado_${datos.estado?.toLowerCase()}`}>{datos.estado}</span></p>
          <p><strong>Fecha de Creación:</strong> {datos.fecha_creacion || datos.fecha}</p>
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