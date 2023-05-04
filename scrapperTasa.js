const puppeteer = require('puppeteer');
// const randomUseragent = require('random-useragent');

const {join} = require('path');
module.exports = {
  // Changes the cache location for Puppeteer.
  cacheDirectory: join(__dirname, '.cache', 'puppeteer'),
};

/** Esta funcion anonima ejecuta el Script y retorna los datos de la tasa del dia BCV */
    const scrapperTasa = async () => {
        /** Abrimos el navegador */
        const browser = await puppeteer.launch();

        /** Abrimos una nueva pestaña */
        const page = await browser.newPage();

        /** declaramos la variable donde retornaremos el resultado */
        const result = [];
    
        /** Asignamos la url donde extraeremos los datos */
        await page.goto('https://www.bcv.org.ve/');
    
        /** Se configura el ancho y alto de la pantalla para que nos detecte con pc de escritorio o movil */
        await page.setViewport({width: 1080, height: 1024});

        /** Obtenemos los datos del sitio web */
        const pricesUsd = await page.$eval('#dolar', precio => precio.textContent);
        const pricesEuro = await page.$eval('#euro', precio => precio.textContent);
        
        /** Asignamos los datos ya optimizados a el resultado */
        result.push(getPriceOptimizado(pricesUsd));
        result.push(getPriceOptimizado(pricesEuro));
        /** Cerramos el navegador */
        await browser.close();
        
        /** Retornamos el array de objetos como resultado */
        // console.log(JSON.stringify(result));
        return JSON.stringify(result) 
    };

/** Esta funcion se encarga de optimizar los datos optenidos del BCV */
  const getPriceOptimizado = (price) =>{

        /** En esta linea se limpia todos los espacios y asigna un array */
        let pricesOptimit = price.trim().split(" ").filter(a => a !== '');

        /** Esta linea obtiene el precio y lo convierte a numero */
        let currentPrice = parseFloat(pricesOptimit[pricesOptimit.length - 1].replace(',', '.'));

        /** Esta linea obtiene el nombre de la moneda y se limpia el string basura */
        let currency = pricesOptimit[0].replace('\t', '');

        /** retornamos un objeto de la tasa */
        return {
            currency,
            currentPrice
        }
  };

  module.exports = {
    scrapperTasa,
    getPriceOptimizado
  };