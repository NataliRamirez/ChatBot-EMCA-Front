import { useState } from "react";
import "./Modal.css";

export default function ModalCrear({ cerrar }) {

    const [titulo, setTitulo] = useState("");
    const [nombre, setNombre] = useState("");
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [cargo, setCargo] = useState("");
    const [estado, setEstado] = useState("");

    const guardar = async () => {

        try {

            const res = await fetch(`http://127.0.0.1:4000/v1/bitacora`, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": "EmcaSecret2026"
                },

                body: JSON.stringify({
                    titulo,
                    nombre,
                    fechaInicio,
                    fechaFin,
                    estado,
                    descripcion,
                    texto: descripcion
                })

            });

            const data = await res.json();

            if (res.ok) {
                alert(data.mensaje);
                cerrar();
            } else {
                alert(data.mensaje);
            }

        } catch (error) {
            console.log(error);
            alert("Error al conectar con el servidor");
        }

    };

    return (
        <div className="overlay">
            <div className="modal">
                <div className="contenidos_crear">

                    <h2>Nueva Bitácora</h2>

                    <input
                        placeholder="Título"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                    />

                    <input
                        placeholder="Nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />

                    <input
                        type="date"
                        value={fechaInicio}
                        onChange={(e) => setFechaInicio(e.target.value)}
                    />

                    <input
                        type="date"
                        value={fechaFin}
                        onChange={(e) => setFechaFin(e.target.value)}
                    />

                    <input
                        placeholder="Cargo"
                        value={cargo}
                        onChange={(e) => setCargo(e.target.value)}
                    />

                    <select
                        value={estado}
                        onChange={(e) => setEstado(e.target.value)}
                    >
                        <option value="">Seleccione un estado</option>
                        <option value="Pendiente">Pendiente</option>
                        <option value="En proceso">En proceso</option>
                        <option value="Finalizada">Finalizada</option>
                    </select>

                    <textarea
                        placeholder="Descripción"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                    />

                    <div className="Containers_modal">
                        <button
                            className="btns_Guardar"
                            onClick={guardar}
                        >
                            Guardar
                        </button>

                        <button
                            className="btns_Cancelar"
                            onClick={cerrar}
                        >
                            Cancelar
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}