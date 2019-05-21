import clone from 'clone';
//
// const fs = require('fs');

export function initializeBoard(arr, lines, boardDimension){
	//lines: ['0 0 0 0\r', '0 0 0 0\r' , ...]

	let data, newlines = [];

	for(let i=0; i<boardDimension; ++i){
		data = lines[i].split("\r");
		data = data[0].split(" ");
		newlines = [ ...newlines, data ]
	}

	for(let i=0; i<boardDimension+2;++i){
		arr[i] = [];
		for(let j=0; j<boardDimension+2; ++j){
			if(i>0 && j>0 && i <(boardDimension+1) && j<(boardDimension+1))
				arr[i][j] = parseInt(newlines[i-1][j-1]);
			else
				arr[i][j] = 0;
		}
	}

	return arr;
}

function initializeBoardWithoutFile(arr, boardDimension) {
	let data = [];

	for(let i=0; i<boardDimension+2;++i){
	    data[i] = new Array(boardDimension+2);
		for(let j=0; j<boardDimension+2; ++j){
			if(i > 0 && j > 0 && i <(boardDimension+1) && j<(boardDimension+1)) {
                if (arr[i-1][j-1] === 1)
                    data[i][j] = 1;
                else data[i][j] = 0;
            } else data[i][j] = 0;
		}
	}

	return data;
}

function initializeBoardWithFile (arr, boardDimension) {
    let data = [];

    for(let i=0; i<boardDimension;++i){
        data[i] = new Array(boardDimension);
        for(let j=0; j<boardDimension; ++j){
            if (arr[i][j] === 1)
                data[i][j] = 1;
            else data[i][j] = 0;
        }
    }

    return data;
}

function safeCheck(inputArr, x, y, dimensionSize){
	let idx;

	/* Knight's Moves Validator (Maximum possible move for a knight = 8) */

	// 1. 2 ups, 1 right
	if (dimensionSize - x > 1 && dimensionSize - y > 2 && inputArr[x+1][y+2] === 1)  // check if there is a hit or an edge case
		return false;
	// 2. 1 up, 2 rights
	if (dimensionSize - x > 2 && dimensionSize - y > 1 && inputArr[x+2][y+1] === 1)
		return false;
	// 3. 2 downs, 1right
	if (dimensionSize - x > 1 && y > 1 && inputArr[x+1][y-2] === 1)
		return false;
	// 4. 1 down, 2 rights
	if (dimensionSize - x > 2 && y > 0 && inputArr[x+2][y-1] === 1)
		return false;
	// 5. 2 ups, 1 left
	if (x > 0 && dimensionSize - y > 2 && inputArr[x-1][y+2] === 1)
		return false;
	// 6. 1 up, 2 lefts
	if (x > 1 && dimensionSize - y > 1 && inputArr[x-2][y+1] === 1)
		return false;
	// 7. 2 downs, 1 left
	if (x > 0 && y > 1 && inputArr[x-1][y-2] === 1)
		return false;
	// 8. 1 down, 2 lefts
	if (x > 1 && y > 0 && inputArr[x-2][y-1] === 1)
		return false;

	/****************************/

	/* Check Rook's Movements */
	for (idx = 0; idx < dimensionSize; idx++)
		if (idx !== x && inputArr[idx][y] === 1)  // check if there's a hit vertically
			return false;

	for (idx = 0; idx < dimensionSize; idx++)   // check if there's a hit horizontally
		if (idx !== y && inputArr[x][idx] === 1)
			return false;

	return true;
}

function safeCheck2(row1, col1, row2, col2, N){
    let n2 = 2, n1, mult,num1,num2;
    n1 = mult = 1;

	//check row
    if(col1 === col2 || row1 === row2)    // check rook's move
        return false;

    for (let i = 1; i <= 8; ++i){   // check knight's move
        n1 = n1 * mult;
        if(i%2 !== 0) mult *= -1;
        n2 = n2 * mult;
        num1 = row1 + n1;
        num2 = col1 + n2;

		if (num1 <= N && num2 <= N){
            if(num1 > 0 && num2 > 0){
                if(num1 === row2 && num2 === col2)
                    return false;
            }
        }

		if(i <= 4){
            n1 = 2;
            n2 = 1;
        }else if(i > 4){
            n1 = 1;
            n2 = 2;
        }
	}

	return true;
}

function checkInitialBoard(input_arr, dimensionSize){
	let count = 0, ok = true;

    for (let i = 1; i <= dimensionSize; i++){
        for (let j = 1; j <= dimensionSize; j++){
			if (input_arr[i][j] === 1){
				count++;
				if(!safeCheck(input_arr, i, j, dimensionSize)) ok = false;
			}
		}
	}

	return !(count === dimensionSize || !ok);
}

export function begin_backtrack(input_arr, dimension, type) {
    return new Promise((resolve, reject) => {
        let inputArr;
        if (type === 'noFile') {
            inputArr = initializeBoardWithoutFile(input_arr, dimension);
        } else if (type === 'file') {
            inputArr = initializeBoardWithFile(input_arr, dimension);
        }

        let nopts = []; //[N+2];                     // array of top of stacks
        let fixed = []; //[N+2]; 					// array to determine if row has fixed values
        let option = []; //[N+2][N+2]; 				//array of stacks of options

        // eslint-disable-next-line no-unused-vars
        let start, move, i, j, candidate, count, first, solution;
        let output_arr = [], answers = [];

        solution = move = start = count = 0;
        nopts[start] = 0;
        first = 1;
        const N = type === 'file' ? dimension - 2 : dimension;

        for (i = 0; i < N + 2; ++i) {			// initialize input and option boards to zero
            nopts[i] = 0;
            fixed[i] = 0;
            option[i] = [];
            output_arr[i] = [];
            for (j = 0; j < N + 2; ++j) {
                option[i][j] = 0;
                output_arr[i][j] = 0;
            }
        }

        for (i = 1; i <= N; ++i) {
            for (j = 1; j <= N; ++j) {
                if (inputArr[i][j] === 1) {
                    option[i][++nopts[i]] = j;
                    fixed[i] = j;
                } else {
                    option[i][j] = 0;
                }
            }
        }

        console.log("\n");

        if (checkInitialBoard(inputArr, N)) //if board has no errors, search for solution
            nopts[start] = 1;
        else
            reject(new Error());

        //the loop will assume that the fixed values are correctly placed

        while (nopts[start] > 0) { // while dummy stack is not empty
            if (nopts[move] > 0) {
                move++;
                nopts[move] = 0;						// initialize position - no initial candidates

                if (move === N + 1) {						//solution found
                    solution = 1;

                    output_arr = clone(inputArr);   // return an exact copy without having the same reference

                    for (i = 1; i <= N; i++)
                        for (j = 1; j <= N; j++)
                            output_arr[i][j] = inputArr[i][j];

                    for (i = 1; i < move; i++)
                        output_arr[i][option[i][nopts[i]]] = 1;

                    answers[count++] = output_arr;
                } else if (fixed[move] === 0) {			// if the row has no fixed value, search for candidate
                    for (i = 1; i <= N; ++i) {
                        if (fixed[i] !== 0 && nopts[i] === 0)   //update nopts if the row has a fixed value
                            ++nopts[i];
                    }

                    // find candidates
                    for (candidate = N; candidate >= 1; candidate--) {
                        for (i = N; i >= 1; i--) {
                            if (fixed[i] !== 0 || i <= move - 1) { // if row has a fixed value or row is a previous row, check candidate with the row's TOS
                                if (!safeCheck2(move, candidate, i, option[i][nopts[i]], N)) break;
                            }
                        }

                        if (!(i >= 1)) {									// check top of stack of previous positions and positions with fixed value
                            option[move][++nopts[move]] = candidate;	// meaning it did not break - candidate is safe
                        }
                    }
                } else { // if the row has a fixed value, update its nopts

                    if (move === 1 && fixed[move] !== 0) {  // update the nopts of top row only once
                        if (first !== 0)
                            ++nopts[move];
                        first = 0;
                    } else
                        ++nopts[move];
                }
            } else {
                move--;										// backtracking step
                nopts[move]--; 								// current position has exhausted candidates so move to previous
                // remove current top on this stack
            }
        }

        console.log("Number of solutions: ", count, "\n\n");
        resolve(answers);
    });
}

export function readFile(file){
    return new Promise((resolve, reject) => {
        let fileReader = new FileReader();
        fileReader.readAsText(file);
        fileReader.onloadend = function () {
            let text = fileReader.result;
            let textByLine = text.split("\n");
            let noOfPuzzles, boardDimension = 0, idx, nChancellorBoard, arraysOfBoards = [];

            noOfPuzzles = parseInt(textByLine[0]);
            textByLine = textByLine.slice(1, textByLine.length);

            let returned;
            for (idx = 0; idx < noOfPuzzles; idx++) {
                boardDimension = parseInt(textByLine[0]);
                textByLine = textByLine.slice(1, textByLine.length);
                nChancellorBoard = [];
                // eslint-disable-next-line no-undef
                returned = initializeBoard(nChancellorBoard, textByLine.slice(0, boardDimension), boardDimension, textByLine);
                // eslint-disable-next-line no-undef
                arraysOfBoards[idx] = returned;
                textByLine = textByLine.slice(boardDimension, textByLine.length);
            }

            resolve(arraysOfBoards);
        };
    });
}