import Papa from "./PapaParser.js";
export function readFromCVS(url) {
    Papa.parse(url, {
        download: true,
        complete: function (results) {
            console.log(results);
        }
    });
}
