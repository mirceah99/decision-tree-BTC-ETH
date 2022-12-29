import { readFromCVSInputFile } from "./readFromCVS.js";
import { createDecisionTree } from "./dataMining.js";
import { displayTree } from "./UI.js";
const calculateButton = document.getElementById('calculate');
async function loadData() {
    const cvsData = await readFromCVSInputFile('myfile');
    const data = [];
    for (let i = 1; i < cvsData.data.length; i++) {
        const array = cvsData.data[i];
        data.push({
            sepalLength: +array[0],
            sepalWidth: +array[1],
            petalLength: +array[2],
            petalWidth: +array[3],
            type: array[4],
        });
    }
    const decisionTree = createDecisionTree(data, 1);
    console.log('Three: ', decisionTree);
    displayTree('tree', decisionTree);
}
calculateButton.addEventListener("click", loadData);
