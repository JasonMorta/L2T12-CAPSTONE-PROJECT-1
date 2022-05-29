import React from 'react'
import './timer.css'

export default function Timer(props) {

  const hideUI = props.opacity ? "opacityZero": "";
const low = props.lowTime ? "flicker": ""

  return (
    <div className={'timer'+hideUI}>
      
       <h2 className={low}>{props.timeOut+"'"}</h2>
    </div>
  )
}
