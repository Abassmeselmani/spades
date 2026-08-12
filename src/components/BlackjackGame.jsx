import { useState, useEffect } from 'react';

const BlackjackGame = ({ isVisible, onClose }) => {
  const [deck, setDeck] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [gamePhase, setGamePhase] = useState('betting'); // betting, playing, dealer, finished
  const [playerScore, setPlayerScore] = useState(0);
  const [dealerScore, setDealerScore] = useState(0);
  const [bet, setBet] = useState(50);
  const [balance, setBalance] = useState(1000);
  const [message, setMessage] = useState('Place your bet to start!');
  const [showDealerCard, setShowDealerCard] = useState(false);

  // Create deck
  const createDeck = () => {
    const suits = ['♠', '♥', '♦', '♣'];
    const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const newDeck = [];

    suits.forEach(suit => {
      values.forEach(value => {
        newDeck.push({
          suit,
          value,
          numValue: value === 'A' ? 11 : ['J', 'Q', 'K'].includes(value) ? 10 : parseInt(value),
          color: ['♥', '♦'].includes(suit) ? 'text-red-500' : 'text-black'
        });
      });
    });

    return newDeck.sort(() => Math.random() - 0.5);
  };

  // Calculate hand value
  const calculateScore = (hand) => {
    let score = 0;
    let aces = 0;

    hand.forEach(card => {
      if (card.value === 'A') {
        aces++;
        score += 11;
      } else {
        score += card.numValue;
      }
    });

    while (score > 21 && aces > 0) {
      score -= 10;
      aces--;
    }

    return score;
  };

  // Deal initial cards
  const dealCards = () => {
    if (bet > balance) {
      setMessage('Insufficient balance!');
      return;
    }

    const newDeck = createDeck();
    const playerCards = [newDeck.pop(), newDeck.pop()];
    const dealerCards = [newDeck.pop(), newDeck.pop()];

    setDeck(newDeck);
    setPlayerHand(playerCards);
    setDealerHand(dealerCards);
    setPlayerScore(calculateScore(playerCards));
    setDealerScore(calculateScore([dealerCards[0]])); // Only show first dealer card
    setGamePhase('playing');
    setShowDealerCard(false);
    setMessage('Hit or Stand?');
    setBalance(balance - bet);
  };

  // Player hits
  const hit = () => {
    if (gamePhase !== 'playing') return;

    const newCard = deck.pop();
    const newPlayerHand = [...playerHand, newCard];
    const newScore = calculateScore(newPlayerHand);

    setPlayerHand(newPlayerHand);
    setPlayerScore(newScore);
    setDeck([...deck]);

    if (newScore > 21) {
      setMessage('Bust! Dealer wins.');
      setGamePhase('finished');
    } else if (newScore === 21) {
      stand();
    }
  };

  // Player stands
  const stand = () => {
    setGamePhase('dealer');
    setShowDealerCard(true);
    setDealerScore(calculateScore(dealerHand));

    // Dealer plays
    setTimeout(() => {
      dealerPlay();
    }, 1000);
  };

  // Dealer plays
  const dealerPlay = () => {
    let currentDealerHand = [...dealerHand];
    let currentDeck = [...deck];
    let dealerCurrentScore = calculateScore(currentDealerHand);

    while (dealerCurrentScore < 17) {
      const newCard = currentDeck.pop();
      currentDealerHand.push(newCard);
      dealerCurrentScore = calculateScore(currentDealerHand);
    }

    setDealerHand(currentDealerHand);
    setDealerScore(dealerCurrentScore);
    setDeck(currentDeck);

    // Determine winner
    setTimeout(() => {
      determineWinner(playerScore, dealerCurrentScore);
    }, 1000);
  };

  // Determine winner
  const determineWinner = (playerFinal, dealerFinal) => {
    if (dealerFinal > 21) {
      setMessage('Dealer busts! You win!');
      setBalance(balance + bet * 2);
    } else if (playerFinal > dealerFinal) {
      setMessage('You win!');
      setBalance(balance + bet * 2);
    } else if (playerFinal === dealerFinal) {
      setMessage('Push! Tie game.');
      setBalance(balance + bet);
    } else {
      setMessage('Dealer wins!');
    }
    setGamePhase('finished');
  };

  // New game
  const newGame = () => {
    setPlayerHand([]);
    setDealerHand([]);
    setPlayerScore(0);
    setDealerScore(0);
    setGamePhase('betting');
    setShowDealerCard(false);
    setMessage('Place your bet to start!');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-6">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float-cards ${4 + Math.random() * 6}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`
            }}
          >
            <div className="text-4xl opacity-10 text-red-500">
              {['♠', '♥', '♦', '♣'][Math.floor(Math.random() * 4)]}
            </div>
          </div>
        ))}
      </div>

      <div className="relative max-w-6xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-red-500/20 to-black/20 backdrop-blur-xl border border-red-500/30 rounded-full px-8 py-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-black rounded-full flex items-center justify-center">
              <span className="text-white text-2xl">♠</span>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-white">BLACKJACK</div>
              <div className="text-red-400 text-sm uppercase tracking-widest">Professional Game</div>
            </div>
          </div>
        </div>

        {/* Game Area */}
        <div className="bg-gradient-to-br from-green-900/80 to-black/80 backdrop-blur-2xl border border-red-500/30 rounded-3xl p-8">
          {/* Game Stats */}
          <div className="flex justify-between items-center mb-8">
            <div className="text-center">
              <div className="text-2xl font-black text-white mb-2">Balance</div>
              <div className="text-3xl font-black bg-gradient-to-r from-green-400 to-white bg-clip-text text-transparent">
                ${balance}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-white mb-2">Current Bet</div>
              <div className="text-3xl font-black bg-gradient-to-r from-red-500 to-white bg-clip-text text-transparent">
                ${bet}
              </div>
            </div>
          </div>

          {/* Dealer Section */}
          <div className="mb-12">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-black text-white mb-2">
                DEALER {showDealerCard || gamePhase === 'finished' ? dealerScore : ''}
              </h3>
            </div>
            <div className="flex justify-center space-x-4">
              {dealerHand.map((card, index) => (
                <div key={index}>
                  <div className={`w-24 h-36 bg-gradient-to-br from-white to-gray-100 rounded-xl border-2 border-gray-300 flex flex-col items-center justify-center shadow-2xl ${index === 1 && !showDealerCard && gamePhase !== 'finished' ? 'bg-gradient-to-br from-red-900 to-black' : ''}`}>
                    {index === 1 && !showDealerCard && gamePhase !== 'finished' ? (
                      <div className="text-4xl text-white">♠</div>
                    ) : (
                      <>
                        <div className={`text-3xl font-black ${card.color}`}>
                          {card.suit}
                        </div>
                        <div className={`text-xl font-black ${card.color}`}>
                          {card.value}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Player Section */}
          <div className="mb-8">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-black text-white mb-2">
                PLAYER {playerScore}
              </h3>
            </div>
            <div className="flex justify-center space-x-4">
              {playerHand.map((card, index) => (
                <div key={index}>
                  <div className="w-24 h-36 bg-gradient-to-br from-white to-gray-100 rounded-xl border-2 border-black flex flex-col items-center justify-center shadow-2xl">
                    <div className={`text-3xl font-black ${card.color}`}>
                      {card.suit}
                    </div>
                    <div className={`text-xl font-black ${card.color}`}>
                      {card.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Game Message */}
          <div className="text-center mb-8">
            <div className="text-2xl font-black text-white bg-black/50 backdrop-blur-xl border border-red-500/30 rounded-2xl px-8 py-4 inline-block">
              {message}
            </div>
          </div>

          {/* Game Controls */}
          <div className="text-center space-y-6">
            {gamePhase === 'betting' && (
              <div className="space-y-6">
                <div className="flex justify-center space-x-4">
                  {[25, 50, 100, 200].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setBet(amount)}
                      className={`px-6 py-3 rounded-2xl font-bold text-sm uppercase tracking-wider transition-all duration-300 ${bet === amount ? 'bg-gradient-to-r from-red-500 to-black text-white' : 'bg-gray-700 text-white hover:bg-gray-600'}`}
                    >
                      ${amount}
                    </button>
                  ))}
                </div>
                <button
                  onClick={dealCards}
                  className="px-12 py-4 bg-gradient-to-r from-red-500 to-black text-white rounded-2xl font-bold text-lg uppercase tracking-wider hover:scale-105 transition-all duration-300 shadow-2xl"
                >
                  Deal Cards
                </button>
              </div>
            )}

            {gamePhase === 'playing' && (
              <div className="flex justify-center space-x-6">
                <button
                  onClick={hit}
                  className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-2xl font-bold text-lg uppercase tracking-wider hover:scale-105 transition-all duration-300 shadow-2xl"
                >
                  Hit
                </button>
                <button
                  onClick={stand}
                  className="px-8 py-4 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-2xl font-bold text-lg uppercase tracking-wider hover:scale-105 transition-all duration-300 shadow-2xl"
                >
                  Stand
                </button>
              </div>
            )}

            {gamePhase === 'dealer' && (
              <div className="text-white text-xl animate-pulse">
                Dealer is playing...
              </div>
            )}

            {gamePhase === 'finished' && (
              <div className="space-y-4">
                <button
                  onClick={newGame}
                  className="px-12 py-4 bg-gradient-to-r from-red-500 to-black text-white rounded-2xl font-bold text-lg uppercase tracking-wider hover:scale-105 transition-all duration-300 shadow-2xl"
                >
                  New Game
                </button>
                <button
                  onClick={onClose}
                  className="px-12 py-4 border-2 border-red-500/50 hover:border-red-500 text-white rounded-2xl font-bold text-lg uppercase tracking-wider transition-all duration-300"
                >
                  Exit Game
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-cards {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.1; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 0.2; }
        }
      `}</style>
    </div>
  );
};

export default BlackjackGame;