import moment from "moment";

export  function formatFecha(fecha) {
    return moment(fecha).format("DD/MM/YYYY");
}
export function formatFechaHora(fecha) {
    return moment(fecha).format("DD/MM/YYYY HH:mm");
}

export function formatHora (fecha) {
    return moment(fecha).format("hh:mm A");
}