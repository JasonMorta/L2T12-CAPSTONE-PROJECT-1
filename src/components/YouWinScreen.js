import React from 'react'
import './winORloose.css'

export default function YouWinScreen(props) {
  return (
    <div className='win-screen '>
      <img src="../../img/winsBoard.png" alt="win screen" className='scale-in-bottom'/>
      <div className='scoreBoard scale-in-bottom'>
        <h1>Matched Cards: {props.matchedCards}</h1>
        <h1>Missed Cards: {props.missedCards}</h1>
        <h1>Best time: {props.roundTime+"'"}</h1>
      </div>
    </div>
  )
}
