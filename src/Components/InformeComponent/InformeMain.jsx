import React from 'react';
import { useNavigate } from 'react-router-dom';
import './InformeMain.css';

export default function InformeMain({
  title,
  parrafo,
  buttonDownloader,
  buttonAgregar,
  onDownload,
  ruta
}) {
  const navigate = useNavigate();

  return (
    <div className="Informe_chatbot">
      <div className="Contents">
        <h2 className="content_title">{title}</h2>
        <p className="info_parrafo">{parrafo}</p>

        <div className="acciones_informe">
          {buttonDownloader && (
            <button
              type="button"
              className="btn_downloaders"
              onClick={onDownload}
            >
              {buttonDownloader}
            </button>
          )}

          {buttonAgregar && ruta && (
            <button
              type="button"
              className="btn_agregar"
              onClick={() => navigate(ruta)}
            >
              {buttonAgregar}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}