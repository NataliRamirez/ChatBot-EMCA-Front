

const API = "http://127.0.0.1:4000/v1/informes";

export async function crearInforme(datos) {
    const res = await fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": "EmcaSecret2026"
        },
        body: JSON.stringify(datos)
    });

    return await res.json();
}

export async function obtenerInformes() {
    const res = await fetch(API, {
        headers: {
            "x-api-key": "EmcaSecret2026"
        }
    });

    return await res.json();
}

export async function actualizarInforme(id, datos) {
    const res = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": "EmcaSecret2026"
        },
        body: JSON.stringify(datos)
    });

    return await res.json();
}

export async function eliminarInforme(id) {
    const res = await fetch(`${API}/${id}`, {
        method: "DELETE",
        headers: {
            "x-api-key": "EmcaSecret2026"
        }
    });

    return await res.json();
}

export async function generarPDF() {
    const respuesta = await fetch(`http://127.0.0.1:4000/v1/informes/pdf`, {
        headers: {
            "x-api-key": "EmcaSecret2026"
        }
    });

    return await respuesta.blob();
}

export async function generarExcel() {
    const respuesta = await fetch(`http://127.0.0.1:4000/v1/informes/excel`, {
        headers: {
            "x-api-key": "EmcaSecret2026"
        }
    });

    return await respuesta.blob();
}