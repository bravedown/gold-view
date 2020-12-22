const axios = require("axios");
const csv = require("csvtojson");

function yahooFinanceCall(symbol, range) { 
    return new Promise((resolve, reject) => {
        const queryURL = `https://query1.finance.yahoo.com/v7/finance/download/${symbol}?range=${range}&interval=1d&events=history`;
        axios.get(queryURL)
            .then(res => {
                csv()
                    .fromString(res.data)
                    .then(arr => resolve(arr))
                    .catch(err => reject(err));
            })
            .catch(err => reject(err));
    })
}
async function goldVsSymbol(symbol1, symbol2, range) {
    let processedData = [];
    let goldPrices = await yahooFinanceCall("GC=F", range);
    let symbolPrices = await yahooFinanceCall(symbol1, range);
    goldPrices = goldPrices.filter(el => el.Close !== 'null');
    symbolPrices = symbolPrices.filter(el => el.Close !== 'null');
    console.log(symbolPrices);
    for (let i = 0; i < symbolPrices.length; i++) {
        let dollarsPerGoldGram = goldPrices[i].Close / 28.3495;
        processedData.push({
            time: goldPrices[i].Date,
            open: (+symbolPrices[i].Open / dollarsPerGoldGram).toFixed(6),
            high: (+symbolPrices[i].High / dollarsPerGoldGram).toFixed(6),
            low: (+symbolPrices[i].Low / dollarsPerGoldGram).toFixed(6),
            close: (+symbolPrices[i].Close / dollarsPerGoldGram).toFixed(6)
        });
    }
    return processedData;
}

module.exports = goldVsSymbol;
