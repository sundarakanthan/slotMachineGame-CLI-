// 1. deposit money
// 2. determine number of lines to bet on.
// 3. collect a bet amount.
// 4. spin the slot machine.
// 5. check if the user Won.
// 6. give the user their winnings.
// 7. play again.

console.log(
  "**** Disclaimer:- This project is created for educational purposes only.\nI don't recommend or support gambling. ****\n"
);

const prompt = require("prompt-sync")();

let ROWS = 3;
const COLS = 3;

const SYMBOL_COUNT = {
  A: 2,
  B: 3,
  C: 4,
  D: 5,
};

const SYMBOL_VALUE = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
};

let parsedBetAmount = 0;

const deposit = () => {
  while (true) {
    const depositAmount = prompt("Enter a deposit Amount:");
    const parsedDepositAmount = parseFloat(depositAmount);

    if (isNaN(parsedDepositAmount) || parsedDepositAmount <= 0) {
      console.log("Enter a valid Amount");
    } else {
      return parsedDepositAmount;
    }
  }
};

let parsedNumberOfLines = 0;
const getNumberOfLines = () => {
  while (true) {
    const numberOfLines = prompt("Enter number of lines to bet on: ");
    parsedNumberOfLines = parseFloat(numberOfLines);

    if (isNaN(parsedNumberOfLines) || parsedNumberOfLines <= 0 || parsedNumberOfLines > 3) {
      console.log("Enter valid Number between 1 to 3");
    } else {
      return parsedNumberOfLines;
    }
  }
};

const getBetAmount = (balance, lines) => {
  while (true) {
    const betAmount = prompt("Enter amount of bet per line: ");
    parsedBetAmount = parseFloat(betAmount);

    if (isNaN(parsedBetAmount) || parsedBetAmount <= 0 || parsedBetAmount > balance / lines) {
      console.log("Enter valid Bet Amount.");
    } else {
      return parsedBetAmount;
    }
  }
};

const spin = () => {
  const reels = [[], [], []]; // Reset the reels array for each spin
  const symbolsArray = [];

  for (const [symbol, count] of Object.entries(SYMBOL_COUNT)) {
    for (let i = 0; i < count; i++) {
      symbolsArray.push(symbol);
    }
  }

  for (let i = 0; i < COLS; i++) {
    const reelSymbol = [...symbolsArray];
    for (let j = 0; j < ROWS; j++) {
      const randomIndex = Math.floor(Math.random() * reelSymbol.length);
      const selectedSymbol = reelSymbol[randomIndex];
      reels[i].push(selectedSymbol);
      reelSymbol.splice(randomIndex, 1);
    }
  }

  return reels;
};

const transpose = (reels) => {
  const rows = [];

  for (let i = 0; i < ROWS; i++) {
    rows.push([]);
    for (let j = 0; j < COLS; j++) {
      rows[i].push(reels[j][i]);
    }
  }

  return rows;
};

// Function to print the symbols
const printRows = (rows) => {
  for (const row of rows) {
    let rowString = "";
    for (const [i, symbol] of row.entries()) {
      rowString += symbol;
      if (i !== row.length - 1) {
        rowString += " | ";
      }
    }
    console.log(rowString);
  }
};

const getWinnings = (rows, bet, lines) => {
  let winnings = 0;
  for (let row = 0; row < lines; row++) {
    const symbols = rows[row];
    let allSame = true;

    for (const symbol of symbols) {
      if (symbol !== symbols[0]) {
        allSame = false;
        break;
      }
    }
    if (allSame) {
      winnings += bet * SYMBOL_VALUE[symbols[0]];
    }
  }
  return winnings;
};

const game = () => {
  let depositFunction = deposit();

  while (true) {
    console.log(`You have a balance of $${depositFunction}`);
    const numberOfLinesFunction = getNumberOfLines();
    const getBetAmountFunction = getBetAmount(depositFunction, numberOfLinesFunction);

    depositFunction -= getBetAmountFunction * parsedNumberOfLines;

    const spinFunction = spin();
    const transposeFunction = transpose(spinFunction);
    printRows(transposeFunction);

    const getWinningFunction = getWinnings(transposeFunction, parsedBetAmount, parsedNumberOfLines);
    depositFunction += getWinningFunction;
    console.log(`You won $${getWinningFunction.toString()}`);

    if (depositFunction <= 0) {
      console.log("You ran out of money.");
      break;
    }

    const playAgain = prompt("Do you want to play again (y/n)? ");
    if (playAgain !== "y") break;
  }
};

game();
