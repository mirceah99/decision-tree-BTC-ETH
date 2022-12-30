import { readFromCVSInputFile } from "./readFromCVS.js";
import { createDecisionTree, config, getPrediction, calculateSuccessRate } from "./dataMining.js";
import { displayTree, hideTree, generatePredictionInputs, getInputsPlaceholder, displayPrediction, displaySuccessRate, setSampleCvsLink } from "./UI.js";
let decisionTree;
const calculateTree = document.getElementById('calculate');
const calculatePredictionBtn = document.getElementById('calculate-prediction');
const deep = document.getElementById('deep');
const displayCvs = document.getElementById('my-cvs');
const cvsSwitch = document.getElementById("display-cvs");
async function loadData() {
    const cvsData = await readFromCVSInputFile('myfile');
    const data = [];
    const cvsFirstLine = cvsData.data[0];
    for (let i = 1; i < cvsData.data.length; i++) {
        const array = cvsData.data[i];
        const obj = { type: array[array.length - 1] };
        for (let j = 0; j < cvsFirstLine.length - 1; j++) {
            obj[cvsFirstLine[j]] = array[j];
        }
        data.push(obj);
    }
    console.log(data);
    displayCvs.innerHTML = JSON.stringify(data, null, 4);
    config.MAX_DEPTH = +deep.value;
    decisionTree = createDecisionTree(data, 1);
    const attributes = cvsData.data[0].splice(0, cvsData.data[0].length - 1);
    generatePredictionInputs(attributes);
    hideTree('tree');
    displayTree('tree', decisionTree);
    const successRate = calculateSuccessRate(decisionTree, data);
    displaySuccessRate(successRate);
}
function calculatePrediction() {
    const inputs = getInputsPlaceholder();
    console.log(inputs);
    const prediction = getPrediction(decisionTree, inputs);
    console.log(prediction);
    displayPrediction(prediction);
}
calculateTree.addEventListener("click", loadData);
calculatePredictionBtn.addEventListener("click", calculatePrediction);
cvsSwitch === null || cvsSwitch === void 0 ? void 0 : cvsSwitch.addEventListener('change', function (ev) {
    displayCvs.classList.toggle("hidden");
});
setSampleCvsLink();
