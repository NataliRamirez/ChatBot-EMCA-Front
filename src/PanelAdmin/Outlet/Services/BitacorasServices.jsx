const URL = "http://127.0.0.1:4000/v1/bitacora";

export async function obtenerBitacoras() {

    const res = await fetch(URL, {
        headers: {
            "x-api-key": "EmcaSecret2026"
        }
    });

    return await res.json();
}

export async function crearBitacora(datos) {

    const res = await fetch(URL, {

        method: "POST",

        headers: {
            "Content-Type": "application/json",
            "x-api-key": "EmcaSecret2026"
        },

        body: JSON.stringify(datos)

    });

    return await res.json();
}

export async function actualizarBitacora(id, datos) {

    const res = await fetch(`${URL}/${id}`, {

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

    const res = await fetch(`${URL}/${id}`, {

        method: "DELETE",

        headers: {
            "x-api-key": "EmcaSecret2026"
        }

    });

    return await res.json();
}