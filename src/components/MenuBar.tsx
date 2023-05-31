import React from 'react'
import { useState, useEffect } from 'react'
import './MenuBar.css'
import bullbear from '/bull-bear.png'


function MenuBar() {
  return (
    <>
        <div className='menubar'>
            <img src={bullbear} className="logo-menu" alt="StockCenter logo" />
            <a className='title-menu' href='/'> <h1 className='title-menu'>StockCenter</h1></a>
            <button 
            className='button-menu'
            onClick={() => {
                window.location.href = '/map'
            }}
            >
                Map
            </button>
        </div>
    </>
    
  )
}

export default MenuBar