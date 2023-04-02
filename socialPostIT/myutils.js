
let fs = require('fs')

//Questa funzione inserisce l'elemento (element) al interno di jsonData(l oggetto,non il file)
function addElementToJSON(jsonData, element) {
  jsonData.push(element)
}

//Questa funzione sovrascrive i dati del file dati.json con quelli del "oggetto" dataJSON
function writeFileJSON(file, dataJSON) {
  fs.writeFile(file, JSON.stringify(dataJSON), (err) => {
    if (err) {
      throw err;
    } else
      console.log('i dati li ho scritti nel file data.json');
  })
}

//Questa funzione legge i dati al interno del file e li restituisce
function readFile(percorsoFile) {
  var data;
  data = fs.readFileSync(percorsoFile, "utf8", (err, dati) => {
    if (err) {
      console.error(err);
      return;
    } else {
      return dati;
    }
  });
  return JSON.parse(data);
}

//esporta i moduli consentendo ad altri moduli di importare queste funzioni e utilizzarle
module.exports = {
  addElementToJSON: addElementToJSON,
  writeFileJSON: writeFileJSON,
  readFile: readFile 
}