// note here, please check how to import ts definition, and js implementation from different sources
import Papa from "./PapaParser.js"; 

export function readFromCVSUrl(url: string){
    return new Promise((resolve)=>{
        Papa.parse(url, {
        download: true,
        complete: function(results ) {
            resolve(results);
        }
    })
});
}

export function readFromCVSInputFile(inputFileId: string){
    const fileInput = document.getElementById(inputFileId) as HTMLInputElement;
    const file = fileInput.files![0];
    if (!file) alert('Please upload a CVS file!');
    return new Promise((resolve)=>{
        Papa.parse(file, {
        download: true,
        complete: function(results ) {
            resolve(results);
        }
    })
});
}