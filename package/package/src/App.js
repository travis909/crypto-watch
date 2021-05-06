import React, { useEffect, useState } from 'react'
import './App.css'
import { PieChart } from './components/PieChart'
import { fetchData } from './components/GrabData'
import { Loader } from './components/Loader'
import background from './img2.jpg'

const crypto = [
  ['ada', 'cardano', 2138.08] 
  ,['bnb', 'binancecoin', 2]
  ,['doge', 'dogecoin', 1688.775]
  ,['vet', 'vechain', 4675]
  ,['hbar', 'hedera-hashgraph', 2360]
  ,['safemoon', 'safemoon', 9828319] // 100,000 SafeMoon will be gifted to Eric - Time 2:09 PM - ~4000/day?
  ,['safemars', 'safemars', 11858230]
].sort();

const Totals = props => {
  let { total_spent, total, profit } = props
  
  return (
    <div className='full' style={{textAlign: 'center', display: 'flex', flexDirection: 'row'}}>
      <p style={{color: 'red', width: '33%'}}><b>Total Spent: ${total_spent}.00</b></p>
      <hr /><p style={{color: 'darkgreen', width: '33%'}}><b>Total: ${total}</b></p>
      <hr /><p style={{color: 'darkgreen', width: '33%'}}><b>Profit: ${Math.round(profit).toFixed(2)}</b></p>
    </div>
  )
}

const getTotal = data => {
  let sum = 0
  crypto.forEach(c => sum = sum + parseFloat(data[`${c[0]}`]))
  return Math.round(sum).toFixed(2);
}

const getPieData = data => {
  let retArr = [['Name', 'Price']]
  let pieData = Object.keys(data).map(k => { return [k.toUpperCase(), parseFloat(data[k])]})
  return retArr.concat(pieData).sort((a,b) => sortData(a[1],b[1]))
}

function sortData(a,b) {
  if (isNaN(parseFloat(a))) {
      return -1
  } else if (isNaN(parseFloat(b))) {
      return 1
  } else if (parseFloat(a) > parseFloat(b)) {
      return -1
  } else if (parseFloat(a) < parseFloat(b)) {
      return 1
  } else {
      return 0
  }
}

function App() {
  const [state, setState] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData(crypto, setState, setLoading)
  },[])

  useEffect(() => {
    let a = async (b,c,d) => await fetchData(b,c,d)
    const interval = setInterval(() => a(crypto, setState, setLoading), 60000);
    return () => clearInterval(interval);
  }, [state])

  if (loading || Object.keys(state).length !== crypto.length) {
    console.log(JSON.stringify(state))
    return <Loader /> 
  } else {
    let total = getTotal(state)
    let total_spent = 1000 + 250 + 250 + 250 + 175 + 400 + 250 + 275 + 400 + 500 + 500 - 1000 //1000 from doge
    let profit = total - total_spent
    let pieData = getPieData(state)
    
    // const fixAt = (x) => x.toLowerCase() === 'safemoon' ? 8 : 3;

    const fixAt = x => {
      let y = parseFloat(x)
      if (y > 99) {
        return 0
      } else if (y > 1) {
        return 2
      } else if (y > .01) {
        return 3
      } else {
        return 8
      }
    }

    return (
      <div style={{textAlign: 'center', height: '100vh', width: '100%', backgroundImage: `url(${background})`}}>
        <div style={{fontSize:  20, textAlign: 'center', display: 'flex', flexDirection: 'row'}}>
          {pieData.filter(x => x[0] !== "Name").map(x => {
            return (
              <div key={`p1${x[0]}`} style={{width:`${(100/crypto.length)+(1/((100%crypto.length) === 0 ? 1 : (100%crypto.length) ))}%`}}>
                <p>{x[0].toUpperCase()}: </p>
                <p>${(state[x[0].toLowerCase()]/crypto.find(el => el[0] === x[0].toLowerCase())[2]).toFixed(fixAt((state[x[0].toLowerCase()]/crypto.find(el => el[0] === x[0].toLowerCase())[2])))}</p>
                <hr />
              </div>
            )
          })}
        </div>
        <Totals total_spent={total_spent} total={total} profit={profit} />
        <div style={{height: '30px'}} />
        <PieChart className='full' data={pieData.sort((a,b) => sortData(a[1],b[1]))} />
      </div>
    )
  }
}

export default App;
