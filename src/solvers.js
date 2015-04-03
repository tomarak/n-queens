/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  /*
  var solution;
  var arrayOfRows = new Board({'n' : n});
  console.log(arrayOfRows);


    var findRookPosition = function(column, row){
      if(column === n && row === n){
        solution = arrayOfRows;
        return true;
      }

      if(!arrayOfRows.hasRowConflictAt(row) && !arrayOfRows.hasColConflictAt(column)){
        arrayOfRows.togglePiece(row, column);
        var result = findRookPosition(column, row + 1);

      }
      if(column < n){
          column++;
        }
      else{
          row++;
        }

     // pass arrayOfRows to inner function call
    }

  findRookPosition(0, 0);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
  */
};

  // var findRookPosition = function(column, row){
  //     if(column === n && row === n){
  //       solution = arrayOfRows;
  //       return true;
  //     }

  //     if(arrayOfRows.hasRowConflictAt(row) && arrayOfRows.hasColConflictAt(column)){
  //       arrayOfRows.togglePiece(row, column);
  //       var result = findRookPosition(column, row + 1);
  //       if(result){
  //         return true;
  //       }
  //     }

  //    // pass arrayOfRows to inner function call
  //   }





// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme
  var board = new Board({n: n});

  var checkRooks = function(row){
    if(row === n){
      solutionCount++;
      return;
    }

    for(var i = 0; i < n; i++){
      board.togglePiece(row, i);

      if(!board.hasAnyRooksConflicts()){
        checkRooks(row+1);
      }

      board.togglePiece(row, i);
    }

  }
  checkRooks(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n: n});

  var checkQueens = function (row) {
    if ( row === n ) {
      solutionCount++;
      return;
    }

    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);
      if (!board.hasAnyQueensConflicts()) {
        checkQueens(row + 1);
      }
      board.togglePiece(row, i);
    }
  };

  checkQueens(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
