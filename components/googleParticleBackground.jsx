
"use client";
import React, { useRef, useEffect } from 'react';

const GoogleParticlesCanvas = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particles = useRef([]);
  const googleColors = ["#4285F4", "#EA4335", "#FBBC05", "#34A853"];

useEffect(() => {
  const canvas = canvasRef.current;
  const ctx = canvas.getContext('2d');

  const setupCanvas = () => {
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;

    particles.current = [];
    for (let i = 0; i < 150; i++) {
      particles.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1.2,
        color: googleColors[Math.floor(Math.random() * googleColors.length)],
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4,
      });
    }
  };

  const animate = () => {
    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);

    // particles move + draw
    particles.current.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;

      p.x += p.speedX;
      p.y += p.speedY;

      if (p.x < -50) p.x = width + 50;
      if (p.x > width + 50) p.x = -50;
      if (p.y < -50) p.y = height + 50;
      if (p.y > height + 50) p.y = -50;
    });

    // lines between close particles
    for (let i = 0; i < particles.current.length; i++) {
      for (let j = i + 1; j < particles.current.length; j++) {
        const dx = particles.current[i].x - particles.current[j].x;
        const dy = particles.current[i].y - particles.current[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 140) {
          ctx.beginPath();
          const grad = ctx.createLinearGradient(
            particles.current[i].x, particles.current[i].y,
            particles.current[j].x, particles.current[j].y
          );
          grad.addColorStop(0, particles.current[i].color);
          grad.addColorStop(1, particles.current[j].color);

          ctx.strokeStyle = grad;
          ctx.globalAlpha = 0.5 - (distance / 140) * 0.5;
          ctx.moveTo(particles.current[i].x, particles.current[i].y);
          ctx.lineTo(particles.current[j].x, particles.current[j].y);
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
    }

    animationRef.current = requestAnimationFrame(animate);
  };

  setupCanvas();
  animate();
  window.addEventListener('resize', setupCanvas);

  return () => {
    window.removeEventListener('resize', setupCanvas);
    cancelAnimationFrame(animationRef.current);
  };
}, []);


  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
        background: 'transparent',
        position: 'absolute',
        zIndex: -1,
      }}
    />
  );
};

export default GoogleParticlesCanvas;
