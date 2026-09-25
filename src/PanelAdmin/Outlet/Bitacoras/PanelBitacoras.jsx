import { useState, useEffect } from "react";
import TablaBitacoras from "../../../Components/TablasBitacoras/TablaBitacora";
import ModalCrear from "../../../Components/TablasBitacoras/ModalCrear";
import ModalEditar from "../../../Components/TablasBitacoras/ModalEditar";
import ModalEliminar from "../../../Components/TablasBitacoras/ModalEliminar";
import ModalVer from "../../../Components/TablasBitacoras/ModalVer";
import { obtenerBitacoras } from "../../Outlet/Services/BitacorasServices";
import "./PanelBitacoras.css";

export default function PanelBitacoras() {

  const [bitacoras, setBitacoras] = useState([]);

  const [mostrarCrear, setMostrarCrear] = useState(false);
  const [mostrarEditar, setMostrarEditar] = useState(false);
  const [mostrarEliminar, setMostrarEliminar] = useState(false);
  const [mostrarVer, setMostrarVer] = useState(false);

  const [bitacoraSeleccionada, setBitacoraSeleccionada] = useState(null);

  const cargarBitacoras = async () => {
    try {
      const data = await obtenerBitacoras();
      setBitacoras(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    cargarBitacoras();
  }, []);

  return (
    <div className="panelBitacoras">

      <div className="cabecera">

        <h1>Panel de Bitácoras</h1>

        <button
          className="btn_NuevaBitacoras"
          onClick={() => setMostrarCrear(true)}
        >
          Nueva Bitácora
        </button>

      </div>

      <TablaBitacoras
        datos={bitacoras}
        onEditar={(item) => {
          setBitacoraSeleccionada(item);
          setMostrarEditar(true);
        }}
        onEliminar={(item) => {
          setBitacoraSeleccionada(item);
          setMostrarEliminar(true);
        }}
        onVer={(item) => {
          setBitacoraSeleccionada(item);
          setMostrarVer(true);
        }}
      />

      {mostrarCrear && (
        <ModalCrear
          cerrar={() => {
            setMostrarCrear(false);
            cargarBitacoras(); // Recargar la tabla
          }}
        />
      )}

      {mostrarEditar && (
        <ModalEditar
          datos={bitacoraSeleccionada}
          cerrar={() => {
            setMostrarEditar(false);
            cargarBitacoras();
          }}
        />
      )}

      {mostrarEliminar && (
        <ModalEliminar
          datos={bitacoraSeleccionada}
          cerrar={() => {
            setMostrarEliminar(false);
            cargarBitacoras();
          }}
        />
      )}

      {mostrarVer && (
        <ModalVer
          datos={bitacoraSeleccionada}
          cerrar={() => setMostrarVer(false)}
        />
      )}

    </div>
  );
}