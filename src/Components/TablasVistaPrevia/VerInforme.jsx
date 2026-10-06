import { useState } from "react";
import "./VerInforme.css";

export default function ReportesJefe() {
    const [tipoReporte, setTipoReporte] = useState("Solicitudes");
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");

    const handleGenerar = () => {
        console.log("Generando reporte con:", {
            tipoReporte,
            fechaInicio,
            fechaFin
        });
    };

    return (
        <div className="reportes-page">

            {/* =========================
                ENCABEZADO
            ========================= */}
            <section className="reportes-hero">

                <div className="reportes-hero-content">
                    <div className="reportes-hero-icon">
                        📊
                    </div>

                    <div>
                        <span className="reportes-hero-label">
                            PANEL EJECUTIVO
                        </span>

                        <h1>
                            Reportes Ejecutivos
                        </h1>

                        <p>
                            Consulta estadísticas, analiza el comportamiento
                            del sistema y genera reportes de EMCA.
                        </p>
                    </div>
                </div>

                <div className="reportes-hero-status">
                    <span className="estado-dot"></span>
                    Sistema activo
                </div>

            </section>


            {/* =========================
                TARJETAS DE ESTADÍSTICAS
            ========================= */}
            <section className="reportes-stats-grid">

                <article className="reportes-stat-card reportes-stat-blue">

                    <div className="reportes-stat-top">
                        <div className="reportes-stat-icon">
                            📋
                        </div>

                        <span className="reportes-stat-trend">
                            +12%
                        </span>
                    </div>

                    <div className="reportes-stat-content">
                        <span className="reportes-stat-label">
                            Solicitudes
                        </span>

                        <strong className="reportes-stat-number">
                            128
                        </strong>

                        <span className="reportes-stat-description">
                            Registradas en el sistema
                        </span>
                    </div>

                </article>


                <article className="reportes-stat-card reportes-stat-green">

                    <div className="reportes-stat-top">
                        <div className="reportes-stat-icon">
                            ✅
                        </div>

                        <span className="reportes-stat-trend">
                            +8%
                        </span>
                    </div>

                    <div className="reportes-stat-content">
                        <span className="reportes-stat-label">
                            Resueltas
                        </span>

                        <strong className="reportes-stat-number">
                            94
                        </strong>

                        <span className="reportes-stat-description">
                            Solicitudes finalizadas
                        </span>
                    </div>

                </article>


                <article className="reportes-stat-card reportes-stat-orange">

                    <div className="reportes-stat-top">
                        <div className="reportes-stat-icon">
                            ⏳
                        </div>

                        <span className="reportes-stat-trend">
                            17%
                        </span>
                    </div>

                    <div className="reportes-stat-content">
                        <span className="reportes-stat-label">
                            En proceso
                        </span>

                        <strong className="reportes-stat-number">
                            22
                        </strong>

                        <span className="reportes-stat-description">
                            Casos actualmente activos
                        </span>
                    </div>

                </article>


                <article className="reportes-stat-card reportes-stat-red">

                    <div className="reportes-stat-top">
                        <div className="reportes-stat-icon">
                            ⚠️
                        </div>

                        <span className="reportes-stat-trend">
                            9%
                        </span>
                    </div>

                    <div className="reportes-stat-content">
                        <span className="reportes-stat-label">
                            Pendientes
                        </span>

                        <strong className="reportes-stat-number">
                            12
                        </strong>

                        <span className="reportes-stat-description">
                            Requieren atención
                        </span>
                    </div>

                </article>

            </section>


            {/* =========================
                CONTENIDO PRINCIPAL
            ========================= */}
            <section className="reportes-main-grid">

                {/* =========================
                    FILTROS
                ========================= */}
                <div className="reportes-filter-card">

                    <div className="reportes-section-header">

                        <div className="reportes-section-title">
                            <div className="reportes-section-icon">
                                ⚙️
                            </div>

                            <div>
                                <h2>
                                    Configurar reporte
                                </h2>

                                <p>
                                    Selecciona los parámetros de consulta
                                </p>
                            </div>
                        </div>

                    </div>


                    <div className="reportes-filter-body">

                        <div className="reportes-field">

                            <label>
                                Tipo de reporte
                            </label>

                            <select
                                value={tipoReporte}
                                onChange={(e) =>
                                    setTipoReporte(e.target.value)
                                }
                            >
                                <option value="Solicitudes">
                                    Solicitudes
                                </option>

                                <option value="Empleados">
                                    Empleados
                                </option>

                                <option value="Respuestas">
                                    Respuestas
                                </option>

                                <option value="Bitácoras">
                                    Bitácoras
                                </option>
                            </select>

                        </div>


                        <div className="reportes-field">

                            <label>
                                Fecha inicio
                            </label>

                            <input
                                type="date"
                                value={fechaInicio}
                                onChange={(e) =>
                                    setFechaInicio(e.target.value)
                                }
                            />

                        </div>


                        <div className="reportes-field">

                            <label>
                                Fecha fin
                            </label>

                            <input
                                type="date"
                                value={fechaFin}
                                onChange={(e) =>
                                    setFechaFin(e.target.value)
                                }
                            />

                        </div>


                        <div className="reportes-filter-action">

                            <button
                                className="reportes-generate-button"
                                onClick={handleGenerar}
                            >
                                <span>📊</span>
                                Generar reporte
                            </button>

                        </div>

                    </div>

                </div>


                {/* =========================
                    RESUMEN RÁPIDO
                ========================= */}
                <div className="reportes-summary-card">

                    <div className="reportes-summary-header">

                        <div>
                            <span>
                                RESUMEN
                            </span>

                            <h2>
                                Rendimiento general
                            </h2>
                        </div>

                        <div className="reportes-summary-icon">
                            📈
                        </div>

                    </div>


                    <div className="reportes-progress-container">

                        <div className="reportes-progress-info">
                            <span>
                                Tasa de resolución
                            </span>

                            <strong>
                                73%
                            </strong>
                        </div>

                        <div className="reportes-progress">
                            <div className="reportes-progress-fill"></div>
                        </div>

                    </div>


                    <div className="reportes-summary-items">

                        <div>
                            <strong>128</strong>
                            <span>Total</span>
                        </div>

                        <div>
                            <strong>94</strong>
                            <span>Resueltas</span>
                        </div>

                        <div>
                            <strong>34</strong>
                            <span>Abiertas</span>
                        </div>

                    </div>

                </div>

            </section>


            {/* =========================
                GRÁFICO
            ========================= */}
            <section className="reportes-chart-card">

                <div className="reportes-chart-header">

                    <div>

                        <span className="reportes-chart-label">
                            ANÁLISIS TEMPORAL
                        </span>

                        <h2>
                            Solicitudes por mes
                        </h2>

                        <p>
                            Comportamiento de las solicitudes durante los
                            últimos seis meses.
                        </p>

                    </div>

                    <div className="reportes-chart-period">
                        Últimos 6 meses
                    </div>

                </div>


                <div className="reportes-chart">

                    <div className="reportes-y-axis">
                        <span>100</span>
                        <span>80</span>
                        <span>60</span>
                        <span>40</span>
                        <span>20</span>
                        <span>0</span>
                    </div>


                    <div className="reportes-chart-area">

                        <div className="reportes-chart-lines">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>


                        <div className="reportes-bars">

                            <div className="reportes-bar-column">
                                <div className="reportes-bar reportes-bar-60"></div>
                                <span>Feb</span>
                            </div>

                            <div className="reportes-bar-column">
                                <div className="reportes-bar reportes-bar-80"></div>
                                <span>Mar</span>
                            </div>

                            <div className="reportes-bar-column">
                                <div className="reportes-bar reportes-bar-70"></div>
                                <span>Abr</span>
                            </div>

                            <div className="reportes-bar-column">
                                <div className="reportes-bar reportes-bar-95"></div>
                                <span>May</span>
                            </div>

                            <div className="reportes-bar-column">
                                <div className="reportes-bar reportes-bar-85"></div>
                                <span>Jun</span>
                            </div>

                            <div className="reportes-bar-column">
                                <div className="reportes-bar reportes-bar-100"></div>
                                <span>Jul</span>
                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* =========================
                TABLA
            ========================= */}
            <section className="reportes-table-card">

                <div className="reportes-table-header">

                    <div>
                        <span className="reportes-table-label">
                            DISTRIBUCIÓN
                        </span>

                        <h2>
                            Resumen por área
                        </h2>

                        <p>
                            Comparativo de solicitudes registradas y resueltas.
                        </p>
                    </div>

                    <button className="reportes-export-button">
                        ⬇️ Exportar
                    </button>

                </div>


                <div className="reportes-table-wrapper">

                    <table className="reportes-table">

                        <thead>

                            <tr>
                                <th>Área</th>
                                <th>Registradas</th>
                                <th>Resueltas</th>
                                <th>Rendimiento</th>
                            </tr>

                        </thead>


                        <tbody>

                            <tr>

                                <td>
                                    <div className="reportes-area-name">
                                        <span className="reportes-area-icon">
                                            🏢
                                        </span>

                                        Comercial
                                    </div>
                                </td>

                                <td>35</td>

                                <td>28</td>

                                <td>
                                    <div className="reportes-table-progress">
                                        <div className="reportes-table-progress-bar">
                                            <span className="reportes-progress-80"></span>
                                        </div>

                                        <strong>80%</strong>
                                    </div>
                                </td>

                            </tr>


                            <tr>

                                <td>
                                    <div className="reportes-area-name">
                                        <span className="reportes-area-icon">
                                            🔧
                                        </span>

                                        Técnica
                                    </div>
                                </td>

                                <td>46</td>

                                <td>41</td>

                                <td>
                                    <div className="reportes-table-progress">
                                        <div className="reportes-table-progress-bar">
                                            <span className="reportes-progress-89"></span>
                                        </div>

                                        <strong>89%</strong>
                                    </div>
                                </td>

                            </tr>


                            <tr>

                                <td>
                                    <div className="reportes-area-name">
                                        <span className="reportes-area-icon">
                                            📩
                                        </span>

                                        PQR
                                    </div>
                                </td>

                                <td>25</td>

                                <td>19</td>

                                <td>
                                    <div className="reportes-table-progress">
                                        <div className="reportes-table-progress-bar">
                                            <span className="reportes-progress-76"></span>
                                        </div>

                                        <strong>76%</strong>
                                    </div>
                                </td>

                            </tr>


                            <tr>

                                <td>
                                    <div className="reportes-area-name">
                                        <span className="reportes-area-icon">
                                            💳
                                        </span>

                                        Facturación
                                    </div>
                                </td>

                                <td>22</td>

                                <td>24</td>

                                <td>
                                    <div className="reportes-table-progress">
                                        <div className="reportes-table-progress-bar">
                                            <span className="reportes-progress-100"></span>
                                        </div>

                                        <strong>109%</strong>
                                    </div>
                                </td>

                            </tr>

                        </tbody>

                    </table>

                </div>

            </section>

        </div>
    );
}