import './PanelComprobante.css';

export default function EliminarBitacora(datos, cerrar){
    
        try{
             const eliminarBitacora = async() =>{
            const res = await fetch( `http://127.0.0.1:4000/v1/bitacora/${datos.id}`,
                {
                    method: 'DELETE',
                    headers: {
                        "x-api-key": "EmcaSecret2026"
                    }
                }
            );

               const data = await res.json();

            if (res.ok) {
                alert(data.mensaje);
                cerrar();
            } else {
                alert(data.mensaje || "No se pudo eliminar la bitácora");
            }
        }
        }catch (error){
            console.log(error);
            alert("Error de conexión con la base de datos");
        }
    }


    return(
        <div className="">
            <div className="">
                <h2>Desea eliminar esta bitacora</h2>
                <p>Una vez eliminada la bitacora no podra verla ya que queda eliminada permanentemente</p>

                <div className="btn_ContainerEliminar">
                    <button className="btn_eliminarBitacorasSi" onClick={eliminarBitacora}>
                        Si
                    </button>

                    <button className="btn_eliminarBitacorasNo" onClick={cerrar}>
                        No
                    </button>
                </div>
            </div>
        </div>
    )
