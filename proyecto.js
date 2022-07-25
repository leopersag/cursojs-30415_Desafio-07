/* ++++++++++++++++++++++++++++++++++++ Variables definition ++++++++++++++++++++++++++++++++++++ */

const arrPlacas = [];
const arrPantallas = [];

let fechaIn = [];
let sku = [];
let linea = [];
let turno = [];
let imei = [];
let fallaLinea = [];
let fechaOut = [];

let darSalida = [];
let estadoFinal = [];
let estadoFinalSelector = [];

class elemento{
    constructor (fechaIn, sku, linea, turno, imei, fallaLinea, fechaOut, estado,){
        this.fechaIn = fechaIn;
        this.sku = sku;
        this.linea = linea;
        this.turno = turno;
        this.imei = imei;
        this.fallaLinea = fallaLinea;
        this.fechaOut = fechaOut;
        this.estado = estado;
        this.disponible = true;
    }

    salida(){
        this.fechaOut = new Date();
        this.estado = estadoFinal.value;
        this.disponible = false;
    }
}

class stock{
    constructor (modelo, cantidad){
        this.modelo = modelo;
        this.cantidad = cantidad;
    }
}

/* ++++++++++++++++++++++++++++++++++++ Functions definition ++++++++++++++++++++++++++++++++++++ */

//To describe the user's rights in the navbar
function describeUser (usuario){
    let usuarioActivo = document.getElementById("usuarioActivo");
    usuario === "usuario"? usuarioActivo.innerHTML="Usuario: OPERADOR":(usuario === "admin"? usuarioActivo.innerHTML="Usuario: ADMINISTRATIVO" : usuarioActivo.innerHTML="");

    let usuarioDescripcion = document.getElementById("usuarioDescripcion");
    usuario === "usuario" && (usuarioDescripcion.innerHTML = "Solo podrá ver los reportes");
    usuario === "admin" && (usuarioDescripcion.innerHTML = "Podrá ingresar y egresar elementos");
}

//To disable user 'usuario' not allawed functions
function disable (btn,modal){
    let btnDisable = document.getElementById(btn);
    btnDisable.className = "btn-light";
    let modalDisable = document.getElementById(modal);
    modalDisable.id = "modalDisabled";
}

//To clean modal inputs
function cleanInputs (...input){
    for(let e of input){
        e.value = '';
    }
}

//To clean table
function eraseTable (element){
    let eraseElement = document.getElementById(element);                        
    while(eraseElement.firstChild){
        eraseElement.removeChild(eraseElement.firstChild);
    }
}

/* ++++++++++++++++++++++++++++++++++++ Main program ++++++++++++++++++++++++++++++++++++ */

let usuario;
let usuarioStorage = localStorage.getItem("usuario");

//User already logged in
if(usuarioStorage){
  usuario = usuarioStorage.toLowerCase();
  Swal.fire({
    title: 'Bienvenido '+ usuario,
    text: 'Continuar',
    icon: 'success',
    confirmButtonText: 'OK'
  });

  describeUser(usuario);
    
  //Para deshabilitar las opciones no deseadas para el usuario "usuario"
    if(localStorage.getItem("usuario") === "usuario"){
        disable("btnInPlacas","modalInPlacas");
        disable("btnInPantallas","modalInPantallas");
        disable("btnOutElementos","modalOutElementos");
    }

  //Opciones habilitadas para el usuario "admin"
    if(localStorage.getItem("usuario")==="admin"){
                
        /* ---------------------------- Funcionamiento del modal de placas ----------------------------*/

        //Para que los campos queden vacios al ingresar
        btnInPlacas.addEventListener('click', ()=>{
            cleanInputs(modeloPlaca,lineaPlaca,turnoPlaca,imeiPlaca,fallaPlaca);
        })

        //Funcionalidad del boton guardar en el modal de placas
        btnGuardarPlaca.addEventListener('click', ()=>{

            fechaIn = new Date();
            sku = document.getElementById('modeloPlaca');
            linea = document.getElementById('lineaPlaca');
            turno = document.getElementById('turnoPlaca');
            imei = document.getElementById('imeiPlaca');
            fallaLinea = document.getElementById('fallaPlaca');

            if(sku.value && linea.value && turno.value && imei.value && fallaLinea.value){
                //si el elemento NO existe en el stock actual guarda el valor
                if(!(arrPlacas.filter(e => e.disponible == true).some(e => e.imei === imei.value))){
                    arrPlacas.push(new elemento(fechaIn, sku.value, linea.value, turno.value, imei.value, fallaLinea.value,));
                    cleanInputs(lineaPlaca,imeiPlaca,fallaPlaca);
                    Swal.fire({
                        position:'bottom-end',
                        icon: 'success',
                        title: 'Guardado correctamente',
                        showConfirmButton: false,
                        timer:1000,
                    });
                }else{
                    Swal.fire({
                        title: 'Error!',
                        text: `El número de IMEI: "${imei.value}" se encuentra en stock \n(no puede ingresarlo nuevamente sin antes darle salida)`,
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                    cleanInputs(lineaPlaca,imeiPlaca,fallaPlaca);
                }
            }else{
                Swal.fire({
                    title: 'Error!',
                    text: 'Falta completar algún campo',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        })

        /* ---------------------------- Funcionamiento del modal de pantallas ----------------------------*/

        //Para que los campos queden vacios al ingresar
        btnInPantallas.addEventListener('click', ()=>{
            cleanInputs(modeloPantalla,lineaPantalla,turnoPantalla,imeiPantalla,fallaPantalla);
        })

        //Funcionalidad del boton guardar en el modal de pantallas
        btnGuardarPantalla.addEventListener('click', ()=>{

            fechaIn = new Date();
            sku = document.getElementById('modeloPantalla');
            linea = document.getElementById('lineaPantalla');
            turno = document.getElementById('turnoPantalla');
            imei = document.getElementById('imeiPantalla');
            fallaLinea = document.getElementById('fallaPantalla');

            if(sku.value && linea.value && turno.value && imei.value && fallaLinea.value){
                if(!(arrPantallas.filter(e => e.disponible == true).some(e => e.imei === imei.value))){
                    arrPantallas.push(new elemento(fechaIn, sku.value, linea.value, turno.value, imei.value, fallaLinea.value,));                                
                    cleanInputs(lineaPantalla,imeiPantalla,fallaPantalla);
                    Swal.fire({
                        position:'bottom-end',
                        icon: 'success',
                        title: 'Guardado correctamente',
                        showConfirmButton: false,
                        timer:1000,
                    });
                }else{
                    Swal.fire({
                        title: 'Error!',
                        text: `El número SN: "${imei.value}" se encuentra en stock \n(no puede ingresarlo nuevamente sin antes darle salida)`,
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                    cleanInputs(lineaPantalla,imeiPantalla,fallaPantalla);
                }
            }else{
                Swal.fire({
                    title: 'Error!',
                    text: 'Falta completar algún campo',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        })

        /* ---------------------------- Funcionamiento del modal de egreso ----------------------------*/

        //Para que los campos queden vacios al ingresar
        btnOutElementos.addEventListener('click', ()=>{
            cleanInputs(elementId);
            estadoFinalSelector.selectedIndex = '';
        })

        //Funcionalidad del boton guardar en el modal egreso de elementos
        btnEgreso.addEventListener('click', ()=>{
            
            darSalida = document.getElementById('elementId');
            estadoFinalSelector = document.getElementById('elementEstado');
            estadoFinal = estadoFinalSelector.options[estadoFinalSelector.selectedIndex].text;
                
            let existePlaca = arrPlacas.filter(e => e.disponible == true).some(e => e.imei === darSalida.value);
            let existePantalla = arrPantallas.filter(e => e.disponible == true).some(e => e.imei === darSalida.value);
            
            if(darSalida.value && estadoFinal){
                if(!(existePlaca || existePantalla)){
                    Swal.fire({
                        title: 'Error!',
                        text: 'IMEI/SN no encontrado, por favor ingrese otro valor',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                    cleanInputs(elementId);
                    estadoFinalSelector.selectedIndex = '';
                }else{
                    if(estadoFinal === "OK" || estadoFinal === "SCP" || estadoFinal === "RMA" ){
                        if(existePlaca){
                            for (const placa of arrPlacas.filter(e => e.disponible == true)){
                                if (placa.imei === darSalida.value){
                                    placa.salida();
                                }
                            }
                        }if(existePantalla){
                                for (const pantalla of arrPantallas.filter(e => e.disponible == true)){
                                    if (pantalla.imei === darSalida.value){
                                        pantalla.salida();
                                    }
                                }
                        }
                        cleanInputs(elementId);
                        estadoFinalSelector.selectedIndex = '';
                        Swal.fire({
                            position:'bottom-end',
                            icon: 'success',
                            title: 'Guardado correctamente',
                            showConfirmButton: false,
                            timer:1000,
                        });
                    }else{
                        Swal.fire({
                            title: 'Error!',
                            text: 'Estado de salida incorrecto',
                            icon: 'error',
                            confirmButtonText: 'OK'
                        });
                            estadoFinalSelector.selectedIndex = '';
                        }
                    }
            }else{
                Swal.fire({
                    title: 'Error!',
                    text: 'Falta completar algún campo',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        })
    }

  //Opciones habilitadas para el usuario "admin" y "usuario"
    /* -------------- Funcionamiento del modal de Reportes -------------- */
    if(localStorage.getItem("usuario")==="admin" || localStorage.getItem("usuario") === "usuario"){

        //Para que los campos queden vacios al ingresar
        btnCerrarReportes.addEventListener('click', ()=>{                        
            eraseTable("divPlacas");
            eraseTable("tabla");
            eraseTable("divPantallas");
            eraseTable("tablaPantallas");
        })

        //Funcionalidad del boton para ingresar a "Reportes"
        btnReportes.addEventListener('click', ()=>{

            let arrStockPlacas = [];
            let arrStockPantallas = [];

            // Generación de un array con los modelos (sku) que tienen elementos disponibles
            let uniquePlacas = [...new Set(arrPlacas.filter(e => e.disponible == true).map(e => e.sku))];
            let uniquePantallas = [...new Set(arrPantallas.filter(e => e.disponible == true).map(e => e.sku))];
        
            // Generación de objeto (modelo con elementos disponibles, cantidad de elementos disponibles del modelo)
            for (const mod of uniquePlacas){
                arrStockPlacas.push(new stock(mod, arrPlacas.filter(e => e.sku == mod).filter(e => e.disponible == true).length));
            }

            for (const mod of uniquePantallas){
                arrStockPantallas.push(new stock(mod, arrPantallas.filter(e => e.sku == mod).filter(e => e.disponible == true).length));
            }

            //Generación de título y tabla para las Placas  
            let divPlacas1 = document.getElementById("divPlacas");
            let tituloPlacas = document.createElement("div");

            //Si hay placas entonces mostrar en pantalla el stock actual de placas
            if(arrStockPlacas.length >0){  
                
                tituloPlacas.innerHTML = "<h3>Stock de actual de Placas</h3>";
                divPlacas1.append(tituloPlacas)

                let tabla = document.createElement("table");
                let titulo = document.createElement("thead");
                let primeraFila = document.createElement("tr");
                primeraFila.innerHTML = `
                <th scope="col">Modelo</th>
                <th scope="col">Cantidad</th>`;
                titulo.append(primeraFila);

                let bodyPlaca = document.createElement("tbody");
                for(const placa of arrStockPlacas){
                    let item = document.createElement("tr");;
                    item.innerHTML = 
                    `<td class="text-center">${placa.modelo}</td> 
                    <td class="text-center">${placa.cantidad}</td>`;
                    bodyPlaca.append(item);
                }

                tabla.innerHTML=`
                <thead> ${titulo.innerHTML} </thead>
                <tbody class="table-group-divider"> ${bodyPlaca.innerHTML} </tbody>
                `;
            
                let tablaStocks = document.getElementById("tabla");
                tablaStocks.append(tabla);
                tabla.className = "tabla_temas";
            
            //Si no hay placas, mostrar en pantallas que no hay placas en stock    
            }else{
                tituloPlacas.innerHTML = "<h3>No hay placas en Stock</h3>";
                divPlacas1.append(tituloPlacas);
            }

            //Generación de título y tabla para las pantallas        
            let divPantallas1 = document.getElementById("divPantallas");
            let tituloPantalla = document.createElement("div");

            //Si hay pantallas entonces mostrar en pantalla el stock actual de pantallas
            if(arrStockPantallas.length >0){

                tituloPantalla.innerHTML = "<h3>Stock de actual de Pantallas</h3>";
                divPantallas1.append(tituloPantalla);

                let tablaPantallas = document.createElement("table");            
                let tituloTablaPantallas = document.createElement("thead");
                let primeraFilaTablaPantallas = document.createElement("tr");
                primeraFilaTablaPantallas.innerHTML = `
                <th scope="col">Modelo</th>
                <th scope="col">Cantidad</th>`;
                tituloTablaPantallas.append(primeraFilaTablaPantallas);

                let bodyTablaPantallas = document.createElement("tbody");
                for(const pantalla of arrStockPantallas){
                    let item = document.createElement("tr");
                    item.innerHTML = 
                    `<td class="text-center">${pantalla.modelo}</td> 
                    <td class="text-center">${pantalla.cantidad}</td>`;
                    bodyTablaPantallas.append(item);
                }

                tablaPantallas.innerHTML=`
                <thead> ${tituloTablaPantallas.innerHTML} </thead>
                <tbody class="table-group-divider"> ${bodyTablaPantallas.innerHTML} </tbody>
                `;
            
                let tablaStocksPantallas = document.getElementById("tablaPantallas");
                tablaStocksPantallas.append(tablaPantallas);
                tablaPantallas.className = "tabla_temas";

            //Si no hay pantallas, mostrar en pantallas que no hay pantallas en stock
            }else{
                tituloPantalla.innerHTML = "<h3>No hay pantallas en Stock</h3>";
                divPantallas1.append(tituloPantalla);

            }
        
        })
    }
   

}else{	
    const { usuario: user } = Swal.fire({
        title: 'Selecione su modo de uso',
        allowOutsideClick: false,
        input: 'select',
        inputOptions: {
            'admin': 'Administrativo',
            'usuario': 'Operador',
        },
        inputPlaceholder: 'Select an user',
        showCancelButton: false,
        inputValidator: (usuario) => {
            return new Promise((resolve) => {
            if (usuario != ""){
                resolve();
                localStorage.setItem("usuario", usuario);

                //Para deshabilitar las opciones no deseadas para el usuario "usuario"
                if(localStorage.getItem("usuario") === "usuario"){
                    disable("btnInPlacas","modalInPlacas");
                    disable("btnInPantallas","modalInPantallas");
                    disable("btnOutElementos","modalOutElementos");                    
                }

                describeUser(usuario);

                //Opciones habilitadas para el usuario "admin"
                if(localStorage.getItem("usuario")==="admin"){
               
                    /* ---------------------------- Funcionamiento del modal de placas ----------------------------*/

                    //Para que los campos queden vacios al ingresar
                    btnInPlacas.addEventListener('click', ()=>{
                        cleanInputs(modeloPlaca,lineaPlaca,turnoPlaca,imeiPlaca,fallaPlaca);
                    })

                    //Funcionalidad del boton guardar en el modal de placas
                    btnGuardarPlaca.addEventListener('click', ()=>{

                        fechaIn = new Date();
                        sku = document.getElementById('modeloPlaca');
                        linea = document.getElementById('lineaPlaca');
                        turno = document.getElementById('turnoPlaca');
                        imei = document.getElementById('imeiPlaca');
                        fallaLinea = document.getElementById('fallaPlaca');

                        if(sku.value && linea.value && turno.value && imei.value && fallaLinea.value){
                            //si el elemento NO existe en el stock actual guarda el valor
                            if(!(arrPlacas.filter(e => e.disponible == true).some(e => e.imei === imei.value))){
                                arrPlacas.push(new elemento(fechaIn, sku.value, linea.value, turno.value, imei.value, fallaLinea.value,));
                                cleanInputs(lineaPlaca,imeiPlaca,fallaPlaca);
                                Swal.fire({
                                    position:'bottom-end',
                                    icon: 'success',
                                    title: 'Guardado correctamente',
                                    showConfirmButton: false,
                                    timer:1000,
                                });
                            }else{
                                Swal.fire({
                                    title: 'Error!',
                                    text: `El número de IMEI: "${imei.value}" se encuentra en stock \n(no puede ingresarlo nuevamente sin antes darle salida)`,
                                    icon: 'error',
                                    confirmButtonText: 'OK'
                                });
                                cleanInputs(lineaPlaca,imeiPlaca,fallaPlaca);
                            }
                        }else{
                            Swal.fire({
                                title: 'Error!',
                                text: 'Falta completar algún campo',
                                icon: 'error',
                                confirmButtonText: 'OK'
                            });
                        }
                    })

                    /* ---------------------------- Funcionamiento del modal de pantallas ----------------------------*/
                
                    //Para que los campos queden vacios al ingresar
                    btnInPantallas.addEventListener('click', ()=>{
                        cleanInputs(modeloPantalla,lineaPantalla,turnoPantalla,imeiPantalla,fallaPantalla);
                    })

                    //Funcionalidad del boton guardar en el modal de pantallas
                    btnGuardarPantalla.addEventListener('click', ()=>{

                        fechaIn = new Date();
                        sku = document.getElementById('modeloPantalla');
                        linea = document.getElementById('lineaPantalla');
                        turno = document.getElementById('turnoPantalla');
                        imei = document.getElementById('imeiPantalla');
                        fallaLinea = document.getElementById('fallaPantalla');

                        if(sku.value && linea.value && turno.value && imei.value && fallaLinea.value){
                            if(!(arrPantallas.filter(e => e.disponible == true).some(e => e.imei === imei.value))){
                                arrPantallas.push(new elemento(fechaIn, sku.value, linea.value, turno.value, imei.value, fallaLinea.value,));                                
                                cleanInputs(lineaPantalla,imeiPantalla,fallaPantalla);
                                Swal.fire({
                                    position:'bottom-end',
                                    icon: 'success',
                                    title: 'Guardado correctamente',
                                    showConfirmButton: false,
                                    timer:1000,
                                });
                            }else{
                                Swal.fire({
                                    title: 'Error!',
                                    text: `El número SN: "${imei.value}" se encuentra en stock \n(no puede ingresarlo nuevamente sin antes darle salida)`,
                                    icon: 'error',
                                    confirmButtonText: 'OK'
                                });
                                cleanInputs(lineaPantalla,imeiPantalla,fallaPantalla);
                            }
                        }else{
                            Swal.fire({
                                title: 'Error!',
                                text: 'Falta completar algún campo',
                                icon: 'error',
                                confirmButtonText: 'OK'
                            });
                        }
                    })

                    /* ---------------------------- Funcionamiento del modal de egreso ----------------------------*/

                    //Para que los campos queden vacios al ingresar
                    btnOutElementos.addEventListener('click', ()=>{
                        cleanInputs(elementId);
                        estadoFinalSelector.selectedIndex = '';
                    })

                    //Funcionalidad del boton guardar en el modal egreso de elementos
                    btnEgreso.addEventListener('click', ()=>{
                        
                        darSalida = document.getElementById('elementId');
                        estadoFinalSelector = document.getElementById('elementEstado');
                        estadoFinal = estadoFinalSelector.options[estadoFinalSelector.selectedIndex].text;
                            
                        let existePlaca = arrPlacas.filter(e => e.disponible == true).some(e => e.imei === darSalida.value);
                        let existePantalla = arrPantallas.filter(e => e.disponible == true).some(e => e.imei === darSalida.value);
                        
                        if(darSalida.value && estadoFinal){
                            if(!(existePlaca || existePantalla)){
                                Swal.fire({
                                    title: 'Error!',
                                    text: 'IMEI/SN no encontrado, por favor ingrese otro valor',
                                    icon: 'error',
                                    confirmButtonText: 'OK'
                                });
                                cleanInputs(elementId);
                                estadoFinalSelector.selectedIndex = '';
                            }else{
                                if(estadoFinal === "OK" || estadoFinal === "SCP" || estadoFinal === "RMA" ){
                                    if(existePlaca){
                                        for (const placa of arrPlacas.filter(e => e.disponible == true)){
                                            if (placa.imei === darSalida.value){
                                                placa.salida();
                                            }
                                        }
                                    }if(existePantalla){
                                            for (const pantalla of arrPantallas.filter(e => e.disponible == true)){
                                                if (pantalla.imei === darSalida.value){
                                                    pantalla.salida();
                                                }
                                            }
                                    }
                                    cleanInputs(elementId);
                                    estadoFinalSelector.selectedIndex = '';
                                    Swal.fire({
                                        position:'bottom-end',
                                        icon: 'success',
                                        title: 'Guardado correctamente',
                                        showConfirmButton: false,
                                        timer:1000,
                                    });
                                }else{
                                    Swal.fire({
                                        title: 'Error!',
                                        text: 'Estado de salida incorrecto',
                                        icon: 'error',
                                        confirmButtonText: 'OK'
                                    });
                                        estadoFinalSelector.selectedIndex = '';
                                    }
                                }
                        }else{
                            Swal.fire({
                                title: 'Error!',
                                text: 'Falta completar algún campo',
                                icon: 'error',
                                confirmButtonText: 'OK'
                            });
                        }
                    })
                }
                
                /* -------------- Funcionamiento del modal de Reportes (habilitada para ambos usuarios) -------------- */
                if(localStorage.getItem("usuario")==="admin" || localStorage.getItem("usuario") === "usuario"){

                    //Para que los campos queden vacios al ingresar
                    btnCerrarReportes.addEventListener('click', ()=>{                        
                        eraseTable("divPlacas");
                        eraseTable("tabla");
                        eraseTable("divPantallas");
                        eraseTable("tablaPantallas");
                    })

                    //Funcionalidad del boton para ingresar a "Reportes"
                    btnReportes.addEventListener('click', ()=>{

                        let arrStockPlacas = [];
                        let arrStockPantallas = [];

                        // Generación de un array con los modelos (sku) que tienen elementos disponibles
                        let uniquePlacas = [...new Set(arrPlacas.filter(e => e.disponible == true).map(e => e.sku))];
                        let uniquePantallas = [...new Set(arrPantallas.filter(e => e.disponible == true).map(e => e.sku))];
                    
                        // Generación de objeto (modelo con elementos disponibles, cantidad de elementos disponibles del modelo)
                        for (const mod of uniquePlacas){
                            arrStockPlacas.push(new stock(mod, arrPlacas.filter(e => e.sku == mod).filter(e => e.disponible == true).length));
                        }

                        for (const mod of uniquePantallas){
                            arrStockPantallas.push(new stock(mod, arrPantallas.filter(e => e.sku == mod).filter(e => e.disponible == true).length));
                        }

                        //Generación de título y tabla para las Placas  
                        let divPlacas1 = document.getElementById("divPlacas");
                        let tituloPlacas = document.createElement("div");

                        //Si hay placas entonces mostrar en pantalla el stock actual de placas
                        if(arrStockPlacas.length >0){  
                            
                            tituloPlacas.innerHTML = "<h3>Stock de actual de Placas</h3>";
                            divPlacas1.append(tituloPlacas)

                            let tabla = document.createElement("table");
                            let titulo = document.createElement("thead");
                            let primeraFila = document.createElement("tr");
                            primeraFila.innerHTML = `
                            <th scope="col">Modelo</th>
                            <th scope="col">Cantidad</th>`;
                            titulo.append(primeraFila);

                            let bodyPlaca = document.createElement("tbody");
                            for(const placa of arrStockPlacas){
                                let item = document.createElement("tr");;
                                item.innerHTML = 
                                `<td class="text-center">${placa.modelo}</td> 
                                <td class="text-center">${placa.cantidad}</td>`;
                                bodyPlaca.append(item);
                            }

                            tabla.innerHTML=`
                            <thead> ${titulo.innerHTML} </thead>
                            <tbody class="table-group-divider"> ${bodyPlaca.innerHTML} </tbody>
                            `;
                        
                            let tablaStocks = document.getElementById("tabla");
                            tablaStocks.append(tabla);
                            tabla.className = "tabla_temas";
                        
                        //Si no hay placas, mostrar en pantallas que no hay placas en stock    
                        }else{
                            tituloPlacas.innerHTML = "<h3>No hay placas en Stock</h3>";
                            divPlacas1.append(tituloPlacas);
                        }

                        //Generación de título y tabla para las pantallas        
                        let divPantallas1 = document.getElementById("divPantallas");
                        let tituloPantalla = document.createElement("div");

                        //Si hay pantallas entonces mostrar en pantalla el stock actual de pantallas
                        if(arrStockPantallas.length >0){

                            tituloPantalla.innerHTML = "<h3>Stock de actual de Pantallas</h3>";
                            divPantallas1.append(tituloPantalla);

                            let tablaPantallas = document.createElement("table");            
                            let tituloTablaPantallas = document.createElement("thead");
                            let primeraFilaTablaPantallas = document.createElement("tr");
                            primeraFilaTablaPantallas.innerHTML = `
                            <th scope="col">Modelo</th>
                            <th scope="col">Cantidad</th>`;
                            tituloTablaPantallas.append(primeraFilaTablaPantallas);

                            let bodyTablaPantallas = document.createElement("tbody");
                            for(const pantalla of arrStockPantallas){
                                let item = document.createElement("tr");
                                item.innerHTML = 
                                `<td class="text-center">${pantalla.modelo}</td> 
                                <td class="text-center">${pantalla.cantidad}</td>`;
                                bodyTablaPantallas.append(item);
                            }

                            tablaPantallas.innerHTML=`
                            <thead> ${tituloTablaPantallas.innerHTML} </thead>
                            <tbody class="table-group-divider"> ${bodyTablaPantallas.innerHTML} </tbody>
                            `;
                        
                            let tablaStocksPantallas = document.getElementById("tablaPantallas");
                            tablaStocksPantallas.append(tablaPantallas);
                            tablaPantallas.className = "tabla_temas";

                        //Si no hay pantallas, mostrar en pantallas que no hay pantallas en stock
                        }else{
                            tituloPantalla.innerHTML = "<h3>No hay pantallas en Stock</h3>";
                            divPantallas1.append(tituloPantalla);

                        }
                    
                    })
                }

            }else{
                resolve("Debe elegir un modo de uso");
            }
            })
        }
    }) 
}

btnLogOut.addEventListener('click', ()=>{
    localStorage.clear();
})


