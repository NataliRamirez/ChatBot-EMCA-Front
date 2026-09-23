export default function Card({titulo, valor}){

    return(
        <div className="card">
            <h3>{titulo}</h3>
            <span>{valor}</span>
        </div>
    );
}