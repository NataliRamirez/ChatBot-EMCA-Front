import React from "react";
import { useNavigate } from "react-router-dom";
import "./DashboardJefe.css";

const STATS_DATA = [
    {
        id: 1,
        icon: "📋",
        count: "128",
        label: "Solicitudes",
        detail: "+12% este mes",
    },
    {
        id: 2,
        icon: "💬",
        count: "84",
        label: "Respuestas",
        detail: "+8% este mes",
    },
    {
        id: 3,
        icon: "👥",
        count: "24",
        label: "Empleados",
        detail: "8 conectados ahora",
    },
    {
        id: 4,
        icon: "📥",
        count: "156",
        label: "Comprobantes",
        detail: "+18 pendientes",
    },
];

const QUICK_ACTIONS = [
    {
        icon: "💬",
        label: "Chatbot",
        description: "Supervisar conversaciones",
        path: "/panel-jefe/chatbot",
    },
    {
        icon: "📋",
        label: "Solicitudes",
        description: "Gestionar solicitudes",
        path: "/panel-jefe/solicitudes",
    },
    {
        icon: "📄",
        label: "Respuestas",
        description: "Revisar respuestas",
        path: "/panel-jefe/respuestas",
    },
    {
        icon: "👥",
        label: "Empleados",
        description: "Administrar personal",
        path: "/panel-jefe/empleados",
    },
];

const RECENT_ACTIVITIES = [
    {
        id: 1,
        dotColor: "green",
        icon: "📋",
        title: "Nueva solicitud registrada",
        description: "Solicitud ingresada al sistema",
        time: "Hace 5 minutos",
    },
    {
        id: 2,
        dotColor: "blue",
        icon: "💬",
        title: "Respuesta aprobada",
        description: "Una respuesta fue validada",
        time: "Hace 12 minutos",
    },
    {
        id: 3,
        dotColor: "orange",
        icon: "📥",
        title: "Comprobante verificado",
        description: "Documento revisado correctamente",
        time: "Hace 25 minutos",
    },
    {
        id: 4,
        dotColor: "green",
        icon: "👤",
        title: "Empleado inició sesión",
        description: "Nuevo acceso detectado",
        time: "Hace 40 minutos",
    },
];

const PENDING_ITEMS = [
    {
        icon: "📋",
        label: "Solicitudes por revisar",
        count: 12,
    },
    {
        icon: "💬",
        label: "Respuestas por aprobar",
        count: 5,
    },
    {
        icon: "📥",
        label: "Comprobantes pendientes",
        count: 14,
    },
    {
        icon: "📑",
        label: "Bitácoras en revisión",
        count: 3,
    },
];

const CHART_DATA = [
    { month: "Feb", height: "45%", value: "42" },
    { month: "Mar", height: "60%", value: "58" },
    { month: "Abr", height: "75%", value: "71" },
    { month: "May", height: "90%", value: "86" },
    { month: "Jun", height: "70%", value: "68" },
    { month: "Jul", height: "100%", value: "96" },
];

const ONLINE_EMPLOYEES = [
    {
        id: 1,
        avatar: "JD",
        name: "Juan David",
        role: "Jefe Administrativo",
    },
    {
        id: 2,
        avatar: "CA",
        name: "Carlos Admin",
        role: "Administrador",
    },
    {
        id: 3,
        avatar: "MR",
        name: "María Ruiz",
        role: "Auxiliar",
    },
];

export default function DashboardJefe() {
    const navigate = useNavigate();

    return (
        <div className="jefe-dashboard">

            {/* =========================================
                ENCABEZADO PRINCIPAL
            ========================================= */}
            <header className="jefe-header">

                <div className="jefe-header-main">

                    <div className="jefe-header-icon">
                        👋
                    </div>

                    <div className="jefe-header-info">

                        <span className="jefe-header-label">
                            PANEL ADMINISTRATIVO
                        </span>

                        <h1>
                            Bienvenido, Juan David
                        </h1>

                        <p>
                            Supervisa las solicitudes, empleados y operaciones
                            del sistema EMCA desde un solo lugar.
                        </p>

                    </div>

                </div>


                <div className="jefe-header-actions">

                    <div className="jefe-system-status">
                        <span className="jefe-status-indicator"></span>

                        <div>
                            <strong>Sistema activo</strong>
                            <span>Todo funcionando correctamente</span>
                        </div>
                    </div>

                    <button
                        className="jefe-main-button"
                        onClick={() =>
                            navigate("/panel-jefe/chatbot")
                        }
                    >
                        <span>💬</span>
                        Ver conversaciones
                    </button>

                </div>

            </header>


            {/* =========================================
                MÉTRICAS
            ========================================= */}
            <section className="jefe-stats">

                {STATS_DATA.map((stat) => (

                    <article
                        className="jefe-stat-card"
                        key={stat.id}
                    >

                        <div className="jefe-stat-top">

                            <div className="jefe-stat-icon">
                                {stat.icon}
                            </div>

                            <span className="jefe-stat-arrow">
                                ↗
                            </span>

                        </div>


                        <div className="jefe-stat-content">

                            <span className="jefe-stat-label">
                                {stat.label}
                            </span>

                            <strong className="jefe-stat-number">
                                {stat.count}
                            </strong>

                            <span className="jefe-stat-detail">
                                {stat.detail}
                            </span>

                        </div>

                    </article>

                ))}

            </section>


            {/* =========================================
                ACCIONES RÁPIDAS
            ========================================= */}
            <section className="jefe-section">

                <div className="jefe-section-heading">

                    <div>
                        <span className="jefe-section-label">
                            ACCESOS
                        </span>

                        <h2>
                            Acciones rápidas
                        </h2>
                    </div>

                    <p>
                        Accede rápidamente a las principales áreas.
                    </p>

                </div>


                <div className="jefe-actions-grid">

                    {QUICK_ACTIONS.map((action) => (

                        <button
                            key={action.path}
                            className="jefe-action-card"
                            onClick={() => navigate(action.path)}
                        >

                            <div className="jefe-action-icon">
                                {action.icon}
                            </div>

                            <div className="jefe-action-content">

                                <strong>
                                    {action.label}
                                </strong>

                                <span>
                                    {action.description}
                                </span>

                            </div>

                            <span className="jefe-action-arrow">
                                →
                            </span>

                        </button>

                    ))}

                </div>

            </section>


            {/* =========================================
                ACTIVIDAD + PENDIENTES
            ========================================= */}
            <section className="jefe-content-grid">

                {/* ACTIVIDAD */}
                <article className="jefe-panel">

                    <div className="jefe-panel-header">

                        <div className="jefe-panel-title">

                            <div className="jefe-panel-icon">
                                🕒
                            </div>

                            <div>
                                <h3>
                                    Actividad reciente
                                </h3>

                                <span>
                                    Últimos movimientos del sistema
                                </span>
                            </div>

                        </div>

                        <button className="jefe-panel-link">
                            Ver todo
                        </button>

                    </div>


                    <div className="jefe-activity-list">

                        {RECENT_ACTIVITIES.map((activity) => (

                            <div
                                className="jefe-activity-item"
                                key={activity.id}
                            >

                                <div
                                    className={`jefe-activity-dot ${activity.dotColor}`}
                                ></div>

                                <div className="jefe-activity-icon">
                                    {activity.icon}
                                </div>

                                <div className="jefe-activity-info">

                                    <strong>
                                        {activity.title}
                                    </strong>

                                    <span>
                                        {activity.description}
                                    </span>

                                </div>

                                <time>
                                    {activity.time}
                                </time>

                            </div>

                        ))}

                    </div>

                </article>


                {/* PENDIENTES */}
                <article className="jefe-panel">

                    <div className="jefe-panel-header">

                        <div className="jefe-panel-title">

                            <div className="jefe-panel-icon jefe-warning-icon">
                                ⚠️
                            </div>

                            <div>
                                <h3>
                                    Pendientes
                                </h3>

                                <span>
                                    Elementos que requieren atención
                                </span>
                            </div>

                        </div>

                        <span className="jefe-pending-total">
                            34
                        </span>

                    </div>


                    <div className="jefe-pending-list">

                        {PENDING_ITEMS.map((item) => (

                            <div
                                className="jefe-pending-item"
                                key={item.label}
                            >

                                <div className="jefe-pending-left">

                                    <div className="jefe-pending-icon">
                                        {item.icon}
                                    </div>

                                    <span>
                                        {item.label}
                                    </span>

                                </div>

                                <span className="jefe-pending-badge">
                                    {item.count}
                                </span>

                            </div>

                        ))}

                    </div>

                </article>

            </section>


            {/* =========================================
                GRÁFICO + EMPLEADOS
            ========================================= */}
            <section className="jefe-content-grid">

                {/* GRÁFICO */}
                <article className="jefe-panel jefe-chart-panel">

                    <div className="jefe-panel-header">

                        <div className="jefe-panel-title">

                            <div className="jefe-panel-icon">
                                📈
                            </div>

                            <div>
                                <h3>
                                    Solicitudes por mes
                                </h3>

                                <span>
                                    Comportamiento durante los últimos meses
                                </span>
                            </div>

                        </div>

                        <span className="jefe-chart-badge">
                            Últimos 6 meses
                        </span>

                    </div>


                    <div className="jefe-chart-wrapper">

                        <div className="jefe-chart-y">

                            <span>100</span>
                            <span>80</span>
                            <span>60</span>
                            <span>40</span>
                            <span>20</span>
                            <span>0</span>

                        </div>


                        <div className="jefe-chart-area">

                            <div className="jefe-chart-lines">
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>


                            <div className="jefe-chart-bars">

                                {CHART_DATA.map((bar) => (

                                    <div
                                        className="jefe-chart-column"
                                        key={bar.month}
                                    >

                                        <span className="jefe-chart-value">
                                            {bar.value}
                                        </span>

                                        <div
                                            className="jefe-chart-bar"
                                            style={{
                                                height: bar.height,
                                            }}
                                        ></div>

                                        <span className="jefe-chart-month">
                                            {bar.month}
                                        </span>

                                    </div>

                                ))}

                            </div>

                        </div>

                    </div>

                </article>


                {/* EMPLEADOS */}
                <article className="jefe-panel">

                    <div className="jefe-panel-header">

                        <div className="jefe-panel-title">

                            <div className="jefe-panel-icon">
                                👥
                            </div>

                            <div>
                                <h3>
                                    Empleados conectados
                                </h3>

                                <span>
                                    Personal actualmente activo
                                </span>
                            </div>

                        </div>

                        <span className="jefe-online-badge">
                            8 en línea
                        </span>

                    </div>


                    <div className="jefe-employees-list">

                        {ONLINE_EMPLOYEES.map((employee) => (

                            <div
                                className="jefe-employee"
                                key={employee.id}
                            >

                                <div className="jefe-avatar">
                                    {employee.avatar}
                                </div>

                                <div className="jefe-employee-info">

                                    <strong>
                                        {employee.name}
                                    </strong>

                                    <span>
                                        {employee.role}
                                    </span>

                                </div>

                                <span className="jefe-employee-status"></span>

                            </div>

                        ))}

                    </div>


                    <button
                        className="jefe-view-employees"
                        onClick={() =>
                            navigate("/panel-jefe/empleados")
                        }
                    >
                        Ver todos los empleados
                        <span>→</span>
                    </button>

                </article>

            </section>

        </div>
    );
}