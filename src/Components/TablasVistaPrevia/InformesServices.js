import axios from "axios";

const API="http://localhost:4000/v1/informes";

export const generarInformePDF=async(datos)=>{
    try{
        const respuesta=await axios.post(
            `${API}/informes/pdf`,
            datos,
            {
                responseType:"blob"
            }
        );
        return respuesta.data;
    }
    catch(error){
        console.log(error);
    }
}

export const generarInformeExcel=async(datos)=>{
    try{
        const respuesta=await axios.post(
            `${API}/informes/excel`,
            datos,
            {
                responseType:"blob"
            }
        );
        return respuesta.data;
    }
    catch(error){
        console.log(error);
    }
}