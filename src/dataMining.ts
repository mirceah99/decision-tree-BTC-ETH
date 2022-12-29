import { Plant, ThreeNode } from "./definitions";

export function createDecisionTree(data: Plant[]) {
    const three: ThreeNode[] = [];
    const difValues = findDiffValues(data);
    console.log(difValues);
    console.log('test',getBestSplit(difValues, data));
}


function findDiffValues(data: Plant[]) {
    const difValues: {
        sepalLength: number[];
        sepalWidth: number[];
        petalLength: number[];
        petalWidth: number[];
    } = {
        sepalLength: [],
        sepalWidth: [],
        petalLength: [],
        petalWidth: []
    };
    data.forEach((plant) => {
        for (let key in plant) {
            if (key === "type") continue;

            if (key === "sepalLength" || key === "sepalWidth" || key === "petalLength" || key === "petalWidth") {

                const value = plant[key];
                if (difValues[key].indexOf(value) < 0) difValues[key].push(value);
            }
        }
    })
    return difValues;
}


function getBestSplit(difValues: {
    sepalLength: number[];
    sepalWidth: number[];
    petalLength: number[];
    petalWidth: number[];
}, data: Plant[]) {
    const best = { feature: '', value: 0, entropy: Number.MAX_SAFE_INTEGER };
    for (let key in difValues) {
        if (!(key === "sepalLength" || key === "sepalWidth" || key === "petalLength" || key === "petalWidth")) return;
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

function getEntropy(dataFrame: Plant[], feature: string, value: number): number {
    if (!(feature === "sepalLength" || feature === "sepalWidth" || feature === "petalLength" || feature === "petalWidth")) return -1;
    const leftData = [];
    const rightData = [];

    for (const plant of dataFrame) {
        if (plant[feature] < value) leftData.push(plant);
        else rightData.push(plant);
    }

    const leftProportion = leftData.length / dataFrame.length;
    const rightProportion = rightData.length / dataFrame.length;
    return leftProportion * getEntropyFromArray(leftData) + rightProportion * getEntropyFromArray(rightData);
}

function getEntropyFromArray(array: Plant[]): any {
    const types: any = {};
    const len = array.length;
    array.forEach((plant) => {
        if (types[plant.type] === undefined) {
            types[plant.type] = 1;
        } else types[plant.type]++;
    })

    return Object.values(types)
        .reduce((sum: any, f: any) => sum - f / len * Math.log2(f / len), 0)

}

