var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { readFromCVS } from "./readFromCVS.js";
import { createDecisionTree } from "./dataMining.js";
const x = "Hello!";
console.log(x);
function loadData() {
    return __awaiter(this, void 0, void 0, function* () {
        const cvsData = yield readFromCVS('/data/iris.csv');
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
    });
}
loadData();
