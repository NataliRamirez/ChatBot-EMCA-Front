import { Outlet } from "react-router-dom";
import PanelUsuario from "../../../PanelUsuario/Panelusuario";

import "./LayouAdmin.css";

export default function LayoutAdmin() {

    return (

        <div className="layoutAdmin">
            <Outlet />
        </div>

    );

}