<<<<<<< HEAD
import React from 'react';
=======
>>>>>>> 9062b6ad61025fe79b83e8cfb65c1fb600ebb306
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './AuthContext/AuthContext';

// ===================== LAYOUTS =====================
import PanelAdmin from './PanelAdmin/PanelAdmin';
import Panelusuario from './PanelUsuario/Panelusuario';
import PanelJefe from './PanelAdmin/PanelJefe/PanelJefe';

// ===================== AUTH =====================
import { Register } from './Components/Formularios/Register/Register';
import Recuperacion from './Components/Formularios/recuperacion/Recuperacion';
import Restablecer from './Components/Formularios/Restablecer/Restablecer';
import { Login } from './Components/Formularios/Login/Login';

// ===================== PANEL ADMIN =====================
import PanelInformes from './PanelAdmin/Outlet/PanelInformes/PanelInformes';
import PanelSolicitudes from './PanelAdmin/Outlet/Solicitudes/PanelSolicitudes';
import PanelRespuestas from './PanelAdmin/Outlet/Respuestas/PanelRespuestas';
<<<<<<< HEAD
import dasboardAdmin from './PanelAdmin/dasboarAdmin'; // Requiere export default en dasboarAdmin.jsx
=======
import  dashboardAdmin  from './PanelAdmin/dasboarAdmin';
>>>>>>> 9062b6ad61025fe79b83e8cfb65c1fb600ebb306
import Bitacoras from './PanelAdmin/Outlet/Bitacoras/Bitacoras';
import PanelBitacoras from './PanelAdmin/Outlet/Bitacoras/PanelBitacoras';
import Perfil from './PanelAdmin/Outlet/Perfil/Perfil';
import Ayuda from './PanelAdmin/Outlet/Ayuda/Ayuda';

// ===================== PANEL JEFE =====================
import DashboardJefe from './PanelAdmin/PanelJefe/Pages/Dashboard/DashboardJefe';
import PanelEmpleados from './PanelAdmin/PanelJefe/Pages/Empleados/PanelEmpleados';
import ReportesJefe from './PanelAdmin/PanelJefe/Pages/ReportesJefe/ReportesJefe';
import SolicitudesJefe from './PanelAdmin/PanelJefe/Pages/SolicitudesJefe/SolicitudesJefe';
import RespuestasJefe from './PanelAdmin/PanelJefe/Pages/RespuestasJefe/RespuestasJefe';
import BitacorasJefe from './PanelAdmin/PanelJefe/Pages/BitacorasJefe/BitacorasJefe';
import Configuracion from './PanelAdmin/PanelJefe/Pages/Configuracion/Configuracion';
import PerfilJefe from './PanelAdmin/PanelJefe/Pages/Perfil/PerfilJefe';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>

<<<<<<< HEAD
          {/* ===================== AUTH & PUBLIC ===================== */}
=======
          {/* ===================== LOGIN ===================== */}
>>>>>>> 9062b6ad61025fe79b83e8cfb65c1fb600ebb306
          <Route path="/" element={<Login />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/recuperar" element={<Recuperacion />} />
          <Route path="/restablecer" element={<Restablecer />} />

<<<<<<< HEAD
          {/* ===================== PANEL USUARIO / OPERADOR ===================== */}
=======
          {/* ===================== PANEL USUARIO ===================== */}
>>>>>>> 9062b6ad61025fe79b83e8cfb65c1fb600ebb306
          <Route path="/panel-usuario" element={<Panelusuario />} />

          {/* ===================== PANEL ADMIN ===================== */}
          <Route path="/panel-admin" element={<PanelAdmin />}>

            {/* Dashboard principal del admin */}
<<<<<<< HEAD
            <Route index element={<dasboardAdmin />} />
            <Route path="dasboard-admin" element={<dasboardAdmin />} />

           
=======
            <Route index element={<DashboardJefe />} />
            <Route path="dasboar-admin" element={<DashboardJefe />} />
>>>>>>> 9062b6ad61025fe79b83e8cfb65c1fb600ebb306

            {/* Perfil */}
            <Route path="perfil/:id" element={<Perfil />} />

            {/* Informes */}
            <Route path="panel-informes" element={<PanelInformes />} />

            {/* Solicitudes */}
            <Route path="panel-solicitudes" element={<PanelSolicitudes />} />

            {/* Respuestas */}
            <Route path="panel-respuestas" element={<PanelRespuestas />} />

            {/* Bitácoras */}
            <Route path="bitacoras" element={<Bitacoras />} />
            <Route path="panel-bitacoras" element={<PanelBitacoras />} />

            {/* Ayuda */}
            <Route path="ayuda" element={<Ayuda />} />

          </Route>

          {/* ===================== PANEL JEFE ===================== */}
          <Route path="/panel-jefe" element={<PanelJefe />}>

            {/* Dashboard */}
            <Route index element={<DashboardJefe />} />
            <Route path="dashboard" element={<DashboardJefe />} />

            {/* Empleados */}
            <Route path="empleados" element={<PanelEmpleados />} />

            {/* Reportes */}
            <Route path="reportes" element={<ReportesJefe />} />

            {/* Solicitudes */}
            <Route path="solicitudes" element={<SolicitudesJefe />} />

            {/* Respuestas */}
            <Route path="respuestas" element={<RespuestasJefe />} />

            {/* Bitácoras */}
            <Route path="bitacoras" element={<BitacorasJefe />} />

            {/* Perfil */}
            <Route path="perfil" element={<PerfilJefe />} />

            {/* Configuración */}
            <Route path="configuracion" element={<Configuracion />} />

            {/* Ayuda */}
            <Route path="ayuda" element={<Ayuda />} />

          </Route>

          {/* ===================== RUTA NO ENCONTRADA ===================== */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;