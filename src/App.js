import React from "react";
import Die from "./components/Die";
import {nanoid} from "nanoid"
import Confetti from "react-confetti";


export default function App(){

    const [diceArray, setDiceArray] = React.useState(allNewDice())
    const [Tenzies, setTenzies] = React.useState(false)

    React.useEffect(() => {
        const allHeld = diceArray.every(die => die.isHeld)
        const firstValue = diceArray[0].value
        const allSameValue = diceArray.every(die => die.value === firstValue)

        if(allHeld && allSameValue){
            setTenzies(true)
        }
    }, [diceArray])
    

    function allNewDice() {
        let newDice = []
        for (let i = 0; i < 10; i++){
            newDice.push({id: nanoid(), value: Math.floor(Math.random() * 6 +1), isHeld:false})
        }
        return newDice
      }

      const holdDice = (id) =>{
          setDiceArray(prevDiceArray => prevDiceArray.map(
            die => {
                return die.id === id ?
                {...die, isHeld: !die.isHeld} :
                die
            }  
          ))
      }
    
      const diceComponents = diceArray.map(diceNo => {
          return(
              <Die key={diceNo.id} value = {diceNo.value} isHeld = {diceNo.isHeld} holdDice = {() => holdDice(diceNo.id)}/>
          )
      })

      const handleClick = () => {
          if (!Tenzies){
            setDiceArray(oldDiceArray => oldDiceArray.map(die => {
                return die.isHeld ?
                die:
                {id: nanoid(), value: Math.floor(Math.random() * 6 +1), isHeld:false}
            }))
          }else {
              setTenzies(false)
              setDiceArray(allNewDice)
          }

      } 

    return (
        <main>
            <div className="tenzies-container">
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click a die to freeze it at its current value between rolls.</p>
                <div className="dice-container"> 
                    {diceComponents}
                </div>
                <button className="roll-btn" onClick={handleClick}>{Tenzies ? "New Game" : "Roll"}</button>
                {Tenzies && <Confetti 

                    width={window.innerWidth}
                    height={window.innerHeight}
                    numberOfPieces={200}
                    recycle={false}
                    />}
            </div>
        </main>
    )
}