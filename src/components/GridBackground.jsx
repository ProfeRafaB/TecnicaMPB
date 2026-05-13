import { useEffect, useRef } from 'react';

export default function GridBackground() {
  const canvasRef = useRef(null);
  const offsetRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0.1, y: 0.1 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    // Configurar canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Variables de animación
    let animationFrameId;
    let mouseX = 0;
    let mouseY = 0;

    // Track mouse position
    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animar canvas
    const animate = () => {
      // Limpiar canvas
      ctx.fillStyle = 'rgba(0, 0, 0, 1)';
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      // Actualizar offset con velocidad lenta
      offsetRef.current.x += velocityRef.current.x;
      offsetRef.current.y += velocityRef.current.y;

      // Reset offset para evitar números grandes
      if (offsetRef.current.x > 80) offsetRef.current.x = 0;
      if (offsetRef.current.y > 80) offsetRef.current.y = 0;

      // Efecto parallax sutil con mouse
      const parallaxX = (mouseX / window.innerWidth - 0.5) * 20;
      const parallaxY = (mouseY / window.innerHeight - 0.5) * 20;

      // Dibujar cuadrícula
      const gridSize = 80;
      const lineOpacity = 0.15;

      ctx.strokeStyle = `rgba(255, 255, 255, ${lineOpacity})`;
      ctx.lineWidth = 1;

      // Líneas verticales
      for (let x = -gridSize; x < window.innerWidth + gridSize; x += gridSize) {
        const posX = x + offsetRef.current.x + parallaxX;
        ctx.beginPath();
        ctx.moveTo(posX, 0);
        ctx.lineTo(posX, window.innerHeight);
        ctx.stroke();
      }

      // Líneas horizontales
      for (let y = -gridSize; y < window.innerHeight + gridSize; y += gridSize) {
        const posY = y + offsetRef.current.y + parallaxY;
        ctx.beginPath();
        ctx.moveTo(0, posY);
        ctx.lineTo(window.innerWidth, posY);
        ctx.stroke();
      }

      // Dibujar puntos de intersección con brillo
      ctx.fillStyle = `rgba(255, 255, 255, ${lineOpacity * 0.6})`;
      for (let x = -gridSize; x < window.innerWidth + gridSize; x += gridSize) {
        for (let y = -gridSize; y < window.innerHeight + gridSize; y += gridSize) {
          const posX = x + offsetRef.current.x + parallaxX;
          const posY = y + offsetRef.current.y + parallaxY;
          ctx.beginPath();
          ctx.arc(posX, posY, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none',
        opacity: 0.8,
      }}
    />
  );
}
