import React, { useState, useEffect, useRef } from 'react'
import { 
  Send, 
  Paperclip, 
  Bot, 
  User, 
  ArrowLeft, 
  Image, 
  FileText, 
  X, 
  Phone, 
  CheckCheck,
  RotateCcw
} from 'lucide-react'

export const ChatOperador = ({ chatSeleccionadoId, onVolver }) => {
  const [mensajes, setMensajes] = useState([])
  const [nuevoMensaje, setNuevoMensaje] = useState('')
  const [archivo, setArchivo] = useState(null)
  const [previsualizacion, setPrevisualizacion] = useState(null)
  const [loading, setLoading] = useState(true)
  const [enviando, setEnviando] = useState(false)
  const [infoUsuario, setInfoUsuario] = useState({
    nombre: 'Ciudadano',
    telefono: '+57 300 000 0000',
    radicado: 'PQR-2026-001',
    botPausado: true
  })

  const messagesEndRef = useRef(null)
  const fileInputRef = useRef(null)
  const API_BASE_URL = 'http://127.0.0.1:4000/v1'

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // Cargar historial de chat
  useEffect(() => {
    const fetchChatData = async () => {
      try {
        setLoading(true)
        const res = await fetch(`${API_BASE_URL}/solicitudes/${chatSeleccionadoId || 1}/mensajes`)
        const data = await res.json()

        if (Array.isArray(data)) {
          setMensajes(data)
        } else {
          // Mock de respaldo en caso de endpoint vacío
          setMensajes([
            { id: 1, emisor: 'usuario', texto: 'Hola, buenas tardes. Necesito reportar una fuga de agua.', fecha: '10:15 AM', tipo: 'texto' },
            { id: 2, emisor: 'bot', texto: '¡Hola! Bienvenido a EMCA. Un asesor tomará tu solicitud en breve.', fecha: '10:15 AM', tipo: 'texto' },
            { id: 3, emisor: 'usuario', texto: 'Adjunto foto del daño en la acera.', fecha: '10:16 AM', tipo: 'texto' }
          ])
        }
      } catch (error) {
        console.error('Error al cargar historial del chat:', error)
      } finally {
        setLoading(false)
        scrollToBottom()
      }
    }

    fetchChatData()
  }, [chatSeleccionadoId])

  useEffect(() => {
    scrollToBottom()
  }, [mensajes])

  // Manejo de adjuntos multimedia
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setArchivo(selectedFile)
      if (selectedFile.type.startsWith('image/')) {
        setPrevisualizacion(URL.createObjectURL(selectedFile))
      } else {
        setPrevisualizacion(null)
      }
    }
  }

  const handleRemoveFile = () => {
    setArchivo(null)
    setPrevisualizacion(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  // Envío de mensaje
  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!nuevoMensaje.trim() && !archivo) return

    setEnviando(true)

    const formData = new FormData()
    formData.append('mensaje', nuevoMensaje)
    if (archivo) formData.append('adjunto', archivo)

    try {
      const res = await fetch(`${API_BASE_URL}/solicitudes/${chatSeleccionadoId || 1}/responder`, {
        method: 'POST',
        body: formData
      })

      // Agregar mensaje localmente para respuesta inmediata en UI
      const nuevoMsg = {
        id: Date.now(),
        emisor: 'asesor',
        texto: nuevoMensaje,
        fecha: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        mediaUrl: previsualizacion,
        tipoMedia: archivo ? (archivo.type.startsWith('image/') ? 'imagen' : 'archivo') : null
      }

      setMensajes((prev) => [...prev, nuevoMsg])
      setNuevoMensaje('')
      handleRemoveFile()
    } catch (error) {
      console.error('Error al enviar el mensaje:', error)
    } finally {
      setEnviando(false)
    }
  }

  // Reactivar el Bot automático al finalizar la atención
  const handleReactivarBot = async () => {
    try {
      await fetch(`${API_BASE_URL}/solicitudes/${chatSeleccionadoId || 1}/reactivar-bot`, { method: 'POST' })
      setInfoUsuario((prev) => ({ ...prev, botPausado: false }))
    } catch (error) {
      console.error('Error al reactivar el bot:', error)
    }
  }

  return (
    <div className="flex flex-col h-screen bg-slate-100">
      
      {/* CABECERA DEL CHAT */}
      <div className="bg-white px-6 py-4 border-b border-slate-200 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-4">
          <button 
            onClick={onVolver}
            className="p-2 hover:bg-slate-100 rounded-full text-slate-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
            {infoUsuario.nombre.substring(0, 2).toUpperCase()}
          </div>

          <div>
            <h2 className="text-base font-bold text-slate-900">{infoUsuario.nombre}</h2>
            <div className="flex items-center space-x-2 text-xs text-slate-500">
              <span className="flex items-center"><Phone className="w-3 h-3 mr-1" />{infoUsuario.telefono}</span>
              <span>•</span>
              <span className="font-semibold text-blue-600">Radicado: {infoUsuario.radicado}</span>
            </div>
          </div>
        </div>

        {/* ACCIONES DE ESTADO DE ATENCIÓN */}
        <div className="flex items-center space-x-3">
          {infoUsuario.botPausado ? (
            <button
              onClick={handleReactivarBot}
              className="px-3 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Devolver Control al Bot</span>
            </button>
          ) : (
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-semibold flex items-center">
              <Bot className="w-3.5 h-3.5 mr-1" /> Bot Activo
            </span>
          )}
        </div>
      </div>

      {/* ÁREA DE MENSAJES */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {loading ? (
          <p className="text-center text-xs text-slate-400 py-6">Cargando conversación...</p>
        ) : (
          mensajes.map((msg) => {
            const esAsesor = msg.emisor === 'asesor'
            const esBot = msg.emisor === 'bot'

            return (
              <div 
                key={msg.id} 
                className={`flex flex-col ${esAsesor ? 'items-end' : 'items-start'}`}
              >
                <div 
                  className={`max-w-md rounded-2xl px-4 py-3 shadow-sm text-sm ${
                    esAsesor 
                      ? 'bg-blue-600 text-white rounded-br-none' 
                      : esBot 
                      ? 'bg-purple-50 text-purple-900 border border-purple-100 rounded-bl-none' 
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'
                  }`}
                >
                  {/* Indicador de origen si es Bot */}
                  {esBot && (
                    <span className="text-[10px] font-bold tracking-wider uppercase text-purple-600 block mb-1 flex items-center">
                      <Bot className="w-3 h-3 mr-1 inline" /> Respuesta Automática
                    </span>
                  )}

                  {/* Previsualización multimedia en burbuja */}
                  {msg.mediaUrl && (
                    <div className="chat-media-preview mb-2">
                      {msg.tipoMedia === 'imagen' ? (
                        <img src={msg.mediaUrl} alt="Adjunto" className="rounded-lg max-h-48 object-cover" />
                      ) : (
                        <div className="flex items-center space-x-2 bg-slate-50 p-2 rounded text-slate-700">
                          <FileText className="w-5 h-5 text-blue-600" />
                          <span className="text-xs truncate">Documento_adjunto.pdf</span>
                        </div>
                      )}
                    </div>
                  )}

                  <p className="leading-relaxed whitespace-pre-wrap">{msg.texto}</p>

                  <div className={`flex items-center justify-end space-x-1 text-[10px] mt-1 ${esAsesor ? 'text-blue-100' : 'text-slate-400'}`}>
                    <span>{msg.fecha}</span>
                    {esAsesor && <CheckCheck className="w-3 h-3" />}
                  </div>
                </div>
              </div>
            )
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* CONTENEDOR DE ADJUNTO PREVIO AL ENVÍO */}
      {archivo && (
        <div className="px-6 py-2 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {previsualizacion ? (
              <img src={previsualizacion} alt="Previsualización" className="w-12 h-12 rounded object-cover border" />
            ) : (
              <div className="p-2 bg-blue-100 text-blue-700 rounded">
                <FileText className="w-6 h-6" />
              </div>
            )}
            <div>
              <p className="text-xs font-semibold text-slate-800 truncate max-w-xs">{archivo.name}</p>
              <p className="text-[10px] text-slate-400">{(archivo.size / 1024).toFixed(1)} KB</p>
            </div>
          </div>
          <button 
            onClick={handleRemoveFile}
            className="p-1 hover:bg-slate-200 rounded-full text-slate-500"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ÁREA DE ENTRADA DE MENSAJES Y ACCIONES */}
      <form onSubmit={handleSendMessage} className="bg-white p-4 border-t border-slate-200 flex items-center space-x-3">
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          className="hidden" 
          accept="image/*,application/pdf"
        />
        
        <button 
          type="button" 
          onClick={() => fileInputRef.current?.click()}
          className="p-2.5 hover:bg-slate-100 rounded-xl text-slate-500 transition-colors"
          title="Adjuntar imagen o PDF"
        >
          <Paperclip className="w-5 h-5" />
        </button>

        <input 
          type="text" 
          value={nuevoMensaje}
          onChange={(e) => setNuevoMensaje(e.target.value)}
          placeholder="Escribe un mensaje para el ciudadano..." 
          className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
        />

        <button 
          type="submit" 
          disabled={enviando || (!nuevoMensaje.trim() && !archivo)}
          className="px-4 py-2.5 bg-blue-600 hover:bg-primary-hover disabled:bg-slate-300 text-white rounded-xl text-sm font-semibold transition-colors flex items-center space-x-1 shadow-sm"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  )
}

export default ChatOperador