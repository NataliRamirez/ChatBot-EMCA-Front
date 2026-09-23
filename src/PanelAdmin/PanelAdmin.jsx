import { Outlet, useNavigate } from "react-router-dom";
import LayouAdmin from '../PanelAdmin/Outlet/Layou/LayouAdmin';
import "./PanelAdmin.css";

export default function PanelAdmin() {
  const navigate = useNavigate();

  return (
    <div className="panel">
      {/* Menú lateral */}
      <aside className="sidebar">

         
                <div className="logo">
                      <h2>EMCA</h2>
                          <span>Panel Administrativo</span>
                </div>

                     <nav className="menu">
                   <button
                       className="menus-btn"
                       onClick={() => navigate("/panel-usuario")}
                    >
                    💬 <span>Chat en vivo</span>
                  </button>

                  <button 
                       className="menus-btn"
                       onClick={() => navigate("/panel-admin/dasboar-admin")}
                  >
                    <span>Contenido principal</span>
                  </button>

                  <button
                      className="menus-btn"
                      onClick={() => navigate("/panel-admin/Panel-Informes")}
                      >
                     📊 <span>Informes</span>
                   </button>

                    <button
                        className="menus-btn"
                        onClick={() => navigate("/panel-admin/panel-solicitudes")}
                       >
                        📋 <span>Solicitudes PQR</span>
                     </button>

                     <button
                          className="menus-btn"
                          onClick={() => navigate("/panel-admin/Panel-Respuestas")}
                        >
                      💬 <span>Respuestas</span>
                      </button>

                      <button
                          className="menus-btn"
                          onClick={() => navigate("/panel-admin/Panel-Bitacoras")}
                         >
                         📒 <span>Bitácoras</span>
                      </button>

                       <button
                           className="menus-btn"
                           onClick={() => navigate("/panel-admin/perfil/id")}
                          >
                          👤 <span>Perfil</span>
                       </button>
                </nav>
      </aside>

      {/* Contenido principal */}
      <section className="principal">

        <header className="headers_admin">

          <div className="header_title">
            <h2>Panel Administrativo</h2>
            <span>Empresa Municipal de Candelaria - EMCA</span>
          </div>

          <div className="header_actions">
            <button
              className="header_btn"
              onClick={() => navigate("/panel-admin/ayuda")}
            >
              Ayuda
            </button>

            <button
              className="header_btn logout"
              onClick={() => navigate("/")}
            >
              Cerrar sesión
            </button>
          </div>

        </header>
            <main className="contenido">
               <Outlet />
            </main>
      </section>
    </div>
  );
}