import React, { useEffect, useRef } from 'react';

const DamascusWaveBg = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse tracking for wave distortion
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
    };

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    let time = 0;
    const lineCount = 65;

    const render = () => {
      time += 0.003;

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.02;
      mouse.y += (mouse.targetY - mouse.y) * 0.02;

      // Transparent clear to let LightRays shine through
      ctx.clearRect(0, 0, width, height);

      // Render Damascus Pattern Layers
      for (let i = 0; i < lineCount; i++) {
        ctx.beginPath();

        const baseHeight = (height / (lineCount + 1)) * (i + 1);
        const layerOffset = i * 0.15;

        for (let x = 0; x <= width; x += 10) {
          const dx = x - mouse.x;
          const dy = baseHeight - mouse.y;
          const distToMouse = Math.sqrt(dx * dx + dy * dy);
          const mouseEffect = Math.max(0, (350 - distToMouse) / 350) * 35;

          const wave1 = Math.sin(x * 0.004 + time + layerOffset) * 45;
          const wave2 = Math.cos(x * 0.012 - time * 0.6 + i * 0.3) * 20;
          const foldModulation = Math.sin((x * 0.002 + baseHeight * 0.005) + time) * 30;
          const mouseDeflection = Math.sin(distToMouse * 0.02 - time * 2) * mouseEffect;

          const y = baseHeight + wave1 + wave2 + foldModulation + mouseDeflection;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        const isEtchedLayer = i % 2 === 0;
        const opacity = isEtchedLayer 
          ? 0.18 + Math.sin(i * 0.5 + time) * 0.05 
          : 0.06 + Math.cos(i * 0.3 + time) * 0.03;

        ctx.strokeStyle = isEtchedLayer
          ? `rgba(255, 255, 255, ${opacity})`
          : `rgba(180, 180, 180, ${opacity})`;

        ctx.lineWidth = isEtchedLayer ? 1.6 : 0.8;
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-[1] w-full h-full bg-transparent"
    />
  );
};

export default DamascusWaveBg;