export function createDecisionTree(data) {
    const three = [];
    const difValues = findDiffValues(data);
    console.log(difValues);
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
