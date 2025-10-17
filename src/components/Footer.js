"use client";

import { useState, useEffect } from "react";
import { Phone, MessageCircle, Instagram, Sparkles } from "lucide-react";
import { useHalloweenConfig } from "@/hooks/useHalloweenConfig";

export default function Footer() {
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState([]);

  // ✅ Usar configuración centralizada
  const {
    nombreEvento,
    whatsapp,
    fechaEvento,
    horaEvento,
    lugar,
    direccion,
    instagramUser,
    nombreFamilia,
    colores,
  } = useHalloweenConfig();

  // Solo ejecutar en el cliente
  useEffect(() => {
    setMounted(true);

    // Generar partículas para el footer
    const newParticles = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 6,
      duration: 5 + Math.random() * 4,
      size: Math.random() * 3 + 1,
      emoji: ["🎃", "👻", "🦇", "💀", "🕷️"][Math.floor(Math.random() * 5)],
    }));
    setParticles(newParticles);
  }, []);

  const whatsappLink = `https://wa.me/${whatsapp.replace(
    /[^0-9]/g,
    ""
  )}?text=Hola! Te escribo por la invitación de Halloween Party`;

  if (!mounted) return null;

  return (
    <footer className="relative bg-gradient-to-br from-orange-950 via-purple-950 to-black text-white py-20 overflow-hidden">
      {/* Imagen de fondo con efecto sombreado */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "url(/assets/tapiz2.png)",
          backgroundSize: "cover",
          backgroundPosition: "center 20%",
          backgroundRepeat: "no-repeat",
          maskImage:
            "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 30%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0) 80%)",
          WebkitMaskImage:
            "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 30%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0) 80%)",
        }}
      />

      {/* Overlay adicional para mejorar la legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />

      {/* Partículas flotantes */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute footer-particle-gentle text-2xl opacity-30"
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

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header del Footer */}
        <div className="text-center mb-16 footer-slide-in-up">
          <div className="relative inline-block mb-6">
            <div
              className="absolute inset-0 blur-3xl footer-pulse-glow"
              style={{
                background: `linear-gradient(to right, ${colores.naranja}33, ${colores.dorado}33)`,
              }}
            />
            <div className="relative text-7xl animate-bounce">🎃</div>
          </div>

          <h2
            className="font-serif text-4xl md:text-6xl font-bold mb-4 footer-shimmer-text"
            style={{
              background: `linear-gradient(90deg, ${colores.naranja} 0%, ${colores.dorado} 50%, ${colores.naranja} 100%)`,
              backgroundSize: "200% 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "shimmer 3s ease-in-out infinite",
            }}
          >
            {nombreEvento}
          </h2>

          <p className="text-xl md:text-2xl text-orange-300 max-w-3xl mx-auto font-medium">
            ¡Gracias por ser parte de esta noche espeluznante!
          </p>

          <div className="flex items-center justify-center gap-3 mt-6 text-4xl">
            <span className="animate-pulse">👻</span>
            <span className="animate-bounce">🦇</span>
            <span className="animate-pulse">👻</span>
          </div>
        </div>

        {/* Grid de Contenido */}
        <div className="grid md:grid-cols-1 gap-10 mb-16">
          {/* Detalles del Evento */}
          <div
            className="footer-slide-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Sparkles
                  className="w-6 h-6"
                  style={{ color: colores.naranja }}
                />
                <h3
                  className="font-serif text-2xl font-bold"
                  style={{ color: colores.naranja }}
                >
                  Detalles del Evento
                </h3>
                <Sparkles
                  className="w-6 h-6"
                  style={{ color: colores.naranja }}
                />
              </div>

              <div className="space-y-3 text-orange-200">
                <p
                  className="font-bold text-lg"
                  style={{ color: colores.dorado }}
                >
                  📅 {fechaEvento}
                </p>
                <p className="font-semibold">🕐 {horaEvento}</p>
                <p className="font-bold" style={{ color: colores.dorado }}>
                  📍 {lugar}
                </p>
                <p className="text-sm text-orange-300">{direccion}</p>
              </div>

              <div
                className="mt-6 h-1 w-20 rounded-full mx-auto"
                style={{
                  background: `linear-gradient(to right, ${colores.naranja}, ${colores.dorado})`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Contacto y Redes Sociales */}
        <div
          className="flex flex-wrap items-center justify-center gap-6 mb-12 footer-slide-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          {whatsapp && (
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${colores.verde}, #25D366)`,
                color: "white",
              }}
            >
              <MessageCircle className="w-5 h-5" />
              <span className="font-semibold">WhatsApp</span>
            </a>
          )}

          {instagramUser && (
            <a
              href={`https://instagram.com/${instagramUser}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${colores.morado}, ${colores.naranja})`,
                color: "white",
              }}
            >
              <Instagram className="w-5 h-5" />
              <span className="font-semibold">@{instagramUser}</span>
            </a>
          )}
        </div>

        {/* Separador Decorativo */}
        <div className="flex items-center justify-center mb-10">
          <div
            className="h-px w-32"
            style={{
              background: `linear-gradient(to right, transparent, ${colores.naranja}, transparent)`,
            }}
          />
          <div className="mx-6 relative">
            <div
              className="absolute inset-0 blur-xl"
              style={{ backgroundColor: `${colores.naranja}33` }}
            />
            <div className="relative text-3xl animate-pulse">🕸️</div>
          </div>
          <div
            className="h-px w-32"
            style={{
              background: `linear-gradient(to right, transparent, ${colores.naranja}, transparent)`,
            }}
          />
        </div>

        {/* Mensaje Final */}
        <div
          className="text-center mb-8 footer-slide-in-up"
          style={{ animationDelay: "0.6s" }}
        >
          <p className="text-lg md:text-xl text-orange-300 font-medium mb-4">
            🎃 No olvides tu disfraz - ¡Habrá premio al mejor! 🏆
          </p>
          <div className="flex justify-center gap-4 text-3xl">
            <span>🧛</span>
            <span>🧙</span>
            <span>👹</span>
            <span>🧟</span>
          </div>
        </div>

        {/* Sección Final */}
        <div
          className="text-center footer-slide-in-up"
          style={{ animationDelay: "0.8s" }}
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3 text-gray-500 text-sm">
            <span>Hecho con</span>
            <span className="text-xl animate-pulse">🎃</span>
            <span>
              para la Halloween Party por{" "}
              <a
                href="https://patagoniascript.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline font-semibold"
                style={{ color: colores.naranja }}
              >
                PatagoniaScript
              </a>
            </span>
          </div>
          <p className="text-xs text-gray-600 mt-4">
            © 2025 Halloween Party - Todos los derechos reservados
          </p>
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
        @keyframes shimmer {
          0% {
            background-position: 200% center;
          }
          100% {
            background-position: -200% center;
          }
        }
        .footer-slide-in-up {
          animation: slideUp 0.8s ease-out;
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
        .footer-pulse-glow {
          animation: pulseGlow 3s ease-in-out infinite;
        }
        @keyframes pulseGlow {
          0%,
          100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.1);
          }
        }
      `}</style>
    </footer>
  );
}
