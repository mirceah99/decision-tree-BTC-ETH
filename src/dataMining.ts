import { Plant, ThreeNode } from "./definitions";

export function createDecisionTree(data: Plant[]) {
    const three: ThreeNode[] = [];
    const difValues = findDiffValues(data);
    console.log(difValues);
}


function findDiffValues(data: Plant[]) {
    const difValues:{
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
            
            if (key === "sepalLength"||key === "sepalWidth"||key === "petalLength"||key === "petalWidth"){

                const value = plant[key];
                if(difValues[key].indexOf(value) < 0) difValues[key].push(value);
            }
        }
    })
    return difValues;
}