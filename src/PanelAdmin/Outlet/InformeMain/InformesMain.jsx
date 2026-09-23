import InformeMain from '../../../PanelAdmin/Outlet/InformeMain/InformesMain';
import Panelusuario from '../../PanelUsuario/Panelusuario';

export default function InformesMain() {
  const handleGenerarPDF = () => {

    alert("Generando reporte mensual de interacciones del bot...");
  };

  return (
    <div className='content_informe'> 
      <div className='content_informe'>
             <InformeMain
               title="Informe de Interacciones del Bot"
               parrafo="Resumen cuantitativo de las métricas de atención automatizada y humana de EMCA."
               buttonDownloader="Descargar el PDF"
               onDownload={handleGenerarPDF}
             />

            <InformeMain
             title="Informe del Mes"
             parrafo="Resumen cuantitativo de las métricas de atención automatizada y humana de EMCA."
             buttonDownloader="Descargar el PDF"
             onDownload={handleGenerarPDF}
            />
      </div>
    </div>
  );
}