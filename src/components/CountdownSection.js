"use client";

import { useState, useEffect } from "react";
import { useHalloweenConfig } from "@/hooks/useHalloweenConfig";

export default function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [particles, setParticles] = useState([]);

  // ✅ Usar configuración centralizada
  const { fechaCompleta, horaInicio, nombreEvento, colores } =
    useHalloweenConfig();

  // Generar partículas sutiles con emojis
  useEffect(() => {
    const emojis = ["🎃", "👻", "🦇", "💀", "🕷️"];
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 6 + Math.random() * 3,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
    }));
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    // Parsear la fecha del evento
    const calculateTimeLeft = () => {
      try {
        const eventDate = new Date(`${fechaCompleta}T${horaInicio}:00`);
        const now = new Date();
        const difference = eventDate - now;

        if (difference > 0) {
          setTimeLeft({
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
          });
        } else {
          setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        }
      } catch (error) {
        console.error("Error calculando countdown:", error);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(() => {
      calculateTimeLeft();
    }, 1000);

    return () => clearInterval(timer);
  }, [fechaCompleta, horaInicio]);

  // Traducción de unidades
  const timeUnits = {
    days: "Días",
    hours: "Horas",
    minutes: "Minutos",
    seconds: "Segundos",
  };

  // Emojis para cada unidad de tiempo
  const timeEmojis = {
    days: "🎃",
    hours: "👻",
    minutes: "🦇",
    seconds: "💀",
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 px-4"
      style={{
        background: `${colores.negro}`,
      }}
    >
      {/* Partículas animadas con emojis */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute text-2xl opacity-20"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animation: `float ${particle.duration}s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`,
            }}
          >
            {particle.emoji}
          </div>
        ))}
      </div>

      {/* Círculos decorativos */}
      <div
        className="absolute top-20 left-10 w-64 h-64 rounded-full opacity-20 blur-3xl"
        style={{ backgroundColor: colores.naranja }}
      />
      <div
        className="absolute bottom-20 right-10 w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{ backgroundColor: colores.morado }}
      />

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) translateX(0) rotate(0deg);
          }
          25% {
            transform: translateY(-20px) translateX(10px) rotate(5deg);
          }
          50% {
            transform: translateY(-40px) translateX(-10px) rotate(-5deg);
          }
          75% {
            transform: translateY(-20px) translateX(5px) rotate(3deg);
          }
        }

        @keyframes pulse-soft {
          0%,
          100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.9;
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        .animate-pulse-soft {
          animation: pulse-soft 2s ease-in-out infinite;
        }

        .glass-card {
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 2px solid;
          box-shadow: 0 8px 32px 0 rgba(255, 107, 53, 0.3);
        }

        .shimmer {
          background: linear-gradient(
            to right,
            transparent 0%,
            rgba(255, 184, 0, 0.3) 50%,
            transparent 100%
          );
          background-size: 1000px 100%;
          animation: shimmer 3s infinite;
        }
      `}</style>

      {/* Contenido principal */}
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Header con calabaza */}
        <div className="mb-8 flex justify-center">
          <div
            className="relative p-6 rounded-full glass-card animate-bounce"
            style={{ borderColor: colores.naranja }}
          >
            <div className="text-6xl">🎃</div>
            <div className="absolute inset-0 rounded-full shimmer" />
          </div>
        </div>

        {/* Título */}
        <div className="mb-4">
          <h2
            className="text-5xl md:text-7xl font-bold mb-4 font-serif"
            style={{
              color: colores.naranja,
              textShadow: `0 0 30px ${colores.naranja}, 0 0 60px ${colores.morado}`,
            }}
          >
            {nombreEvento}
          </h2>
        </div>

        {/* Título del countdown */}
        <h3
          className="text-3xl md:text-4xl font-bold mb-8"
          style={{
            color: colores.dorado,
            textShadow: `0 0 20px ${colores.dorado}`,
          }}
        >
          La Cuenta Regresiva Comenzó... 👻
        </h3>

        {/* Countdown cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto mb-8">
          {Object.entries(timeLeft).map(([unit, value], index) => (
            <div
              key={unit}
              className="glass-card rounded-2xl p-6 md:p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              style={{
                animationDelay: `${index * 0.1}s`,
                borderColor: colores.naranja,
              }}
            >
              {/* Emoji decorativo */}
              <div className="mb-4 flex justify-center text-5xl">
                {timeEmojis[unit]}
              </div>

              {/* Número */}
              <div
                className="text-5xl md:text-6xl font-bold mb-2 font-serif"
                style={{
                  color: colores.naranja,
                  textShadow: `0 0 20px ${colores.naranja}`,
                }}
              >
                {String(value).padStart(2, "0")}
              </div>

              {/* Etiqueta */}
              <div className="text-sm md:text-base font-medium uppercase tracking-wider text-orange-300">
                {timeUnits[unit]}
              </div>

              {/* Línea decorativa */}
              <div
                className="mt-4 mx-auto w-12 h-1 rounded-full opacity-50"
                style={{ backgroundColor: colores.dorado }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
