import React, { useState } from 'react';
import Zero from './icon/zero.jpg';
import Cross from './icon/cross.jpg';

const Game = () =>{
    const [board, setBoard] = useState([[],[],[]]);
    const [player, setPlayer] = useState(0);
    const [winner, setWinner] = useState();

const handlePress = (row, column) =>{
        const newBoard = board.slice();
        if(newBoard[row][column] === undefined){
            newBoard[row][column] = player;
            setBoard(newBoard);
            if(isGameOvered()){
                setWinner(player);
            }
            else {
                setPlayer(1-player);
            }
        }
    }

    const isGameOvered = () =>{
        return rowCrossed() || columnCrossed() || digonalCrossed();
    }

    const getBoxView = (row, column) =>(
       <>
       {board[row][column] === 0 && <img src={Zero} alt="empty" width="40" height="40" /> }
       {board[row][column] === 1 && <img src={Cross} alt="empty" width="40" height="40" /> }
       </>
    )

    const rowCrossed = () =>{
        for(let i=0;i<3;i++){
            if(board[i][0] === board[i][1] &&
                board[i][1] === board[i][2] &&
                board[i][0] !== undefined
                ){
                    return true;
                }
                return false;
        }
    }

    const columnCrossed = () =>{
        for(let j=0;j<3;j++){
            if(board[0][j] === board[1][j] &&
                board[1][j] === board[2][j] &&
                board[0][j] !== undefined
                ){
                    return true;
                }
                return false;
        }
    }

    const digonalCrossed = () =>{
        if(board[0][0] === board[1][1] &&
            board[1][1] === board[2][2] &&
            board[0][0] !== undefined
            ){
                return true;
            }
            if(board[0][2] === board[1][1] &&
                board[1][1] === board[2][0] &&
                board[0][2] !== undefined
                ){
                    return true;
                }
                return false;
    }

    const handleClear = () =>{
        setBoard([[],[],[]]);
        setPlayer(0);
        setWinner(undefined);
    }

    return (
    <div className="container">
        <h1>TIC TAC TOE GAME</h1>
        <div className="controls">
            <button className="clear" onClick={handleClear}>START NEW GAME</button>
        </div>
        <div className="player">
            <div className={"player1 " + (player === 0 ? 'turn': 'wait')}>player 1</div>
            <div className={"player2 " + (player === 1 ? 'turn': 'wait')}>player 2</div>
        </div>
        {winner !== undefined && (
            <div className="winner">Player {winner + 1} won this game</div>
        )}
        <div className="table_wrapper">
            <table>
                <tbody>
                    <tr>
                        <td onClick={() => handlePress(0,0)}>{getBoxView(0,0)}</td>
                        <td onClick={() => handlePress(0,1)}>{getBoxView(0,1)}</td>
                        <td onClick={() => handlePress(0,2)}>{getBoxView(0,2)}</td>
                    </tr>
                    <tr>
                        <td onClick={() => handlePress(1,0)}>{getBoxView(1,0)}</td>
                        <td onClick={() => handlePress(1,1)}>{getBoxView(1,1)}</td>
                        <td onClick={() => handlePress(1,2)}>{getBoxView(1,2)}</td>
                    </tr>
                    <tr>
                        <td onClick={() => handlePress(2,0)}>{getBoxView(2,0)}</td>
                        <td onClick={() => handlePress(2,1)}>{getBoxView(2,1)}</td>
                        <td onClick={() => handlePress(2,2)}>{getBoxView(2,2)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    )
}
export default Game;