
// Plant definition

export interface Plant { 
    sepalLength: number;
    sepalWidth: number;
    petalLength: number;
    petalWidth: number;
    type: string;
}
// export enum PlantType {
//     Setosa = 0,
//     Versicolor = 1,
//     Virginica = 2,
// }

// Three definition

export interface ThreeNode {
    left: ThreeNode | null;
    right: ThreeNode | null;
    infoGain: number;
    featureIndex: string | number;
    threshold: number;


    // leaf node (majority value)
    value: any;
}