import { useState } from 'react';
import './App.css'
import img1 from "./images/die1.png";
import img2 from "./images/die2.png";
import img3 from "./images/die3.png";
import img4 from "./images/die4.png";
import img5 from "./images/die5.png";
import img6 from "./images/die6.png";

export default function App() {
  const [dice, setDice] = useState(Array(5).fill(1));
  const [diceImage,setDiceImage] = useState(Array(6).fill(img1));
  const [status, setStatus] = useState(Array(5).fill('roll'));
  const [roll,setRoll] = useState(0);
  const [disableRollButton, setDisableRollButton] = useState(false);
  const [disableImgButton, setDisableImgButton] = useState(true);
  const [scores,setScores] = useState(Array(10).fill(0));
  const [scored,setScored] = useState(Array(10).fill(false));
  const [disableScoreButton, setDisableScoreButton] = useState(Array(10).fill(true));
  return (
    <main>
      YAHTZEE!!!!
      <div> Roll {roll} of 3 </div>
      {/*<div> {dice} </div>
      <div> {diceImage} </div>
      <div> {status} </div> */}
      <Die1 value = {diceImage[0]} status={status[0]} isDisabled={disableImgButton}
        changeStatus = {() => changeStatus(0) }  />&nbsp;
      <Die2 value = {diceImage[1]} status={status[1]} isDisabled={disableImgButton}
        changeStatus = {() => changeStatus(1) } />&nbsp;
      <Die3 value = {diceImage[2]} status={status[2]} isDisabled={disableImgButton}
        changeStatus = {() => changeStatus(2) } />&nbsp;
      <Die4 value = {diceImage[3]} status={status[3]} isDisabled={disableImgButton}
        changeStatus = {() => changeStatus(3) } />&nbsp;
      <Die5 value = {diceImage[4]} status={status[4]} isDisabled={disableImgButton}
        changeStatus = {() => changeStatus(4) } />&nbsp;
      <div> <button disabled= {disableRollButton} className= "roller" onClick= {rollDice}> Roll Dice!!!</button> </div> 
      <br></br>
      {/*<div>{scores}</div>*/}
      <div> <UpperScoreBoard scores={scores} scored={scored} calcScores={calcScores} 
              disableScoreButton={disableScoreButton}/> </div>
    </main>
  )

  function rollDice(){
    setDisableImgButton(false);
    let newDice = dice.slice();
    let newDiceImg = diceImage.slice();
    let newScored = scored.slice();
    let newDisableScoreButton = disableScoreButton.slice();
    
    for (let i =1; i <=6; i++) {//enables score buttons that have not been scored
      if(newScored[i] === false) {newDisableScoreButton[i] = false;}
    }
    for (let i = 0; i < 5; i++){
      if (status[i] === "roll"){
        let value = Math.floor(Math.random() * 6 + 1);
        newDice[i] = value;
        switch (value){
          case 1: newDiceImg[i] = img1; break;
          case 2: newDiceImg[i] = img2; break;
          case 3: newDiceImg[i] = img3; break;
          case 4: newDiceImg[i] = img4; break;
          case 5: newDiceImg[i] = img5; break;
          case 6: newDiceImg[i] = img6; break;
        }//end of switch
      }//end of if
    }//end of for
    setDice(newDice);
    setDiceImage(newDiceImg);
    setScored(newScored);
    setRoll(roll + 1);
    setDisableScoreButton(newDisableScoreButton);
    if (roll === 2){
      setDisableRollButton(true)
    }
  }//end of rollDIce

  function changeStatus(i){
    let newStatus = status.slice();
    if( newStatus[i]== 'roll') { newStatus[i] = 'keep';}
    else {newStatus[i]='roll'; }
    setStatus( newStatus);
  }//end of change status

  function calcScores (i){
    alert('you clicked button' + i );
    let newScored = scored.slice();
    let newScores = scores.slice();
    let newDisableScoreButton = disableScoreButton.slice();
    newScored[i] = true;
    newDisableScoreButton[i] = true; //disable score button
    let total = 0;
    dice.forEach( function (value){
      if (value === i) {total+=i;}
    });
    newScores[i]= total;
    newScores[7] = newScores[1] + newScores[2] + newScores[3]
      + newScores[4] + newScores[5] + newScores[6]; //subtotal
    if (newScores[7] >= 63){ newScores [8]=35;}//bonus
    newScores[9] = newScores[7] + newScores[8];//total
    setDisableScoreButton(Array(10).fill(true));
    setScored(newScored);
    setScores(newScores);
    setDisableRollButton(false);
    setRoll(0);
    setDisableImgButton(true);//disabble for keeping
    setStatus(Array(5).fill('roll')); //will set dice back to roll status
  }//end of calcScores
}//end of app



export function Die1({ value, status,isDisabled, changeStatus}) {
  return (
    <>
      <button disabled={isDisabled} className= "imgButton" onClick={changeStatus}>
        <img className={status} src={value} />;
      </button>
    </>
  );
}
export function Die2({ value, status, isDisabled, changeStatus}) {
  return (
    <>
      <button disabled={isDisabled} className= "imgButton" onClick={changeStatus}>
        <img className={status} src={value} />;
      </button>
    </>
  );
}
export function Die3({ value, status, isDisabled, changeStatus}) {
  return (
    <>
      <button disabled={isDisabled} className= "imgButton" onClick={changeStatus}>
        <img className={status} src={value} />;
      </button>
    </>
  );
}
export function Die4({ value, status, isDisabled, changeStatus}) {
  return (
    <>
      <button disabled={isDisabled} className= "imgButton" onClick={changeStatus}>
        <img className={status} src={value} />;
      </button>
    </>
  );
}
export function Die5({ value, status, isDisabled, changeStatus}) {
  return (
    <>
      <button disabled={isDisabled} className= "imgButton" onClick={changeStatus}>
        <img className={status} src={value} />;
      </button>
    </>
  );
}

export function UpperScoreBoard ({scores, scored, calcScores, disableScoreButton}){

  return(
  <table>
      <tr>
          <th>Upper section</th>
          <th>How to score</th>
          <th>Game #1</th>
      </tr>
      <tr>
          <th>Aces</th>
          <td>Count and add only Aces</td>
          <td> 
            <button 
                 className="scoreButton" 
                 disabled={disableScoreButton[1]}
                 onClick={() => calcScores(1)}> 
                 {scores[1]} 
            </button> 
          </td>
      </tr>
      <tr>
          <th>Twos</th>
          <td>Count and add only Twos</td>
          <td>
          <button 
               className="scoreButton" 
               disabled={disableScoreButton[2]}
               onClick={() => calcScores(2)}> 
               {scores[2]} 
          </button> </td>
      </tr>
      <tr>
          <th>Threes</th>
          <td>Count and add only Threes</td>
          <td>
          <button 
               className="scoreButton" 
               disabled={disableScoreButton[3]}
               onClick={() => calcScores(3)}> 
               {scores[3]} 
          </button> 
          </td>
      </tr>
      <tr>
          <th>Fours</th>
          <td>Count and add only Fours</td>
          <td>
          <button 
               className="scoreButton" 
               disabled={disableScoreButton[4]}
               onClick={() => calcScores(4)}> 
               {scores[4]} 
          </button> 
          </td>
      </tr>
      <tr>
          <th>Fives</th>
          <td>Count and add only Fives</td>
          <td>
            <button 
                 className="scoreButton" 
                 disabled={disableScoreButton[5]}
                 onClick={() => calcScores(5)}> 
                 {scores[5]} 
            </button> 
          </td>
      </tr>
      <tr>
          <th>Sixes</th>
          <td>Count and add only Sixes</td>
          <td>
            <button 
                 className="scoreButton" 
                 disabled={disableScoreButton[6]}
                 onClick={() => calcScores(6)}> 
                 {scores[6]} 
            </button> 
          </td>
      </tr>
    <tr>
        <th>Sub Total</th>
        <td></td>
        <td><button className="scoreButton" disabled={true}> {scores[7]}</button></td>
    </tr>
      <tr>
          <th>Bonus</th>
          <td>Score 35</td>
          <td><button className="scoreButton" disabled={true}> {scores[8]}</button></td>
      </tr>
      <tr>
          <th>Total of Upper Section</th>
          <td> <img src="public/arrow2.png" alt="" /> </td>
          <td><button className="scoreButton" disabled={true}> {scores[9]}</button></td>
      </tr>
  </table>
  );
}

