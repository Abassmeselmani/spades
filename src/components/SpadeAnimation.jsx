import { useState, useEffect } from 'react';

const SpadeAnimation = ({ isVisible, onComplete }) => {
  const [animationPhase, setAnimationPhase] = useState('enter');

  useEffect(() => {
    let timer1, timer2, timer3;

    if (isVisible) {
      setAnimationPhase('enter');
      timer1 = setTimeout(() => setAnimationPhase('spin'), 500);
      timer2 = setTimeout(() => setAnimationPhase('exit'), 2000);
      timer3 = setTimeout(() => onComplete(), 2500);
    }

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
      {/* Floating Cards Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float-cards ${2 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          >
            <div className="text-6xl opacity-20 text-white transform rotate-12">
              ♠
            </div>
          </div>
        ))}
      </div>

      {/* Main Spade Animation */}
      <div
        className={`relative transition-all duration-1000 ${
          animationPhase === 'enter'
            ? 'scale-0 rotate-180'
            : animationPhase === 'spin'
            ? 'scale-100 rotate-0'
            : 'scale-150 rotate-360 opacity-0'
        }`}
      >
        <div className="relative">
          {/* Glow Effect */}
          <div className="absolute inset-0 animate-pulse">
            <div className="w-96 h-96 bg-gradient-to-r from-red-500/30 to-black/30 rounded-full blur-3xl"></div>
          </div>

          {/* Main Spade */}
          <div className="relative w-64 h-64 flex items-center justify-center">
            <div className="text-9xl text-red-500 animate-pulse">
              ♠
            </div>
          </div>

          {/* Sparkle Effects */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-4 h-4 bg-white rounded-full animate-ping"
              style={{
                top: `${20 + Math.sin(i * 45 * Math.PI / 180) * 40}%`,
                left: `${50 + Math.cos(i * 45 * Math.PI / 180) * 40}%`,
                animationDelay: `${i * 0.2}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Lucky Text */}
      <div
        className={`absolute bottom-32 left-1/2 transform -translate-x-1/2 transition-all duration-1000 ${
          animationPhase === 'spin' ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
        }`}
      >
        <div className="text-6xl font-black text-white text-center">
          <div className="mb-4 bg-gradient-to-r from-red-500 to-white bg-clip-text text-transparent">
            FEELING LUCKY?
          </div>
          <div className="text-2xl font-normal text-white/80">
            Let the cards decide your fate...
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-cards {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.1; }
          50% { transform: translateY(-30px) rotate(180deg); opacity: 0.3; }
        }
        .rotate-360 {
          transform: rotate(360deg);
        }
      `}</style>
    </div>
  );
};

export default SpadeAnimation;