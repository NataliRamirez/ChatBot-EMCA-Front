
import  InformeMain  from '../Components/InformeComponent/InformeMain';


export default function ContentAdmin(){
   
    const handleDownloadReportes = () => {
    alert("Descargando reportes del mes...");
  };

  const handleDownloadBitacoras = () => {
    alert("Descargando bitácoras...");
  };

    return(
      <div className='container_Cards'>
         <informeMain
           title = 'Reporte del mes'
           parrafo = 'El reporte de las solicitudes del usuario fueron de la siguiente'
           buttonDownloader = 'ver más'
           onDownload = 'handleDownloadBitacoras'
         />

         <informeMain
           title = 'Respuestas PQRS'
           parrafo = 'Respuestas dadas de los ultimos PQRS realizados en este mes'
           buttonDownloader = 'ver más'
           onDownload = 'handleDownloadBitacoras'
         />

         <informeMain
            title = 'Bitacoras'
            parrafos = 'Las bitacoras de la informacion  entre el chatbot'
            buttonDownloader = 'ver más'
            onDownload = 'handlDownloadBitacoras'
         />
      </div>        
    );
}