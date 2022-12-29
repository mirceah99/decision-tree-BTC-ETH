import { ThreeNode } from "./definitions";
export function displayTree(parentId: string, rootNode: ThreeNode, resultOf?: string) {
    const parent = document.getElementById(parentId)!;
    const resultOfText = resultOf ? `<p>Passed condition: ${resultOf}</p>` : '';
    const decisionFeature = rootNode.feature ? `<p>Decision feature:</p> <p>${rootNode.feature}</p>` : "";
    const decisionThreshold = rootNode.feature ? `<p>Decision threshold:</p> <p>${rootNode.threshold}</p>` : "";
    let maxPercent = 0;
    let prediction = 'Unknown';
    let values = "";
    const childPlaceholder = (rootNode.left || rootNode.right) ? `<ul id="node-${rootNode.id}-content"> </ul>` : ""
    for (let key in rootNode.values) {
        if (maxPercent < rootNode.values[key]) {
            maxPercent = rootNode.values[key];
            prediction = key;
        }
        values += '<table>';
        values += ` <tr> <th> ${key}: </th> <th class="fix-width">${rootNode.values[key].toFixed(2)} %</th> </tr>`
        values += '</table>';

    }
    parent.innerHTML += `
                <li>
                    <div>
                        ${resultOfText}
                        <p>Node id: ${rootNode.id} </p>
                        ${values}
                        <h2 class="prediction">Prediction: ${prediction}</h2>
                    </div>
                    ${childPlaceholder}
                </li>
                  `;

    rootNode.left && displayTree(`node-${rootNode.id}-content`, rootNode.left, `${rootNode.feature} < ${rootNode.threshold}`);
    rootNode.right && displayTree(`node-${rootNode.id}-content`, rootNode.right, `${rootNode.feature} >= ${rootNode.threshold}`);


}