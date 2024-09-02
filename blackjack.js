function dealCard() {
  // Returns a random card from the deck
  const cards = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];
  return cards[Math.floor(Math.random() * cards.length)];
}

function calculateScore(cards) {
  // Calculates the score of the given list of cards
  const sum = cards.reduce((acc, card) => acc + card, 0);

  // Check for a blackjack (a hand with only 2 cards: ace + 10)
  if (sum === 21 && cards.length === 2) {
    return 0; // 0 will represent Blackjack
  }

  // Handle the case where the hand has an ace and goes over 21
  if (cards.includes(11) && sum > 21) {
    cards[cards.indexOf(11)] = 1;
  }

  return cards.reduce((acc, card) => acc + card, 0);
}

function compare(userScore, computerScore) {
  // Compares the scores of the user and the computer and returns the result
  if (userScore === computerScore) {
    return "Draw";
  } else if (computerScore === 0) {
    return "Lose, opponent has Blackjack";
  } else if (userScore === 0) {
    return "You win with a Blackjack";
  } else if (userScore > 21) {
    return "You went over, you lose";
  } else if (computerScore > 21) {
    return "Opponent went over, you win";
  } else if (userScore > computerScore) {
    return "You win";
  } else {
    return "You lose";
  }
}

function playGame() {
  let userCards = [];
  let computerCards = [];
  let isGameOver = false;

  // Deal two cards to each player at the start
  for (let i = 0; i < 2; i++) {
    userCards.push(dealCard());
    computerCards.push(dealCard());
  }

  while (!isGameOver) {
    const userScore = calculateScore(userCards);
    const computerScore = calculateScore(computerCards);
    console.log(`Your cards: ${userCards}, current score: ${userScore}`);
    console.log(`Computer's first card: ${computerCards[0]}`);

    // Check for end game conditions
    if (userScore === 0 || computerScore === 0 || userScore > 21) {
      isGameOver = true;
    } else {
      const userShouldDeal = prompt("Type 'yes' to draw another card, type 'no' to pass:");
      if (userShouldDeal.toLowerCase() === "yes") {
        userCards.push(dealCard());
      } else {
        isGameOver = true;
      }
    }
  }

  // Computer's turn
  let computerScore = calculateScore(computerCards);
  while (computerScore !== 0 && computerScore < 17) {
    computerCards.push(dealCard());
    computerScore = calculateScore(computerCards);
  }

  const userScore = calculateScore(userCards);
  console.log(`Your final hand: ${userCards}, final score: ${userScore}`);
  console.log(`Computer's final hand: ${computerCards}, final score: ${computerScore}`);
  console.log(compare(userScore, computerScore));
}

// Main loop to start the game
while (prompt("Do you want to play a game of Blackjack? Type 'yes' or 'no':").toLowerCase() === "yes") {
  console.clear();
  playGame();
}
