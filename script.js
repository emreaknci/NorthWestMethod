import MatrixOperations from './matrix.js';
import NorthwestTransportationPlan from './northwest.js';
const matrixOperationsInstance = new MatrixOperations();
const northwestInstance = new NorthwestTransportationPlan();

function initializeButtons() {
    let printContainer = document.getElementById("printContainer");
    let btnContainer = document.getElementById("btnContainer");
    printContainer.innerHTML = "";
    btnContainer.innerHTML = "";
    matrixOperationsInstance.generateMatrix();
    document.getElementById("outputContainer").innerHTML = "";

    let printBtn = document.createElement("button");
    printBtn.classList.add("btn");
    printBtn.setAttribute("id", "printBtn");
    printBtn.textContent = "Sonuçları Göster";
    printBtn.style.width = "100%";
    printBtn.style.height = "3.5rem";

    btnContainer.appendChild(printBtn);

    let clearBtn = document.createElement("button");
    clearBtn.classList.add("btn");
    clearBtn.setAttribute("id", "clearBtn");
    clearBtn.textContent = "Temizle";
    clearBtn.style.width = "100%";
    clearBtn.style.height = "3.5rem";
    printContainer.appendChild(clearBtn);

    document.getElementById("clearBtn").addEventListener("click", () => {
        matrixOperationsInstance.clearMatrix();
        document.getElementById("outputContainer").innerHTML = "";
    });

    document.getElementById("printBtn").addEventListener("click", () => {
        northwestInstance.printResults();
    });
}

initializeButtons();

document.getElementById("colInput").addEventListener("change", initializeButtons);
document.getElementById("rowInput").addEventListener("change", initializeButtons);

