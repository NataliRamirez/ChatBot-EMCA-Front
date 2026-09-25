import { useState } from "react";

export default function FormInforme({ onGenerar }) {
    /**DESESTRUTURACION DE LOS ESTADOS QUE SE USARAN , PRIMERO SE DECLARAN  */
    const [tipo, setTipo] = useState("");
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");
    const [estado, setEstado] = useState("");
    const [formato, setFormato] = useState("PDF");

    const enviar = (e) => {
        e.preventDefault();
        onGenerar({
            tipo,
            fechaInicio,
            fechaFin,
            estado,
            formato
        });
    };

    return (
        <form className="formInforme" onSubmit={enviar}>
            <div className="grupo">
                <label>Tipo de informe</label>
                <select value={tipo} onChange={(e) => setTipo(e.target.value)} required>
                    <option value="">Seleccione</option>
                    <option value="Usuarios">Usuarios</option>
                    <option value="Bitácoras">Bitácoras</option>
                    <option value="Solicitudes">Solicitudes</option>
                    <option value="PQR">PQR</option>
                    <option value="Derechos">Derechos de Petición</option>
                </select>
            </div>

            <div className="grupo">
                <label>Fecha Inicial</label>
                <input
                    type="date"
                    value={fechaInicio}
                    onChange={(e) => setFechaInicio(e.target.value)}
                />
            </div>

            <div className="grupo">
                <label>Fecha Final</label>
                <input
                    type="date"
                    value={fechaFin}
                    onChange={(e) => setFechaFin(e.target.value)}
                />
            </div>

            <div className="grupo">
                <label>Estado</label>
                <select value={estado} onChange={(e) => setEstado(e.target.value)}>
                    <option value="">Todos</option>
                    <option value="Pendiente">Pendiente</option>
                    <option value="En proceso">En proceso</option>
                    <option value="Respondida">Respondida</option>
                </select>
            </div>

            <div className="grupo">
                <label>Formato</label>
                <select value={formato} onChange={(e) => setFormato(e.target.value)}>
                    <option value="PDF">PDF</option>
                    <option value="Excel">Excel</option>
                </select>
            </div>

            <button className="btnGenerar" type="submit">
                Generar Informe
            </button>
        </form>
    );
}