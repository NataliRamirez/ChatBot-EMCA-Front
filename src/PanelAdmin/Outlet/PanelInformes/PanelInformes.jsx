import './PanelInformes.css';
import { useState, useEffect } from 'react';

import TablaVistaPrevia from '../../../Components/TablasVistaPrevia/TablasVistaPrevia';
import VerInforme from '../../../Components/TablasVistaPrevia/VerInforme';
import EditarInforme from '../../../Components/TablasVistaPrevia/EditarInforme';
import EliminarInforme from '../../../Components/TablasVistaPrevia/EliminarInforme';

import { crearInforme, obtenerInformes, actualizarInforme, eliminarInforme as eliminarInformeService, generarPDF as descargarPDF, generarExcel as descargarExcel } from '../Services/InformeServices';

export default function PanelInformes() {

  const [tipo, setTipo] = useState('');
  const [respuesta, setRespuesta] = useState('');
  const [nombre, setNombre] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [estado, setEstado] = useState('');

  const [datos, setDatos] = useState([]);

  const [mostrarVer, setMostrarVer] = useState(false);
  const [mostrarEditar, setMostrarEditar] = useState(false);
  const [mostrarEliminar, setMostrarEliminar] = useState(false);

  const [informeSeleccionado, setInformeSeleccionado] = useState(null);

  useEffect(() => {
    cargarInformes();
  }, []);

  const cargarInformes = async () => {
    try {
      const respuesta = await obtenerInformes();
      if (Array.isArray(respuesta)) {
        setDatos(respuesta);
      } else {
        setDatos([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const guardarInforme = async () => {
    try {
      const empleadoId = localStorage.getItem('empleado_id');
      const empleadoNombre = localStorage.getItem('empleado_nombre');

      const respuestaServidor = await crearInforme({
        empleado_id: empleadoId,
        empleado_nombre: empleadoNombre,
        nombre,
        tipo,
        respuesta,
        fechaInicio,
        fechaFin,
        estado
      });

      alert(respuestaServidor.mensaje || 'Informe creado correctamente');

      setNombre('');
      setTipo('');
      setRespuesta('');
      setFechaInicio('');
      setFechaFin('');
      setEstado('');

      cargarInformes();
    } catch (error) {
      console.log(error);
    }
  };

  const verInforme = (informe) => {
    setInformeSeleccionado(informe);
    setMostrarVer(true);
  };

  const editarInforme = (informe) => {
    setInformeSeleccionado(informe);
    setMostrarEditar(true);
  };

  const eliminarInforme = (informe) => {
    setInformeSeleccionado(informe);
    setMostrarEliminar(true);
  };

  const guardarEdicion = async (datosActualizados) => {
    try {
      await actualizarInforme(datosActualizados.id, datosActualizados);
      setMostrarEditar(false);
      cargarInformes();
    } catch (error) {
      console.log(error);
    }
  };

  const confirmarEliminar = async (id) => {
    try {
      await eliminarInformeService(id);
      setMostrarEliminar(false);
      cargarInformes();
    } catch (error) {
      console.log(error);
    }
  };

  const generarPDF = async () => {
    try {
      const archivo = await descargarPDF();
      const url = window.URL.createObjectURL(archivo);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Informe.pdf';
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert('Error al generar el PDF');
    }
  };

  const generarExcel = async () => {
    try {
      const archivo = await descargarExcel();
      const url = window.URL.createObjectURL(archivo);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Informe.xlsx';
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert('Error al generar el Excel');
    }
  };

  return (
    <div className="panelInformesContainer">
      <div className="headerInformes">
        <div className='contenedor-scroll'>
          <div>
            <h1>Informes</h1>
            <p>Genere reportes del sistema.</p>
          </div>
        </div>

        <div className="cardInforme">
          <div className="grupo">
            <label>Tipo de informe:</label>
            <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
              <option value="">Seleccione...</option>
              <option value="Usuarios">Usuarios</option>
              <option value="PQR">PQR</option>
              <option value="Derechos de Petición">Derechos de Petición</option>
              <option value="Bitácoras">Bitácoras</option>
              <option value="Solicitudes">Solicitudes</option>
            </select>
          </div>

          <div className="grupo">
            <label>Nombre:</label>
            <input
              type="text"
              value={nombre}
              placeholder="Ingrese el nombre"
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

          <div className="grupo">
            <label>Respuesta:</label>
            <input
              type="text"
              value={respuesta}
              placeholder="Ingrese la respuesta"
              onChange={(e) => setRespuesta(e.target.value)}
            />
          </div>

          <div className="grupo">
            <label>Fecha Inicial:</label>
            <input
              type="date"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
            />
          </div>

          <div className="grupo">
            <label>Fecha Final:</label>
            <input
              type="date"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
            />
          </div>

          <div className="grupo">
            <label>Estado:</label>
            <select value={estado} onChange={(e) => setEstado(e.target.value)}>
              <option value="">Todos</option>
              <option value="Pendiente">Pendiente</option>
              <option value="En proceso">En proceso</option>
              <option value="Respondida">Respondida</option>
            </select>
          </div>

          <div className="botonesInforme">
            <button className="btnCrear" onClick={guardarInforme}>
              Crear Informe
            </button>
          </div>
        </div>
      </div>

      <TablaVistaPrevia
        datos={datos}
        generarPDF={generarPDF}
        generarExcel={generarExcel}
        editarInforme={editarInforme}
        eliminarInforme={eliminarInforme}
        verInforme={verInforme}
      />

      {mostrarVer && (
        <VerInforme
          informe={informeSeleccionado}
          onClose={() => setMostrarVer(false)}
        />
      )}

      {mostrarEditar && (
        <EditarInforme
          informe={informeSeleccionado}
          onGuardar={guardarEdicion}
          onClose={() => setMostrarEditar(false)}
        />
      )}

      {mostrarEliminar && (
        <EliminarInforme
          informe={informeSeleccionado}
          onEliminar={confirmarEliminar}
          onClose={() => setMostrarEliminar(false)}
        />
      )}
    </div>
  );
}