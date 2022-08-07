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

class placa{
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
        this.estado = estadoFinal;
        this.disponible = false;
    }
}

class pantalla{
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
        this.estado = estadoFinal;
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

//Utilización del fetch - Trayendo datos preguardados de placas
const traerPlacas = async () => {
    let a = 0;
    try {
        const dataPlacas = await fetch ("./placas.json");
        const objetoPlacas = await dataPlacas.json();  
        for(let e of objetoPlacas){
            arrPlacas.push(new placa(new Date(Date.parse(e.fechaIn)), e.sku, e.linea, e.turno, e.imei, e.fallaLinea,));
            if(e.disponible === false){
                arrPlacas[a].fechaOut = new Date(Date.parse(objetoPlacas[a].fechaOut));
                arrPlacas[a].estado = objetoPlacas[a].estado;
                arrPlacas[a].disponible = objetoPlacas[a].disponible;
            }
            a++;
        }  
    } catch (error) {
        console.log(error);        
    }
}

//Utilización del Axios - Trayendo datos preguardados de pantallas
const traerPantallas = async () => {
    let a = 0;
    try {
        let dataPantallas = await axios ("./pantallas.json");
        let objetoPantallas = dataPantallas.data;          
        for(let e of objetoPantallas){
            arrPantallas.push(new pantalla(new Date(Date.parse(e.fechaIn)), e.sku, e.linea, e.turno, e.imei, e.fallaLinea,));
            if(e.disponible === false){
                arrPantallas[a].fechaOut = new Date(Date.parse(objetoPantallas[a].fechaOut));
                arrPantallas[a].estado = objetoPantallas[a].estado;
                arrPantallas[a].disponible = objetoPantallas[a].disponible;
            }
            a++;
        }
    } catch (error) {
        console.log(error);        
    }
}

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

//To clean info of "Buscar"
function eraseInfo(){
    document.getElementById("buscarFechaIn").innerHTML = "Fecha In:";
    document.getElementById("buscarModelo").innerHTML = "Modelo:";
    document.getElementById("buscarLinea").innerHTML = "Linea:";
    document.getElementById("buscarTurno").innerHTML = "Turno:";
    document.getElementById("buscarFalla").innerHTML = "Falla:";
    document.getElementById("buscarFechaOut").innerHTML = "Fecha Out:";
    document.getElementById("buscarEstado").innerHTML = "Estado:";
}

//To complete Placa/Pantalla info
function completeInfo(element){
    document.getElementById("buscarFechaIn").innerText = `Fecha In: ${element.fechaIn.getDate()}-${element.fechaIn.getMonth()+1}-${element.fechaIn.getFullYear()}`;
    document.getElementById("buscarModelo").innerText = `Modelo: ${element.sku}`;
    document.getElementById("buscarLinea").innerText = `Linea: ${element.linea}`;
    document.getElementById("buscarTurno").innerText = `Turno: ${element.turno}`;
    document.getElementById("buscarFalla").innerText = `Falla: ${element.fallaLinea}`;
    element.fechaOut ? document.getElementById("buscarFechaOut").innerText = `Fecha Out: ${element.fechaOut.getDate()}-${element.fechaOut.getMonth()+1}-${element.fechaOut.getFullYear()}` : document.getElementById("buscarFechaOut").innerHTML = "Fecha Out:"; ;
    element.estado ? document.getElementById("buscarEstado").innerText = `Estado: ${element.estado}` : document.getElementById("buscarEstado").innerHTML = "Estado:";
}

//Fuction modal Placas
function modalPlacas(){

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
                arrPlacas.push(new placa(fechaIn, sku.value, linea.value, turno.value, imei.value, fallaLinea.value,));
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
}

//Function modal Pantallas
function modalPantallas(){

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
                arrPantallas.push(new pantalla(fechaIn, sku.value, linea.value, turno.value, imei.value, fallaLinea.value,));                                
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
}

//Function modal Egreso
function modalEgreso(){
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


//Function modal Reportes
function modalReportes(){
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
    
        //Funcionalidad del boton "Buscar placa/pantalla", que se encuentra dentro del modal Reportes
        let buscarId = document.getElementById("buscarId");
        buscarId.addEventListener(`input`,() =>{
            let buscarPlaca = arrPlacas.some(e => e.imei === buscarId.value);
            let buscarPantalla = arrPantallas.some(e => e.imei === buscarId.value);
            eraseInfo();

            if(buscarPlaca){
                for(const placa of arrPlacas){
                    if (placa.imei === buscarId.value){
                        completeInfo(placa);
                    }
                }
            }
            if(buscarPantalla){
                for(const placa of arrPantallas){
                    if (placa.imei === buscarId.value){
                        completeInfo(placa);
                    }
                }
            }
            //Para que los campos queden vacios al ingresar
            btnVolver.addEventListener('click', ()=>{
                cleanInputs(buscarId);
                eraseInfo();
            })
        })
    })
}

/* ++++++++++++++++++++++++++++++++++++ Main program ++++++++++++++++++++++++++++++++++++ */

traerPlacas ();
traerPantallas ();

console.log(arrPlacas);
console.log(arrPantallas);

let usuario;
let usuarioStorage = sessionStorage.getItem("usuario");

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
    if(sessionStorage.getItem("usuario") === "usuario"){
        disable("btnInPlacas","modalInPlacas");
        disable("btnInPantallas","modalInPantallas");
        disable("btnOutElementos","modalOutElementos");
    }

  //Opciones habilitadas para el usuario "admin"
    if(sessionStorage.getItem("usuario")==="admin"){                
        modalPlacas();
        modalPantallas();
        modalEgreso();
    }

  //Opciones habilitadas para el usuario "admin" y "usuario"
  if(sessionStorage.getItem("usuario")==="admin" || sessionStorage.getItem("usuario") === "usuario"){
        modalReportes();
    }

//User not logged in
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
                sessionStorage.setItem("usuario", usuario);

                //Para deshabilitar las opciones no deseadas para el usuario "usuario"
                if(sessionStorage.getItem("usuario") === "usuario"){
                    disable("btnInPlacas","modalInPlacas");
                    disable("btnInPantallas","modalInPantallas");
                    disable("btnOutElementos","modalOutElementos");                    
                }

                describeUser(usuario);

                //Opciones habilitadas para el usuario "admin"
                if(sessionStorage.getItem("usuario")==="admin"){
                    modalPlacas();
                    modalPantallas();
                    modalEgreso();
                }
                
                /* -------------- Funcionamiento del modal de Reportes (habilitada para ambos usuarios) -------------- */
                if(sessionStorage.getItem("usuario")==="admin" || sessionStorage.getItem("usuario") === "usuario"){
                    modalReportes();
                }

            }else{
                resolve("Debe elegir un modo de uso");
            }
            })
        }
    }) 
}

btnLogOut.addEventListener('click', ()=>{
    sessionStorage.clear();
})


