// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      //get row of rowIndex
      //
      //iterate through each element in row
      //  if element === 1
      //    increment counter;
      //   if counter > 1
      //    true
      //
      // else false

      var rowArray = this.get(rowIndex);
      var count = 0;

      for(var i = 0; i < rowArray.length; i++){
        if(rowArray[i] === 1){
          count++;
        }
        if(count > 1){
          return true;
        }
      }
      return false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {

      var arrayOfRows = this.rows();
      for (var i = 0; i < arrayOfRows.length; i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      // get all rows
      var arrayOfRows = this.rows();
      var count = 0;
      // check element at colIndex of all rows
      for (var i = 0; i < arrayOfRows.length; i++){
        if (arrayOfRows[i][colIndex] === 1) {
          count++;
        }
        // if more than one '1' value, return true
        if (count > 1) {
          return true;
        }
      }
      // return false
      return false; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {

      //get all rows
      var arrayOfRows = this.rows();
      //iterate over all columns, call hasColConflictAt on each column
      for(var i = 0; i < arrayOfRows.length; i++){
        if(this.hasColConflictAt(i)){
          return true;
        }
      }
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      // get all rows for board
      //
      //
      var rowIndex = arguments[1] + 1  || 1;
      var arrayOfRows = this.rows();
      var diagonalIndex = majorDiagonalColumnIndexAtFirstRow;

      for (var i = rowIndex; i < arrayOfRows.length; i++) {
        if (arrayOfRows[i][diagonalIndex + 1] === 1) {
          return true;
        }
        diagonalIndex++;
      };
      return false;
    },
      /*
      var arrayOfRows = this.rows();
      var diagonalIndex = majorDiagonalColumnIndexAtFirstRow;

      var search = function(diagonalIndex, row, array) {
        // iterate starting at second row
        // check index of (first major diagonal + 1)
        debugger;
        if (arrayOfRows[row][diagonalIndex + 1] === 1) {
          // if '1' is found, return true
          console.log('hello!');
          return true;
        }
        row++;
        // else, increment diagonalIndex by 1
        var newIndex = diagonalIndex++;
        // pass new index and row to recursive call
        search(newIndex, row, array);
      };

      var result = search(diagonalIndex, 1, arrayOfRows);
      return result || false;
      */


    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      // get array of rows
      var arrayOfRows = this.rows();

      var result = false;
      // iterate over all rows and push

      for (var i = 0; i < arrayOfRows.length; i++) {
        for (var j = 0; j < arrayOfRows[i].length; j++) {
          if (arrayOfRows[i][j] === 1) {
            result = this.hasMajorDiagonalConflictAt(j,i);
            if (result === true) {

              return true;
            }
          }
        }
      }
      return false; // fixme
    },




    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var arrayOfRows = this.rows();
      var diagonalIndex = minorDiagonalColumnIndexAtFirstRow;

      var rowIndex = arguments[1] +1 || 1;

      for(var i = rowIndex; i < arrayOfRows.length; i++){
        if(arrayOfRows[i][diagonalIndex - 1] === 1){
          return true;
        }
        diagonalIndex--;
      }
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var arrayOfRows = this.rows();
      var result;
      for(var i = 0; i < arrayOfRows.length; i++){
        for(var j = 0; j < arrayOfRows[i].length; j++){
          if(arrayOfRows[i][j] === 1){
            result = this.hasMinorDiagonalConflictAt(j, i);
            if(result){
              return true;
            }
          }
        }
      }

      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
