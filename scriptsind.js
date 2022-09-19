document.addEventListener("DOMContentLoaded", function (event) {
    let transactionObjArr1 = JSON.parse(localStorage.getItem("transactionData1"))
    transactionObjArr1.forEach(
        function (arrayElement) {
            insertar1(arrayElement)
        })
})
document.addEventListener("DOMContentLoaded", function (event) {
    let transactionObjArr = JSON.parse(localStorage.getItem("transactionData"))
    transactionObjArr.forEach(
        function (arrayElement) {
            insertar(arrayElement)
        })
})
document.addEventListener("DOMContentLoaded", function (event) {
    let transactionObjArr2 = JSON.parse(localStorage.getItem("transactionData2"))
    transactionObjArr2.forEach(
        function (arrayElement) {
            insertar2(arrayElement)
        })
})
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
            newCellRef = newTransactionTRow.insertCell(6);
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

        }
            // Le paso el id que quiero eliminar
            function deleteTransactionObj(transactionID) {
                //Convierto de JSON a objeto
                let transactionObjArr = JSON.parse(localStorage.getItem("transactionData"))
                // Busco el índice que quiero eliminar
                let transactionIndexInArray = transactionObjArr.findIndex(element => element.transactionID == transactionID)
                transactionObjArr.splice(transactionIndexInArray, 1)
                let transactionArrayJSON = JSON.stringify(transactionObjArr);
                localStorage.setItem("transactionData", transactionArrayJSON);
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
                newCellRef1 = newTransactionTRow1.insertCell(7);
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
            
            }
                // Le paso el id que quiero eliminar
                function deleteTransactionObj(transactionID1) {
                    //Convierto de JSON a objeto
                    let transactionObjArr1 = JSON.parse(localStorage.getItem("transactionData1"))
                    // Busco el índice que quiero eliminar
                    let transactionIndexInArray1 = transactionObjArr1.findIndex(element => element.transactionID1 == transactionID1)
                    transactionObjArr1.splice(transactionIndexInArray1, 1)
                    let transactionArrayJSON1 = JSON.stringify(transactionObjArr1);
                    localStorage.setItem("transactionData1", transactionArrayJSON1);
            }
            function saveTransactionObj(transactionObj1) {
                let myTransactionArray1 = JSON.parse(localStorage.getItem("transactionData1")) || [];
                myTransactionArray1.push(transactionObj1);
                let transactionArrayJSON1 = JSON.stringify(myTransactionArray1);
                localStorage.setItem("transactionData1", transactionArrayJSON1);
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
                let status2 = newTransactionTRow2.insertCell(8);
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
            }
                // Le paso el id que quiero eliminar
                function deleteTransactionObj(transactionID2) {
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
            
            