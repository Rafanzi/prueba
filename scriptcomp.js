const form2 = document.getElementById("transactionForm2");
form2.addEventListener("submit", function (event) {
    event.preventDefault();
    let transactionFormData2 = new FormData(form2)
    let transactionObj2 = convertFormData(transactionFormData2)
    saveTransactionObj(transactionObj2)
    insertar2(transactionObj2)
    form2.reset();

})
document.addEventListener("DOMContentLoaded", function (event) {
    let transactionObjArr2 = JSON.parse(localStorage.getItem("transactionData2"))
    transactionObjArr2.forEach(
        function (arrayElement) {
            insertar2(arrayElement)
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
function getNewTransactionId2() {
    let lastTransactionID2 = localStorage.getItem("lastTransactionID2") || "0";
    let newTransactionID2 = JSON.parse(lastTransactionID2) + 1;
    localStorage.setItem("lastTransactionID2", JSON.stringify(newTransactionID2))
    return newTransactionID2;

}

function convertFormData(transactionFormData2) {
    let descripcion = transactionFormData2.get("descripcion");
    let unidad = transactionFormData2.get("unidad");
    let fecha = transactionFormData2.get("fecha");
    let cantidad = transactionFormData2.get("cantidad");
    let existencia = transactionFormData2.get("existencia");
    let precio = transactionFormData2.get("precio");
    let importe = transactionFormData2.get("importe");
    let estatus = "Pendiente";
    let transactionID2 = getNewTransactionId2();
    return {
        "descripcion":descripcion,
        "unidad": unidad,
        "fecha": fecha,
        "cantidad":cantidad,
        "existencia": existencia,
        "precio": precio,
        "importe": importe,
        "Estatus": estatus,
        "Fecha": fecha,
        "transactionID2": transactionID2
    }
}

function insertar2(transactionObj2) {
    let transactionTableRef2 = document.getElementById("transactionTable2")
    let newTransactionTRow2 = transactionTableRef2.insertRow(-1);
    newTransactionTRow2.setAttribute("data-transaction-id2", transactionObj2["transactionID2"])
    let newCellRef2 = newTransactionTRow2.insertCell(0);
    newCellRef2.textContent = newTransactionTRow2.getAttribute("data-transaction-id2");
    newCellRef2 = newTransactionTRow2.insertCell(1);
    newCellRef2.textContent = transactionObj2["descripcion"];
    newCellRef2 = newTransactionTRow2.insertCell(2);
    newCellRef2.textContent = transactionObj2["unidad"];
    newCellRef2 = newTransactionTRow2.insertCell(3);
    newCellRef2.textContent = transactionObj2["cantidad"];
    newCellRef2 = newTransactionTRow2.insertCell(4);
    newCellRef2.textContent = transactionObj2["existencia"];
    newCellRef2 = newTransactionTRow2.insertCell(5);
    newCellRef2.textContent = transactionObj2["precio"];
    newCellRef2 = newTransactionTRow2.insertCell(6);
    newCellRef2.textContent = transactionObj2["importe"];
    newCellRef2 = newTransactionTRow2.insertCell(7);
    newCellRef2.textContent = transactionObj2["fecha"];
    let status2 = newTransactionTRow2.insertCell(7);
    status2.textContent = transactionObj2["Estatus"];
    if (transactionObj2.Estatus==="Pendiente"){
        status2.style.backgroundColor="yellow"
    }
    if (transactionObj2.Estatus==="Aceptado"){
        status2.style.backgroundColor="green"
    }
    if (transactionObj2.Estatus==="Rechazado"){
        status2.style.backgroundColor="red"
    }
    let actionCell2 = newTransactionTRow2.insertCell(9);
    let aproveButton2 = document.createElement("button");
    aproveButton2.name="action";
    aproveButton2.type="submit";
    aproveButton2.className = "waves-effect waves-light btn-small";
    aproveButton2.textContent = "Aprobar";
    actionCell2.appendChild(aproveButton2);
    if (transactionObj2.Estatus==="Aceptado"||transactionObj2.Estatus==="Rechazado"){
        aproveButton2.disabled="true";
    }
    let deniedButton2 = document.createElement("button");
    deniedButton2.name="action";
    deniedButton2.type="submit";
    deniedButton2.className = "waves-effect waves-light btn-small";
    deniedButton2.textContent = "Rechazar";
    actionCell2.appendChild(deniedButton2);
    if (transactionObj2.Estatus==="Aceptado"||transactionObj2.Estatus==="Rechazado"){
        deniedButton2.disabled="true";
    }
    let deleteCell2 = newTransactionTRow2.insertCell(10);
    let deleteButton2 = document.createElement("button");
    deleteButton2.name="action";
    deleteButton2.type="submit";
    deleteButton2.className = "waves-effect waves-light btn-small";
    deleteButton2.textContent = "Eliminar";
    deleteCell2.appendChild(deleteButton2);

    

    deniedButton2.addEventListener("click", (event) => {
        let transactionRow2 = event.target.parentNode.parentNode;
        let transactionID2 = transactionRow2.getAttribute("data-transaction-id2");
        location.reload("transactionTable2");
        deniedTransactionObj2(transactionID2);
    })
    aproveButton2.addEventListener("click", (event) => {
        let transactionRow2 = event.target.parentNode.parentNode;
        let transactionID2 = transactionRow2.getAttribute("data-transaction-id2");
        location.reload("transactionTable2");
        aproveTransactionObj2(transactionID2);
    })
    deleteButton2.addEventListener("click", (event) => {
        let transactionRow2 = event.target.parentNode.parentNode;
        let transactionID2 = transactionRow2.getAttribute("data-transaction-id2");
        transactionRow2.remove();
        deleteTransactionObj2(transactionID2);
    })

}
function deniedTransactionObj2(transactionID2){
    let transactionObjArr2 = JSON.parse(localStorage.getItem("transactionData2"))
    // Busco el índice que quiero eliminar
    let transactionIndexInArray2 = transactionObjArr2.findIndex(element => element.transactionID2 == transactionID2)
    transactionObjArr2[transactionIndexInArray2].Estatus="Rechazado";
    let transactionArrayJSON2 = JSON.stringify(transactionObjArr2);
    localStorage.setItem("transactionData2", transactionArrayJSON2);

}
function aproveTransactionObj2(transactionID2){
    let transactionObjArr2 = JSON.parse(localStorage.getItem("transactionData2"))
    // Busco el índice que quiero eliminar
    let transactionIndexInArray2= transactionObjArr2.findIndex(element => element.transactionID2 == transactionID2)
    transactionObjArr2[transactionIndexInArray2].Estatus="Aceptado";
    let transactionArrayJSON2 = JSON.stringify(transactionObjArr2);
    localStorage.setItem("transactionData2", transactionArrayJSON2);

}

    // Le paso el id que quiero eliminar
    function deleteTransactionObj2(transactionID2) {
        //Convierto de JSON a objeto
        let transactionObjArr2 = JSON.parse(localStorage.getItem("transactionData2"))
        // Busco el índice que quiero eliminar
        let transactionIndexInArray2 = transactionObjArr2.findIndex(element => element.transactionID2 == transactionID2)
        transactionObjArr2.splice(transactionIndexInArray2, 1)
        let transactionArrayJSON2 = JSON.stringify(transactionObjArr2);
        localStorage.setItem("transactionData2", transactionArrayJSON2);
}
function saveTransactionObj(transactionObj2) {
    let myTransactionArray2 = JSON.parse(localStorage.getItem("transactionData2")) || [];
    myTransactionArray2.push(transactionObj2);
    let transactionArrayJSON2 = JSON.stringify(myTransactionArray2);
    localStorage.setItem("transactionData2", transactionArrayJSON2);
}
