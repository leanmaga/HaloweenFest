"use client";

import { useState, useEffect } from "react";
import { MapPin, Phone, Sparkles } from "lucide-react";
import { useHalloweenConfig } from "@/hooks/useHalloweenConfig";

export default function LocationSection() {
  // ✅ Estado para las partículas
  const [particles, setParticles] = useState([]);

  const config = useHalloweenConfig();

  const {
    lugar = "Ubicación",
    direccion = "Dirección no disponible",
    telefono = "+54 9 11 3566-0145",
    googleMapsUrl = "#",
    wazeUrl = "#",
    colores,
  } = config;

  // ✅ Generar partículas al montar el componente
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
      id="location"
      className="py-20 min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        background: `${colores.negro}`,
      }}
    >
      <div
        className="absolute top-20 left-10 w-64 h-64 rounded-full opacity-20 blur-3xl"
        style={{ backgroundColor: colores.naranja }}
      />
      <div
        className="absolute bottom-20 right-10 w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{ backgroundColor: colores.morado }}
      />

      {/* ✅ PARTÍCULAS FLOTANTES DE FONDO */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute text-2xl"
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

      {/* ✅ SPARKLES DECORATIVOS (OPCIONAL) */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute"
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

      {/* ✅ Contenido existente (añadir relative z-10) */}
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="text-6xl mb-4">📍</div>
          <h2
            className="font-serif text-4xl md:text-5xl font-bold mb-4"
            style={{
              color: colores.naranja,
              textShadow: `0 0 30px ${colores.naranja}`,
            }}
          >
            Ubicación de la Fiesta
          </h2>
        </div>

        <div className="grid lg:grid-cols-1 gap-12 items-center">
          {/* Location Details */}
          <div className="space-y-8">
            <div
              className="bg-black/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border-2"
              style={{
                borderColor: colores.naranja,
              }}
            >
              <h3
                className="font-serif text-3xl font-bold mb-6"
                style={{ color: colores.naranja }}
              >
                {lugar}
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 rounded-2xl transition-all hover:bg-orange-900/20">
                  <MapPin
                    className="w-6 h-6 flex-shrink-0 mt-1"
                    style={{ color: colores.naranja }}
                  />
                  <div>
                    <h4
                      className="font-semibold mb-1"
                      style={{ color: colores.dorado }}
                    >
                      Dirección
                    </h4>
                    <p className="text-orange-200">{direccion}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl transition-all hover:bg-orange-900/20">
                  <Phone
                    className="w-6 h-6 flex-shrink-0 mt-1"
                    style={{ color: colores.naranja }}
                  />
                  <div>
                    <h4
                      className="font-semibold mb-1"
                      style={{ color: colores.dorado }}
                    >
                      Contacto
                    </h4>
                    <p className="text-orange-200">{telefono}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full">
                <button
                  className="flex-1 font-semibold px-6 py-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 border-2"
                  style={{
                    background: "linear-gradient(to right, #dc2626, #b91c1c)",
                    color: "#ffffff",
                    borderColor: "#991b1b",
                  }}
                  onClick={() => window.open(googleMapsUrl, "_blank")}
                >
                  <MapPin className="w-5 h-5" />
                  Google Maps
                </button>

                <button
                  className="flex-1 font-semibold px-6 py-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 border-2"
                  style={{
                    background: "linear-gradient(to right, #3b82f6, #2563eb)",
                    color: "#ffffff",
                    borderColor: "#1d4ed8",
                  }}
                  onClick={() => window.open(wazeUrl, "_blank")}
                >
                  <MapPin className="w-5 h-5" />
                  Waze
                </button>
              </div>

              {/* Decoración Halloween */}
              <div className="mt-6 flex justify-center gap-4 text-3xl">
                <span className="animate-bounce">🎃</span>
                <span className="animate-pulse">👻</span>
                <span
                  className="animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                >
                  🦇
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ ESTILOS DE ANIMACIÓN */}
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
      `}</style>
    </section>
  );
}
