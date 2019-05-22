import React, { Fragment, useState, useEffect } from 'react';

import classes from './LeftSide.module.css';
import Board from '../../components/Board/Board';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { checkIfNumValid } from '../../utils/form/checkIfValid';

const LeftSide = ({ board, updateBoard, show, createBoardByDimension, setShowFalse, solve, fileType }) => {
    const [dimensionInput, setDimensionInput] = useState('');
    const [showDimensionError, setShowDimensionError] = useState(false);
    const inlineInputStyle = {
        display: show ? 'block' : 'none',
        width: '50%',
        height: '2rem'
    };

    useEffect(() => {
        if (checkIfNumValid(dimensionInput) || dimensionInput.trim() === '')
            setShowDimensionError(false);
        else
            setShowDimensionError(true);
    }, [dimensionInput]);

    const boardsContent = board && fileType ?
            board.length !== 0 ?
                board.map((board, index) => (
                    <div className={classes["left-side-block__multiple-boards-block__inner-block"]}>
                        <span className={classes["left-side-block__multiple-boards-block__inner-block__text"]}> Board #{`${index+1}`} </span>
                        <Board nChancellorBoard={board} repaint={updateBoard} editable={false} trimCase={true} />
                        <Button style={{ display: board ? 'block' : 'none', margin: '1rem 0 0 1rem' }}
                                clicked={() => solve(!fileType ? 'noFile' : 'file', board)} name={`Solve for Board #${index+1}`} />
                    </div>
                )) : null : null;

    return (
        <div className={classes["left-side-block"]}>
            <div className={classes["left-side-block__upper-block"]}>
                <Input style={inlineInputStyle} inp={dimensionInput} setInp={(e) => setDimensionInput(e.target.value)}
                        placeholder="Enter board dimension (N x N)" />
                <span style={{ display: showDimensionError ? 'block' : 'none' }} className={classes["left-side-block__upper-block__text-error"]}>
                    Input should be between 3 to 10.
                </span>
                <Button style={{ display: showDimensionError ? 'none' : !showDimensionError && dimensionInput.trim().length !== 0 ? 'block' : 'none' }}
                        clicked={() => {
                            setDimensionInput('');
                            setShowDimensionError(false);
                            setShowFalse();
                            createBoardByDimension(parseInt(dimensionInput));
                        }} name="See created" />
            </div>
            {   fileType ?
                <div className={classes["left-side-block__multiple-boards-block"]}>
                    { boardsContent }
                </div>
                : (
                    <Fragment>
                        <Board trimCase={false} nChancellorBoard={board} editable={true} repaint={updateBoard} />
                        <Button style={{ display: board ? 'block' : 'none', margin: '1rem 0 0 1rem' }}
                                clicked={() => solve(!fileType ? 'noFile' : 'file')} name="Solve" />
                    </Fragment>
                )}

        </div>
    )
};

export default LeftSide;