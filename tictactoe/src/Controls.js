import './Controls.css';

function Controls(props){
    function newGame(){
        var newMarks = [0,0,0,0,0,0,0,0,0];
        props.setMarks(newMarks);
        document.getElementsByClassName("line-img")[0].style.display = "none";
    }
    return (
        <div className='controls-container'>
        <div className='message-container'>
            <a>{props.message}</a>
        </div>
            <button className='new-game-button' onClick = {newGame}>New Game</button>
        </div>
    );
}

export default Controls;