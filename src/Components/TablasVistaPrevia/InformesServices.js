const API = "http://127.0.0.1:4000/v1/informes";

export async function crearInforme(datos) {
    console.log("📤 Enviando informe:", datos);

    const res = await fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": "EmcaSecret2026"
        },
        body: JSON.stringify(datos)
    });

    const respuesta = await res.json();

    console.log("📥 Respuesta crear informe:", respuesta);

    if (!res.ok) {
        console.error("❌ Error al crear informe:", respuesta);
        console.error("📦 Datos enviados:", datos);

        throw new Error(
            respuesta.message ||
            respuesta.error ||
            "Error al crear el informe"
        );
    }

    return respuesta;
}

export async function obtenerInformes() {
    const res = await fetch(API, {
        method: "GET",
        headers: {
            "x-api-key": "EmcaSecret2026"
        }
    });

    const respuesta = await res.json();

    console.log("📋 Informes recibidos:", respuesta);

    if (!res.ok) {
        throw new Error(
            respuesta.message ||
            respuesta.error ||
            "Error al obtener los informes"
        );
    }

    return respuesta;
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

    const respuesta = await res.json();

    if (!res.ok) {
        throw new Error(
            respuesta.message ||
            respuesta.error ||
            "Error al actualizar el informe"
        );
    }

    return respuesta;
}

export async function eliminarInforme(id) {
    const res = await fetch(`${API}/${id}`, {
        method: "DELETE",
        headers: {
            "x-api-key": "EmcaSecret2026"
        }
    });

    const respuesta = await res.json();

    if (!res.ok) {
        throw new Error(
            respuesta.message ||
            respuesta.error ||
            "Error al eliminar el informe"
        );
    }

    return respuesta;
}

export async function generarPDF() {
    const respuesta = await fetch(`${API}/pdf`, {
        method: "GET",
        headers: {
            "x-api-key": "EmcaSecret2026"
        }
    });

    if (!respuesta.ok) {
        throw new Error("Error al generar el PDF");
    }

    return await respuesta.blob();
}

export async function generarExcel() {
    const respuesta = await fetch(`${API}/excel`, {
        method: "GET",
        headers: {
            "x-api-key": "EmcaSecret2026"
        }
    });

    if (!respuesta.ok) {
        throw new Error("Error al generar el Excel");
    }

    return await respuesta.blob();
}