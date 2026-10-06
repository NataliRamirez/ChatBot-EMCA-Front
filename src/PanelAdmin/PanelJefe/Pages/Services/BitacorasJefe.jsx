const API = "http://127.0.0.1:4000/v1/bitacora";

export async function crearBitacora(datos) {
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

export async function obtenerBitacora() {
    const res = await fetch(API, {
        headers: {
            "x-api-key": "EmcaSecret2026"
        }
    });

    return await res.json();
}

export async function actualizarBitacora(id, datos) {
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

export async function eliminarBitacora(id) {
    const res = await fetch(`${API}/${id}`, {
        method: "DELETE",
        headers: {
            "x-api-key": "EmcaSecret2026"
        }
    });

    return await res.json();
}

export async function generarPDF() {
    const respuesta = await fetch(`http://127.0.0.1:4000/v1/bitacora/pdf`, {
        headers: {
            "x-api-key": "EmcaSecret2026"
        }
    });

    return await respuesta.blob();
}

export async function generarExcel() {
    const respuesta = await fetch(`http://127.0.0.1:4000/v1/bitacora/excel`, {
        headers: {
            "x-api-key": "EmcaSecret2026"
        }
    });

    return await respuesta.blob();
}