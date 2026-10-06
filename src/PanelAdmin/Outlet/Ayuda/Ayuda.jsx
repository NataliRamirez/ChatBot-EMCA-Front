import "./Ayuda.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Ayuda() {
  const navigate = useNavigate();

  const [ayuda, setAyuda] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const abrirAyuda = async () => {
    try {
      setCargando(true);
      setError(null);

      const res = await fetch("http://127.0.0.1:4000/v1/ayuda");

      if (!res.ok) {
        throw new Error("Error al cargar ayuda");
      }

      const data = await res.json();
      setAyuda(data);
    } catch (err) {
      console.error("Error cargando ayuda:", err);
      setError(
        "No se pudo cargar la información de ayuda. Verifica que el servidor esté funcionando."
      );
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    abrirAyuda();
  }, []);

  return (
    <div className="overlay">
      <div className="modalAyuda">

        {/* ENCABEZADO */}
        <div className="encabezadoAyuda">
          <div className="iconoAyuda">
            ?
          </div>

          <div>
            <h2>
              {ayuda?.titulo || "Centro de Ayuda"}
            </h2>

            <p>
              Información y orientación para el uso del sistema administrativo.
            </p>
          </div>
        </div>

        {/* CONTENIDO */}
        <div className="contenidoAyuda">

          {cargando && (
            <div className="estadoAyuda">
              <div className="spinnerAyuda"></div>
              <p>Cargando información...</p>
            </div>
          )}

          {error && (
            <div className="mensajeErrorAyuda">
              <span className="iconoError">!</span>

              <div>
                <strong>No fue posible cargar la ayuda</strong>
                <p>{error}</p>
              </div>
            </div>
          )}

          {!cargando &&
            !error &&
            ayuda?.opciones?.length > 0 && (
              <div className="listaAyuda">
                {ayuda.opciones.map((item, index) => (
                  <div className="grupoAyuda" key={index}>

                    <div className="numeroAyuda">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="contenidoGrupoAyuda">
                      <strong>{item.titulo}</strong>

                      <p>{item.descripcion}</p>
                    </div>

                  </div>
                ))}
              </div>
            )}

          {!cargando &&
            !error &&
            (!ayuda?.opciones || ayuda.opciones.length === 0) && (
              <div className="estadoAyuda">
                <p>No hay información de ayuda disponible.</p>
              </div>
            )}

        </div>

        {/* PIE DEL MODAL */}
        <div className="botonesModal">

          <button
            type="button"
            className="btn_CerrarAyuda"
            onClick={() => navigate("/panel-admin")}
          >
            Cerrar
          </button>

        </div>

      </div>
    </div>
  );
}

