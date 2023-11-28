class NorthwestTransportationPlan {

    // Function to create the transportation plan using the Northwest Corner Method
    createTransportationPlan(costMatrix, demand, supply) {
        demand = demand.flat();
        supply = supply.flat();

        const rowCount = costMatrix.length;
        const colCount = costMatrix[0].length;

        const remainingSupply = supply.length !== rowCount ? demand.slice() : supply.slice();
        const remainingDemand = demand.length !== colCount ? supply.slice() : demand.slice();

        let transportationPlan = Array.from({ length: rowCount }, () => Array(colCount).fill(0));

        for (let i = 0; i < rowCount; i++) {
            for (let j = 0; j < colCount; j++) {
                const amount = Math.min(remainingSupply[i], remainingDemand[j]);
                transportationPlan[i][j] = amount;
                remainingSupply[i] -= amount;
                remainingDemand[j] -= amount;
            }
        }

        return transportationPlan;
    }


    // Function to multiply two matrices element-wise
    elementWiseMatrixMultiply(matrix1, matrix2) {
        return matrix1.map((row, i) =>
            row.map((col, j) => {
                const value = matrix2[i] && matrix2[i][j] ? col * matrix2[i][j] : 0;
                return value;
            })
        );
    }

    // Function to sum all elements in a matrix
    sumMatrix(matrix) {
        return matrix.reduce((acc, row) =>
            acc + row.reduce((acc, col) => acc + col, 0), 0);
    }

    // Function to convert a matrix to a table
    matrixToTable(matrix) {
        const cellStyle = (value) => `style='padding: 0.8rem;${value !== 0 ? 'color:red' : 'color:white'}'`;
        const tableStyle = `style='border-collapse: collapse; border-right: 0.3rem solid #183D3D; border-left: 0.3rem solid #183D3D; border-radius: 1rem'`;

        const rows = matrix.map(row =>
            `<tr>${row.map(cell => `<td ${cellStyle(cell)}>${cell}</td>`).join('')}</tr>`
        ).join('');

        return `<table ${tableStyle}>${rows}</table>`;
    }

    getMatrixValues() {
        const rows = parseInt(document.getElementById("rowInput").value);
        const cols = parseInt(document.getElementById("colInput").value);

        const getCellValue = (i, j) => parseFloat(document.getElementById(`costMatrixInput_${i}_${j}`).value);

        const costMatrix = Array.from({ length: rows }, (_, i) => Array.from({ length: cols }, (_, j) => getCellValue(i + 1, j + 1)));

        const supplyMatrix = [Array.from({ length: cols }, (_, j) => parseFloat(document.getElementById(`arz_${j + 1}`).value))];

        const demandMatrix = Array.from({ length: rows }, (_, i) => parseFloat(document.getElementById(`talep_${i + 1}`).value));

        return { costMatrix, supplyMatrix, demandMatrix };
    }

    // Function to print the results to the screen
    printResults() {
        const values = this.getMatrixValues();

        document.getElementById("outputContainer").innerHTML = "";

        const transportationPlan = this.createTransportationPlan(values.costMatrix, values.supplyMatrix, values.demandMatrix);

        const resultMatrix = this.elementWiseMatrixMultiply(values.costMatrix, transportationPlan);

        const totalCost = this.sumMatrix(resultMatrix);

        const resultContent = document.createElement("div");
        const costMatrixHTML = `
            <div class="col">
                <h3><b>Maliyet Matrisi</b></h3>
                <h4><pre>${this.matrixToTable(values.costMatrix)}</pre></h4>
            </div>
        `;

        const transportationPlanHTML = `
            <div class="col">
                <h3><b>Nakliye Planı</b></h3>
                <h4><pre>${this.matrixToTable(transportationPlan)}</pre></h4>
            </div>
        `;

        const resultMatrixHTML = `
            <div class="col">
                <h3><b>Sonuç Matrisi</b></h3>
                <h4><pre>${this.matrixToTable(resultMatrix)}</pre></h4>
            </div>
        `;

        const totalCostHTML = `
            <div class="col">
                <h3><b>Toplam Maliyet</b></h3>
                <h4><p class="font-weight-bold">${totalCost} Birim</p></h4>
            </div>
        `;

        resultContent.innerHTML = `
            <div class="row">
                ${costMatrixHTML}
                ${transportationPlanHTML}
            </div>
            <div class="row">
                ${resultMatrixHTML}
                ${totalCostHTML}
            </div>
        `;

        document.getElementById("outputContainer").appendChild(resultContent);
    }
}


export default NorthwestTransportationPlan;
