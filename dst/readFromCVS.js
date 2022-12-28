// note here, please check how to import ts definition, and js implementation from different sources
import Papa from "./PapaParser.js";
export function readFromCVS(url) {
    return new Promise((resolve) => {
        Papa.parse(url, {
            download: true,
            complete: function (results) {
                resolve(results);
            }
        });
    });
}
