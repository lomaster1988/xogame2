
let emptySquares = [];

function computerMove() {

    let currentPlayer;

    currentPlayer = (stepNumber % 2 === 0) ? '0' : 'x';

    stepNumber++;

    for (let i = 0; i < field.length; i++) {



        for (let j = 0; j < field.length; j++) {

            if (field[i][j] === null) {



                emptySquares.push(`${i}, ${j}`);


            };

        }

    }


    function arrayRandElement(arr) {
        let rand = Math.floor(Math.random() * arr.length);
        return arr[rand];
    }

    let randomElement = arrayRandElement(emptySquares);

    let randomIndexI = randomElement.slice(0,1);
    let randomIndexJ = randomElement.slice(3,4);

    //let computerChosenMove = field[randomIndexI][randomIndexJ];

    document.querySelector(`[data-i="${randomIndexI}"][data-j="${randomIndexJ}"]`).innerHTML = currentPlayer;

    field[randomIndexI][randomIndexJ] = currentPlayer;

    

    emptySquares = [];
  
}




