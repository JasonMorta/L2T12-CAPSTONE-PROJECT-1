import React from 'react'
import cardBack from '../back.jpg'
import '../cards.css'


export default function SingleCard({ card, handleChoice}) {


   const handleClick=()=>{
      handleChoice(card)
   }

   const selected = card.isSelected ? " green ": "";
   const faceUp = card.faceUp ? " face-up ": " face-down ";
   const border = card.blinkBorder ? " border-blink ":"";
   

  return (
     <div className={selected+border+'card flip-card'}>
       <div className={faceUp+"flip-card-inner"}>
        <div className="flip-card-front">
          <img  src={card.src}
                className="front"
                alt="cardFront"/>
        </div>
        <div className="flip-card-back">
          <img  src={cardBack}
                className="back "
                alt="cardBack" 
                onClick={handleClick}
          />
        </div>
       
       </div>
       </div>
  )
}
