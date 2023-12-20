import board from './board.png';
import line from './line.png';
import './Board.css';
import Controls from './Controls';
import {useState, useEffect} from 'react';
import  * as func from './functionality.js';


function Board(){
    const [marks, setMarks] = useState([0,0,0,0,0,0,0,0,0]);
    const [message, setMessage] = useState("Start the game. You are X");

    function clickSquare(e){
        let newMarks = [...marks];
        if(newMarks[parseInt(e)-1]===0 && !func.isTerminalState(newMarks)){
            newMarks[parseInt(e)-1] = 'X';
            if(func.checkWin(newMarks, "X")){
                setMarks(newMarks);
                setMessage("You win!");
                var ld = func.getLineDirection(newMarks, "X");
                document.getElementsByClassName("line-img")[0].style.transform = ld;
                document.getElementsByClassName("line-img")[0].style.display = "block";
            }
            else if(func.isDraw(newMarks)){
                setMarks(newMarks);
                setMessage("Draw. Start a new game");
            }
            else{
                var aiMove = func.getAIMove(newMarks);
                setMarks(aiMove);

                if(func.isDraw(aiMove)){
                    setMessage("Draw. Start a new game");
                }
                else if(func.checkWin(aiMove, "O")){
                    setMessage("AI wins.");
                    var ld = func.getLineDirection(aiMove, "O");
                    document.getElementsByClassName("line-img")[0].style.transform = ld;
                    document.getElementsByClassName("line-img")[0].style.display = "block";
                }
                else{
                    setMessage("Your turn.");
                }
            }    
        }
    }

    return (
        <div>
            <div className = "Board">
                <img className='line-img' src={line}/>
                <img className = 'board-img' src={board}/>
                <div className = "marks">
                    <p className='1' onClick={() => clickSquare("1")}>{marks[0]!=0 && marks[0]}</p>
                    <p className='2' onClick={() => clickSquare("2")}>{marks[1]!=0 && marks[1]}</p>
                    <p className='3' onClick={() => clickSquare("3")}>{marks[2]!=0 && marks[2]}</p>
                    <p className='4' onClick={() => clickSquare("4")}>{marks[3]!=0 && marks[3]}</p>
                    <p className='5' onClick={() => clickSquare("5")}>{marks[4]!=0 && marks[4]}</p>
                    <p className='6' onClick={() => clickSquare("6")}>{marks[5]!=0 && marks[5]}</p>
                    <p className='7' onClick={() => clickSquare("7")}>{marks[6]!=0 && marks[6]}</p>
                    <p className='8' onClick={() => clickSquare("8")}>{marks[7]!=0 && marks[7]}</p>
                    <p className='9' onClick={() => clickSquare("9")}>{marks[8]!=0 && marks[8]}</p>
                </div>
            </div>
            <Controls marks = {marks} setMarks = {setMarks} message = {message}/>
        </div>
        
    );
}

export default Board;