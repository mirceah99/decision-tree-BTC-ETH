import { Plant, ThreeNode } from "./definitions";
export let config = { MAX_DEPTH: 3 };
let rootNode: ThreeNode;
export function createDecisionTree(data: any[], depth: number) {

    // try to create node for data 
    const difValues = findDiffValues(data);
    const node = createNode(data, difValues);
    if (node) node.id = Math.floor(Math.random() * 2000);

    // if node is not possible or depth to big 
    if (!node || depth > config.MAX_DEPTH) return { values: evaluateValues(data), valuesRaw: evaluateValuesRaw(data), id: Math.floor(Math.random() * 2000) };



    //split data by created node
    const leftData = data.filter(obj => obj[node.feature!] < node.threshold!);
    const rightData = data.filter(obj => obj[node.feature!] >= node.threshold!);

    // console.log('node', node);
    const leftNode = createDecisionTree(leftData, depth + 1);
    const rightNode = createDecisionTree(rightData, depth + 1);
    node.left = leftNode;
    node.right = rightNode;
    return node;
}


function findDiffValues(data: any[]) {
    const difValues: any = {};
    data.forEach((object) => {
        for (let key in object) {
            if (key === "type") continue;

            const value = object[key];
            if (!difValues[key]) difValues[key] = [];
            if (difValues[key].indexOf(value) < 0) difValues[key].push(value);
        }
    })
    return difValues;
}

function getBestSplit(difValues: any, data: any[]): { feature: string, value: number, entropy: number } {
    const best = { feature: '', value: 0, entropy: Number.MAX_SAFE_INTEGER };
    for (let key in difValues) {
        for (let value of difValues[key]) {
            const newEntropy = getEntropy(data, key, value);
            if (newEntropy < best.entropy) {
                best.feature = key;
                best.value = value;
                best.entropy = newEntropy;
            }
        }
    }
    return best;
}

function getEntropy(dataFrame: any[], feature: string, value: number): number {
    const leftData = [];
    const rightData = [];

    for (const obj of dataFrame) {
        if (obj[feature] < value) leftData.push(obj);
        else rightData.push(obj);
    }

    const leftProportion = leftData.length / dataFrame.length;
    const rightProportion = rightData.length / dataFrame.length;
    return leftProportion * getEntropyFromArray(leftData) + rightProportion * getEntropyFromArray(rightData);
}

function getEntropyFromArray(array: any[]): any {
    const types: any = {};
    const len = array.length;
    array.forEach((obj) => {
        if (types[obj.type] === undefined) {
            types[obj.type] = 1;
        } else types[obj.type]++;
    })

    return Object.values(types)
        .reduce((sum: any, f: any) => sum - f / len * Math.log2(f / len), 0)

}

function createNode(dataSet: any[], difValues: any): ThreeNode | null {

    const bestSplit = getBestSplit(difValues, dataSet);
    if (bestSplit.entropy === 0) return null;
    return {
        left: null,
        right: null,
        entropy: bestSplit.entropy,
        feature: bestSplit.feature,
        values: evaluateValues(dataSet),
        threshold: bestSplit.value,
        valuesRaw: evaluateValuesRaw(dataSet)
    }
}


function evaluateValues(dataSet: any[]) {
    const types: any = {};
    const len = dataSet.length;
    dataSet.forEach((obj) => {
        if (types[obj.type] === undefined) {
            types[obj.type] = 1;
        } else types[obj.type]++;
    })
    for (let key in types) {
        types[key] /= len * 0.01;
    }
    return types;
}
function evaluateValuesRaw(dataSet: any[]) {
    const types: any = {};
    const len = dataSet.length;
    dataSet.forEach((obj) => {
        if (types[obj.type] === undefined) {
            types[obj.type] = 1;
        } else types[obj.type]++;
    })
    types.total = len;
    return types;
}


export function getPrediction(three: ThreeNode, inputs: any) {
    let nodeLocation = three;

    while (nodeLocation.left && nodeLocation.right) {
        if (nodeLocation.feature === undefined || nodeLocation.threshold === undefined) return "Prediction error";
        if (+inputs[nodeLocation.feature] < nodeLocation.threshold) {
            nodeLocation = nodeLocation.left;
        } else nodeLocation = nodeLocation.right;
    }
    let text = "";
    let max = 0;

    for (let key in nodeLocation.values) {
        if (nodeLocation.values[key] > max) {
            max = nodeLocation.values[key];
            text = key;
        }
    }
    return text;
}

export function calculateSuccessRate(three: ThreeNode, data: any[]) {

    const total = data.length;
    let success = 0;
    for (let i = 0; i < data.length; i++) {
        if (getPrediction(three, data[i]) === data[i].type) success++;
    }
    return (success / total) * 100;
}