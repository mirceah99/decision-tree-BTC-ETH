export let config = { MAX_DEPTH: 3 };
let rootNode;
export function createDecisionTree(data, depth) {
    // try to create node for data 
    const difValues = findDiffValues(data);
    const node = createNode(data, difValues);
    if (node)
        node.id = Math.floor(Math.random() * 2000);
    // if node is not possible or depth to big 
    if (!node || depth > config.MAX_DEPTH)
        return { values: evaluateValues(data), id: Math.floor(Math.random() * 2000) };
    //split data by created node
    const leftData = data.filter(plant => plant[node.feature] < node.threshold);
    const rightData = data.filter(plant => plant[node.feature] >= node.threshold);
    // console.log('node', node);
    const leftNode = createDecisionTree(leftData, depth + 1);
    const rightNode = createDecisionTree(rightData, depth + 1);
    node.left = leftNode;
    node.right = rightNode;
    return node;
}
function findDiffValues(data) {
    const difValues = {
        sepalLength: [],
        sepalWidth: [],
        petalLength: [],
        petalWidth: []
    };
    data.forEach((plant) => {
        for (let key in plant) {
            if (key === "type")
                continue;
            if (key === "sepalLength" || key === "sepalWidth" || key === "petalLength" || key === "petalWidth") {
                const value = plant[key];
                if (difValues[key].indexOf(value) < 0)
                    difValues[key].push(value);
            }
        }
    });
    return difValues;
}
function getBestSplit(difValues, data) {
    const best = { feature: '', value: 0, entropy: Number.MAX_SAFE_INTEGER };
    for (let key in difValues) {
        if (!(key === "sepalLength" || key === "sepalWidth" || key === "petalLength" || key === "petalWidth"))
            throw 'err, key is not correct';
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
function getEntropy(dataFrame, feature, value) {
    if (!(feature === "sepalLength" || feature === "sepalWidth" || feature === "petalLength" || feature === "petalWidth"))
        return -1;
    const leftData = [];
    const rightData = [];
    for (const plant of dataFrame) {
        if (plant[feature] < value)
            leftData.push(plant);
        else
            rightData.push(plant);
    }
    const leftProportion = leftData.length / dataFrame.length;
    const rightProportion = rightData.length / dataFrame.length;
    return leftProportion * getEntropyFromArray(leftData) + rightProportion * getEntropyFromArray(rightData);
}
function getEntropyFromArray(array) {
    const types = {};
    const len = array.length;
    array.forEach((plant) => {
        if (types[plant.type] === undefined) {
            types[plant.type] = 1;
        }
        else
            types[plant.type]++;
    });
    return Object.values(types)
        .reduce((sum, f) => sum - f / len * Math.log2(f / len), 0);
}
function createNode(dataSet, difValues) {
    const bestSplit = getBestSplit(difValues, dataSet);
    if (bestSplit.entropy === 0)
        return null;
    return {
        left: null,
        right: null,
        entropy: bestSplit.entropy,
        feature: bestSplit.feature,
        values: evaluateValues(dataSet),
        threshold: bestSplit.value
    };
}
function evaluateValues(dataSet) {
    const types = {};
    const len = dataSet.length;
    dataSet.forEach((plant) => {
        if (types[plant.type] === undefined) {
            types[plant.type] = 1;
        }
        else
            types[plant.type]++;
    });
    for (let key in types) {
        types[key] /= len * 0.01;
    }
    return types;
}
