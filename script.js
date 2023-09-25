const appElement = document.querySelector('.app');

const COOKIE_FIELD_KEY = 'COOKIE_FIELD_KEY';

let xScore = document.querySelector('.xScore');
let oScore = document.querySelector('.oScore');

let field = [
    [null, null, null], // [0][0]   [0][1]   [0][2]
    [null, null, null], // [1][0]   [1][1]   [1][2]
    [null, null, null]  // [2][0]   [2][1]   [2][2]
];

const fieldCookieString = getCookie(COOKIE_FIELD_KEY);

if (fieldCookieString) {
    field = JSON.parse(fieldCookieString);
}

const COOKIE_XSCORE_KEY = 'COOKIE_XSCORE_KEY';
const COOKIE_OSCORE_KEY = 'COOKIE_OSCORE_KEY';
let xCounterString = getCookie(COOKIE_XSCORE_KEY);
let oCounterString = getCookie(COOKIE_OSCORE_KEY);

let oScoreCounter;
let xScoreCounter;

if (oCounterString === undefined) {
    oScoreCounter = 0;
}

else {
    oScoreCounter = Number(oCounterString)
};

if (xCounterString === undefined) {

    xScoreCounter = 0;
}

else {
    xScoreCounter = Number(xCounterString);
}

xScore.innerHTML = xScoreCounter;
oScore.innerHTML = oScoreCounter;

appElement.innerHTML = drawField(3);

appElement.addEventListener('click', setStep);

let stepNumber = 0;

function setStep(event) {

    const i = Number(event.target.dataset.i);
    const j = Number(event.target.dataset.j);

    if (field[i][j] !== null) {
        return;
    }

    let currentPlayer;

    currentPlayer = (stepNumber % 2 === 0) ? '0' : 'x';

    stepNumber++;

    document.querySelector(`[data-i="${i}"][data-j="${j}"]`).innerHTML = currentPlayer;
    field[i][j] = currentPlayer;

    setCookie(COOKIE_FIELD_KEY, JSON.stringify(field), { secure: true, 'max-age': 3600 });

    winnerCheck();
}

function drawField(size) {
    let fieldHtmlString = '';
    for (let i = 0; i < size; i++) {
        fieldHtmlString += `<div class="row">`;
        for (let j = 0; j < size; j++) {

            let currentSymbol = '';

            if (field[i][j] !== null) {
                currentSymbol = field[i][j];
            }

            fieldHtmlString += `
                <div
                  class="cell"
                  data-i="${i}"
                  data-j="${j}"
                  >
                  ${currentSymbol}
                </div>`;
        }
        fieldHtmlString += `</div>`;
    }
    return fieldHtmlString;
}

function winnerCheck() {

    for (let i = 0; i < field.length; i++) {

        let xCounter = 0;
        let oCounter = 0;
        for (let j = 0; j < field.length; j++) {

            if (field[i][j] === 'x') {
                xCounter++;

                if (xCounter === field.length) {
                    alert('Победил игрок x!');
                    xVictory();

                };

            }

            else if (field[i][j] === '0') {
                oCounter++;

                if (oCounter === field.length) {
                    alert('Победил игрок O!');
                    oVictory();

                };
            }

        }

    }

    for (let j = 0; j < field.length; j++) {

        let xCounter = 0;
        let oCounter = 0;
        for (let i = 0; i < field.length; i++) {

            if (field[i][j] === 'x') {
                xCounter++;

                if (xCounter === field.length) {
                    alert('Победил игрок x!');
                    xVictory();
                };


            }

            else if (field[i][j] === '0') {
                oCounter++;

                if (oCounter === field.length) {
                    alert('Победил игрок O!');

                    oVictory();
                };

            }

        }

    }

    let xDiagonalOneCounter = 0;
    let oDiagonalOneCounter = 0;

    for (let i = 0, j = 0; i < field.length; i++, j++) {


        if (field[i][j] === 'x') {
            xDiagonalOneCounter++;

        }
        else if (field[i][j] === '0') {
            oDiagonalOneCounter++;

        }

        if (xDiagonalOneCounter === field.length) {
            alert('Победил игрок x!');

            xVictory();
        };
        if (oDiagonalOneCounter === field.length) {
            alert('Победил игрок O!');

            oVictory();
        };


    }

    let xDiagonalTwoCounter = 0;
    let oDiagonalTwoCounter = 0;

    for (let i = 0, j = field.length - 1; i < field.length, j >= 0; i++, j--) {

        if (field[i][j] === 'x') {
            xDiagonalTwoCounter++;

        }
        else if (field[i][j] === '0') {
            oDiagonalTwoCounter++;

        }

        if (xDiagonalTwoCounter === field.length) {
            alert('Победил игрок x!');
            xVictory();
        };
        if (oDiagonalTwoCounter === field.length) {
            alert('Победил игрок O!');
            oVictory();
        };

    }

}

let btn = document.querySelector('.btn1');
let btn2 = document.querySelector('.btn2');
btn.addEventListener('click', gameReset);
btn2.addEventListener('click', scoreReset)

function gameReset() {

    if (confirm('Завершить партию?')) {

        field = [
            [null, null, null], // [0][0]   [0][1]   [0][2]
            [null, null, null], // [1][0]   [1][1]   [1][2]
            [null, null, null]  // [2][0]   [2][1]   [2][2]
        ];

        setCookie(COOKIE_FIELD_KEY, JSON.stringify(field), { secure: true, 'max-age': 3600 });

        appElement.innerHTML = drawField(3);

        let xCounterString = getCookie(COOKIE_XSCORE_KEY);
        let oCounterString = getCookie(COOKIE_OSCORE_KEY);
        
        stepNumber = 0;

        appElement.addEventListener('click', setStep);
    }
    else {
        alert('Продолжаем игру');

    }

}

function scoreReset() {

    if (confirm('Сбросить счет? Вы уверены?')) {

        setCookie(COOKIE_OSCORE_KEY, JSON.stringify(field), { secure: true, 'max-age': -1 });
        setCookie(COOKIE_XSCORE_KEY, JSON.stringify(field), { secure: true, 'max-age': -1 });

        xScoreCounter = 0;
        oScoreCounter = 0;

        xScore.innerHTML = xScoreCounter;
        oScore.innerHTML = oScoreCounter;

    }


}

function xVictory() {

    xScoreCounter++;

    setCookie(COOKIE_XSCORE_KEY, JSON.stringify(xScoreCounter), { secure: true, 'max-age': 3600 });
    appElement.removeEventListener('click', setStep);
    xScore.innerHTML = xScoreCounter;

}

function oVictory() {

    oScoreCounter++;

    setCookie(COOKIE_OSCORE_KEY, JSON.stringify(oScoreCounter), { secure: true, 'max-age': 3600 });
    appElement.removeEventListener('click', setStep);
    oScore.innerHTML = oScoreCounter;
}
