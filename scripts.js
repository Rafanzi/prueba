const form = document.getElementById("transactionForm");
form.addEventListener("submit", function (event) {
    event.preventDefault();
    let transactionFormData = new FormData(form)
    let transactionObj = convertFormData(transactionFormData)
    saveTransactionObj(transactionObj)
    insertar(transactionObj)
    form.reset();

})
document.addEventListener("DOMContentLoaded", function (event) {
    let transactionObjArr = JSON.parse(localStorage.getItem("transactionData"))
    transactionObjArr.forEach(
        function (arrayElement) {
            insertar(arrayElement)
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
function getNewTransactionId() {
    let lastTransactionID = localStorage.getItem("lastTransactionID") || "0";
    let newTransactionID = JSON.parse(lastTransactionID) + 1;
    localStorage.setItem("lastTransactionID", JSON.stringify(newTransactionID))
    return newTransactionID;

}

function convertFormData(transactionFormData) {
    let concepto = transactionFormData.get("Concepto");
    let unidad = transactionFormData.get("Unidad");
    let cantidad = transactionFormData.get("Cantidad");
    let ubicacion = transactionFormData.get("Ubicacion");
    let fecha = transactionFormData.get("Fecha");
    var estatus = "Pendiente";
    let transactionID = getNewTransactionId();
    return {
        "Concepto": concepto,
        "Unidad":unidad,
        "Cantidad": cantidad,
        "Ubicacion": ubicacion,
        "Estatus": estatus,
        "Fecha": fecha,
        "transactionID": transactionID
    }

}
function insertar(transactionObj) {
    let transactionTableRef = document.getElementById("transactionTable")
    let newTransactionTRow = transactionTableRef.insertRow(-1);
    newTransactionTRow.setAttribute("data-transaction-id", transactionObj["transactionID"])
    let newCellRef = newTransactionTRow.insertCell(0);
    newCellRef.textContent = newTransactionTRow.getAttribute("data-transaction-id");
    newCellRef = newTransactionTRow.insertCell(1);
    newCellRef.textContent = transactionObj["Concepto"];
    newCellRef = newTransactionTRow.insertCell(2);
    newCellRef.textContent = transactionObj["Unidad"];
    newCellRef = newTransactionTRow.insertCell(3);
    newCellRef.textContent = transactionObj["Cantidad"];
    newCellRef = newTransactionTRow.insertCell(4);
    newCellRef.textContent = transactionObj["Ubicacion"];
    newCellRef = newTransactionTRow.insertCell(5);
    newCellRef.textContent = transactionObj["Fecha"];
    let status = newTransactionTRow.insertCell(6);
    status.textContent = transactionObj["Estatus"];
    if (transactionObj.Estatus==="Pendiente"){
        status.style.backgroundColor="yellow"
    }
    if (transactionObj.Estatus==="Aceptado"){
        status.style.backgroundColor="green"
    }
    if (transactionObj.Estatus==="Rechazado"){
        status.style.backgroundColor="red"
    }


    let actionCell = newTransactionTRow.insertCell(7);
    let aproveButton = document.createElement("button");
    aproveButton.id="aprobar";
    aproveButton.name="action";
    aproveButton.type="submit";
    aproveButton.className = "waves-effect waves-light btn-small";
    aproveButton.textContent = "Aprobar";
    actionCell.appendChild(aproveButton);
    if (transactionObj.Estatus==="Aceptado"||transactionObj.Estatus==="Rechazado"){
        aproveButton.disabled="true";
    }
    let deniedButton = document.createElement("button");
    deniedButton.id="denegar";
    deniedButton.name="action";
    deniedButton.type="submit";
    deniedButton.className = "waves-effect waves-light btn-small";
    deniedButton.textContent = "Rechazar";
    actionCell.appendChild(deniedButton);
    if (transactionObj.Estatus==="Aceptado"||transactionObj.Estatus==="Rechazado"){
        deniedButton.disabled="true";
    }
    let deleteCell = newTransactionTRow.insertCell(8);
    let deleteButton = document.createElement("button");
    deleteButton.name="action";
    deleteButton.type="submit";
    deleteButton.className = "waves-effect waves-light btn-small";
    deleteButton.textContent = "Eliminar";
    deleteCell.appendChild(deleteButton);

    

    deniedButton.addEventListener("click", (event) => {
        if (confirm("¿Desea rechazar la solicitud? Esta acción no se puede deshacer") == true) {
        let transactionRow = event.target.parentNode.parentNode;
        let transactionID = transactionRow.getAttribute("data-transaction-id");
        location.reload("transactionTable");
        deniedTransactionObj(transactionID);}
    })
    aproveButton.addEventListener("click", (event) => {
                if (confirm("¿Desea aprobar la solicitud? Esta acción no se puede deshacer") == true) {
        let transactionRow = event.target.parentNode.parentNode;
        let transactionID = transactionRow.getAttribute("data-transaction-id");
        location.reload("transactionTable");
        aproveTransactionObj(transactionID);}
    })
    deleteButton.addEventListener("click", (event) => {
        let transactionRow = event.target.parentNode.parentNode;
        let transactionID = transactionRow.getAttribute("data-transaction-id");
        location.reload("transactionTable");
        deleteTransactionObj(transactionID);
    })





}
function changeColor(estatus){


}

function deniedTransactionObj(transactionID){
    let transactionObjArr = JSON.parse(localStorage.getItem("transactionData"))
    // Busco el índice que quiero eliminar
    let transactionIndexInArray = transactionObjArr.findIndex(element => element.transactionID == transactionID)
    transactionObjArr[transactionIndexInArray].Estatus="Rechazado";
    let transactionArrayJSON = JSON.stringify(transactionObjArr);
    localStorage.setItem("transactionData", transactionArrayJSON);

}
function aproveTransactionObj(transactionID){
    let transactionObjArr = JSON.parse(localStorage.getItem("transactionData"))
    // Busco el índice que quiero eliminar
    let transactionIndexInArray = transactionObjArr.findIndex(element => element.transactionID == transactionID)
    transactionObjArr[transactionIndexInArray].Estatus="Aceptado";
    let transactionArrayJSON = JSON.stringify(transactionObjArr);
    localStorage.setItem("transactionData", transactionArrayJSON);

}
    // Le paso el id que quiero eliminar
    function deleteTransactionObj(transactionID) {
        if (confirm("¿Desea eliminar la solicitud? Esta acción no se puede deshacer") == true) {
        //Convierto de JSON a objeto
        let transactionObjArr = JSON.parse(localStorage.getItem("transactionData"))
        // Busco el índice que quiero eliminar
        let transactionIndexInArray = transactionObjArr.findIndex(element => element.transactionID == transactionID)
        transactionObjArr.splice(transactionIndexInArray, 1)
        let transactionArrayJSON = JSON.stringify(transactionObjArr);
        localStorage.setItem("transactionData", transactionArrayJSON);
        }
}

function saveTransactionObj(transactionObj) {
    let myTransactionArray = JSON.parse(localStorage.getItem("transactionData")) || [];
    myTransactionArray.push(transactionObj);
    let transactionArrayJSON = JSON.stringify(myTransactionArray);
    localStorage.setItem("transactionData", transactionArrayJSON);
}

