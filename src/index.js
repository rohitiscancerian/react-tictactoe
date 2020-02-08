import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

    function Square(props) {
      return (
        <button className="square" onClick={() => props.onClick() }>
          {props.value}
        </button>
      );
    }
  
  class Board extends React.Component {
    
    renderSquare(i) {
      return <Square value={this.props.squares[i]}  onClick={() => this.props.onClick(i) }/>;
    }
    
   rows() {
       return [0,1,2];
   }
   columns() {
    return [0,1,2];
    }

    tableGenerator = () => {
        <table>
            {
                for(rows=1;rows<3;rows++)
                {
                    return 
                    (
                    
                            <tr>
                            {columns.map(column => <th>{this.renderSquare(column)}</th>)}
                            </tr>

                    
                    )
                }
            }
        </table>

        return (
          <table>
                           
         
          </table>
        );
      }

    render() {

      return (
        <div>
         { for(row=0;row<3;row++) { }  
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          { }}
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
        constructor(props){
            super(props);
            this.state = {               
                    history : [{
                        squares : Array(9).fill(null)
                    }],
                xIsNext: true,
                stepNumber : 0
            };
        }

        updateHistoryItem(history,step)
        {


            for (var i = 0; i < history.length; ++i) {
                if (i === step) {
                    history[i]['moveButtonClassName'] = 'boldButton';
                }
                else
                {
                    history[i]['moveButtonClassName'] = '';
                }
            }
            return history;
        }

        jumpTo(event,step)
        {
            
            this.setState({
                history : this.updateHistoryItem(this.state.history,step),
                stepNumber : step,
                xIsNext : (step % 2) === 0                             
            });
            
            //console.log(event);
            //event.currentTarget.className = "boldButton";
        }

        getLocationOfCurrentMove(i)
        {
          var position = {
              0 : "(1,1)",
              1 : "(1,2)",
              2 : "(1,3)",
              3 : "(2,1)",
              4 : "(2,2)",
              5 : "(2,3)",
              6 : "(3,1)",
              7 : "(3,2)",
              8 : "(3,3)",
          };

          return position[i];
        }
      
        handleClick(i) {            
            const history = this.state.history.slice(0,this.state.stepNumber + 1);
            const current = history[history.length - 1];
            const squares = current.squares.slice();
            let currentMove;
            if(calculateWinner(squares) || squares[i])
            {
                return;
            }
            currentMove = this.getLocationOfCurrentMove(i);
            squares[i] = this.state.xIsNext?'X':'O';
            this.setState({
                            history : history.concat([{
                                squares : squares,
                                lastMoveLocation : currentMove,
                                moveButtonClassName : ''
                            }]),
                            xIsNext: !this.state.xIsNext,
                            stepNumber:  history.length
                        });
    
        }
        


    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber]; 

        const winner = calculateWinner(current.squares);

        const moves = history.map((step,move) => {
            const desc = move? 'Go to move # ' + move :
            'Go to game start';
            
            return (
                <li key={move}>
                    <button name={"move"+move}  className={step.moveButtonClassName}  onClick={(e) => this.jumpTo(e,move)}>{desc}</button>
                    <span>Last Position</span> : {step.lastMoveLocation}
                </li>
            );
        });

        let status;

        if(winner)
        {
            status = "Winner: " + winner;
        } else {
            status = "Next player: " + (this.state.xIsNext?'X':'O');
        }

      return (
        
        <div className="game">
          <div className="game-board">
            <Board squares={current.squares} onClick={(i) => this.handleClick(i)} />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
  