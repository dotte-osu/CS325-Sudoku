//cite: https://www.geeksforgeeks.org/sudoku-backtracking-7/ for solving section
//if the puzzle is selected, it will now show up on the board. The numbers[0] is a invalid puzzle. this will never show up on the game.
//instead, it will generate new valid puzzle

const numbers = [
    [
        [5, 3, 0, 0, 7, 0, 0, 0, 0],
        [6, 0, 0, 1, 9, 9, 0, 0, 0],
        [0, 9, 8, 0, 0, 0, 0, 6, 0],
        [8, 0, 0, 0, 6, 0, 0, 0, 3],
        [4, 0, 0, 8, 0, 3, 0, 0, 1],
        [7, 0, 0, 0, 2, 0, 0, 0, 6],
        [0, 6, 0, 0, 0, 0, 2, 8, 0],
        [0, 0, 0, 4, 1, 9, 0, 0, 5],
        [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ],
    [
        [5, 3, 0, 0, 7, 0, 0, 0, 0],
        [6, 0, 0, 1, 9, 5, 0, 0, 0],
        [0, 9, 8, 0, 0, 0, 0, 6, 0],
        [8, 0, 0, 0, 6, 0, 0, 0, 3],
        [4, 0, 0, 8, 0, 3, 0, 0, 1],
        [7, 0, 0, 0, 2, 0, 0, 0, 6],
        [0, 6, 0, 0, 0, 0, 2, 8, 0],
        [0, 0, 0, 4, 1, 9, 0, 0, 5],
        [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ],
    [
        [7, 8, 3, 1, 4, 2, 9, 6, 0],
        [5, 9, 2, 8, 7, 6, 3, 1, 4],
        [4, 1, 6, 0, 5, 9, 0, 8, 7],
        [8, 0, 9, 5, 1, 3, 6, 7, 2],
        [1, 0, 7, 4, 2, 8, 5, 9, 3],
        [3, 2, 5, 9, 6, 7, 0, 0, 8],
        [2, 7, 4, 0, 9, 5, 8, 3, 1],
        [9, 0, 8, 7, 3, 1, 4, 2, 6],
        [6, 3, 1, 2, 8, 4, 7, 5, 9]
    ],
    [
        [3, 0, 6, 5, 0, 8, 4, 0, 0],
        [5, 2, 0, 0, 0, 0, 0, 0, 0],
        [0, 8, 7, 0, 0, 0, 0, 3, 1],
        [0, 0, 3, 0, 1, 0, 0, 8, 0],
        [9, 0, 0, 8, 6, 3, 0, 0, 5],
        [0, 5, 0, 0, 9, 0, 6, 0, 0],
        [1, 3, 0, 0, 0, 0, 2, 5, 0],
        [0, 0, 0, 0, 0, 0, 0, 7, 4],
        [0, 0, 5, 2, 0, 6, 3, 0, 0]
    ],
];

//to keep the solved puzzle
var answerGrid = new Array(9);


//create puzzele
var random;
function createPuzzle() {
    
    //randomly choose the puzzle from numbers array
    random = Math.floor((Math.random() * 4) + 1) - 1;

    //copy the grid first to check if this solvable.
    var copyGrid = new Array(9);
    copyGrid = numbers[random].map(inner => inner.slice());
    answerGrid = numbers[random].map(inner => inner.slice());

    //first, verify if the puzzle is solvable
    if (!solver(copyGrid, 0, 0)) {

        //if the puzzle is not valid, re-generate the new puzzle
        console.log("the puzzle can not be solved. re-creating...");
        createPuzzle();

    } else {

        //double check if the board is turly correct
        if (verifyAnswer(answerGrid)) {
            document.getElementById("showMessage").textContent = "New Puzzle is created!"
        } else {
            console.log("the puzzle is not valid. re-creating...");
            createPuzzle();
        }

        //if the puzzle is valid, create a game board
        console.log("the puzzle is valid. creating a board");

        //convert grid to array
        var newBoard = [];
        for (var i = 0; i < numbers[random].length; i++) {
            newBoard = newBoard.concat(numbers[random][i]);
        }

        //fill out the puzzle
        var inputs = document.getElementsByTagName("input");
        var j = 0;
        for (var i = 0; i < inputs.length; i++) {
            //set the default attribute
            inputs[i].style.backgroundColor = "white";
            inputs[i].setAttribute("readonly", "true");
            inputs[i].removeAttribute("readonly", "true");

            //empty cells = green
            //non-empty cells = readonly
            if (newBoard[i] == 0) {
                inputs[i].value = "";
                inputs[i].style.backgroundColor = "rgb(119, 216, 110)";
            } else {
                inputs[i].value = newBoard[j];
                inputs[i].setAttribute("readonly", "true");
            }
            j++;
        }
    }
}



////solving sudoku section for extra credit/////
//cite: https://www.geeksforgeeks.org/sudoku-backtracking-7/
//check row v.s number that you are checking
//if the number is already in the row, the board is invalid. return false
function isRowSafe(grid, row, num) {
    for (var col = 0; col < 9; col++)
        if (grid[row][col] == num)
            return false;

    return true;
}

//check columns v.s number that you are checking
//if the number is already in the columns, the board is invalid. return false
function isColSafe(grid, col, num) {
    for (var row = 0; row < 9; row++)
        if (grid[row][col] == num)
            return false;

    return true;
}

//check box v.s number that you are checking
//if the number is already in the box, the board is invalid. return false
function isBoxSafe(grid, row, col, num) {
    row = Math.floor(row / 3) * 3;
    col = Math.floor(col / 3) * 3;

    for (var r = 0; r < 3; r++)
        for (var c = 0; c < 3; c++)
            if (grid[row + r][col + c] == num)
                return false;

    return true;
}

//Check if there are any conflicts in row, column or box
function isSafe(grid, row, col, num) {
    return isRowSafe(grid, row, num) && isColSafe(grid, col, num) && isBoxSafe(grid, row, col, num);
}


//solve sudoku
function solver(grid, row, col) {
    //console.log("grid check: ",grid);
    //get the location of empty(0) cell. we can ignore the cells that have a number already
    var cellLoc = isEmpty(grid, row, col);
    row = cellLoc[0];
    col = cellLoc[1];

    //base case: if there's no empty cell (see isEmpty() comment)
    if (row == -100) {
        return true;
    }

    //start from the first empty cell. fill out the possible numbers until it can not be solved. 
    for (var num = 1; num <= 9; num++) {
        if (isSafe(grid, row, col, num)) {
            //assign the possible number to grid
            grid[row][col] = num;
            //this is to keep the answer for later when a user wants to check their answer
            answerGrid[row][col] = num;

            //recursively go through the grid. 
            if (solver(grid, row, col)) {
                return true;
            }

            //if mark cell as empty if nothing can be fit in to the cell
            grid[row][col] = 0;
        }
    }

    //it everything fail, it will trigger backtracking
    return false;
}

//check the empty cell location
function isEmpty(grid, row, col) {
    var checked = false;
    var loc = [-100, -100]; //set the base case for solver(). set randomly -100.

    while (!checked) {
        //if row==9, there is nothing else to check
        if (row == 9) {
            checked = true;
        } else {
            if (grid[row][col] == 0) {
                loc[0] = row;
                loc[1] = col;
                //console.log("loc: ", loc);
                checked = true;
            } else {
                //increment number untill we find empty cell or end of grid
                if (col < 8) {
                    col++;
                } else {
                    row++;
                    col = 0;
                }
            }
        }
    }
    //return the location of empty cell
    return loc;
}


////verify user input section for requirement/////
//verify the user input for rows, columns and boxes
function checkRows (grid, row) {
    //console.log("checking rows");
    var result = true;
    var fact = 1;
    for (var i = 0; i < grid.length; i++) {
        //multiply each cell
        fact = fact * grid[row][i];

    }
    //console.log(fact);
    if (fact != 362880) //since the grid is 9x9, if each cell has unique number, multiply each number will be 362880
        result = false;

    return result;
}

function checkColumns (grid, col) {
    //console.log("checking col");
    var result = true;
    var fact = 1;
    for (var i = 0; i < grid.length; i++) {
        //multiply each cell
        fact = fact * grid[i][col];
    }
    if (fact != 362880)
        result = false;

    return result;
}

function checkBox (grid, row, col) {
    //console.log("checking box");
    var result = true;
    var startR = row - row % 3;
    var startC = col - col % 3;
    var fact = 1;

    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            //multiply each cell
            fact = fact * grid[i + startR][j + startC];
        }
    }
    if (fact != 362880) {
        result = false;
    }
    return result;
}

//verifyAnser is used in tow different section. 
//when its passed at creation, grid will be passed
//when checking user input, null will be passed
function verifyAnswer (ansGrid) {
    //console.log("verifyAnswer...");
    
    //get user input from html
    if (ansGrid == null) {

        var inputs = document.getElementsByTagName("input");
        for (var i = 0; i < grid.length; i++) {
            grid[i] = new Array(9);
        }

        var h = 0;
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                if (inputs[h].value == "") {
                    grid[i][j] = 0;
                } else {
                    grid[i][j] = inputs[h].value;
                }
                h++;
            }
        }
    } else {
        grid = ansGrid;
    }


    var verifed = true;
    //check rows
    for (var i = 0; i < grid.length; i++) {
        if (!checkRows(grid, i)) {
            verifed = false;
            //console.log("wrong number in row: " + (i + 1));
            break;
        }
    }
    //check columns
    for (var i = 0; i < grid.length; i++) {
        if (!checkColumns(grid, i)) {
            verifed = false;
            //console.log("wrong number in columns: " + (i + 1));
            break;
        }

    }
    //check each boxes
    for (var i = 0; i < grid.length; i++) {
        if (!checkBox(grid, i, i)) {
            verifed = false;
            //console.log("wrong number in columns: " + (i + 1));
            break;
        }
    }

    //show the message on the website
    if (!verifed) {
        document.getElementById("showMessage").textContent = "Oh no! Your answer is incorrect!"
        return false;
    } else {
        document.getElementById("showMessage").textContent = "Congratulations! Your answer is correct!"
        return true;
    }

}

////displaying answer for extra credit////
function displayAnswer() {
    if (random==undefined) return

    var copyGrid = new Array(9);
    copyGrid = numbers[random].map(inner => inner.slice());

    solver(copyGrid, 0, 0);
    //convert grid to array
    var answerBoard = [];
    for (var i = 0; i < answerGrid.length; i++) {
        answerBoard = answerBoard.concat(answerGrid[i]);
    }

    //fill out the puzzle
    var inputs = document.getElementsByTagName("input");
    var j = 0;
    for (var i = 0; i < inputs.length; i++) {
        //empty cells = green
        //non-empty cells = readonly
        inputs[i].value = answerBoard[j];
        inputs[i].setAttribute("readonly", "true");
        j++;
    }

    document.getElementById("showMessage").textContent = "Solution was found!"
}