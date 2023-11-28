class MatrixOperations {
    constructor() {
        this.matrixContainer = document.getElementById("matrixContainer");
        this.outputContainer = document.getElementById("outputContainer");
        this.costMatrix = [];
        this.supplyMatrix = [];
        this.demandMatrix = [];
    }

    createMatrix(rows, cols) {
        const { costMatrix, supplyMatrix, demandMatrix } = this.getMatrixValues();
        this.matrixContainer.innerHTML = "";

        const matrix = [];

        const table = document.createElement("div");
        table.classList.add("table-responsive", "table");
        table.id = "maliyetMatrisi";
        const headerRow = document.createElement("tr");
        this.addTableHeaderCell(headerRow, "Maliyet");

        for (let j = 1; j <= cols; j++) {
            this.addTableHeaderCell(headerRow, `C${j}`);
        }

        this.addTableHeaderCell(headerRow, "Talep", "text-center");
        table.appendChild(headerRow);

        for (let i = 1; i <= rows; i++) {
            const row = [];
            const tr = document.createElement("tr");
            this.addTableHeaderCell(tr, `R${i}`);

            for (let j = 1; j <= cols; j++) {
                const input = this.createInput(this.costMatrix[i - 1][j - 1], "form-control matrix-input", `costMatrixInput_${i}_${j}`);
                row.push(input);
                const td = document.createElement("td");
                td.appendChild(input);
                tr.appendChild(td);
            }
            const talepInput = this.createInput(this.demandMatrix[i - 1], "form-control matrix-input", `talep_${i}`);
            row.push(talepInput);
            const td = document.createElement("td");
            td.appendChild(talepInput);
            tr.appendChild(td);
            matrix.push(row);
            table.appendChild(tr);
        }

        const arzSatiri = document.createElement("tr");
        arzSatiri.id = "arzSatiri";
        this.addTableHeaderCell(arzSatiri, "Arz");

        for (let j = 1; j <= cols; j++) {
            const input = this.createInput(this.supplyMatrix[j - 1], "form-control matrix-input", `arz_${j}`);
            const td = document.createElement("td");
            td.appendChild(input);
            arzSatiri.appendChild(td);
        }

        table.appendChild(arzSatiri);
        this.matrixContainer.appendChild(table);

        return matrix;
    }

    createInput(value, className, id) {
        const input = document.createElement("input");
        input.type = "text";
        input.value = value;
        input.className = className;
        input.id = id;
        // input.style.backgroundColor = "#183D3D";
        input.style.backgroundColor = "#040D12";
        input.style.color = "#fff";
        input.style.fontWeight = "bold";
        // input.style.border = "none";
        // input.style.borderBottom = "0.2rem solid #183D3D";
        // input.style.borderTop = "0.2rem solid #183D3D";
        input.style.borderRight = "0.2rem solid #183D3D";
        input.style.borderLeft = "0.2rem solid #183D3D";
        return input;
    }

    clearMatrix() {
        this.matrixContainer.innerHTML = "";
        this.generateMatrix();
    }


    generateMatrix() {
        const rows = parseInt(document.getElementById("rowInput").value);
        const cols = parseInt(document.getElementById("colInput").value);
        this.createMatrix(rows, cols);
    }

    addTableHeaderCell(row, text, className = "") {
        const headerCell = document.createElement("th");
        headerCell.textContent = text;
        if (className !== "") {
            headerCell.classList.add(className);
        }
        row.appendChild(headerCell);
    }

    getMatrixValues() {
        const rows = parseInt(document.getElementById("rowInput").value);
        const cols = parseInt(document.getElementById("colInput").value);

        this.costMatrix = [];
        this.supplyMatrix = [];
        this.demandMatrix = [];

        for (let i = 1; i <= rows; i++) {
            const row = [];
            for (let j = 1; j <= cols; j++) {
                const inputId = `costMatrixInput_${i}_${j}`;
                const inputElement = document.getElementById(inputId);
                const inputValue = inputElement ? parseFloat(inputElement.value) : 0;
                row.push(inputValue);
            }
            this.costMatrix.push(row);
        }

        for (let j = 1; j <= cols; j++) {
            const arzInputId = `arz_${j}`;
            const arzInputElement = document.getElementById(arzInputId);
            const arzValue = arzInputElement ? parseFloat(arzInputElement.value) : 0;
            this.supplyMatrix.push(arzValue);
        }

        for (let i = 1; i <= rows; i++) {
            const talepInputId = `talep_${i}`;
            const talepInputElement = document.getElementById(talepInputId);
            const talepValue = talepInputElement ? parseFloat(talepInputElement.value) : 0;
            this.demandMatrix.push(talepValue);
        }

        return {
            costMatrix: this.matrix,
            supplyMatrix: this.supplyMatrix,
            demandMatrix: this.demandMatrix
        };
    }

}

export default MatrixOperations;