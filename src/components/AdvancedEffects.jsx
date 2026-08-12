import { useState, useEffect, useRef } from 'react';

const AdvancedEffects = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 3 + 1,
        hue: Math.random() * 60 + 180
      });
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 10
        );

        gradient.addColorStop(0, `hsl(${particle.hue}, 100%, 60%, 0.8)`);
        gradient.addColorStop(1, `hsl(${particle.hue}, 100%, 60%, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 10, 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby particles
        particles.forEach((otherParticle, otherIndex) => {
          if (index !== otherIndex) {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
              ctx.strokeStyle = `hsl(${particle.hue}, 100%, 60%, ${0.2 - distance / 500})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.stroke();
            }
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ mixBlendMode: 'screen' }}
      />
      {/* Dynamic Cursor Trail */}
      <div
        className="fixed pointer-events-none z-50 w-8 h-8 rounded-full mix-blend-difference"
        style={{
          left: mousePosition.x - 16,
          top: mousePosition.y - 16,
          background: 'radial-gradient(circle, rgba(0,255,255,0.8) 0%, rgba(255,0,255,0.8) 100%)',
          filter: 'blur(4px)',
          transition: 'all 0.1s ease-out'
        }}
      />
      {/* Holographic Grid */}
      <div className="fixed inset-0 pointer-events-none z-10 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px),
              linear-gradient(rgba(255,0,255,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,0,255,0.05) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px, 50px 50px, 200px 200px, 200px 200px',
            animation: 'grid-flow 20s linear infinite'
          }}
        />
      </div>
      <style jsx>{`
        @keyframes grid-flow {
          0% { transform: translate(0, 0) rotate(0deg); }
          100% { transform: translate(50px, 50px) rotate(360deg); }
        }
      `}</style>
    </>
  );
};

export default AdvancedEffects;