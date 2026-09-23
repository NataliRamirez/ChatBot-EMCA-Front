export default function ResultadoInforme({ resultado, onDescargarPDF, onDescargarExcel }) {
    if (!resultado) return null;

    return (
        <div className="resultadoInforme">
            <h2>Resultado del Informe</h2>
            <div className="infoResultado">
                <div className="cardResultado">
                    <span>Tipo</span>
                    <h3>{resultado.tipo || "General"}</h3>
                </div>

                <div className="cardResultado">
                    <span>Fecha Inicial</span>
                    <h3>{resultado.fechaInicio || "N/A"}</h3>
                </div>

                <div className="cardResultado">
                    <span>Fecha Final</span>
                    <h3>{resultado.fechaFin || "N/A"}</h3>
                </div>

                <div className="cardResultado">
                    <span>Estado</span>
                    <h3>{resultado.estado || "Todos"}</h3>
                </div>

                <div className="cardResultado">
                    <span>Formato</span>
                    <h3>{resultado.formato || "PDF"}</h3>
                </div>

                <div className="cardResultado">
                    <span>Registros</span>
                    <h3>{resultado.registros ?? 0}</h3>
                </div>
            </div>

            <div className="accionesResultado">
                <button className="btnPDF" onClick={onDescargarPDF}>
                    Descargar PDF
                </button>
                <button className="btnExcel" onClick={onDescargarExcel}>
                    Descargar Excel
                </button>
            </div>
        </div>
    );
}