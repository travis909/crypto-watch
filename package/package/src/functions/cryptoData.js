import axios from 'axios'

const url = "https://api.coingecko.com/api/v3/coins"

export const fetchCoinData = async (name, ticker, callback, setLoading) => {
    try {
        let res = await axios.get(`${url}/${name}`)
        callback({[`${ticker}`]: res.data.market_data.current_price.usd})
        setLoading(false)
    } catch (error) {
        callback(error)
        setLoading(false)
    }
}

export const fetchMultipleCoinsData = async (coins, callback, setLoading) => {
    // coins = [{name: ticker}, {name: ticker}]
    const grab = async (url, name, ticker) => {
        let res = await axios.get(`${url}/${name}`)
        return { [`${ticker}`]: res.data.market_data.current_price.usd }
    }
    try {
        let retVal = []

        await coins.forEach(async coin => {
            let ticker = Object.keys(coin)[0]
            let name = Object.values(coin)[0]
            await grab(url, name, ticker).then(x => retVal.push(x))
            return retVal
        })

        callback(retVal)        
        setLoading(false)
    } catch (error) {
        callback(error)
        setLoading(false)
    }
}