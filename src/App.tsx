import bear from '/bearmarket.png'
import bull from '/bullmarket.png'

import Stocks from './Stocks'
import './App.css'
import MenuBar from './components/MenuBar'

function App() {


  return (
    <>
      <MenuBar />
      <div>
          <img src={bull} className="logo" alt="Vite logo" />
        
          <img src={bear} className="logo react" alt="React logo" />
      </div>
      <h1 className='title'>StockCenter</h1>
      <div className="card">
        <Stocks />
      </div>
      <p className='read-the-docs'>
        Stock data shown is from the Alpha Vantage API, data is a day old
      </p>
    </>
  )
}

export default App
