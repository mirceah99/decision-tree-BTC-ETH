import { readFromCVSInputFile } from "./readFromCVS.js"
import { Plant } from "./definitions"
import { createDecisionTree, config } from "./dataMining.js";
import { displayTree, hideTree, generatePredictionInputs } from "./UI.js";

const calculateButton = document.getElementById('calculate') as HTMLButtonElement;
const deep = document.getElementById('deep') as HTMLInputElement;
async function loadData() {
    const cvsData = await readFromCVSInputFile('myfile') as { data: string[][] };
    const data: Plant[] = [];
    for (let i = 1; i < cvsData.data.length; i++) {
        const array = cvsData.data[i];
        data.push({
            sepalLength: +array[0],
            sepalWidth: +array[1],
            petalLength: +array[2],
            petalWidth: +array[3],
            type: array[4],
        })
    }
    config.MAX_DEPTH = +deep.value;
    const decisionTree = createDecisionTree(data, 1);
    const attributes = cvsData.data[0].splice(0, cvsData.data[0].length -1);
    generatePredictionInputs(attributes);
    hideTree('tree');
    displayTree('tree', decisionTree);
}
calculateButton.addEventListener("click",  loadData);
