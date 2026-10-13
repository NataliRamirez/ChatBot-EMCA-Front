import './PanelInformes.css';
import { useState, useEffect } from 'react';

import TablaVistaPrevia from '../../../Components/TablasVistaPrevia/TablasVistaPrevia';
import VerInforme from '../../../Components/TablasVistaPrevia/VerInforme';
import EditarInforme from '../../../Components/TablasVistaPrevia/EditarInforme';
import EliminarInforme from '../../../Components/TablasVistaPrevia/EliminarInforme';

import {
  crearInforme,
  obtenerInformes,
  actualizarInforme,
  eliminarInforme,
  generarPDF,
  generarExcel
} from '../Services/InformeServices';

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

  // =====================================================
  // OBTENER DATOS DEL EMPLEADO
  // =====================================================
  const obtenerDatosEmpleado = () => {

    let empleadoId = localStorage.getItem('empleado_id');
    let empleadoNombre = localStorage.getItem('empleado_nombre');

    // Si no existen directamente, buscar dentro de "usuario"
    if (!empleadoId || !empleadoNombre) {

      const usuarioGuardado = localStorage.getItem('usuario');

      if (usuarioGuardado) {

        try {

          const usuario = JSON.parse(usuarioGuardado);

          empleadoId =
            empleadoId ||
            usuario?.empleado_id ||
            usuario?.id_empleado ||
            usuario?.id ||
            usuario?.usuario_id ||
            null;

          empleadoNombre =
            empleadoNombre ||
            usuario?.nombre ||
            usuario?.nombre_completo ||
            usuario?.nombre_usuario ||
            usuario?.usuario ||
            null;

        } catch (error) {
          console.error(
            'Error al leer el usuario guardado:',
            error
          );
        }
      }
    }

    // Guardar nuevamente las claves para que todo el sistema
    // pueda utilizarlas posteriormente
    if (empleadoId) {
      localStorage.setItem(
        'empleado_id',
        String(empleadoId)
      );
    }

    if (empleadoNombre) {
      localStorage.setItem(
        'empleado_nombre',
        String(empleadoNombre)
      );
    }

    console.log('==============================');
    console.log('DATOS DEL EMPLEADO');
    console.log('Empleado ID:', empleadoId);
    console.log('Empleado nombre:', empleadoNombre);
    console.log('==============================');

    return {
      empleadoId,
      empleadoNombre
    };
  };

  // =====================================================
  // CARGAR INFORMES AL INICIAR
  // =====================================================
  useEffect(() => {

    obtenerDatosEmpleado();

    cargarInformes();

  }, []);

  // =====================================================
  // OBTENER INFORMES
  // =====================================================
  const cargarInformes = async () => {

    try {

      const respuesta = await obtenerInformes();

      console.log('Informes recibidos:', respuesta);

      if (Array.isArray(respuesta)) {

        setDatos(respuesta);

      } else if (Array.isArray(respuesta?.datos)) {

        setDatos(respuesta.datos);

      } else {

        setDatos([]);

      }

    } catch (error) {

      console.error(
        'Error al cargar informes:',
        error
      );

      setDatos([]);

    }
  };

  // =====================================================
  // CREAR INFORME
  // =====================================================
  const guardarInforme = async () => {

    try {

      // Obtener empleado
      const {
        empleadoId,
        empleadoNombre
      } = obtenerDatosEmpleado();

      // Validar empleado
      if (!empleadoId) {

        alert(
          'No se encontró el ID del empleado. ' +
          'Por favor, cierre sesión e inicie sesión nuevamente.'
        );

        return;
      }

      // Validar campos
      if (!tipo) {

        alert(
          'Seleccione el tipo de informe.'
        );

        return;
      }

      if (!nombre.trim()) {

        alert(
          'Ingrese el nombre del informe.'
        );

        return;
      }

      if (!respuesta.trim()) {

        alert(
          'Ingrese la respuesta del informe.'
        );

        return;
      }

      // =====================================================
      // DATOS QUE SE ENVIARÁN AL BACKEND
      // =====================================================

      const datosInforme = {

        empleado_id: Number(empleadoId),

        empleado_nombre:
          empleadoNombre || '',

        nombre:
          nombre.trim(),

        tipo,

        respuesta:
          respuesta.trim(),

        fechaInicio,

        fechaFin,

        estado
      };

      console.log(
        'Datos enviados al backend:',
        datosInforme
      );

      // =====================================================
      // CREAR INFORME
      // =====================================================

      const respuestaServidor =
        await crearInforme(datosInforme);

      console.log(
        'Respuesta del servidor:',
        respuestaServidor
      );

      alert(
        respuestaServidor?.mensaje ||
        respuestaServidor?.message ||
        'Informe creado correctamente'
      );

      // =====================================================
      // LIMPIAR FORMULARIO
      // =====================================================

      setNombre('');
      setTipo('');
      setRespuesta('');
      setFechaInicio('');
      setFechaFin('');
      setEstado('');

      // =====================================================
      // RECARGAR TABLA
      // =====================================================

      await cargarInformes();

    } catch (error) {

      console.error(
        'Error al guardar informe:',
        error
      );

      alert(
        error.message ||
        'Ocurrió un error al crear el informe.'
      );
    }
  };

  // =====================================================
  // VER INFORME
  // =====================================================
  const verInforme = (informe) => {

    setInformeSeleccionado(informe);

    setMostrarVer(true);
  };

  // =====================================================
  // EDITAR INFORME
  // =====================================================
  const editarInforme = (informe) => {

    setInformeSeleccionado(informe);

    setMostrarEditar(true);
  };

  // =====================================================
  // ELIMINAR INFORME
  // =====================================================
  const seleccionarEliminar = (informe) => {

    setInformeSeleccionado(informe);

    setMostrarEliminar(true);
  };

  // =====================================================
  // GUARDAR EDICIÓN
  // =====================================================
  const guardarEdicion = async (datosActualizados) => {

    try {

      await actualizarInforme(
        datosActualizados.id,
        datosActualizados
      );

      setMostrarEditar(false);

      await cargarInformes();

      alert(
        'Informe actualizado correctamente'
      );

    } catch (error) {

      console.error(
        'Error al actualizar informe:',
        error
      );

      alert(
        error.response?.data?.mensaje ||
        error.message ||
        'Error al actualizar el informe'
      );
    }
  };

  // =====================================================
  // CONFIRMAR ELIMINACIÓN
  // =====================================================
  const confirmarEliminar = async (id) => {

    try {

      await eliminarInforme(id);

      setMostrarEliminar(false);

      await cargarInformes();

      alert(
        'Informe eliminado correctamente'
      );

    } catch (error) {

      console.error(
        'Error al eliminar informe:',
        error
      );

      alert(
        error.response?.data?.mensaje ||
        error.message ||
        'Error al eliminar el informe'
      );
    }
  };

  // =====================================================
  // GENERAR PDF
  // =====================================================
  const descargarArchivoPDF = async () => {

    try {

      const archivo = await generarPDF();

      const url =
        window.URL.createObjectURL(
          new Blob(
            [archivo],
            {
              type: 'application/pdf'
            }
          )
        );

      const link =
        document.createElement('a');

      link.href = url;

      link.download = 'Informe.pdf';

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);

    } catch (error) {

      console.error(
        'Error al generar el PDF:',
        error
      );

      alert(
        'Error al generar el PDF'
      );
    }
  };

  // =====================================================
  // GENERAR EXCEL
  // =====================================================
  const descargarArchivoExcel = async () => {

    try {

      const archivo =
        await generarExcel();

      const url =
        window.URL.createObjectURL(
          new Blob(
            [archivo],
            {
              type:
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            }
          )
        );

      const link =
        document.createElement('a');

      link.href = url;

      link.download = 'Informe.xlsx';

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);

    } catch (error) {

      console.error(
        'Error al generar el Excel:',
        error
      );

      alert(
        'Error al generar el Excel'
      );
    }
  };

  // =====================================================
  // INTERFAZ
  // =====================================================
  return (

    <div className="panelInformesContainer">

      <div className="headerInformes">

        <div className="contenedor-scroll">

          <div>

            <h1>
              Informes
            </h1>

            <p>
              Genere reportes del sistema.
            </p>

          </div>

        </div>

        <div className="cardInforme">

          <div className="grupo">

            <label>
              Tipo de informe:
            </label>

            <select
              value={tipo}
              onChange={(e) =>
                setTipo(e.target.value)
              }
            >

              <option value="">
                Seleccione...
              </option>

              <option value="Usuarios">
                Usuarios
              </option>

              <option value="PQR">
                PQR
              </option>

              <option value="Derechos de Petición">
                Derechos de Petición
              </option>

              <option value="Bitácoras">
                Bitácoras
              </option>

              <option value="Solicitudes">
                Solicitudes
              </option>

            </select>

          </div>

          <div className="grupo">

            <label>
              Nombre:
            </label>

            <input
              type="text"
              value={nombre}
              placeholder="Ingrese el nombre"
              onChange={(e) =>
                setNombre(e.target.value)
              }
            />

          </div>

          <div className="grupo">

            <label>
              Respuesta:
            </label>

            <input
              type="text"
              value={respuesta}
              placeholder="Ingrese la respuesta"
              onChange={(e) =>
                setRespuesta(e.target.value)
              }
            />

          </div>

          <div className="grupo">

            <label>
              Fecha Inicial:
            </label>

            <input
              type="date"
              value={fechaInicio}
              onChange={(e) =>
                setFechaInicio(e.target.value)
              }
            />

          </div>

          <div className="grupo">

            <label>
              Fecha Final:
            </label>

            <input
              type="date"
              value={fechaFin}
              onChange={(e) =>
                setFechaFin(e.target.value)
              }
            />

          </div>

          <div className="grupo">

            <label>
              Estado:
            </label>

            <select
              value={estado}
              onChange={(e) =>
                setEstado(e.target.value)
              }
            >

              <option value="">
                Todos
              </option>

              <option value="Pendiente">
                Pendiente
              </option>

              <option value="En proceso">
                En proceso
              </option>

              <option value="Respondida">
                Respondida
              </option>

            </select>

          </div>

          <div className="botonesInforme">

            <button
              className="btnCrear"
              onClick={guardarInforme}
            >
              Crear Informe
            </button>

          </div>

        </div>

      </div>

      <TablaVistaPrevia
        datos={datos}
        generarPDF={descargarArchivoPDF}
        generarExcel={descargarArchivoExcel}
        editarInforme={editarInforme}
        eliminarInforme={seleccionarEliminar}
        verInforme={verInforme}
      />

      {mostrarVer && (

        <VerInforme
          informe={informeSeleccionado}
          onClose={() =>
            setMostrarVer(false)
          }
        />

      )}

      {mostrarEditar && (

        <EditarInforme
          informe={informeSeleccionado}
          onGuardar={guardarEdicion}
          onClose={() =>
            setMostrarEditar(false)
          }
        />

      )}

      {mostrarEliminar && (

        <EliminarInforme
          informe={informeSeleccionado}
          onEliminar={confirmarEliminar}
          onClose={() =>
            setMostrarEliminar(false)
          }
        />

      )}

    </div>
  );
}