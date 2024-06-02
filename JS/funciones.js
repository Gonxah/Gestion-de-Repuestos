var repuestos = [];
repuestos.push(new Repuesto("33-2409", "FILTRO DE AIRE OEM NISSAN", "El material de algodón de alto flujo está diseñado para permitir hasta un 50 % más de flujo de aire que los filtros de papel tradicionales y un mayor flujo de aire significa más caballos de fuerza y torque", "K&N", "OEM NISSAN", "112.000", "Motor", "Disponible", "100", "Bodega 1", "Nuevo", "Original"));
repuestos.push(new Repuesto("33-2410", "Escape Alto Flujo Hks", "Dimensiones:Entrada: 2 pulgadas, Salida: 3,5 pulgadasLargo, total: 47,5, Largo de cuerpo: 30cm, Ancho cuerpo: 4,5 pulgadas de diámetro y 36cm de perímetro", "HKS", "Hi Power", "94.590", "Escape", "No Disponible", "5", "Bodega 3", "Usado", "Original"));
function listarrepuestos() {
    var filas = "";
    for (let i = 0; i <repuestos.length; i++) {
        var e = repuestos[i];
        filas += "<tr>";
        filas += "<td>" + e.codigo.toUpperCase() + "</td>";
        filas += "<td>" + e.nombre.toUpperCase() + "</td>";
        filas += "<td>" + e.descripcion + "</td>";
        filas += "<td>" + e.marca.toUpperCase() + "</td>";
        filas += "<td>" + e.modelo.toUpperCase() + "</td>";
        filas += "<td>" + e.precio + "</td>";
        filas += "<td>" + e.categoria.toUpperCase() + "</td>";
        filas += "<td>" + e.disponibilidad.toUpperCase() + "</td>";
        filas += "<td>" + e.stock.toUpperCase() + "</td>";
        filas += "<td>" + e.ubicacion.toUpperCase() + "</td>";
        filas += "<td>" + e.estado.toUpperCase() + "</td>";
        filas += "<td>" + e.tipo.toUpperCase() + "</td>";
        filas += "</tr>";
    }
    document.getElementById("tabladedatos").innerHTML = filas;
}

document.addEventListener("DOMContentLoaded", function () { listarrepuestos(); });

function limpiarCampos(x) {
    if (x === 1) {
        document.getElementById("txtcodigo").value = "";
    }
    document.getElementById("txtnom").value = "";
    document.getElementById("txtdesc").value = "";
    document.getElementById("txtmarca").value = "";
    document.getElementById("txtmodelo").value = "";
    document.getElementById("prec").value = "";
    document.getElementById("txtcat").value = "";
    document.getElementById("disponible").checked = true;
    document.getElementById("noDisponible").checked =false;
    document.getElementById("txtstock").value = "";
    document.getElementById("txtubi").value = "";
    document.getElementById("txtEstado").value = "";
    document.getElementById("original").checked = true;
    document.getElementById("generico").checked = false;
}

function consultar() {
    var cod = document.getElementById("txtcodigo").value;
    // Expresión para verificar si el código está en el rango de "33-2409" a "33-2450"
    const codigoRegex = /^33-24(0[9-9]|1[0-9]|2[0-9]|30|4[0-9]|50)$/;

    if (!codigoRegex.test(cod)) {
        alert("El código debe estar en el rango de 33-2409 a 33-2450.");
        document.getElementById("txtcodigo").focus();
        return;
    }

    let sw = 0;
    for (let i = 0; i < repuestos.length; i++) {
        var e = repuestos[i];
        if (cod === e.codigo) {
            sw = 1;
            document.getElementById("txtnom").value = e.nombre;
            document.getElementById("txtdesc").value = e.descripcion;
            document.getElementById("txtmarca").value = e.marca;
            document.getElementById("txtmodelo").value = e.modelo;
            document.getElementById("prec").value = e.precio;
            document.getElementById("txtcat").value = e.categoria;
            if (e.disponibilidad === "Disponible") {
                document.getElementById("disponible").checked = true;
            } else {
                document.getElementById("noDisponible").checked = true;
            }
            document.getElementById("txtstock").value = e.stock;
            document.getElementById("txtubi").value = e.ubicacion;
            document.getElementById("txtEstado").value = e.estado;
            if (e.tipo === "Original") {
                document.getElementById("original").checked = true;
            } else {
                document.getElementById("generico").checked = true;
            }
            break;
        }
    }

    var msg = "";
    if(sw === 0){
        msg = msg + "<div class='alert alert-warning alert-dismissible fade show' role='alert'>"
        msg = msg + "<strong>Repuesto no encontrado!</strong>"
        msg = msg + "<button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>"
        msg = msg + "</div>"
    }else if(sw === 1){
        msg = msg + "<div class='alert alert-success alert-dismissible fade show' role='alert'>"
        msg = msg + "<strong>Repuesto encontrado!</strong>"
        msg = msg + "<button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>"
        msg = msg + "</div>"
    }
    document.getElementById("mensajes").innerHTML = msg;
}

function registrar() {
    var cod = document.getElementById("txtcodigo").value.toUpperCase();
    var nom = document.getElementById("txtnom").value.toUpperCase();
    var des = document.getElementById("txtdesc").value.toUpperCase();
    var mar = document.getElementById("txtmarca").value.toUpperCase();
    var mod = document.getElementById("txtmodelo").value.toUpperCase();
    var pre = document.getElementById("prec").value;
    var cat = document.getElementById("txtcat").value.toUpperCase();

    var mdisp = "";
    if (document.getElementById("disponible").checked === true) {
        mdisp = "Disponible";
    } else {
        mdisp = "No Disponible";
    }

    var stock = document.getElementById("txtstock").value;
    var ubi = document.getElementById("txtubi").value.toUpperCase();
    var est = document.getElementById("txtEstado").value.toUpperCase();
    var mtip = "";
    if (document.getElementById("original").checked === true) {
        mtip = "Original";
    } else {
        mtip = "Generico";
    }

    var errores = "";
    if (cod.trim().length < 6 || cod.trim().length > 12) {
        errores += "El código debe contener entre 6 y 12 caracteres!\n";
    } else {
        let x = 0;
        for (let i = 0; i < repuestos.length; i++) {
            var e = repuestos[i];
            if (cod === e.codigo) {
                x = 1;
                break;
            }
        }
        if (x === 1) {
            errores += "El código ya se encuentra registrado!\n";
        }
    }

    if (nom.trim().length < 5 || nom.trim().length > 30) {
        errores += "El nombre debe contener entre 5 y 30 caracteres!\n";
    }

    if (des.trim().length < 5 || des.trim().length > 30) {
        errores += "La descripción debe contener entre 5 y 30 caracteres!\n";
    }

    if (mar.trim().length < 2 || mar.trim().length > 30) {
        errores += "La marca debe contener entre 5 y 30 caracteres!\n";
    }

    if (mod.trim().length < 2 || mod.trim().length > 30) {
        errores += "El modelo debe contener entre 5 y 30 caracteres!\n";
    }

    if (isNaN(pre) || pre <= 0) {
        errores += "El precio es incorrecto!\n";
    }

    if (cat.trim().length === 0) {
        errores += "Debe ingresar la categoría!\n";
    }

    if (isNaN(stock) || stock <= 0) {
        errores += "El stock es incorrecto!\n";
    }

    if (ubi.trim().length === 0) {
        errores += "Debe ingresar la ubicación!\n";
    }

    if (est.trim().length === 0) {
        errores += "Debe ingresar el estado!\n";
    }

    if (errores !== "") {
        alert(errores);
    } else {
        repuestos.push(new Repuesto(cod, nom, des, mar, mod, pre, cat, mdisp, stock, ubi, est, mtip));
        var msg = "<div class='alert alert-success alert-dismissible fade show' role='alert'>";
        msg += "<strong>Repuesto registrado correctamente!</strong>";
        msg += "<button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>";
        msg += "</div>";
        document.getElementById("mensajes").innerHTML = msg;
        listarrepuestos();
        limpiarCampos();
    }
}

function modificar() {
    var cod = document.getElementById("txtcodigo").value.toUpperCase();
    var nom = document.getElementById("txtnom").value.toUpperCase();
    var des = document.getElementById("txtdesc").value.toUpperCase();
    var mar = document.getElementById("txtmarca").value.toUpperCase();
    var mod = document.getElementById("txtmodelo").value.toUpperCase();
    var pre = document.getElementById("prec").value;
    var cat = document.getElementById("txtcat").value.toUpperCase();

    var mdisp = "";
    if (document.getElementById("disponible").checked === true) {
        mdisp = "Disponible";
    } else {
        mdisp = "No Disponible";
    }

    var stock = document.getElementById("txtstock").value;
    var ubi = document.getElementById("txtubi").value.toUpperCase();
    var est = document.getElementById("txtEstado").value.toUpperCase();
    var mtip = "";
    if (document.getElementById("original").checked === true) {
        mtip = "Original";
    } else {
        mtip = "Generico";
    }

    var errores = "";
    if (cod.trim().length < 6 || cod.trim().length > 12) {
        errores += "El código debe contener entre 6 y 12 caracteres!\n";
    } else {
        let x = 0;
        for (let i = 0; i < repuestos.length; i++) {
            var e = repuestos[i];
            if (cod === e.codigo) {
                x = 1;
                break;
            }
        }
        if (x === 0) {
            errores += "El código no se encuentra registrado!\n";
        }
    }

    if (nom.trim().length < 5 || nom.trim().length > 30) {
        errores += "El nombre debe contener entre 5 y 30 caracteres!\n";
    }

    if (des.trim().length < 5 || des.trim().length > 30) {
        errores += "La descripción debe contener entre 5 y 30 caracteres!\n";
    }

    if (mar.trim().length < 2 || mar.trim().length > 30) {
        errores += "La marca debe contener entre 5 y 30 caracteres!\n";
    }

    if (mod.trim().length < 2 || mod.trim().length > 30) {
        errores += "El modelo debe contener entre 5 y 30 caracteres!\n";
    }

    if (isNaN(pre) || pre <= 0) {
        errores += "El precio es incorrecto!\n";
    }

    if (cat.trim().length === 0) {
        errores += "Debe ingresar la categoría!\n";
    }

    if (isNaN(stock) || stock <= 0) {
        errores += "El stock es incorrecto!\n";
    }

    if (ubi.trim().length === 0) {
        errores += "Debe ingresar la ubicación!\n";
    }

    if (est.trim().length === 0) {
        errores += "Debe ingresar el estado!\n";
    }

    if (errores !== "") {
        alert(errores);
    } else {
        var sw = 0;
        for (let i = 0; i < repuestos.length; i++) {
            var e = repuestos[i];
            if (cod === e.codigo) {
                var x = confirm("Desea modificar el registro?");
                if (x === true) {
                    sw = 1;
                    repuestos[i].nombre = nom;
                    repuestos[i].descripcion = des;
                    repuestos[i].marca = mar;
                    repuestos[i].modelo = mod;
                    repuestos[i].precio = pre;
                    repuestos[i].categoria = cat;
                    repuestos[i].disponibilidad = mdisp;
                    repuestos[i].stock = stock;
                    repuestos[i].ubicacion = ubi;
                    repuestos[i].estado = est;
                    repuestos[i].tipo = mtip;
                    break;
                } else {
                    sw = 2;
                }
            }
        }

        var msg = "";
        if (sw === 0) {
            msg += "<div class='alert alert-warning alert-dismissible fade show' role='alert'>";
            msg += "<strong>Repuesto no encontrado!</strong>";
            msg += "<button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>";
            msg += "</div>";
        } else if (sw === 1) {
            msg += "<div class='alert alert-success alert-dismissible fade show' role='alert'>";
            msg += "<strong>Repuesto modificado correctamente!</strong>";
            msg += "<button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>";
            msg += "</div>";
        } else if (sw === 2) {
            msg += "<div class='alert alert-info alert-dismissible fade show' role='alert'>";
            msg += "<strong>Modificación cancelada!</strong>";
            msg += "<button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>";
            msg += "</div>";
        }
        document.getElementById("mensajes").innerHTML = msg;
        listarrepuestos();
        limpiarCampos();
    }
}


function eliminar() {
    var cod = document.getElementById("txtcodigo").value.toUpperCase();
    var errores = "";

    if (cod.trim().length < 6 || cod.trim().length > 12) {
        errores += "El código debe contener entre 6 y 12 caracteres! \n";
    } else {
        let x = 0;
        for (let i = 0; i < repuestos.length; i++) {
            if (cod === repuestos[i].codigo) {
                x = 1;
                break;
            }
        }
        if (x === 0) {
            errores += "El código no se encuentra registrado!\n";
        }
    }

    if (errores !== "") {
        alert(errores);
    } else {
        let sw = 0;
        for (let i = 0; i < repuestos.length; i++) {
            if (cod === repuestos[i].codigo) {
                var x = confirm("Desea eliminar el registro?");
                if (x === true) {
                    sw = 1;
                    repuestos.splice(i, 1);
                    break;
                } else {
                    sw = 2;
                }
            }
        }

        let msg = "";
        if (sw === 0) {
            msg += "<div class='alert alert-warning alert-dismissible fade show' role='alert'>";
            msg += "<strong>Repuesto no encontrado!</strong>";
            msg += "<button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>";
            msg += "</div>";
        } else if (sw === 1) {
            msg += "<div class='alert alert-success alert-dismissible fade show' role='alert'>";
            msg += "<strong>Repuesto eliminado correctamente!</strong>";
            msg += "<button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>";
            msg += "</div>";
        } else if (sw === 2) {
            msg += "<div class='alert alert-warning alert-dismissible fade show' role='alert'>";
            msg += "<strong>El repuesto no fue eliminado!</strong>";
            msg += "<button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>";
            msg += "</div>";
        }
        document.getElementById("mensajes").innerHTML = msg;
        listarrepuestos();
        limpiarCampos();
    }
}





