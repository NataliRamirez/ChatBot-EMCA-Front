const URL = "http://127.0.0.1:4000/v1/solicitudes";

export async function obtenerSolicitudes() {

    const res = await fetch(URL, {
        headers: {
            "x-api-key": "EmcaSecret2026"
        }
    });

    return await res.json();
}

export async function crearSolicitud(datos) {

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

export async function actualizarSolicitud(id, datos) {

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

export async function eliminarSolicitud(id) {

    const res = await fetch(`${URL}/${id}`, {

        method: "DELETE",

        headers: {
            "x-api-key": "EmcaSecret2026"
        }

    });

    return await res.json();
}