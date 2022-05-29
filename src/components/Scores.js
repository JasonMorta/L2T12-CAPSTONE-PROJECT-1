import React from 'react'
import './scores.css'

export default function Scores(props) {

  const hideUI = props.opacity ? "opacityZero": "";

  return (
   <div className={'scores '+hideUI}>
      <p className='matches'>Matches Found: {props.foundMatch}</p>
      <p className='missed'>Matches missed: {props.missMatch}</p>
      <p className='level'>Level: {props.screenLvl}</p>
   </div>
  )
}
