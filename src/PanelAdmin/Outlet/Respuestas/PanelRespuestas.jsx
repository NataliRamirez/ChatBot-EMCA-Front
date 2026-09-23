import "./PanelRespuestas.css";
import { useEffect, useState } from "react";

import TablaRespuestas from "../../../Components/TablaRespuestas/TablasRespuestas";
import CrearRespuesta from "../../../Components/TablaRespuestas/CrearRespuesta";
import EditarRespuesta from "../../../Components/TablaRespuestas/EditarRespuesta";
import VerRespuesta from "../../../Components/TablaRespuestas/VerRespuesta";
import EliminarRespuesta from "../../../Components/TablaRespuestas/EliminarRespuesta";

export default function PanelRespuestas() {

    const [buscar, setBuscar] = useState("");

    const [respuestas, setRespuestas] = useState([]);

    const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);

    const [mostrarCrear, setMostrarCrear] = useState(false);
    const [mostrarEditar, setMostrarEditar] = useState(false);
    const [mostrarVer, setMostrarVer] = useState(false);
    const [mostrarEliminar, setMostrarEliminar] =useState(false);

    // ==========================
    // Cargar respuestas
    // ==========================

    const fetchRespuestas = async () => {

        try {

            const res = await fetch(
                "http://127.0.0.1:4000/v1/respuestas",
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

            setRespuestas(data);

        } catch (error) {

            console.log("Error al cargar respuestas", error);

        }

    };

    useEffect(() => {

        fetchRespuestas();

    }, []);

    return (
        <div className="panelRespuestas">
            <div className="headerRespuestas">
                <div>
                    <h1>Panel de Respuestas</h1>
                    <p>
                        Administre todas las respuestas del sistema.
                    </p>

                    <button
                        className="btn_NuevaRespuesta"
                        onClick={(e) => setMostrarCrear(true)}
                    >
                        Nueva respuesta
                    </button>

                </div>

                <input
                    className="buscarRespuesta"
                    type="text"
                    placeholder="Buscar respuesta..."
                    value={buscar}
                    onChange={(e) => setBuscar(e.target.value)}
                />

            </div>

            <TablaRespuestas
                respuestas={respuestas}
                buscar={buscar}

                onVer={(item) => {
                    setRespuestaSeleccionada(item);
                    setMostrarVer(true);
                }}

                onEditar={(item) => {
                    setRespuestaSeleccionada(item);
                    setMostrarEditar(true);
                }}

                onEliminar={(item) =>{
                    setRespuestaSeleccionada(item);
                    setMostrarEliminar(true);
                }}
            />

            {mostrarCrear && (
                <CrearRespuesta
                    cerrar={() => {
                        setMostrarCrear(false);
                        fetchRespuestas();
                    }}
                />
            )}

            {mostrarEditar && (
                <EditarRespuesta
                    datos={respuestaSeleccionada}
                    cerrar={() => {
                        setMostrarEditar(false);
                        fetchRespuestas();
                    }}
                />
            )}

            {mostrarVer && (
                <VerRespuesta
                    datos={respuestaSeleccionada}
                    cerrar={() => setMostrarVer(false)}
                />
            )}

            {mostrarEliminar && (
                <EliminarRespuesta
                  datos={respuestaSeleccionada}
                  cerrar={() => setMostrarEliminar(false)}
                />
            )}
        </div>
    );
}