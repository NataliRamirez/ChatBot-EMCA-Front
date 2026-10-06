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

  // =========================================================
  // OBTENER TIPO DE MULTIMEDIA
  // =========================================================

  const obtenerTipoMultimedia = (file) => {

    if (!file?.type) {
      return 'ADMIN_DOCUMENTO';
    }

    if (file.type.startsWith('image/')) {
      return 'ADMIN_IMAGEN';
    }

    if (file.type.startsWith('audio/')) {
      return 'ADMIN_AUDIO';
    }

    if (file.type.startsWith('video/')) {
      return 'ADMIN_VIDEO';
    }

    return 'ADMIN_DOCUMENTO';
  };

  // =========================================================
  // NORMALIZAR HISTORIAL
  // =========================================================

  const normalizarHistorial = (respuesta) => {

    let lista = [];

    if (Array.isArray(respuesta)) {
      lista = respuesta;
    } else if (Array.isArray(respuesta?.data)) {
      lista = respuesta.data;
    } else if (Array.isArray(respuesta?.mensajes)) {
      lista = respuesta.mensajes;
    } else if (Array.isArray(respuesta?.historial)) {
      lista = respuesta.historial;
    } else if (Array.isArray(respuesta?.resultados)) {
      lista = respuesta.resultados;
    }

    return lista.map((msg) => {

      let media = msg.media || null;

      // -----------------------------------------------------
      // SI EL BACKEND DEVUELVE URL_MEDIA DIRECTAMENTE
      // -----------------------------------------------------

      if (!media && msg.url_media) {

        media = {
          archivoUrl: msg.url_media,
          downloadUrl:
            msg.downloadUrl ||
            `${BACKEND_URL}/v1/download/${String(
              msg.url_media
            ).split('/').pop()}`,
          tipoMedia:
            msg.tipoMedia ||
            msg.tipo_mensaje ||
            '',
          nombre:
            msg.nombre ||
            String(msg.url_media).split('/').pop()
        };

      }

      // -----------------------------------------------------
      // SI VIENE ARCHIVO_URL
      // -----------------------------------------------------

      if (!media && msg.archivoUrl) {

        media = {
          archivoUrl: msg.archivoUrl,
          downloadUrl:
            msg.downloadUrl ||
            msg.archivoUrl,
          tipoMedia:
            msg.tipoMedia ||
            msg.tipo_mensaje ||
            '',
          nombre:
            msg.nombre ||
            String(msg.archivoUrl).split('/').pop()
        };

      }

      return {
        ...msg,
        media
      };
    });
  };

  // =========================================================
  // CARGAR USUARIOS
  // =========================================================

  const fetchUsers = async () => {

    try {

      const res = await fetch(
        `${BACKEND_URL}/v1/users`,
        {
          headers: {
            'x-api-key': API_KEY
          }
        }
      );

      if (!res.ok) {
        throw new Error(
          `HTTP ${res.status}`
        );
      }

      const data =
        await res.json();

      const lista =
        Array.isArray(data)
          ? data
          : Array.isArray(data?.data)
            ? data.data
            : Array.isArray(data?.users)
              ? data.users
              : [];

      setUsers(lista);

    } catch (error) {

      console.error(
        'Error cargando usuarios:',
        error
      );

    }
  };

  // =========================================================
  // CARGAR HISTORIAL
  // =========================================================

  const fetchHistory = async (phone) => {

    if (!phone) {
      return;
    }

    try {

      const res = await fetch(
        `${BACKEND_URL}/v1/history/${encodeURIComponent(
          phone
        )}`,
        {
          headers: {
            'x-api-key': API_KEY
          }
        }
      );

      if (!res.ok) {
        throw new Error(
          `HTTP ${res.status}`
        );
      }

      const data =
        await res.json();

      const historial =
        normalizarHistorial(data);

      setMessages(historial);

    } catch (error) {

      console.error(
        'Error cargando historial:',
        error
      );

    }
  };

  // =========================================================
  // SCROLL
  // =========================================================

  useEffect(() => {

    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });

  }, [messages]);

  // =========================================================
  // SELECCIONAR USUARIO
  // =========================================================

  const handleSelectUser = (phone) => {

    setActivePhone(phone);
    setMessages([]);

    fetchHistory(phone);

  };

  // =========================================================
  // ENVIAR TEXTO
  // =========================================================

  const sendMessage = async () => {

    const text =
      inputValue.trim();

    if (
      !text ||
      !activePhone ||
      isUploading
    ) {
      return;
    }

    setInputValue('');

    try {

      const resBot =
        await fetch(
          BOT_URL,
          {
            method: 'POST',

            headers: {
              'Content-Type':
                'application/json'
            },

            body: JSON.stringify({
              number: activePhone,
              message: text,
              tipoMensaje:
                'ADMIN_TEXTO'
            })
          }
        );

      const responseText =
        await resBot.text();

      let data = {};

      try {
        data = responseText
          ? JSON.parse(responseText)
          : {};
      } catch {
        data = {
          error: responseText
        };
      }

      if (!resBot.ok) {

        throw new Error(
          data.error ||
          data.message ||
          `Error HTTP ${resBot.status}`
        );

      }

      await fetchHistory(
        activePhone
      );

    } catch (error) {

      console.error(
        'Error enviando mensaje:',
        error
      );

      alert(
        error.message ||
        'No se pudo enviar el mensaje'
      );

    }
  };

  // =========================================================
  // REACTIVAR BOT
  // =========================================================

  const reactivarBot = async () => {

    if (!activePhone) {
      return;
    }

    const confirmar =
      window.confirm(
        '¿Finalizar asesoría y reactivar BOT?'
      );

    if (!confirmar) {
      return;
    }

    try {

      const res =
        await fetch(
          `${BACKEND_URL}/v1/reactivar`,
          {
            method: 'POST',

            headers: {
              'Content-Type':
                'application/json',
              'x-api-key':
                API_KEY
            },

            body: JSON.stringify({
              telefono:
                activePhone
            })
          }
        );

      const responseText =
        await res.text();

      if (!res.ok) {

        throw new Error(
          responseText ||
          `Error HTTP ${res.status}`
        );

      }

      // -----------------------------------------------------
      // NOTIFICAR AL USUARIO
      // -----------------------------------------------------

      const resBot =
        await fetch(
          BOT_URL,
          {
            method: 'POST',

            headers: {
              'Content-Type':
                'application/json'
            },

            body: JSON.stringify({
              number:
                activePhone,
              message:
                '✅ Atención personalizada finalizada.',
              tipoMensaje:
                'ADMIN_TEXTO'
            })
          }
        );

      if (!resBot.ok) {

        const errorText =
          await resBot.text();

        throw new Error(
          errorText ||
          'No se pudo notificar al usuario'
        );
      }

      alert(
        'BOT reactivado correctamente'
      );

      setMessages([]);
      setActivePhone('');

      await fetchUsers();

    } catch (error) {

      console.error(
        'Error reactivando BOT:',
        error
      );

      alert(
        error.message ||
        'No se pudo reactivar el bot'
      );

    }
  };

  // =========================================================
  // SUBIR Y ENVIAR MULTIMEDIA
  // =========================================================

  const uploadMultimedia = async (file) => {

    if (!file || !activePhone) {

      throw new Error(
        'Debes seleccionar un usuario y un archivo.'
      );

    }

    const formData =
      new FormData();

    formData.append(
      'archivo',
      file
    );

    formData.append(
      'telefono',
      activePhone
    );

    setIsUploading(true);

    try {

      // -----------------------------------------------------
      // SUBIR AL BACKEND
      // -----------------------------------------------------

      const res =
        await fetch(
          `${BACKEND_URL}/v1/multimedia`,
          {
            method: 'POST',

            headers: {
              'x-api-key':
                API_KEY
            },

            body: formData
          }
        );

      const responseText =
        await res.text();

      let data = {};

      try {

        data = responseText
          ? JSON.parse(responseText)
          : {};

      } catch {

        data = {
          error:
            responseText
        };

      }

      if (!res.ok) {

        throw new Error(
          data.error ||
          data.mensaje ||
          data.message ||
          `Error HTTP ${res.status}`
        );

      }

      // -----------------------------------------------------
      // URL
      // -----------------------------------------------------

      const mediaUrl =
        data.archivoUrl ||
        data.url_media ||
        data.url ||
        data.path ||
        data.datos?.archivoUrl ||
        data.datos?.url_media ||
        data.datos?.url;

      if (!mediaUrl) {

        throw new Error(
          'El backend no devolvió una URL válida para el archivo.'
        );

      }

      // -----------------------------------------------------
      // TIPO
      // -----------------------------------------------------

      const tipoMensaje =
        obtenerTipoMultimedia(file);

      // -----------------------------------------------------
      // ENVIAR A WHATSAPP
      // -----------------------------------------------------

      const payloadBot = {

        number:
          activePhone,

        urlMedia:
          mediaUrl,

        message:
          '',

        tipoMensaje

      };

      console.log(
        '📤 Enviando multimedia:',
        payloadBot
      );

      const resBot =
        await fetch(
          BOT_URL,
          {
            method: 'POST',

            headers: {
              'Content-Type':
                'application/json'
            },

            body:
              JSON.stringify(
                payloadBot
              )
          }
        );

      const botResponseText =
        await resBot.text();

      let botData = {};

      try {

        botData =
          botResponseText
            ? JSON.parse(
                botResponseText
              )
            : {};

      } catch {

        botData = {
          error:
            botResponseText
        };

      }

      if (!resBot.ok) {

        throw new Error(
          botData.error ||
          botData.message ||
          botData.mensaje ||
          `El bot no pudo enviar el archivo (HTTP ${resBot.status})`
        );

      }

      return {
        ...data,
        bot:
          botData,
        mediaUrl,
        tipoMensaje
      };

    } catch (error) {

      console.error(
        'Error en multimedia:',
        error
      );

      throw error;

    } finally {

      setIsUploading(false);

    }
  };

  // =========================================================
  // SELECCIONAR ARCHIVO
  // =========================================================

  const handleFileChange =
    async (e) => {

      const file =
        e.target.files?.[0];

      if (!file) {
        return;
      }

      if (!activePhone) {

        alert(
          'Selecciona primero un usuario.'
        );

        e.target.value = '';

        return;
      }

      try {

        await uploadMultimedia(
          file
        );

        await new Promise(
          (resolve) =>
            setTimeout(
              resolve,
              300
            )
        );

        await fetchHistory(
          activePhone
        );

        alert(
          'Archivo enviado correctamente.'
        );

      } catch (error) {

        console.error(
          'Error multimedia:',
          error
        );

        alert(
          error.message ||
          'Error enviando multimedia.'
        );

      } finally {

        e.target.value = '';

      }
    };

  // =========================================================
  // ENTER
  // =========================================================

  const handleKeyDown =
    (e) => {

      if (
        e.key === 'Enter'
      ) {

        e.preventDefault();

        sendMessage();

      }
    };

  // =========================================================
  // POLLING USUARIOS
  // =========================================================

  useEffect(() => {

    fetchUsers();

    const interval =
      setInterval(
        fetchUsers,
        5000
      );

    return () =>
      clearInterval(
        interval
      );

  }, []);

  // =========================================================
  // POLLING HISTORIAL
  // =========================================================

  useEffect(() => {

    if (!activePhone) {
      return;
    }

    fetchHistory(
      activePhone
    );

    const interval =
      setInterval(
        () =>
          fetchHistory(
            activePhone
          ),
        2000
      );

    return () =>
      clearInterval(
        interval
      );

  }, [activePhone]);

  // =========================================================
  // RENDER
  // =========================================================

  return (

    <div className="app-container">

      <aside id="chat-list">

        <div className="sidebar-header">
          EMCA Admin
        </div>

        <hr />

        <div id="users-container">

          {users.map(
            (user) => {

              const isActive =
                user.telefono ===
                activePhone;

              const isHuman =
                Number(
                  user.bot_activo
                ) === 0;

              return (

                <div
                  key={
                    user.telefono
                  }
                  className={
                    `chat-item ${
                      isActive
                        ? 'active'
                        : ''
                    }`
                  }
                  onClick={() =>
                    handleSelectUser(
                      user.telefono
                    )
                  }
                >

                  <div className="chat-info">

                    <b>
                      {
                        user.nombres ||
                        user.nombre ||
                        user.telefono
                      }
                    </b>

                    <small>
                      {
                        user.telefono
                      }
                    </small>

                  </div>

                  {isHuman && (

                    <span className="status-badge">
                      ● Humano
                    </span>

                  )}

                </div>

              );
            }
          )}

        </div>

      </aside>

      <main id="chat-window">

        <header className="chat-header">

          <div className="chat-header__info">

            <h3>
              {
                activePhone
                  ? `Chat activo: ${activePhone}`
                  : 'Seleccione un chat para comenzar'
              }
            </h3>

          </div>

          {activePhone && (

            <button
              id="btn-finish"
              onClick={
                reactivarBot
              }
            >
              Finalizar Asesoría
            </button>

          )}

        </header>

        <section id="messages">

          {messages.map(
            (msg, index) => {

              const role =
                (
                  msg.emisor ||
                  'USUARIO'
                ).toUpperCase();

              const media =
                msg.media;

              let botones =
                [];

              if (
                msg.botones
              ) {

                try {

                  botones =
                    typeof msg.botones ===
                    'string'
                      ? JSON.parse(
                          msg.botones
                        )
                      : msg.botones;

                } catch {

                  botones = [];

                }

              }

              const isGenericText =
                msg.mensaje ===
                  'Archivo adjunto' ||
                msg.mensaje ===
                  'Nota de voz' ||
                (
                  msg.mensaje &&
                  msg.mensaje.startsWith(
                    '_event_'
                  )
                );

              let tipoMedia =
                String(
                  media?.tipoMedia ||
                  msg.tipo_mensaje ||
                  ''
                ).toUpperCase();

              if (
                tipoMedia.includes(
                  'IMAGEN'
                ) ||
                tipoMedia ===
                  'IMAGE' ||
                tipoMedia ===
                  'FOTO'
              ) {

                tipoMedia =
                  'IMAGE';

              } else if (
                tipoMedia.includes(
                  'AUDIO'
                ) ||
                tipoMedia ===
                  'VOICE' ||
                tipoMedia ===
                  'NOTA_VOZ'
              ) {

                tipoMedia =
                  'AUDIO';

              } else if (
                tipoMedia.includes(
                  'VIDEO'
                )
              ) {

                tipoMedia =
                  'VIDEO';

              } else if (
                tipoMedia.includes(
                  'DOCUMENT'
                ) ||
                tipoMedia.includes(
                  'DOCUMENTO'
                ) ||
                tipoMedia ===
                  'ARCHIVO'
              ) {

                tipoMedia =
                  'DOCUMENT';
              }

              return (

                <div
                  key={
                    msg.id ||
                    index
                  }
                  className={
                    `msg ${role}`
                  }
                >

                  <div className="msg-bubble">

                    {media?.archivoUrl && (

                      <div
                        className="media-container"
                      >

                        {tipoMedia ===
                          'IMAGE' && (

                          <img
                            src={
                              media.archivoUrl
                            }
                            alt={
                              media.nombre ||
                              'Imagen'
                            }
                            className="chat-image"
                            onClick={() =>
                              window.open(
                                media.archivoUrl,
                                '_blank'
                              )
                            }
                          />

                        )}

                        {tipoMedia ===
                          'AUDIO' && (

                          <audio
                            controls
                            preload="metadata"
                          >
                            <source
                              src={
                                media.archivoUrl
                              }
                            />
                            Tu navegador no soporta audio.
                          </audio>

                        )}

                        {tipoMedia ===
                          'VIDEO' && (

                          <video
                            controls
                            preload="metadata"
                            className="chat-video"
                          >
                            <source
                              src={
                                media.archivoUrl
                              }
                            />
                            Tu navegador no soporta video.
                          </video>

                        )}

                        {tipoMedia ===
                          'DOCUMENT' && (

                          <a
                            href={
                              media.downloadUrl ||
                              media.archivoUrl
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="chat-document"
                          >
                            📄{' '}
                            {
                              media.nombre ||
                              'Descargar documento'
                            }
                          </a>

                        )}

                      </div>

                    )}

                    {msg.mensaje &&
                      !isGenericText && (

                      <div
                        className="chat-text"
                      >
                        {
                          msg.mensaje
                        }
                      </div>

                    )}

                    {Array.isArray(
                      botones
                    ) &&
                      botones.length >
                        0 && (

                        <div className="botones-chat">

                          {botones.map(
                            (b, i) => (

                              <button
                                key={i}
                                className="btn-chat"
                                disabled
                              >
                                {
                                  typeof b ===
                                  'object'
                                    ? b.body ||
                                      b.title
                                    : b
                                }
                              </button>

                            )
                          )}

                        </div>

                      )}

                  </div>

                  <small className="msg-time">

                    {msg.fecha
                      ? new Date(
                          msg.fecha
                        ).toLocaleTimeString(
                          [],
                          {
                            hour:
                              '2-digit',
                            minute:
                              '2-digit'
                          }
                        )
                      : ''}

                  </small>

                </div>

              );
            }
          )}

          <div
            ref={
              messagesEndRef
            }
          />

        </section>

        <footer className="input-area">

          <input
            type="file"
            ref={
              fileInputRef
            }
            style={{
              display:
                'none'
            }}
            onChange={
              handleFileChange
            }
            accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.xls,.xlsx"
          />

          <button
            type="button"
            className="btn-attach"
            disabled={
              !activePhone ||
              isUploading
            }
            onClick={() =>
              fileInputRef.current?.click()
            }
            title="Adjuntar archivo"
          >
            {
              isUploading
                ? '⏳'
                : '📎'
            }
          </button>

          <input
            type="text"
            id="adminInput"
            placeholder={
              isUploading
                ? 'Enviando archivo...'
                : 'Escribe un mensaje aquí...'
            }
            value={
              inputValue
            }
            onChange={(e) =>
              setInputValue(
                e.target.value
              )
            }
            onKeyDown={
              handleKeyDown
            }
            disabled={
              !activePhone ||
              isUploading
            }
          />

          <div className="Content_enviar">

            <button
              className="btn-send"
              onClick={
                sendMessage
              }
              disabled={
                !activePhone ||
                isUploading
              }
            >
              Enviar
            </button>

          </div>

        </footer>

      </main>

    </div>
  );
}