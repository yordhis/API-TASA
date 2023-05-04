const express = require('express');
const app = express();
const { scrapperTasa } = require('./scrapperTasa');

app.set('title', 'Scrapper');
app.set('port', 3000);

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, 	X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-	Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, 	DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});

app.get('/', async (req, res)=>{
    // res.send('hola soy una IA de Scrapper Cyber Staff')
    await scrapperTasa()
    .then(response => {
        console.log(response)
        res.status(200).json(response)
    })
    .catch(err => res.status(404).json(err));
})

app.listen(app.get('port'), () => {
   console.log('Scrapper corriendo en el puerto: ' + app.get('port')); 
})