const form1 = document.getElementById("transactionForm1");
form1.addEventListener("submit", function (event) {
    event.preventDefault();
    let transactionFormData1 = new FormData(form1)
    let transactionObj1 = convertFormData(transactionFormData1)
    saveTransactionObj1(transactionObj1)
    insertar1(transactionObj1)
    form1.reset();

})
document.addEventListener("DOMContentLoaded", function (event) {
    let transactionObjArr1 = JSON.parse(localStorage.getItem("transactionData1"))
    transactionObjArr1.forEach(
        function (arrayElement) {
            insertar1(arrayElement)
        })
})

function drawCategory(){
    let allCategory=[];
    for(let index=0; index<allCategory.length;index++){
        insertCategory(allCategory[index]);
    }

}
function insertCategory(category){
    const selectElement= document.getElementById("Categoría")
    let htmlToInsert=`<option>${category}</option>`
    selectElement.insertAdjacentHTML("beforeend",htmlToInsert)
}
function getNewTransactionId1() {
    let lastTransactionID1 = localStorage.getItem("lastTransactionID1") || "0";
    let newTransactionID1 = JSON.parse(lastTransactionID1) + 1;
    localStorage.setItem("lastTransactionID1", JSON.stringify(newTransactionID1))
    return newTransactionID1;

}

function convertFormData(transactionFormData1) {
    let nombre = transactionFormData1.get("nombre");
    let alta = transactionFormData1.get("alta");
    let fecha = transactionFormData1.get("fecha");
    let departamento = transactionFormData1.get("departamento");
    let obra = transactionFormData1.get("obra");
    let sindicalizado = transactionFormData1.get("sindicalizado");
    let cambios = transactionFormData1.get("cambios");
    let estatus = "Pendiente";
    let transactionID1 = getNewTransactionId1();
    return {
        "nombre":nombre,
        "alta": alta,
        "fecha": fecha,
        "departamento":departamento,
        "obra": obra,
        "sindicalizado": sindicalizado,
        "cambios": cambios,
        "Estatus": estatus,
        "fecha": fecha,
        "transactionID1": transactionID1
    }
}

function insertar1(transactionObj1) {
    let transactionTableRef1 = document.getElementById("transactionTable1")
    let newTransactionTRow1 = transactionTableRef1.insertRow(-1);
    newTransactionTRow1.setAttribute("data-transaction-id1", transactionObj1["transactionID1"])
    newCellRef1 = newTransactionTRow1.insertCell(0);
    newCellRef1.textContent = transactionObj1["nombre"];
    newCellRef1 = newTransactionTRow1.insertCell(1);
    newCellRef1.textContent = transactionObj1["alta"];
    newCellRef1 = newTransactionTRow1.insertCell(2);
    newCellRef1.textContent = transactionObj1["fecha"];
    newCellRef1 = newTransactionTRow1.insertCell(3);
    newCellRef1.textContent = transactionObj1["departamento"];
    newCellRef1 = newTransactionTRow1.insertCell(4);
    newCellRef1.textContent = transactionObj1["obra"];
    newCellRef1 = newTransactionTRow1.insertCell(5);
    newCellRef1.textContent = transactionObj1["sindicalizado"];
    newCellRef1 = newTransactionTRow1.insertCell(6);
    newCellRef1.textContent = transactionObj1["cambios"];
    let status1 = newTransactionTRow1.insertCell(7);
    status1.textContent = transactionObj1["Estatus"];
    if (transactionObj1.Estatus==="Pendiente"){
        status1.style.backgroundColor="yellow"
    }
    if (transactionObj1.Estatus==="Aceptado"){
        status1.style.backgroundColor="green"
    }
    if (transactionObj1.Estatus==="Rechazado"){
        status1.style.backgroundColor="red"
    }

    let actionCell1 = newTransactionTRow1.insertCell(8);
    let aproveButton1 = document.createElement("button");
    aproveButton1.name="action";
    aproveButton1.type="submit";
    aproveButton1.className = "waves-effect waves-light btn-small";
    aproveButton1.textContent = "Aprobar";
    actionCell1.appendChild(aproveButton1);
    if (transactionObj1.Estatus==="Aceptado"||transactionObj1.Estatus==="Rechazado"){
        aproveButton1.disabled="true";
    }
    let deniedButton1 = document.createElement("button");
    deniedButton1.name="action";
    deniedButton1.type="submit";
    deniedButton1.className = "waves-effect waves-light btn-small";
    deniedButton1.textContent = "Rechazar";
    actionCell1.appendChild(deniedButton1);
    if (transactionObj1.Estatus==="Aceptado"||transactionObj1.Estatus==="Rechazado"){
        deniedButton1.disabled="true";
    }
    let deleteCell1 = newTransactionTRow1.insertCell(9);
    let deleteButton1 = document.createElement("button");
    deleteButton1.name="action";
    deleteButton1.type="submit";
    deleteButton1.className = "waves-effect waves-light btn-small";
    deleteButton1.textContent = "Eliminar";
    deleteCell1.appendChild(deleteButton1);

    

    deniedButton1.addEventListener("click", (event) => {
        event.preventDefault();
        let transactionRow1 = event.target.parentNode.parentNode;
        let transactionID1 = transactionRow1.getAttribute("data-transaction-id1");
        location.reload("transactionTable1");
        deniedTransactionObj1(transactionID1);
    })
    aproveButton1.addEventListener("click", (event) => {
        event.preventDefault();
        let transactionRow1 = event.target.parentNode.parentNode;
        let transactionID1 = transactionRow1.getAttribute("data-transaction-id1");
        location.reload("transactionTable1");
        aproveTransactionObj1(transactionID1);
    })
    deleteButton1.addEventListener("click", (event) => {
        event.preventDefault();
        let transactionRow1 = event.target.parentNode.parentNode;
        let transactionID1 = transactionRow1.getAttribute("data-transaction-id1");
        location.reload("transactionTable1")
        deleteTransactionObj1(transactionID1);
    })

}
function deniedTransactionObj1(transactionID1){
    if (confirm("¿Desea rechazar la solicitud? Esta acción no se puede deshacer") == true) {
    let transactionObjArr1 = JSON.parse(localStorage.getItem("transactionData1"))
    // Busco el índice que quiero eliminar
    let transactionIndexInArray1 = transactionObjArr1.findIndex(element => element.transactionID1 == transactionID1)
    transactionObjArr1[transactionIndexInArray1].Estatus="Rechazado";
    let transactionArrayJSON1 = JSON.stringify(transactionObjArr1);
    localStorage.setItem("transactionData1", transactionArrayJSON1);}

}
function aproveTransactionObj1(transactionID1){
    if (confirm("¿Desea aprobar la solicitud? Esta acción no se puede deshacer") == true) {
    let transactionObjArr1 = JSON.parse(localStorage.getItem("transactionData1"))
    // Busco el índice que quiero eliminar
    let transactionIndexInArray1 = transactionObjArr1.findIndex(element => element.transactionID1 == transactionID1)
    transactionObjArr1[transactionIndexInArray1].Estatus="Aceptado";
    let transactionArrayJSON1 = JSON.stringify(transactionObjArr1);
    localStorage.setItem("transactionData1", transactionArrayJSON1);}

}
    // Le paso el id que quiero eliminar
    function deleteTransactionObj1(transactionID1) {
        if (confirm("¿Desea eliminar la solicitud? Esta acción no se puede deshacer") == true) {
        //Convierto de JSON a objeto
        let transactionObjArr1 = JSON.parse(localStorage.getItem("transactionData1"))
        // Busco el índice que quiero eliminar
        let transactionIndexInArray1 = transactionObjArr1.findIndex(element => element.transactionID1 == transactionID1)
        transactionObjArr1.splice(transactionIndexInArray1, 1)
        let transactionArrayJSON1 = JSON.stringify(transactionObjArr1);
        localStorage.setItem("transactionData1", transactionArrayJSON1);
        }
}
function saveTransactionObj1(transactionObj1) {
    let myTransactionArray1 = JSON.parse(localStorage.getItem("transactionData1")) || [];
    myTransactionArray1.push(transactionObj1);
    let transactionArrayJSON1 = JSON.stringify(myTransactionArray1);
    localStorage.setItem("transactionData1", transactionArrayJSON1);
}
