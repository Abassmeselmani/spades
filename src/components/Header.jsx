import { useState, useEffect } from 'react';

const Header = ({ onPlayNow }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-700 ${scrolled ? 'bg-black/95 backdrop-blur-2xl border-b border-red-500/20' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-4 group">
            <div className="relative flex-shrink-0">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-black rounded-xl blur opacity-30 group-hover:opacity-60 transition-opacity duration-500"></div>
              <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-black rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-all duration-500 shadow-2xl shadow-red-500/25">
                <span className="text-white text-2xl">♠</span>
              </div>
            </div>
            <div className="relative">
              <h1 className="text-3xl font-black tracking-tighter text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-red-500 group-hover:to-white group-hover:bg-clip-text transition-all duration-500">
                SPADES
              </h1>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-white group-hover:w-full transition-all duration-700"></div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-10">
            {['Home', 'Shop', 'Lucky Deals', 'About', 'Contact'].map((item, index) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="relative group py-2 px-4"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="text-white/80 hover:text-white font-medium text-sm uppercase tracking-widest transition-all duration-300 relative z-10">
                  {item}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-black/20 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100"></div>
                <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-red-500 to-white group-hover:w-full group-hover:left-0 transition-all duration-500"></div>
              </a>
            ))}
          </nav>

          {/* Cart & User Actions */}
          <div className="hidden lg:flex items-center space-x-6">
            <button className="relative group">
              <div className="w-10 h-10 bg-white/10 backdrop-blur-xl rounded-xl flex items-center justify-center group-hover:bg-red-500/20 transition-all duration-300">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.5 2.5M17 13l2.5 2.5M9 21h6M12 18v3" />
                </svg>
              </div>
              <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                3
              </div>
            </button>
            <button onClick={onPlayNow} className="relative group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-black rounded-2xl blur-sm opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-r from-red-500 to-black text-white px-8 py-3 rounded-2xl font-bold text-sm uppercase tracking-wider transform group-hover:scale-105 transition-all duration-300 shadow-2xl">
                <span className="relative z-10 flex items-center space-x-2">
                  <span>♠</span>
                  <span>Play Now</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
              </div>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative w-10 h-10 bg-gradient-to-br from-red-500/20 to-black/20 backdrop-blur-xl rounded-2xl flex items-center justify-center group hover:bg-red-500/30 transition-all duration-300"
            >
              <div className="relative w-5 h-5 flex flex-col items-center justify-center space-y-1">
                <span className={`absolute block w-5 h-0.5 bg-white transform transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-0' : 'translate-y-1.5'}`}></span>
                <span className={`absolute block w-5 h-0.5 bg-white transform transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`absolute block w-5 h-0.5 bg-white transform transition-all duration-300 ${isMenuOpen ? '-rotate-45 translate-y-0' : '-translate-y-1.5'}`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-500 ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
          <div className="py-8 space-y-6 bg-black/95 backdrop-blur-2xl rounded-3xl mt-4 border border-red-500/20">
            {['Home', 'Shop', 'Lucky Deals', 'About', 'Contact'].map((item, index) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="block px-8 py-3 text-white/80 hover:text-white font-medium text-lg uppercase tracking-wider transition-all duration-300 hover:bg-gradient-to-r hover:from-red-500/10 hover:to-black/10 rounded-xl mx-4"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {item}
              </a>
            ))}
            <div className="px-8 pt-4">
              <button
                onClick={onPlayNow}
                className="w-full bg-gradient-to-r from-red-500 to-black text-white px-8 py-4 rounded-2xl font-bold text-sm uppercase tracking-wider transform hover:scale-105 transition-all duration-300"
              >
                Play Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Spades */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute text-red-500/10 text-2xl animate-pulse"
            style={{
              left: `${20 + i * 20}%`,
              top: `${Math.sin(i) * 20 + 50}%`,
              animation: `float-spades ${4 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`
            }}
          >
            ♠
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes float-spades {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.1; }
          50% { transform: translateY(-10px) rotate(180deg); opacity: 0.3; }
        }
      `}</style>
    </header>
  );
};

export default Header;