import { useState, useEffect } from 'react';

const Hero = ({ onPlayNow }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cardFlip, setCardFlip] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Auto flip cards every 3 seconds
    const flipInterval = setInterval(() => {
      setCardFlip(prev => !prev);
    }, 3000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(flipInterval);
    };
  }, []);

  return (
    <section id="home" className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden flex items-center">
      {/* Animated Card Background */}
      <div className="absolute inset-0">
        {/* Floating Playing Cards */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float-cards ${5 + Math.random() * 5}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 3}s`
              }}
            >
              <div className={`text-4xl opacity-20 transform ${cardFlip ? 'rotate-180' : 'rotate-0'} transition-transform duration-1000`}>
                {['♠', '♥', '♦', '♣'][Math.floor(Math.random() * 4)]}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Card Table Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(220, 38, 38, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(220, 38, 38, 0.1) 0%, transparent 50%)
            `,
            backgroundSize: '200px 200px'
          }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-32">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-20 items-center">
          <div className="space-y-12 relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-red-500/10 to-black/10 backdrop-blur-xl border border-red-500/20 rounded-full px-6 py-3 group hover:border-red-500/40 transition-all duration-500">
              <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-black rounded-full flex items-center justify-center animate-pulse">
                <span className="text-white text-lg">♠</span>
              </div>
              <span className="text-red-400 font-medium text-sm uppercase tracking-widest">Premium Card Gaming</span>
              <div className="text-white/60 text-xs">Since 2024</div>
            </div>

            {/* Main Typography */}
            <div className="space-y-8">
              <h1 className="text-6xl lg:text-8xl font-black leading-none tracking-tighter">
                <span className="block text-white animate-fade-in-up">PLAY YOUR</span>
                <span className="block bg-gradient-to-r from-red-500 via-red-400 to-white bg-clip-text text-transparent animate-fade-in-up relative">
                  CARDS RIGHT
                  <span className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-transparent blur-2xl -z-10"></span>
                </span>
              </h1>
              <div className="relative">
                <p className="text-2xl lg:text-3xl text-white/80 leading-relaxed font-light max-w-2xl animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                  Experience the thrill of premium shopping with our unique
                  <span className="text-red-400 font-semibold"> "Try Your Luck in Spades" </span>
                  system. Every purchase is a chance to win big!
                </p>
                <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-red-500 to-black opacity-50"></div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <button className="group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-black rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                <div className="relative bg-gradient-to-r from-red-500 to-black text-white px-12 py-6 rounded-2xl font-bold text-lg uppercase tracking-wider transform group-hover:scale-105 transition-all duration-300 shadow-2xl">
                  <span className="relative z-10 flex items-center space-x-3">
                    <span>♠</span>
                    <span>Start Shopping</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                </div>
              </button>

              <button
                onClick={onPlayNow}
                className="group relative overflow-hidden"
              >
                <div className="relative border-2 border-red-500/30 hover:border-red-500/60 text-white px-12 py-6 rounded-2xl font-bold text-lg uppercase tracking-wider transform group-hover:scale-105 transition-all duration-300 backdrop-blur-xl">
                  <span className="relative z-10 flex items-center space-x-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-red-500 to-black rounded-full flex items-center justify-center">
                      <span className="text-xs">♠</span>
                    </div>
                    <span>Play Blackjack</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                </div>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-12 border-t border-red-500/20 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
              {[
                { number: '50K+', label: 'Lucky Winners', icon: '🦄' },
                { number: '95%', label: 'Win Rate', icon: '💪' },
                { number: '24/7', label: 'Play Time', icon: '🕒' }
              ].map((stat, index) => (
                <div key={index} className="group text-center">
                  <div className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-red-500 to-white bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.number}
                  </div>
                  <div className="text-white/60 text-sm uppercase tracking-widest font-medium mb-2">
                    {stat.label}
                  </div>
                  <div className="text-2xl text-red-500 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                    {stat.icon}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative xl:block hidden">
            <div className="relative">
              {/* Main Card Display */}
              <div className="relative w-full h-[600px] rounded-3xl overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-black/20 backdrop-blur-xl border border-red-500/30 rounded-3xl group-hover:border-red-500/50 transition-all duration-700"></div>
              </div>
              {/* Playing Cards Stack */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Card Stack */}
                  <div className="relative">
                    {[0, 1, 2].map((index) => (
                      <div
                        key={index}
                        className={`absolute w-64 h-96 bg-gradient-to-br from-white to-gray-100 rounded-2xl border-2 border-gray-300 shadow-2xl transform transition-all duration-1000 ${
                          cardFlip ? 'rotate-y-180' : 'rotate-y-0'
                        }`}
                        style={{
                          transform: `translateX(${index * 20}px) translateY(${index * -10}px) rotateZ(${index * 5}deg) ${cardFlip ? 'rotateY(180deg)' : 'rotateY(0deg)'}`,
                          zIndex: 3 - index
                        }}
                      >
                        <div className="w-full h-full flex items-center justify-center">
                          <div className={`text-8xl ${cardFlip ? 'text-red-600' : 'text-black'} transition-colors duration-500`}>
                            {cardFlip ? '♠' : 'A'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating UI Elements */}
              <div className="absolute top-8 right-8 bg-black/80 backdrop-blur-xl border border-red-500/30 rounded-2xl p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-white text-sm font-medium">Live Game</span>
                </div>
              </div>
              <div className="absolute bottom-8 left-8 bg-gradient-to-r from-red-500/90 to-black/90 backdrop-blur-xl rounded-2xl p-6">
                <div className="text-white">
                  <div className="text-3xl font-black">ACE</div>
                  <div className="text-sm opacity-80">Premium Quality</div>
                </div>
              </div>

              {/* Orbiting Elements */}
              <div className="absolute -top-12 -right-12 w-24 h-24 bg-gradient-to-br from-red-500 to-black rounded-full flex items-center justify-center animate-spin-slow shadow-2xl shadow-red-500/25">
                <span className="text-white font-black text-2xl">♠</span>
              </div>
              <div className="absolute -bottom-8 -left-8 w-32 h-20 bg-gradient-to-r from-black to-red-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-red-500/25 animate-pulse">
                <span className="text-white font-black text-sm">LUCKY</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center space-y-4 animate-bounce">
          <span className="text-white/60 text-xs uppercase tracking-widest">Scroll to Shop</span>
          <div className="w-6 h-10 border-2 border-red-500/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gradient-to-b from-red-500 to-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-cards {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.1; }
          50% { transform: translateY(-30px) rotate(180deg); opacity: 0.3; }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
          opacity: 0;
        }
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .rotate-y-0 {
          transform: rotateY(0deg);
        }
      `}</style>
    </section>
  );
};

export default Hero;