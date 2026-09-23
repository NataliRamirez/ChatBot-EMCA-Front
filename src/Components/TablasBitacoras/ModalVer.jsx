import "./Modal.css";

export default function ModalVer({ datos, cerrar }) {

  if (!datos) return null;

  return (
    <div className="overlay">
      <div className="modal">

        <h2>Detalle de la Bitácora</h2>

        <div className="campos">
          <strong>Título:</strong>
          <p>{datos.titulo}</p>
        </div>

        <div className="campos">
          <strong>Nombre:</strong>
          <p>{datos.nombre}</p>
        </div>

        <div className="campos">
          <strong>FechaInicio:</strong>
          <p>{datos.fechaInicio}</p>
        </div>

        <div className="campos">
          <strong>Fecha Fin:</strong>
          <p>{datos.fechaFin}</p>
        </div>

        <div className="campos">
          <strong>Descripción:</strong>
          <p>{datos.descripcion}</p>
        </div>

        <div className="campos">
          <strong>Estado:</strong>
          <p>{datos.estado}</p>
        </div>

        <div className="botones">
          <button
            className="btnCancelar"
            onClick={cerrar}
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
}