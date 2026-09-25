import { useState } from "react";
import "./VerInforme.css";

export default function ReportesJefe() {
     /**DESESTRUTURACION DE LOS ESTADOS QUE SE USARAN , PRIMERO SE DECLARAN  */
    const [tipoReporte, setTipoReporte] = useState("Solicitudes");
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");

    const handleGenerar = () => {
        console.log("Generando reporte con:", { tipoReporte, fechaInicio, fechaFin });
    };

    return (
        <div className="reportes-page">
            <div className="reportes-header">
                <div>
                    <h2>📊 Reportes Ejecutivos</h2>
                    <p>Consulta estadísticas y genera reportes del sistema EMCA</p>
                </div>

            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <span>📋</span>
                    <div>
                        <h3>128</h3>
                        <p>Solicitudes</p>
                    </div>
                </div>

                <div className="stat-card">
                    <span>✅</span>
                    <div>
                        <h3>94</h3>
                        <p>Resueltas</p>
                    </div>
                </div>

                <div className="stat-card">
                    <span>⏳</span>
                    <div>
                        <h3>22</h3>
                        <p>En proceso</p>
                    </div>
                </div>

                <div className="stat-card">
                    <span>⚠️</span>
                    <div>
                        <h3>12</h3>
                        <p>Pendientes</p>
                    </div>
                </div>
            </div>

            <div className="filtros-card">
                <div className="filtros-grid">
                    <div className="campos">
                        <label>Tipo de reporte</label>
                        <select value={tipoReporte} onChange={(e) => setTipoReporte(e.target.value)}>
                            <option value="Solicitudes">Solicitudes</option>
                            <option value="Empleados">Empleados</option>
                            <option value="Respuestas">Respuestas</option>
                            <option value="Bitácoras">Bitácoras</option>
                        </select>
                    </div>

                    <div className="campos">
                        <label>Fecha inicio</label>
                        <input
                            type="date"
                            value={fechaInicio}
                            onChange={(e) => setFechaInicio(e.target.value)}
                        />
                    </div>

                    <div className="campos">
                        <label>Fecha fin</label>
                        <input
                            type="date"
                            value={fechaFin}
                            onChange={(e) => setFechaFin(e.target.value)}
                        />
                    </div>

                    <div className="campos btn-generar">
                        <button className="btn-primaryFull" onClick={handleGenerar}>
                            📊 Generar
                        </button>
                    </div>
                </div>
            </div>

            <div className="grafico-card">
                <div className="grafico-header">
                    <h3>Solicitudes por mes</h3>
                    <span>Últimos 6 meses</span>
                </div>

                <div className="grafico-placeholder">
                    <div className="barras">
                        <div className="Barras" style={{ height: "60%" }}></div>
                        <div className="Barras" style={{ height: "80%" }}></div>
                        <div className="Barras" style={{ height: "70%" }}></div>
                        <div className="Barras" style={{ height: "95%" }}></div>
                        <div className="Barras" style={{ height: "85%" }}></div>
                        <div className="Barras" style={{ height: "100%" }}></div>
                    </div>

                    <div className="meses">
                        <span>Feb</span>
                        <span>Mar</span>
                        <span>Abr</span>
                        <span>May</span>
                        <span>Jun</span>
                        <span>Jul</span>
                    </div>
                </div>
            </div>

            <div className="tabla-card">
                <div className="tabla-header">
                    <h3>Resumen por área</h3>
                </div>

                <table className="tabla-reportes">
                    <thead>
                        <tr>
                            <th>Área</th>
                            <th>Registradas</th>
                            <th>Resueltas</th>
                            <th>%</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>Comercial</td>
                            <td>35</td>
                            <td>28</td>
                            <td>80%</td>
                        </tr>
                        <tr>
                            <td>Técnica</td>
                            <td>46</td>
                            <td>41</td>
                            <td>89%</td>
                        </tr>
                        <tr>
                            <td>PQR</td>
                            <td>25</td>
                            <td>19</td>
                            <td>76%</td>
                        </tr>
                        <tr>
                            <td>Facturación</td>
                            <td>22</td>
                            <td>24</td>
                            <td>109%</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}