import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import Footer from './components/Footer';
import DiscountPage from './components/DiscountPage';
import BlackjackGame from './components/BlackjackGame';

function App() {
  const [showDiscountPage, setShowDiscountPage] = useState(false);
  const [showBlackjackGame, setShowBlackjackGame] = useState(false);

  const handleTryLuck = () => {
    setShowDiscountPage(true);
  };

  const handleCloseDiscountPage = () => {
    setShowDiscountPage(false);
  };

  const handlePlayNow = () => {
    setShowBlackjackGame(true);
  };

  const handleCloseBlackjackGame = () => {
    setShowBlackjackGame(false);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
      <Header onPlayNow={handlePlayNow} />
      <Hero onPlayNow={handlePlayNow} />
      <ProductGrid onTryLuck={handleTryLuck} />
      <Footer />
      
      <DiscountPage
        isVisible={showDiscountPage}
        onClose={handleCloseDiscountPage}
      />
      
      <BlackjackGame
        isVisible={showBlackjackGame}
        onClose={handleCloseBlackjackGame}
      />
    </div>
  );
}

export default App;