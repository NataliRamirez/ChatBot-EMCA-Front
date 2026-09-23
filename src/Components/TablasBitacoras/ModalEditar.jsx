import { useState } from "react";
import "./Modal.css";

export default function ModalEditar({ datos, cerrar }) {

    const [titulo, setTitulo] = useState(datos.titulo);
    const [nombre, setNombre] = useState(datos.nombre);
    const [fechaInicio, setFechaInicio] = useState(datos.fechaInicio);
    const [fechaFin, setFechaFin] = useState(datos.fechaFin);
    const [estado, setEstado] = useState(datos.estado);
    const [descripcion, setDescripcion] = useState(datos.descripcion);
    const [texto, setTexto] = useState(datos.texto ?? datos.descripcion);

    const actualizar = async () => {

        try {

            const res = await fetch(
                `http://127.0.0.1:4000/v1/bitacora/${datos.id}`,
                {
                    method: "PUT",
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
                        texto
                    })
                }
            );

            const data = await res.json();

            if (res.ok) {
                alert(data.mensaje);
                cerrar();
                window.location.reload();
            } else {
                alert(data.mensaje);
            }

        } catch (error) {
            console.log(error);
            alert("Error de conexión con el servidor");
        }

    };

    return (
        <div className="overlay">
            <div className="modal">

                <div className="contenidos_editar">

                    <h2>Editar Bitácora</h2>

                    <label>Título</label>
                    <input
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                    />

                    <label>Nombre</label>
                    <input
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />

                    <label>Fecha Inicio</label>
                    <input
                        type="date"
                        value={fechaInicio}
                        onChange={(e) => setFechaInicio(e.target.value)}
                    />

                    <label>Fecha Final</label>
                    <input
                        type="date"
                        value={fechaFin}
                        onChange={(e) => setFechaFin(e.target.value)}
                    />

                    <label>Estado</label>
                    <select
                        value={estado}
                        onChange={(e) => setEstado(e.target.value)}
                    >
                        <option value="Pendiente">Pendiente</option>
                        <option value="En proceso">En proceso</option>
                        <option value="Finalizada">Finalizada</option>
                    </select>

                    <label>Descripción</label>
                    <textarea
                        value={descripcion}
                        onChange={(e) => {
                            setDescripcion(e.target.value);
                            setTexto(e.target.value);
                        }}
                    />

                    <div className="Contentino_edit">
                        <button
                            className="btns_Actualizar"
                            onClick={actualizar}
                        >
                            Actualizar
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