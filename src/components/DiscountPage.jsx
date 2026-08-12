import { useState, useEffect } from 'react';

const DiscountPage = ({ isVisible, onClose }) => {
  const [selectedCards, setSelectedCards] = useState([]);
  const [gamePhase, setGamePhase] = useState('select'); // select, reveal, result
  const [discount, setDiscount] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  const cards = [
    { id: 1, suit: '♠', value: 'A', discount: 50, color: 'text-black' },
    { id: 2, suit: '♥', value: 'K', discount: 30, color: 'text-red-500' },
    { id: 3, suit: '♦', value: 'Q', discount: 25, color: 'text-red-500' },
    { id: 4, suit: '♣', value: 'J', discount: 20, color: 'text-black' },
    { id: 5, suit: '♠', value: '10', discount: 15, color: 'text-black' },
    { id: 6, suit: '♥', value: '9', discount: 10, color: 'text-red-500' }
  ];

  const handleCardSelect = (cardId) => {
    if (gamePhase !== 'select' || selectedCards.length >= 3) return;

    if (selectedCards.includes(cardId)) {
      setSelectedCards(selectedCards.filter(id => id !== cardId));
    } else {
      setSelectedCards([...selectedCards, cardId]);
    }
  };

  const playGame = () => {
    if (selectedCards.length !== 3) return;

    setGamePhase('reveal');
    setIsSpinning(true);

    setTimeout(() => {
      const selectedCardObjects = cards.filter(card => selectedCards.includes(card.id));
      const totalDiscount = selectedCardObjects.reduce((sum, card) => sum + card.discount, 0) / 3;
      setDiscount(Math.round(totalDiscount));
      setGamePhase('result');
      setIsSpinning(false);
    }, 3000);
  };

  const resetGame = () => {
    setSelectedCards([]);
    setGamePhase('select');
    setDiscount(0);
    setIsSpinning(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-6">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float-cards ${4 + Math.random() * 3}s ease-in-out infinite`,
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
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-red-500/20 to-black/20 backdrop-blur-xl border border-red-500/30 rounded-full px-8 py-4 mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-black rounded-full flex items-center justify-center animate-pulse">
              <span className="text-white text-2xl">♠</span>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-white">TRY YOUR LUCK</div>
              <div className="text-red-400 text-sm uppercase tracking-widest">In Spades</div>
            </div>
          </div>
          <h2 className="text-4xl lg:text-6xl font-black text-white mb-4">
            <span className="bg-gradient-to-r from-red-500 to-white bg-clip-text text-transparent">
              PICK YOUR CARDS
            </span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            {gamePhase === 'select' && 'Select exactly 3 cards to reveal your discount!'}
            {gamePhase === 'reveal' && 'The cards are revealing your fate...'}
            {gamePhase === 'result' && `Congratulations! You won ${discount}% discount!`}
          </p>
        </div>

        {/* Game Area */}
        <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-2xl border border-red-500/30 rounded-3xl p-12">
          {/* Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
            {cards.map((card) => (
              <div
                key={card.id}
                onClick={() => handleCardSelect(card.id)}
                className={`relative group cursor-pointer transform transition-all duration-500 ${
                  selectedCards.includes(card.id)
                    ? 'scale-110 -translate-y-4'
                    : 'hover:scale-105 hover:-translate-y-2'
                } ${gamePhase !== 'select' ? 'pointer-events-none' : ''}`}
              >
                <div
                  className={`w-full h-48 bg-gradient-to-br from-white to-gray-100 rounded-2xl border-4 transition-all duration-500 ${
                    selectedCards.includes(card.id)
                      ? 'border-red-500 shadow-2xl shadow-red-500/50'
                      : 'border-gray-300 group-hover:border-red-300'
                  } ${
                    gamePhase === 'reveal' && selectedCards.includes(card.id)
                      ? isSpinning ? 'animate-spin' : 'rotate-y-180'
                      : ''
                  } relative`}
                >
                  {/* Card Front */}
                  <div
                    className={`w-full h-full flex flex-col items-center justify-center transition-opacity duration-500 ${
                      gamePhase === 'result' && selectedCards.includes(card.id)
                        ? 'opacity-10'
                        : ''
                    }`}
                  >
                    <div className={`text-6xl font-black mb-2 ${card.color}`}>
                      {card.suit}
                    </div>
                    <div className={`text-3xl font-black ${card.color}`}>
                      {card.value}
                    </div>
                  </div>

                  {/* Card Back (Discount Reveal) */}
                  {gamePhase === 'result' && selectedCards.includes(card.id) && (
                    <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-red-500 to-black rounded-2xl">
                      <div className="text-4xl text-white font-black">{card.discount}%</div>
                      <div className="text-sm text-white/70">OFF</div>
                    </div>
                  )}

                  {/* Selection Indicator */}
                  {selectedCards.includes(card.id) && (
                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {selectedCards.indexOf(card.id) + 1}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Game Controls */}
          <div className="text-center space-y-6">
            {gamePhase === 'select' && (
              <div className="space-y-4">
                <div className="text-white/60">
                  Selected: {selectedCards.length}/3 cards
                </div>
                <button
                  onClick={playGame}
                  disabled={selectedCards.length !== 3}
                  className={`px-12 py-4 rounded-2xl font-bold text-lg uppercase tracking-wider transition-all duration-300 ${
                    selectedCards.length === 3
                      ? 'bg-gradient-to-r from-red-500 to-black text-white hover:scale-105 shadow-2xl'
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <span className="flex items-center space-x-3">
                    <span>♠</span>
                    <span>Reveal Cards</span>
                    <span>♠</span>
                  </span>
                </button>
              </div>
            )}

            {gamePhase === 'reveal' && (
              <div className="text-center">
                <div className="text-2xl text-white mb-4 animate-pulse">
                  <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                </div>
              </div>
            )}

            {gamePhase === 'result' && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-6xl font-black bg-gradient-to-r from-red-500 to-white bg-clip-text text-transparent mb-4">
                    {discount}% OFF
                  </div>
                  <div className="text-2xl text-white mb-6">
                    Congratulations!
                  </div>
                  <div className="text-white/70 mb-8">
                    Your discount code: <span className="font-mono bg-red-500/20 px-4 py-2 rounded-lg">SPADES{discount}</span>
                  </div>
                </div>

                <div className="flex gap-4 justify-center">
                  <button
                    onClick={resetGame}
                    className="px-8 py-4 border-2 border-red-500/50 hover:border-red-500 text-white rounded-2xl font-bold uppercase tracking-wider transition-all duration-300 hover:bg-red-500/10"
                  >
                    Play Again
                  </button>
                  <button
                    onClick={onClose}
                    className="px-8 py-4 bg-gradient-to-r from-red-500 to-black text-white rounded-2xl font-bold uppercase tracking-wider hover:scale-105 transition-all duration-300 shadow-2xl"
                  >
                    Use Discount
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-12 h-12 bg-black/80 backdrop-blur-xl border border-red-500/30 rounded-full flex items-center justify-center text-white hover:border-red-500 transition-all duration-300"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <style jsx>{`
        @keyframes float-cards {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.1; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 0.2; }
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};

export default DiscountPage;