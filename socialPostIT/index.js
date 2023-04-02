// importiamo i package express, path, body parser,data json(il "database" dove conserviammo le info)
const ejs = require('ejs');

let express = require('express');  //il modulo express crea un server web JavaScript.
let fs = require('fs');  //modulo fs consente di leggere e scrivere file, creare directory e gestire i permessi dei file
let path = require('path'); //modulo path permette di manipolare i percorsi dei file e delle directory
let bodyParser = require('body-parser') //in combinazione con Express consente di analizzare i dati delle richieste HTTP
let data = require('./data/data.json'); // consente di importare dati dal file data.json
let app = express(); //l'istruzione crea un'istanza Express vuota, pronta per essere configurata e utilizzata nel linguaggio 
let myLibrary = require('./myutils.js') //consente di importare funzioni dal file myutils.js .

//per visualizare la pagina

app.set('view engine', 'ejs'); //imposta EJS come view engine predefinito dell'applicazione Express, consentendo di utilizzare EJS per generare pagine HTML dinamicamente.
app.set('views', path.join(__dirname, 'app_views'))  //crea path tra index e app_views per far visualizzare il contenuto
app.use(bodyParser.urlencoded({ extended: true })) //consente di utilizzare il body-parser per analizzare le richieste HTTP e accedere ai dati inviati dal client

//se url cè / renderizza a index.ejse passa le due variabili a index 
app.get('/', function(req, res) {
  res.render('pages/index', {
    titoloJSON: "Home",
    currentPage: "Home"
  });
});

//se url cè /social renderizza a social.ejs e passa le due variabili a social
app.get('/social', function(req, res) {
  
  //creamo un "oggetto" in cui mettiamo tutti i dati di data.json al in interno
  data = myLibrary.readFile('./data/data.json')
  
  //rendirizza pagina social passando data e titolojson e currentPage
  res.render('pages/social', {
    data: data,
    titoloJSON: "Social",
    currentPage: "Social"
  });
});

//se nel url c'è /scrivi (soltanto se stiamo scrivendo nel box input)
app.post('/scrivi', function(req, res) {    

  //creamo un "oggetto" chiamato dataJSON e ci inseriamo i dati di data.json
  let dataJSON = myLibrary.readFile('./data/data.json');
  let d = new Date();
  let dataStrinf = d.getDate
  //crea person, un "oggetto" con nome e messaggio
  let person = {
    name: req.body.name,  //richiede dal body quello che è stato inserito nel input e lo assegna
    message: req.body.message, //richiede dal body quello che è stato inserito nel input e lo assegna
    ora: new Date().toLocaleDateString()
  }

  //richiede una funzione della libreria myLibrary che inserira person al interno di dataJSON (che è una stringa)
  myLibrary.addElementToJSON(dataJSON, person);
  
  //aggiorna l'arrey con con i dati al interno di dataJSON
  myLibrary.writeFileJSON('./data/data.json', dataJSON);
  
  //rindirizza alla pagina social
  res.redirect('/social');
});

app.listen(8080, function (res,req) {
  console.log('listening on port 8080');
});