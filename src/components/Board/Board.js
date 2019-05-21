import React from 'react';

import classes from './Board.module.css';

const renderBoard = (board, repaint, editable, trimCase) => {
    let boardContainer = [], key = 0;

    if (trimCase) {
        for (let i=1; i <= board.length-2; i++)
            for (let j=1; j <= board[i].length-2; j++)
                boardContainer.push(
                    <span onClick={() => {
                        if (editable) {
                            if (board[i][j] === 1) board[i][j] = 0;
                            else board[i][j] = 1;
                            repaint();
                        }
                    }} key={`${key++}`} style={{
                        width: `${100 / (board[i].length-2)}%`,
                        height: `${100 / (board[i].length-2)}%`,
                        background: board[i][j] === 1 ? 'linear-gradient(to bottom right, #136995, #000), #136995' : '#fff'
                    }} className={classes["board-container__element"]} />
                );
    } else {
        for (let i=0; i < board.length; i++)
            for (let j=0; j < board[i].length; j++)
                boardContainer.push(
                    <span onClick={() => {
                        if (editable) {
                            if (board[i][j] === 1) board[i][j] = 0;
                            else board[i][j] = 1;
                            repaint();
                        }
                    }} key={`${key++}`} style={{
                        width: `${100 / board[i].length}%`,
                        height: `${100 / board[i].length}%`,
                        background: board[i][j] === 1 ? 'linear-gradient(to bottom right, #136995, #000), #136995' : '#fff'
                    }} className={classes["board-container__element"]} />
                );
    }

    return boardContainer;
};

const board = ({ nChancellorBoard, repaint, editable, trimCase }) => {
    return (
        <div className={classes["board-container"]}>
            { nChancellorBoard ? renderBoard(nChancellorBoard, repaint, editable, trimCase) : null }
        </div>
    )
};

export default board;