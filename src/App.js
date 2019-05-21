import React, { Fragment, Component } from 'react';

import Navbar from './components/Navbar/Navbar';
import LeftSide from './components/LeftSide/LeftSide';
import RightSide from './components/RightSide/RightSide';
import Backdrop from './components/Backdrop/Backdrop';
import Loader from './components/Loader/Loader';
import { createByDimension } from './utils/boards/createByDimension';
import { begin_backtrack, readFile } from './utils/permutation/nchancy';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: null,
      solvingStarted: false,
      solvingDone: false,
      arraysOfSolution: null,
      showDimensionInput: false,
      fileType: false,
      /* For Pagination */
      limit: 50
    }
  }

  updateBoard = () => {
    if (this.state.solvingStarted || this.state.solvingDone) this.setState({ solvingStarted: false, solvingDone: false });
    this.setState({ board: this.state.board });
  };

  createBoard = () => {
    this.setState({ showDimensionInput: true });
  };

  handleFileReading = async (file) => {
    try {
      const returnValues = await readFile(file);

      this.setState({ board: returnValues, fileType: true });
    } catch (e) {

    }
  };

  createBoardByDimension = (dimension) => {
    const arr = createByDimension(dimension);
    for (let i = 0; i < arr.length; i++)
      for (let j = 0; j < arr[0].length; j++)
        arr[i][j] = 0;

    this.setState({ board: arr, fileType: false, limit: 50, arraysOfSolution: null, solvingStarted: false, solvingDone: false });
  };

  solveNChancellorsProblem = async (type, specificBoard) => {
    if (type === 'file') {
      await this.setState({ solvingStarted: false, solvingDone: false });
    }

    this.setState({ solvingStarted: true });
    if (type === 'noFile') {
      await setTimeout(() => {  // Give enough time for render call to show backdrop
        begin_backtrack(this.state.board, this.state.board.length, type)
            .then(answer => {
              this.setState({ arrayOfSolution: answer, solvingStarted: false, solvingDone: true });
            })
            .catch(() => {
              this.setState({ arrayOfSolution: [], solvingStarted: false, solvingDone: true });
            });
      }, 1000);
    }
    else {
      await setTimeout(() => {  // Give enough time for render call to show backdrop
        begin_backtrack(specificBoard, specificBoard.length, type)
            .then(answer => {
              this.setState({ arrayOfSolution: answer, solvingStarted: false, solvingDone: true });
            })
            .catch(() => {
              console.log('Rejected');
              this.setState({ arrayOfSolution: [], solvingStarted: false, solvingDone: true });
            });
      }, 1000);
    }
  };

  handleViewMore = () => {
    this.setState(prevState => ({ limit: prevState.limit + prevState.limit  }));
  };

  render() {
    const { board, showDimensionInput, arrayOfSolution, solvingStarted, solvingDone, limit, fileType } = this.state;
    const backdropInline = { display: solvingStarted && !solvingDone ? 'block' : 'none', width: '100%', height: '100%' };

    return (
      <Fragment>
        <Navbar createBoard={this.createBoard} readFile={(file) => this.handleFileReading(file)} />
        <LeftSide   createBoardByDimension={(dimension) => this.createBoardByDimension(dimension)}
                    solve={(type, board) => this.solveNChancellorsProblem(type, board)} fileType={fileType}
                    board={board} updateBoard={this.updateBoard} editable={true} show={showDimensionInput} setShowFalse={() => this.setState({ showDimensionInput: false })} />
        <RightSide solutionsBoard={arrayOfSolution} limit={limit} viewMore={this.handleViewMore} />
        <Backdrop style={backdropInline} />
        <Loader style={{ display: solvingStarted && !solvingDone ? 'flex' : 'none' }} />
      </Fragment>
    );
  }
}

export default App;
