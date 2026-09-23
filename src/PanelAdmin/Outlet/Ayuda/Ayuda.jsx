import "./Ayuda.css";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function Ayuda() {
  
      const navigate = useNavigate();
    const [ayuda, setAyuda] = useState(null);

    const abrirAyuda = async () => {
        try {
            const res = await fetch(`http://127.0.0.1:4000/v1/ayuda`);

            if (!res.ok) {
                throw new Error("Error al obtener la ayuda");
            }

            const data = await res.json();
            console.log(data);
            setAyuda(data);

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        abrirAyuda();
    }, []);

    return (
        <div className="overlay">
              <div className="modal_help">

                <h2>{ayuda?.titulo}</h2>

                {ayuda?.opciones?.map((item, index) => (
                    <div key={index}>
                        <h4>{item.titulo}</h4>
                        <p>{item.descripcion}</p>
                    </div>
                ))}

                <button className="btn_Cerrar" onClick={() => navigate("/panel-admin")}>
                    Cerrar
                </button>

              </div>
           </div>
    );
}