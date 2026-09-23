import { Outlet } from "react-router-dom";
import PanelJefe from "../../PanelJefe/PanelJefe";

import "./LayouAdmin.css";

export default function LayouJefe() {

    return (

        <div className="layoutJefe">
            <Outlet />
        </div>

    );

}