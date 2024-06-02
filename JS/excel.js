function exportar() {
    // Crear una nueva hoja de cálculo
    var wb = XLSX.utils.book_new();

    // Obtener los datos de la tabla
    var data = [];
    var headers = ["Código", "Nombre", "Descripción", "Marca", "Modelo", "Precio", "Categoría", "Disponibilidad", "Stock", "Ubicación", "Estado", "Tipo"];
    data.push(headers);

    // Obtener los datos de la tabla HTML
    var rows = document.querySelectorAll("#tabladedatos tr");

    // Obtener los datos de cada fila de la tabla
    rows.forEach(function(row) {
        var rowData = [];
        row.querySelectorAll("td").forEach(function(cell) {
            rowData.push(cell.innerText);
        });
        data.push(rowData);
    });

    // Crear una nueva hoja con los datos de la tabla
    var ws = XLSX.utils.aoa_to_sheet(data);

    // Agregar la hoja a la hoja de cálculo
    XLSX.utils.book_append_sheet(wb, ws, "Datos de la tabla");

    // Guardar el archivo Excel
    XLSX.writeFile(wb, "tabla_de_repuetos.xlsx");
}




