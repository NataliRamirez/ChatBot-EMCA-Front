import { useState, useEffect, useRef } from 'react';
import './Panelusuario.css';

const BOT_URL = 'http://127.0.0.1:3008/v1/messages';
const BACKEND_URL = 'http://127.0.0.1:4000';
const API_KEY = 'EmcaSecret2026';

export default function Panelusuario() {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [activePhone, setActivePhone] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // Cargar lista de usuarios desde el backend
  const fetchUsers = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/v1/users`, {
        headers: { 'x-api-key': API_KEY }
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error cargando usuarios:', error);
    }
  };

  // Cargar historial de chat del usuario activo
  const fetchHistory = async (phone) => {
    if (!phone) return;
    try {
      const res = await fetch(`${BACKEND_URL}/v1/history/${phone}`, {
        headers: { 'x-api-key': API_KEY }
      });

      if (!res.ok) return;

      const data = await res.json();
      setMessages(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error cargando historial:', error);
    }
  };

  // Desplazamiento automático al final de la ventana de chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Selección de usuario de la barra lateral
  const handleSelectUser = (phone) => {
    setActivePhone(phone);
    setMessages([]);
    fetchHistory(phone);
  };

  // Envío de mensaje de texto por el Asesor Humano hacia el Bot
  const sendMessage = async () => {
    const text = inputValue.trim();
    if (!text || !activePhone) return;

    setInputValue('');

    try {
      const resBot = await fetch(BOT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          number: activePhone,
          message: text
        })
      });

      if (!resBot.ok) throw new Error('Error al enviar mensaje desde el bot');

      fetchHistory(activePhone);
    } catch (error) {
      console.error('Error enviando mensaje:', error);
      alert('No se pudo enviar el mensaje');
    }
  };

  // Finalizar atención humana y reactivar la respuesta automática del Bot
  const reactivarBot = async () => {
    if (!activePhone) return;
    const confirmar = window.confirm('¿Finalizar asesoría y reactivar BOT?');
    if (!confirmar) return;

    try {
      await fetch(`${BACKEND_URL}/v1/reactivar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY
        },
        body: JSON.stringify({ telefono: activePhone })
      });

      await fetch(BOT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          number: activePhone,
          message: '✅ Atención personalizada finalizada.'
        })
      });

      alert('BOT reactivado');
      setMessages([]);
      setActivePhone('');
      fetchUsers();
    } catch (error) {
      console.error('Error reactivando BOT:', error);
    }
  };

  // Subir archivo multimedia al backend y enviarlo a WhatsApp mediante el Bot
  const uploadMultimedia = async (file) => {
    if (!file || !activePhone) return;

    const formData = new FormData();
    formData.append('archivo', file);
    formData.append('telefono', activePhone);

    setIsUploading(true);

    try {
      // 1. Subir al Backend API
      const res = await fetch(`${BACKEND_URL}/v1/multimedia`, {
        method: 'POST',
        body: formData
      });

      if (!res.ok) throw new Error('Error al cargar contenido multimedia en el servidor');
      const data = await res.json();

      // Extraer la URL pública del archivo retornada por el servidor
      const mediaUrl = data.archivoUrl || data.url || data.path;

      if (!mediaUrl) {
        throw new Error('El backend no retornó una URL de archivo válida');
      }

      // 2. Enviar el archivo a WhatsApp usando BuilderBot
      const resBot = await fetch(BOT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          number: activePhone,
          media: mediaUrl, // Pasa la URL directa para que BuilderBot envíe el archivo a WhatsApp
          message: ''
        })
      });

      if (!resBot.ok) {
        throw new Error('Error al despachar el archivo a WhatsApp a través del Bot');
      }

      return data;
    } catch (error) {
      console.error('Error en proceso multimedia:', error);
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      await uploadMultimedia(file);
      fetchHistory(activePhone);
    } catch (error) {
      alert('Error al adjuntar o enviar el archivo multimedia.');
    } finally {
      e.target.value = '';
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  // Polling periódico para la lista de usuarios (cada 5 seg)
  useEffect(() => {
    fetchUsers();
    const usersInterval = setInterval(fetchUsers, 5000);
    return () => clearInterval(usersInterval);
  }, []);

  // Polling periódico para el historial de chat (cada 2 seg)
  useEffect(() => {
    if (!activePhone) return;

    fetchHistory(activePhone);
    const chatInterval = setInterval(() => fetchHistory(activePhone), 2000);

    return () => clearInterval(chatInterval);
  }, [activePhone]);

  return (
    <div className="app-container">
      <aside id="chat-list">
        <div className="sidebar-header">EMCA Admin</div>
        <hr/>
        <div id="users-container">
          {users.map((user) => {
            const isActive = user.telefono === activePhone;
            const isHuman = Number(user.bot_activo) === 0;

            return (
              <div
                key={user.telefono}
                className={`chat-item ${isActive ? 'active' : ''}`}
                onClick={() => handleSelectUser(user.telefono)}
              >
                <div className="chat-info">
                  <b>{user.nombres || user.nombre || user.telefono}</b>
                  <small>{user.telefono}</small>
                </div>
                {isHuman && <span className="status-badge">● Humano</span>}
              </div>
            );
          })}
        </div>
      </aside>

      <main id="chat-window">
        <header className="chat-header">
          <div className="chat-header__info">
            <h3>
              {activePhone
                ? `Chat activo: ${activePhone}`
                : 'Seleccione un chat para comenzar'}
            </h3>
          </div>
          {activePhone && (
            <button id="btn-finish" onClick={reactivarBot}>
              Finalizar Asesoría
            </button>
          )}
        </header>

        <section id="messages">
          {messages.map((msg, index) => {
            const role = (msg.emisor || 'USUARIO').toUpperCase();
            const media = msg.media; // DTO Multimedia retornado por el backend

            let botones = [];
            if (msg.botones) {
              try {
                botones = typeof msg.botones === 'string' ? JSON.parse(msg.botones) : msg.botones;
              } catch (e) {
                botones = [];
              }
            }

            const isGenericText =
              msg.mensaje === 'Archivo adjunto' ||
              msg.mensaje === 'Nota de voz' ||
              (msg.mensaje && msg.mensaje.startsWith('_event_'));

            return (
              <div key={msg.id || index} className={`msg ${role}`}>
                <div className="msg-bubble">

                  {/* MEDIA PROCESADA */}
                  {media && media.archivoUrl && (
                    <div className="media-container" style={{ marginBottom: '6px' }}>
                      
                      {media.tipoMedia === 'IMAGE' && (
                        <img
                          src={media.archivoUrl}
                          alt={media.nombre || 'Fotografía'}
                          style={{ maxWidth: '250px', borderRadius: '8px', cursor: 'pointer', display: 'block' }}
                          onClick={() => window.open(media.archivoUrl, '_blank')}
                        />
                      )}

                      {media.tipoMedia === 'AUDIO' && (
                        <audio controls preload="metadata" style={{ maxWidth: '260px', display: 'block' }}>
                          <source src={media.archivoUrl} />
                          Navegador no soporta audio.
                        </audio>
                      )}

                      {media.tipoMedia === 'VIDEO' && (
                        <video controls preload="metadata" style={{ maxWidth: '280px', borderRadius: '8px', display: 'block' }}>
                          <source src={media.archivoUrl} />
                          Navegador no soporta video.
                        </video>
                      )}

                      {media.tipoMedia === 'DOCUMENT' && (
                        <a
                          href={media.downloadUrl || media.archivoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: '#0066cc', fontWeight: 'bold', textDecoration: 'underline', display: 'inline-block' }}
                        >
                          📄 Descargar Documento ({media.nombre || 'Archivo'})
                        </a>
                      )}
                    </div>
                  )}

                  {/* TEXTO DEL MENSAJE */}
                  {msg.mensaje && !isGenericText && (
                    <div style={{ wordBreak: 'break-word' }}>{msg.mensaje}</div>
                  )}

                  {/* BOTONES INTERACTIVOS */}
                  {Array.isArray(botones) && botones.length > 0 && (
                    <div className="botones-chat" style={{ marginTop: '6px' }}>
                      {botones.map((b, i) => (
                        <button key={i} className="btn-chat" disabled style={{ opacity: 0.8, margin: '2px' }}>
                          {typeof b === 'object' ? b.body || b.title : b}
                        </button>
                      ))}
                    </div>
                  )}

                </div>

                <small className="msg-time">
                  {msg.fecha
                    ? new Date(msg.fecha).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })
                    : ''}
                </small>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </section>

        <footer className="input-area">
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />

          <button
            type="button"
            className="btn-attach"
            disabled={!activePhone || isUploading}
            onClick={() => fileInputRef.current?.click()}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '20px',
              cursor: activePhone && !isUploading ? 'pointer' : 'not-allowed',
              marginRight: '8px',
              opacity: isUploading ? 0.5 : 1
            }}
            title="Adjuntar archivo para enviar a WhatsApp"
          >
            {isUploading ? '⏳' : '📎'}
          </button>

          <input
            type="text"
            id="adminInput"
            placeholder={isUploading ? 'Enviando archivo...' : 'Escribe un mensaje aquí...'}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={!activePhone || isUploading}
          />

          <div className="Content_enviar">
            <button
              className="btn-send"
              onClick={sendMessage}
              disabled={!activePhone || isUploading}
            >
              Enviar
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
}