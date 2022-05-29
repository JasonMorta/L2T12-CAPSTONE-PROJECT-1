/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/alt-text */
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CardList from './components/CardList';
import './cards.css'
import SingleCard from './components/SingleCard';
import { nanoid } from 'nanoid'
import Scores from './components/Scores';
import Timer from './components/Timer';
import YouWinScreen from './components/YouWinScreen';
import YouLooseScreen from './components/YouLooseScreen';
import Guide from './components/Guide';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import React, { Component } from 'react'
import Confetti from 'react-confetti'

export default class App extends Component {
  constructor(props) {
    super(props);

  //bind events/buttons
  this.handleChoice = this.handleChoice.bind(this)//selecting a card
  this.start = this.start.bind(this)//start btn
  this.RESTART = this.RESTART.bind(this)//new game btn



    //Set initial state
    this.state = {
      cards: CardList
      .slice(6)//initial array has 10 items. Remove the first 6 items.
      .sort(() => 0.5 - Math.random())
      .map((card) => ({...card, id: nanoid(), faceUp: true })),
      flip: true,//used to update state
      blinkBorder: false,
      compareCard1: null,//used to compare cards
      compareCard2: null,//used to compare cards
      level: 6,//set the amount of card on each lvl
      start: true,//removes the start btn during play and after win/lose
      screenLvl: 1,//displays level.
      foundMatch: 0,//display found matches
      missMatch:0,//display miss-matches
      enableLvlBtn: false,//Display next lvl btn when all matches are found.
      timer: "",//each round is 30 sec.
      timerDefault: 30,//sets the time for each lvl
      clearTimer: false,//clear timer when /timeOut/new game click/next lvl click.
      timeWarning: false,//blink time is at 10s
      youWin:false,
      youLoose:false,
      levelBg: 1,
      levelBgDefault: 1,
      hideScores: true,
      modalShow: false,
      confetti: false,
    }
  };

  //Run shuffle on page loads
  componentDidMount(e){
    //this.shuffleCards()
      
  }
  //================================================================================================================
  //START ROUND (flip all cards face down and start the countdown)
  start() {
    this.state.cards.forEach((card)=>{
      card.faceUp = false
    })// flip all cards face down
    this.setState(prevState => ({
      timer: this.state.timerDefault,
      clearTimer: false,
      youLoose: false,
      hideScores: false,
    }))

    let timeUp = setInterval(()=> { //execute events base on time
      this.setState(prevState => ({
        timer: prevState.timer - 1
      }))

      //TIME OUT
      //the timer will stop when any of these condition are true
      if  ( this.state.timer === 1 ||
            this.state.enableLvlBtn === true ||
            this.state.clearTimer === true ||
            this.state.foundMatch === 14  ) {

            clearInterval(timeUp);//stops time
            this.setState({timeWarning: false,hideScores: true,})
      }

      if  ( this.state.timer === 1 ){
        this.setState({youLoose: true})
      }

      if (this.state.timer === 11) {// timer starts blinking at 11s
        this.setState({timeWarning: true})
      } else if (this.state.timer <= 1) {
        this.setState({timeWarning: false})
      }
    
    }, 1000);//setInterval end

    this.setState({
      start: false,
    })//Wth out the setState this function wont execute.

  } //start button end

  //==========================================================================================================
  // RESTART BUTTON (resets all value and re-shuffles deck)
  RESTART(){
      this.setState({
        timer:this.state.timer,
       
      }, () => {
          this.setState({
          cards: CardList
          .slice(6)
          .sort(() => 0.5 - Math.random())
          .map((card) => ({...card, id: nanoid(), faceUp: true })),//re-shuffle cards
          level: 6,//start at lvl 1
          missMatch: 0,//clear scores
          foundMatch: 0,//clear scores
          start: true,//
          timeWarning: false,
          clearTimer: true,
          youLoose: false,
          youWin: false,
          hideScores: true,
          enableLvlBtn: false,///remove this button
          levelBg: this.state.levelBgDefault,
          confetti: false,
        }, ()=>{
          this.setState({
            timer: "",//reset the time
            compareCard1: null,//used to compare cards
            compareCard2: null,//used to compare cards
            screenLvl: 1,//displays level.
            modalShow: false,
          })
        })
      })
  }//new game button end

  //========================================================================================================================
      //NEXT LVL BUTTON
  nextLvl(e){
      this.setState({
        level: this.state.level - 2// removes 6-2= 4 array Items. add 2 more cards to game
      }, ()=>{
        this.setState({
          enableLvlBtn: false,//removes next level btn
          cards: CardList
          .slice(this.state.level)
          .sort(() => 0.5 - Math.random())
          .map((card) => ({...card, id: nanoid(), faceUp: true })),//re-shuffles new array/cards
          start: true,
          clearTimer: true,
          youWin:false,
          youLoose:false,
          timer: this.state.timerDefault,
          levelBg: this.state.levelBg +1,
          hideScores: true,
          compareCard1: null,//used to compare cards
          compareCard2: null,//used to compare cards
          confetti: false,
        })
      })
 
      //update level
      if (this.state.level === 6) {
        this.setState({ screenLvl: 2})
      } else if (this.state.level === 4) {
        this.setState({ screenLvl: 3})
      } else if (this.state.level === 2) {
        this.setState({ screenLvl: 4})
    }
  }//next lvl button end
   
//======================================================================================================
//show modal button
showModal(){
  this.setState({modalShow: true,})
}

closeModal(){
  this.setState({modalShow: false,})
}

//===========================CARD EVENTS==============================
    //This function handles the card flip events
    handleChoice(card){

      //To match selected cards, we will compare state object compareCard1 & compareCard2
      //using THREE if statements.
      //* Every time we "setSate", we will use it's callback function to immediately update the UI
      //The first condition sets the values for card1(first card).
      //Any card that gets clicked after the first one, their values will be compared with card1
      //The last condition will reset all value and update scores, levels, time, ect.


      //*all matching cards have the same (card.qr) value.

      // run the **FIRST CHECK**
      if (this.state.compareCard1 === null) {//if true. set state for card1 
        this.setState({

          compareCard1: card.qr, // Store the first clicked card in state
          flipCard: card.faceUp = true,//flips card face up
          selected: card.isSelected = true,// add a green glow around the selected card
          
        })  

        //When choosing the second card         
        // This statement will compare car1 with the current card(card2)
        // if card1 & card2 !NOT MATCH. execute the following code.
      } else if (card.qr !== this.state.compareCard1  ){ //run the **SECOND CHECK** fails ✖✖
        
              //set the state and execute it's callback function.
              this.setState({
                compareCard2: card.qr, //flip the second card and store it's qr value
                flipCard: card.faceUp = true,//flip second card. We will flip this card back in the callback function
                missMatch: this.state.missMatch + 1,//add Missed Points
              }, 
              ()=>{//setState callback

                //flips second card back after 500ms.
                setTimeout(() => {
                  this.setState({flipCard: card.faceUp = false,
                    });
                }, 500);
              });

              //if **SECOND CHECK** matches ✔✔
              //when card2 DOES MATCH. execute the following code.
      } else {

        this.setState({
          compareCard2: card.qr,// add second card qr to state
          flipCard: card.faceUp = true,
          foundMatch: this.state.foundMatch + 1,//add Found points
          selected: card.isSelected = true,
          blinkBorder: card.blinkBorder = true,
          
        }, ()=>{//setState callback

          // WIN or LOSE actions
          //each level has a limited foundMatch value.
          //if foundMatch value is reached, game is WON
          //used for: next lvl btn & Win screen
          if (this.state.foundMatch === 2) {
            this.setState({ enableLvlBtn: true, youWin: true, level_1: true, hideScores: true, confetti: true,})
          } else if(this.state.foundMatch === 5) {
            this.setState({ enableLvlBtn: true, youWin: true, level_2: true, hideScores: true, confetti: true,})
          } else if (this.state.foundMatch === 9) {
            this.setState({ enableLvlBtn: true, youWin: true, level_3: true, hideScores: true, confetti: true,})
          } else if (this.state.foundMatch === 14) {//final round
            this.setState({ enableLvlBtn: false, youWin: true, level_4: true, hideScores: true, confetti: true,})
          }
          
          // when the second card Matches
          if (this.state.compareCard2 === this.state.compareCard1) {

            //add 1 point to scoreboard
            //keep the matched cards face up
            //matched ; true;
            setTimeout(() => {
              this.setState({//reset state values
                compareCard1: null,
                compareCard2: null,
                keepFaceUp: false,
                blinkBorder: card.blinkBorder = false,

              })
            }, 500);
           
          } 
        })//setState end
      } 
    
    }//===================Finding Cards Events END========================


  render() {

    //Win board
    const winScreenUI = <YouWinScreen 
    missedCards={this.state.missMatch}
    matchedCards={this.state.foundMatch}
    roundTime={this.state.timer}
    />

    //Loose board
    const looseScreenUI =<YouLooseScreen
    missedCards={this.state.missMatch}
    matchedCards={this.state.foundMatch}
    roundTime={this.state.timer} />

    //On-screen scores
    const displayScoresUI =  <Scores 
    foundMatch={this.state.foundMatch}
    missMatch={this.state.missMatch}
    screenLvl={this.state.screenLvl}
    opacity={this.state.hideScores}
    />

    //Display countdown timer
    const timerUI = <Timer
    timeOut={this.state.timer}
    lowTime={this.state.timeWarning}
    opacity={this.state.hideScores}
    />

    //The CARD : add a functions to each card
    const cardUI = this.state.cards.map(card => (
      <SingleCard key={card.id}
                  card={card}
                  handleChoice={this.handleChoice}//click event
                  faceUp={card.faceUp}
                  isSelected={card.isSelected}
                  blinkBorder={card.blinkBorder}/>))

    //Start button (Hide during game play)
    const startBtnUI = this.state.start === true ? 
                      <div  className="btn-cont">
                      <img  className="myBtn pulsate-fwd" 
                            onClick={this.start} src='../../img/startBtn.png' />
                      </div>:
                      <></>

    //Next lvl button (only show when round is won)
    const nextLvlBtnUI = this.state.enableLvlBtn === false ? 
    <img  className="hidden" 
          onClick={this.nextLvl.bind(this)} 
          src='../../img/nextlvl.png'/>:
    <img  className={this.state.enableLvlBtn ? "myBtn bounce-top": ""} 
          onClick={this.nextLvl.bind(this)} 
          src='../../img/nextlvl.png'/>

    //New game (restart the game & re shuffles cards)
    const newGameBtnUI = <img className="myBtn" 
                              onClick={this.RESTART} 
                              src="../../img/RESTART.png"/>

    //Instructions
    const guideUI = <Guide />

//================================= Font-end UI
    return (
      <div className="App-container ">
        {this.state.confetti ? <Confetti />:<></>}
      <section className="App">
        
        <img className='backGroundImage' src={'../../img/bg'+this.state.levelBg+'.jpg'} alt="back-ground image"/>
          {this.state.youLoose ? looseScreenUI: <></>}
          {this.state.youWin ? winScreenUI: <></>}
          
        {displayScoresUI}
        {timerUI}
        {guideUI}
          <h1 className='heading'>Match Your Animals</h1>
        
        <div className='button-container'>
          {startBtnUI}
          <div className="btn-cont">
          {newGameBtnUI}
          </div>
          <div className="btn-cont">
          {nextLvlBtnUI}
          </div>
        </div>
        <div className='card-layout'>
        {cardUI} 
        </div>
        <Button className='guidBtn' variant="primary" onClick={this.showModal.bind(this)}>
        HELP
        </Button>
        <Guide
        show={this.state.modalShow}
        onHide={this.closeModal.bind(this)}
      />
      </section>
    </div>
    )
  }
}


