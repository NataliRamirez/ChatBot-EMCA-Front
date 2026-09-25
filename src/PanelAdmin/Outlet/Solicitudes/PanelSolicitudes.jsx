import { useEffect, useState } from "react";
import "./PanelSolicitudes.css";

import TablaSolicitudes from "../../../Components/TablasSolicitudes/TablaSolicitudes";
import ModalVer from "../../../Components/TablasSolicitudes/ModalVer";
import ModalAsignar from "../../../Components/TablasSolicitudes/ModalAsignar";
import ModalHistorial from "../../../Components/TablasSolicitudes/ModalHistorial";
import ModalCrear from "../../../Components/TablasSolicitudes/ModalCrear";

export default function PanelSolicitudes() {

    const [buscar, setBuscar] = useState("");

    const [solicitudes, setSolicitudes] = useState([]);

    const [solicitudSeleccionada, setSolicitudSeleccionada] = useState(null);

    const [mostrarVer, setMostrarVer] = useState(false);
    const [mostrarAsignar, setMostrarAsignar] = useState(false);
    const [mostrarHistorial, setMostrarHistorial] = useState(false);
    const [mostrarCrear, setMostrarCrear] = useState(false);

    // ==========================
    // Cargar solicitudes
    // ==========================

    const fetchSolicitudes = async () => {

        try {

            const res = await fetch(
                "http://127.0.0.1:4000/v1/solicitudes",
                {
                    headers: {
                        "x-api-key": "EmcaSecret2026"
                    }
                }
            );

            if (!res.ok) {
                throw new Error(`HTTP ${res.status}`);
            }

            const data = await res.json();

            setSolicitudes(data);

        } catch (error) {

            console.log("Error al cargar solicitudes", error);

        }

    };

    useEffect(() => {

        fetchSolicitudes();

    }, []);

    return (

        <div className="panelSolicitudes">

            <div className="headerSolicitudes">

                <div>

                    <h1>Panel de Solicitudes</h1>

                    <p>
                        Administre todas las solicitudes del sistema.
                    </p>

                   <button
                        className="btn_NuevaBitacoras"
                        onClick={() => setMostrarCrear(true)}
                        >
                        Nueva solicitud
                    </button>

                </div>

                <input
                    className="buscarSolicitud"
                    type="text"
                    placeholder="Buscar solicitud..."
                    value={buscar}
                    onChange={(e) => setBuscar(e.target.value)}
                />

            </div>

            <TablaSolicitudes
                solicitudes={solicitudes}
                buscar={buscar}

                onVer={(item) => {

                    setSolicitudSeleccionada(item);
                    setMostrarVer(true);

                }}

                onAsignar={(item) => {

                    setSolicitudSeleccionada(item);
                    setMostrarAsignar(true);

                }}

                onHistorial={(item) => {

                    setSolicitudSeleccionada(item);
                    setMostrarHistorial(true);

                }}

            />

            {mostrarVer && (

                <ModalVer
                    datos={solicitudSeleccionada}
                    cerrar={() => setMostrarVer(false)}
                />

            )}

            {mostrarCrear && (
                  <ModalCrear
                     cerrar={() => {
                       setMostrarCrear(false);
                       fetchSolicitudes();
                     }}
                  />
            )}

            {mostrarAsignar && (

                <ModalAsignar
                    datos={solicitudSeleccionada}
                    cerrar={() => {

                        setMostrarAsignar(false);
                        fetchSolicitudes();

                    }}
                />

            )}

            {mostrarHistorial && (

                <ModalHistorial
                    datos={solicitudSeleccionada}
                    cerrar={() => setMostrarHistorial(false)}
                />

            )}

        </div>

    );

}