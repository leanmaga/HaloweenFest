"use client";

import { useState, useEffect } from "react";
import { Sparkles, Star } from "lucide-react";
import Image from "next/image";
import { useHalloweenConfig, useDressCode } from "@/hooks/useHalloweenConfig";

export default function DressCodeSection() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [particles, setParticles] = useState([]);

  // ✅ Usar configuración centralizada
  const { colores } = useHalloweenConfig();
  const dressCode = useDressCode();

  // Generar partículas flotantes
  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 4,
      duration: 3 + Math.random() * 2,
      emoji: ["🎃", "👻", "🦇", "💀", "🕷️"][Math.floor(Math.random() * 5)],
    }));
    setParticles(newParticles);
  }, []);

  return (
    <section
      id="dresscode"
      className="relative min-h-screen py-20 overflow-hidden"
      style={{
        background: `${colores.negro}`,
      }}
    >
      {/* Partículas flotantes de fondo */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute text-2xl dresscode-particle"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animation: `float ${particle.duration}s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`,
              opacity: 0.3,
            }}
          >
            {particle.emoji}
          </div>
        ))}
      </div>

      {/* Sparkles decorativos */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute dresscode-sparkle-particle"
            style={{
              left: `${20 + i * 10}%`,
              top: `${10 + (i % 3) * 30}%`,
              animation: `pulse 2s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          >
            <Sparkles className="w-4 h-4 opacity-60 text-orange-500" />
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Espectacular */}
        <div className="text-center mb-16 dresscode-slide-up">
          <div className="relative inline-block mb-6">
            <div
              className="absolute inset-0 blur-3xl"
              style={{
                background: `linear-gradient(to right, ${colores.naranja}30, ${colores.dorado}30)`,
              }}
            />
            <div className="relative text-6xl animate-bounce">👻</div>
          </div>

          <h2
            className="font-serif text-5xl md:text-7xl font-bold mb-8 p-4 dresscode-shimmer-text"
            style={{
              background: `linear-gradient(90deg, ${colores.naranja} 0%, ${colores.dorado} 50%, ${colores.naranja} 100%)`,
              backgroundSize: "200% 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "shimmer 3s ease-in-out infinite",
            }}
          >
            Código de Vestimenta
          </h2>
        </div>

        {/* Contenido Principal */}
        <div className="dresscode-slide-up" style={{ animationDelay: "0.4s" }}>
          <div className="text-center mb-12">
            <h3
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: colores.naranja }}
            >
              {dressCode.tema}
            </h3>
            <p className="text-xl text-orange-300 max-w-3xl mx-auto">
              {dressCode.descripcion}
            </p>
          </div>

          {/* Card Central de Información */}
          <div className="max-w-4xl mx-auto mb-12">
            <div
              className="glass-morphism rounded-2xl p-8 border-2"
              style={{
                borderColor: colores.naranja,
                backgroundColor: "rgba(0, 0, 0, 0.7)",
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="text-4xl">🎭</div>
                <h4
                  className="text-2xl font-bold"
                  style={{ color: colores.naranja }}
                >
                  Ideas de Disfraces
                </h4>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h5 className="font-bold text-lg text-orange-400 flex items-center gap-2">
                    <span>👻</span> Terroríficos
                  </h5>
                  <ul className="space-y-2 text-orange-200">
                    <li className="flex items-center gap-2">
                      <span className="text-orange-500">•</span> Vampiros y
                      vampiresas
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-orange-500">•</span> Zombies
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-orange-500">•</span> Brujas y
                      hechiceros
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-orange-500">•</span> Esqueletos
                    </li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h5 className="font-bold text-lg text-purple-400 flex items-center gap-2">
                    <span>🎃</span> Creativos
                  </h5>
                  <ul className="space-y-2 text-orange-200">
                    <li className="flex items-center gap-2">
                      <span className="text-purple-500">•</span> Personajes de
                      películas
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-purple-500">•</span> Súper héroes
                      oscuros
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-purple-500">•</span> Fantasmas
                      elegantes
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-purple-500">•</span> ¡Sorpréndenos!
                    </li>
                  </ul>
                </div>
              </div>

              <div
                className="mt-6 p-4 rounded-xl border-2"
                style={{
                  backgroundColor: `${colores.naranja}20`,
                  borderColor: colores.dorado,
                }}
              >
                <p
                  className="text-center text-lg font-semibold"
                  style={{ color: colores.dorado }}
                >
                  🏆 1° Premio: Champagne <br></br>
                  🏆 2° Premio: Vino
                </p>
              </div>
            </div>
          </div>

          {/* Grid de Cards para Inspiración Visual */}
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.1);
          }
        }
        @keyframes shimmer {
          0% {
            background-position: 200% center;
          }
          100% {
            background-position: -200% center;
          }
        }
        .dresscode-slide-up {
          animation: slideUp 0.8s ease-out;
        }
        .dresscode-slide-left {
          animation: slideLeft 0.8s ease-out;
        }
        .dresscode-slide-right {
          animation: slideRight 0.8s ease-out;
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .dresscode-card-hover {
          transition: all 0.3s ease;
        }
        .dresscode-card-hover:hover {
          transform: translateY(-8px);
        }
        .glass-morphism {
          backdrop-filter: blur(10px);
        }
      `}</style>
    </section>
  );
}
