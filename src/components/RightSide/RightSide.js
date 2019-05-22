import React from 'react';

import classes from './RightSide.module.css';
import Board from '../Board/Board';

const paginateBoards = ( solutionsBoard, limit, viewMore,  showSolutionsBoard ) => {
    let boardsContainer = [];
    const trueThreshold =  solutionsBoard &&  showSolutionsBoard ? solutionsBoard.length < limit ? solutionsBoard.length : limit : null;

    for (let i=0; i < trueThreshold; i++) {
        if (i+1 === limit && i+1 !== solutionsBoard.length) {
            boardsContainer.push(
                <div key={i} className={classes["right-side-block__solutions_block__view-more-block"]}>
                    <span className={classes["right-side-block__solutions_block__view-more-block__solution-text"]}> Solution #{i+1} </span>
                    <Board editable={false} nChancellorBoard={solutionsBoard[i]} trimCase={true} />
                    <span onClick={() => viewMore()} className={classes["right-side-block__solutions_block__view-more-block__text"]}> View More </span>
                </div>
            )
        } else {
            boardsContainer.push(
                <div key={i} className={classes["right-side-block__solutions_block__view-more-block"]}>
                    <span className={classes["right-side-block__solutions_block__view-more-block__solution-text"]}> Solution #{i+1} </span>
                    <Board key={i} editable={false} nChancellorBoard={solutionsBoard[i]} trimCase={true} />
                </div>
            )
        }
    }

    return boardsContainer;
};

const rightSide = ({ solutionsBoard, limit, viewMore,  showSolutionsBoard }) => {
    const display = { display: solutionsBoard && showSolutionsBoard ? 'block' : 'none' };
    const solutionsBoardContent = solutionsBoard &&  showSolutionsBoard ?
        solutionsBoard.length !== 0 ? paginateBoards(solutionsBoard, limit, viewMore,  showSolutionsBoard) : <span> No solutions found </span> : null;

    return (
        <div style={{ display: solutionsBoard && showSolutionsBoard ? 'inline-flex' : 'none' }} className={classes["right-side-block"]}>
            <span style={display} className={classes["right-side-block__headings"]}> List of Solutions </span>
            <span style={display} className={classes["right-side-block__headings"]}> { solutionsBoard ? solutionsBoard.length : 0 } solution/s found </span>
            <div className={classes["right-side-block__solutions_block"]}>
                { solutionsBoardContent }
            </div>
        </div>
    )
};

export default rightSide;