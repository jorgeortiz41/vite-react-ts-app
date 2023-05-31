import bear from '/bearmarket.png'
import bull from '/bullmarket.png'

import Stocks from './Stocks'
import './App.css'

function App() {


  return (
    <>
      <div>
          <img src={bull} className="logo" alt="Vite logo" />
        
          <img src={bear} className="logo react" alt="React logo" />
      </div>
      <h1 className='title'>StockCenter</h1>
      <div className="card">
        <Stocks />
      </div>
      <p className='read-the-docs'>
        Stock data shown is from the Alpha Vantage API, data is 4 days old
      </p>
    </>
  )
}

export default App
