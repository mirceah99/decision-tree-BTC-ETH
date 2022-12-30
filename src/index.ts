import { readFromCVSInputFile } from "./readFromCVS.js"
import { ThreeNode } from "./definitions"
import { createDecisionTree, config, getPrediction, calculateSuccessRate} from "./dataMining.js";
import { displayTree, hideTree, generatePredictionInputs, getInputsPlaceholder, displayPrediction, displaySuccessRate, setSampleCvsLink } from "./UI.js";

let decisionTree: ThreeNode;
const calculateTree = document.getElementById('calculate') as HTMLButtonElement;
const calculatePredictionBtn = document.getElementById('calculate-prediction') as HTMLButtonElement;
const deep = document.getElementById('deep') as HTMLInputElement;
const displayCvs = document.getElementById('my-cvs')!;
const cvsSwitch = document.getElementById("display-cvs") as HTMLInputElement;

async function loadData() {
    const cvsData = await readFromCVSInputFile('myfile') as { data: string[][] };
    const data: any[] = [];
    const cvsFirstLine = cvsData.data[0];
    for (let i = 1; i < cvsData.data.length; i++) {
        const array = cvsData.data[i];
        const obj: any = { type: array[array.length - 1] };
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


cvsSwitch?.addEventListener('change',function(ev){
    displayCvs.classList.toggle("hidden");
})

setSampleCvsLink();