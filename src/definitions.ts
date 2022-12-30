
// Plant definition

export interface Plant { 
    sepalLength: number;
    sepalWidth: number;
    petalLength: number;
    petalWidth: number;
    type: string;
}
export type PlantAttributes = "sepalLength" | "sepalWidth" | "petalLength" | "petalWidth";
// export enum PlantType {
//     Setosa = 0,
//     Versicolor = 1,
//     Virginica = 2,
// }

// Three definition

export interface ThreeNode {
    left?: ThreeNode | null;
    right?: ThreeNode | null;
    infoGain?: number;
    entropy?: number;
    feature?: string | number;
    threshold?: number;
    id?: number;


    // leaf node (majority value)
    values: any;
    valuesRaw?: any;
}
