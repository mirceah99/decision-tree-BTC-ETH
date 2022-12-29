import { readFromCVS } from "./readFromCVS.js";
import { createDecisionTree } from "./dataMining.js";
const x = "Hello!";
console.log(x);
async function loadData() {
    const cvsData = await readFromCVS('/data/iris.csv');
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
    console.log(data);
    createDecisionTree(data);
}
loadData();
