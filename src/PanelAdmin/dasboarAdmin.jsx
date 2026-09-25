import React, { useState, useEffect, useRef } from 'react'
import { 
  Send, 
  Paperclip, 
  Bot, 
<<<<<<< HEAD
  ArrowLeft, 
=======
  User, 
  ArrowLeft, 
  Image, 
>>>>>>> 9062b6ad61025fe79b83e8cfb65c1fb600ebb306
  FileText, 
  X, 
  Phone, 
  CheckCheck,
<<<<<<< HEAD
  RotateCcw,
  ShieldAlert,
  UserCheck,
  Power,
  Clock,
  Building,
  Lock
} from 'lucide-react'

export const dasboarAdmin = ({ chatSeleccionadoId, onVolver }) => {
=======
  RotateCcw
} from 'lucide-react'

export const ChatOperador = ({ chatSeleccionadoId, onVolver }) => {
>>>>>>> 9062b6ad61025fe79b83e8cfb65c1fb600ebb306
  const [mensajes, setMensajes] = useState([])
  const [nuevoMensaje, setNuevoMensaje] = useState('')
  const [archivo, setArchivo] = useState(null)
  const [previsualizacion, setPrevisualizacion] = useState(null)
  const [loading, setLoading] = useState(true)
  const [enviando, setEnviando] = useState(false)
<<<<<<< HEAD
  const [asesorAsignado, setAsesorAsignado] = useState('Carlos Ramírez')

  const [infoSolicitud, setInfoSolicitud] = useState({
    nombreUsuario: 'Juan David Nieto',
    telefono: '+57 312 456 7890',
    radicado: 'EMCA-2026-0892',
    estado: 'En proceso',
    botPausado: true,
    fechaIngreso: '10:15 AM'
=======
  const [infoUsuario, setInfoUsuario] = useState({
    nombre: 'Ciudadano',
    telefono: '+57 300 000 0000',
    radicado: 'PQR-2026-001',
    botPausado: true
>>>>>>> 9062b6ad61025fe79b83e8cfb65c1fb600ebb306
  })

  const messagesEndRef = useRef(null)
  const fileInputRef = useRef(null)
  const API_BASE_URL = 'http://127.0.0.1:4000/v1'

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

<<<<<<< HEAD
  // Cargar historial con auditoría
=======
  // Cargar historial de chat
>>>>>>> 9062b6ad61025fe79b83e8cfb65c1fb600ebb306
  useEffect(() => {
    const fetchChatData = async () => {
      try {
        setLoading(true)
<<<<<<< HEAD
        const res = await fetch(`${API_BASE_URL}/solicitudes/${chatSeleccionadoId || 1}/mensajes`, {
          headers: { 'Authorization': 'Bearer ADMIN_TOKEN' }
        })
        const data = await res.json()

        if (Array.isArray(data) && data.length > 0) {
          setMensajes(data)
        } else {
          // Historial ficticio con flujo completo (Usuario -> Bot -> Asesor -> Admin)
          setMensajes([
            { id: 1, emisor: 'usuario', texto: 'Hola, buenas tardes. Necesito reportar una fuga de agua.', fecha: '10:15 AM' },
            { id: 2, emisor: 'bot', texto: '¡Hola! Bienvenido a EMCA. Un asesor tomará tu solicitud en breve.', fecha: '10:15 AM' },
            { id: 3, emisor: 'asesor', texto: 'Buenas tardes. Le atiende Carlos Ramírez. ¿En qué dirección se encuentra la fuga?', fecha: '10:18 AM' },
            { id: 4, emisor: 'usuario', texto: 'Adjunto foto del daño en la acera de la Calle 15 #12-04.', fecha: '10:20 AM' }
          ])
        }
      } catch (error) {
        console.error('Error al cargar historial del chat (Admin):', error)
=======
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
>>>>>>> 9062b6ad61025fe79b83e8cfb65c1fb600ebb306
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

<<<<<<< HEAD
=======
  // Manejo de adjuntos multimedia
>>>>>>> 9062b6ad61025fe79b83e8cfb65c1fb600ebb306
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

<<<<<<< HEAD
  // Enviar mensaje en modo Intervención Administrador
=======
  // Envío de mensaje
>>>>>>> 9062b6ad61025fe79b83e8cfb65c1fb600ebb306
  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!nuevoMensaje.trim() && !archivo) return

    setEnviando(true)

    const formData = new FormData()
    formData.append('mensaje', nuevoMensaje)
    if (archivo) formData.append('adjunto', archivo)

    try {
<<<<<<< HEAD
      await fetch(`${API_BASE_URL}/solicitudes/${chatSeleccionadoId || 1}/responder-admin`, {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ADMIN_TOKEN' },
        body: formData
      })

      const nuevoMsg = {
        id: Date.now(),
        emisor: 'admin',
=======
      const res = await fetch(`${API_BASE_URL}/solicitudes/${chatSeleccionadoId || 1}/responder`, {
        method: 'POST',
        body: formData
      })

      // Agregar mensaje localmente para respuesta inmediata en UI
      const nuevoMsg = {
        id: Date.now(),
        emisor: 'asesor',
>>>>>>> 9062b6ad61025fe79b83e8cfb65c1fb600ebb306
        texto: nuevoMensaje,
        fecha: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        mediaUrl: previsualizacion,
        tipoMedia: archivo ? (archivo.type.startsWith('image/') ? 'imagen' : 'archivo') : null
      }

      setMensajes((prev) => [...prev, nuevoMsg])
      setNuevoMensaje('')
      handleRemoveFile()
    } catch (error) {
<<<<<<< HEAD
      console.error('Error al enviar intervención de Admin:', error)
=======
      console.error('Error al enviar el mensaje:', error)
>>>>>>> 9062b6ad61025fe79b83e8cfb65c1fb600ebb306
    } finally {
      setEnviando(false)
    }
  }

<<<<<<< HEAD
  const handleReactivarBot = async () => {
    try {
      await fetch(`${API_BASE_URL}/solicitudes/${chatSeleccionadoId || 1}/reactivar-bot`, { 
        method: 'POST',
        headers: { 'Authorization': 'Bearer ADMIN_TOKEN' }
      })
      setInfoSolicitud((prev) => ({ ...prev, botPausado: false }))
    } catch (error) {
      console.error('Error al devolver control al bot:', error)
    }
  }

  const handleReasignarAsesor = async (e) => {
    const nuevoAsesor = e.target.value
    setAsesorAsignado(nuevoAsesor)
    try {
      await fetch(`${API_BASE_URL}/solicitudes/${chatSeleccionadoId || 1}/reasignar`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ADMIN_TOKEN' },
        body: JSON.stringify({ asesor: nuevoAsesor })
      })
    } catch (error) {
      console.error('Error al reasignar asesor:', error)
    }
  }

  const handleFinalizarRadicado = async () => {
    if (window.confirm('¿Está seguro de cerrar y finalizar este radicado?')) {
      try {
        await fetch(`${API_BASE_URL}/solicitudes/${chatSeleccionadoId || 1}/cerrar`, {
          method: 'POST',
          headers: { 'Authorization': 'Bearer ADMIN_TOKEN' }
        })
        setInfoSolicitud((prev) => ({ ...prev, estado: 'Cerrado' }))
      } catch (error) {
        console.error('Error al cerrar solicitud:', error)
      }
=======
  // Reactivar el Bot automático al finalizar la atención
  const handleReactivarBot = async () => {
    try {
      await fetch(`${API_BASE_URL}/solicitudes/${chatSeleccionadoId || 1}/reactivar-bot`, { method: 'POST' })
      setInfoUsuario((prev) => ({ ...prev, botPausado: false }))
    } catch (error) {
      console.error('Error al reactivar el bot:', error)
>>>>>>> 9062b6ad61025fe79b83e8cfb65c1fb600ebb306
    }
  }

  return (
<<<<<<< HEAD
    <div className="flex flex-col h-screen bg-slate-900 text-slate-100">
      
      {/* 1. CABECERA EJECUTIVA DE ADMINISTRACIÓN */}
      <div className="bg-slate-800 px-6 py-3.5 border-b border-slate-700 flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-4">
          <button 
            onClick={onVolver}
            className="p-2 hover:bg-slate-700 rounded-full text-slate-300 transition-colors"
            title="Volver al panel principal"
=======
    <div className="flex flex-col h-screen bg-slate-100">
      
      {/* CABECERA DEL CHAT */}
      <div className="bg-white px-6 py-4 border-b border-slate-200 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-4">
          <button 
            onClick={onVolver}
            className="p-2 hover:bg-slate-100 rounded-full text-slate-600 transition-colors"
>>>>>>> 9062b6ad61025fe79b83e8cfb65c1fb600ebb306
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
<<<<<<< HEAD
          <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold text-sm">
            {infoSolicitud.nombreUsuario.substring(0, 2).toUpperCase()}
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-base font-bold text-white">{infoSolicitud.nombreUsuario}</h2>
              <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded text-[11px] font-semibold">
                {infoSolicitud.radicado}
              </span>
            </div>
            <div className="flex items-center space-x-3 text-xs text-slate-400 mt-0.5">
              <span className="flex items-center"><Phone className="w-3 h-3 mr-1" />{infoSolicitud.telefono}</span>
              <span>•</span>
              <span className="flex items-center"><Clock className="w-3 h-3 mr-1" />{infoSolicitud.fechaIngreso}</span>
=======
          <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
            {infoUsuario.nombre.substring(0, 2).toUpperCase()}
          </div>

          <div>
            <h2 className="text-base font-bold text-slate-900">{infoUsuario.nombre}</h2>
            <div className="flex items-center space-x-2 text-xs text-slate-500">
              <span className="flex items-center"><Phone className="w-3 h-3 mr-1" />{infoUsuario.telefono}</span>
              <span>•</span>
              <span className="font-semibold text-blue-600">Radicado: {infoUsuario.radicado}</span>
>>>>>>> 9062b6ad61025fe79b83e8cfb65c1fb600ebb306
            </div>
          </div>
        </div>

<<<<<<< HEAD
        {/* ACCIONES DE CONTROL DE SUPERVISIÓN */}
        <div className="flex items-center space-x-3">
          {/* Selector de Reasignación de Asesor */}
          <div className="flex items-center bg-slate-700/60 border border-slate-600 rounded-lg px-2.5 py-1">
            <UserCheck className="w-3.5 h-3.5 text-slate-400 mr-2" />
            <select 
              value={asesorAsignado} 
              onChange={handleReasignarAsesor}
              className="bg-transparent text-xs text-slate-200 font-medium focus:outline-none cursor-pointer"
            >
              <option value="Carlos Ramírez" className="bg-slate-800 text-slate-200">Asesor: Carlos Ramírez</option>
              <option value="Luisa Dávila" className="bg-slate-800 text-slate-200">Asesor: Luisa Dávila</option>
              <option value="Sin Asignar" className="bg-slate-800 text-slate-200">Sin Asignar</option>
            </select>
          </div>

          {/* Control del Bot */}
          {infoSolicitud.botPausado ? (
            <button
              onClick={handleReactivarBot}
              className="px-3 py-1.5 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Devolver a Bot</span>
            </button>
          ) : (
            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-semibold flex items-center">
              <Bot className="w-3.5 h-3.5 mr-1" /> Bot Activo
            </span>
          )}

          {/* Botón Finalizar Ticket */}
          <button
            onClick={handleFinalizarRadicado}
            className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg transition-colors"
            title="Finalizar y cerrar radicado"
          >
            <Power className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* BANNER DE MODO AUDITORÍA/INTERVENCIÓN */}
      <div className="bg-amber-500/10 border-b border-amber-500/20 px-6 py-2 flex items-center justify-center space-x-2 text-xs text-amber-300">
        <ShieldAlert className="w-4 h-4 text-amber-400" />
        <span><strong>Modo Supervisión Activo:</strong> Sus respuestas serán marcadas como Intervención de Administrador.</span>
      </div>

      {/* 2. ÁREA DE MENSAJES DE CONVERSACIÓN */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-950/50">
        {loading ? (
          <p className="text-center text-xs text-slate-500 py-6">Cargando historial de auditoría...</p>
        ) : (
          mensajes.map((msg) => {
            const esAdmin = msg.emisor === 'admin'
            const esAsesor = msg.emisor === 'asesor'
            const esBot = msg.emisor === 'bot'
            const esUsuario = msg.emisor === 'usuario'
=======
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
>>>>>>> 9062b6ad61025fe79b83e8cfb65c1fb600ebb306

            return (
              <div 
                key={msg.id} 
<<<<<<< HEAD
                className={`flex flex-col ${esAdmin || esAsesor ? 'items-end' : 'items-start'}`}
              >
                <div 
                  className={`max-w-md rounded-2xl px-4 py-3 shadow-md text-sm ${
                    esAdmin 
                      ? 'bg-amber-600 text-white rounded-br-none border border-amber-500' 
                      : esAsesor 
                      ? 'bg-blue-600 text-white rounded-br-none' 
                      : esBot 
                      ? 'bg-purple-950/60 text-purple-200 border border-purple-800/50 rounded-bl-none' 
                      : 'bg-slate-800 text-slate-100 border border-slate-700 rounded-bl-none'
                  }`}
                >
                  {/* Etiquetas identificadoras de emisor */}
                  {esAdmin && (
                    <span className="text-[10px] font-bold tracking-wider uppercase text-amber-200 block mb-1 flex items-center">
                      <ShieldAlert className="w-3 h-3 mr-1 inline" /> Intervención Administrador
                    </span>
                  )}
                  {esAsesor && (
                    <span className="text-[10px] font-bold tracking-wider uppercase text-blue-200 block mb-1 flex items-center">
                      <Building className="w-3 h-3 mr-1 inline" /> Asesor ({asesorAsignado})
                    </span>
                  )}
                  {esBot && (
                    <span className="text-[10px] font-bold tracking-wider uppercase text-purple-400 block mb-1 flex items-center">
                      <Bot className="w-3 h-3 mr-1 inline" /> Resp. Automática (Bot)
=======
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
>>>>>>> 9062b6ad61025fe79b83e8cfb65c1fb600ebb306
                    </span>
                  )}

                  {/* Previsualización multimedia en burbuja */}
                  {msg.mediaUrl && (
                    <div className="chat-media-preview mb-2">
                      {msg.tipoMedia === 'imagen' ? (
<<<<<<< HEAD
                        <img src={msg.mediaUrl} alt="Adjunto" className="rounded-lg max-h-48 object-cover border border-slate-700" />
                      ) : (
                        <div className="flex items-center space-x-2 bg-slate-900/60 p-2 rounded border border-slate-700 text-slate-200">
                          <FileText className="w-5 h-5 text-amber-400" />
=======
                        <img src={msg.mediaUrl} alt="Adjunto" className="rounded-lg max-h-48 object-cover" />
                      ) : (
                        <div className="flex items-center space-x-2 bg-slate-50 p-2 rounded text-slate-700">
                          <FileText className="w-5 h-5 text-blue-600" />
>>>>>>> 9062b6ad61025fe79b83e8cfb65c1fb600ebb306
                          <span className="text-xs truncate">Documento_adjunto.pdf</span>
                        </div>
                      )}
                    </div>
                  )}

                  <p className="leading-relaxed whitespace-pre-wrap">{msg.texto}</p>

<<<<<<< HEAD
                  <div className={`flex items-center justify-end space-x-1 text-[10px] mt-1 ${esAdmin || esAsesor ? 'text-slate-200' : 'text-slate-400'}`}>
                    <span>{msg.fecha}</span>
                    {(esAdmin || esAsesor) && <CheckCheck className="w-3 h-3" />}
=======
                  <div className={`flex items-center justify-end space-x-1 text-[10px] mt-1 ${esAsesor ? 'text-blue-100' : 'text-slate-400'}`}>
                    <span>{msg.fecha}</span>
                    {esAsesor && <CheckCheck className="w-3 h-3" />}
>>>>>>> 9062b6ad61025fe79b83e8cfb65c1fb600ebb306
                  </div>
                </div>
              </div>
            )
          })
        )}
        <div ref={messagesEndRef} />
      </div>

<<<<<<< HEAD
      {/* 3. CONTENEDOR DE ADJUNTO PREVIO AL ENVÍO */}
      {archivo && (
        <div className="px-6 py-2 bg-slate-800 border-t border-slate-700 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {previsualizacion ? (
              <img src={previsualizacion} alt="Previsualización" className="w-12 h-12 rounded object-cover border border-slate-600" />
            ) : (
              <div className="p-2 bg-amber-500/20 text-amber-400 rounded border border-amber-500/30">
=======
      {/* CONTENEDOR DE ADJUNTO PREVIO AL ENVÍO */}
      {archivo && (
        <div className="px-6 py-2 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {previsualizacion ? (
              <img src={previsualizacion} alt="Previsualización" className="w-12 h-12 rounded object-cover border" />
            ) : (
              <div className="p-2 bg-blue-100 text-blue-700 rounded">
>>>>>>> 9062b6ad61025fe79b83e8cfb65c1fb600ebb306
                <FileText className="w-6 h-6" />
              </div>
            )}
            <div>
<<<<<<< HEAD
              <p className="text-xs font-semibold text-slate-200 truncate max-w-xs">{archivo.name}</p>
=======
              <p className="text-xs font-semibold text-slate-800 truncate max-w-xs">{archivo.name}</p>
>>>>>>> 9062b6ad61025fe79b83e8cfb65c1fb600ebb306
              <p className="text-[10px] text-slate-400">{(archivo.size / 1024).toFixed(1)} KB</p>
            </div>
          </div>
          <button 
            onClick={handleRemoveFile}
<<<<<<< HEAD
            className="p-1 hover:bg-slate-700 rounded-full text-slate-400 transition-colors"
=======
            className="p-1 hover:bg-slate-200 rounded-full text-slate-500"
>>>>>>> 9062b6ad61025fe79b83e8cfb65c1fb600ebb306
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

<<<<<<< HEAD
      {/* 4. CAJA DE ENTRADA Y ACCIONES DE ADMINISTRADOR */}
      <form onSubmit={handleSendMessage} className="bg-slate-800 p-4 border-t border-slate-700 flex items-center space-x-3">
=======
      {/* ÁREA DE ENTRADA DE MENSAJES Y ACCIONES */}
      <form onSubmit={handleSendMessage} className="bg-white p-4 border-t border-slate-200 flex items-center space-x-3">
>>>>>>> 9062b6ad61025fe79b83e8cfb65c1fb600ebb306
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
<<<<<<< HEAD
          className="p-2.5 hover:bg-slate-700 rounded-xl text-slate-400 transition-colors"
          title="Adjuntar evidencia o soporte"
=======
          className="p-2.5 hover:bg-slate-100 rounded-xl text-slate-500 transition-colors"
          title="Adjuntar imagen o PDF"
>>>>>>> 9062b6ad61025fe79b83e8cfb65c1fb600ebb306
        >
          <Paperclip className="w-5 h-5" />
        </button>

        <input 
          type="text" 
          value={nuevoMensaje}
          onChange={(e) => setNuevoMensaje(e.target.value)}
<<<<<<< HEAD
          placeholder="Escribe una instrucción o respuesta como Administrador..." 
          className="flex-1 px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
=======
          placeholder="Escribe un mensaje para el ciudadano..." 
          className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
>>>>>>> 9062b6ad61025fe79b83e8cfb65c1fb600ebb306
        />

        <button 
          type="submit" 
          disabled={enviando || (!nuevoMensaje.trim() && !archivo)}
<<<<<<< HEAD
          className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-xl text-sm font-semibold transition-colors flex items-center space-x-1 shadow-sm"
=======
          className="px-4 py-2.5 bg-blue-600 hover:bg-primary-hover disabled:bg-slate-300 text-white rounded-xl text-sm font-semibold transition-colors flex items-center space-x-1 shadow-sm"
>>>>>>> 9062b6ad61025fe79b83e8cfb65c1fb600ebb306
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  )
}

<<<<<<< HEAD
export default dasboarAdmin;
=======
export default ChatOperador
>>>>>>> 9062b6ad61025fe79b83e8cfb65c1fb600ebb306
