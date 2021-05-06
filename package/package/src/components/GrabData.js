import axios from 'axios'

const url = 'https://api.nomics.com/v1/currencies/ticker?key=50962045aebd9e4e32773207c9819582&ids='
// const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?CMC_PRO_API_KEY=f6356c79-432a-4915-8a82-e091ed045df8&symbol=`

function fixed(num) {
  return parseFloat(num).toFixed(5)
}

function getSlug(crypto) {
  let tickers = crypto.map(c => c[0].toUpperCase())
  let tickers_slug = ''
  tickers.forEach((x,i) => (i + 1) === tickers.length ? tickers_slug += `${x}` : tickers_slug += `${x},`)
  return tickers_slug
}

export const fetchData = async (crypto, callback, setLoading) => {
  let ordered_data = crypto.map(c => c[2])

  try {
    axios.get(`${url}${getSlug(crypto)}`, {
      'Content-Type': 'text/plain',
      'Access-Control-Allow-Origin': '*'
  })
    .then(res => {
      let obj = {}
      res.data.sort((a,b) => a.id.localeCompare(b.id)).forEach((x,i) => {
        obj[x.symbol.toLowerCase()] = fixed(parseFloat(x.price) * parseFloat(ordered_data[i]))
      })
      callback(obj)
      setLoading(false)
    })    
  } catch (error) {
    alert(error)
    callback(error)
    setLoading(false)
  }

 
}