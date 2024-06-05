function exportar() {
    var wb = XLSX.utils.book_new();


    var data = [];
    var headers = ["Código", "Nombre", "Descripción", "Marca", "Modelo", "Precio", "Categoría", "Disponibilidad", "Stock", "Ubicación", "Estado", "Tipo"];
    data.push(headers);

    var rows = document.querySelectorAll("#tabladedatos tr");


    rows.forEach(function(row) {
        var rowData = [];
        row.querySelectorAll("td").forEach(function(cell) {
            rowData.push(cell.innerText);
        });
        data.push(rowData);
    });


    var ws = XLSX.utils.aoa_to_sheet(data);


    XLSX.utils.book_append_sheet(wb, ws, "Datos de la tabla");


    XLSX.writeFile(wb, "tabla_de_repuetos.xlsx");
}




