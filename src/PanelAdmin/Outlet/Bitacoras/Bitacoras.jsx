import './Bitacoras.css';
import { useNavigate } from 'react-router-dom';

export default function Bitacoras() {

    const navigate = useNavigate();

    return (
        <div className="bitacoras">

            <h1 className="title_bitacora">
                Bitácoras del mes
            </h1>

            <p className="content_paraffo">
                Evidencias del mes, donde se realizaron las siguientes tareas.
                Para mayor información invitamos a revisar el reporte completo.
            </p>

            <div className="botonesBitacoras">

                <button
                    className="container_bitacoras"
                    onClick={() => navigate('/panel-admin/panel-bitacoras')}
                >
                    Ver más
                </button>
            </div>

        </div>
    );
}