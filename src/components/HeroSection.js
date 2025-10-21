"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useHalloweenConfig } from "@/hooks/useHalloweenConfig";

// Componente de destellos estilo Halloween
const HalloweenSparkles = ({ count = 15, colores }) => {
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    const colors = [colores.naranja, colores.dorado, colores.morado];
    const newSparkles = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 4,
      delay: Math.random() * 4,
      duration: Math.random() * 3 + 2,
      opacity: Math.random() * 0.8 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setSparkles(newSparkles);
  }, [count, colores]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute rounded-full"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            backgroundColor: sparkle.color,
            boxShadow: `0 0 ${sparkle.size * 2}px ${sparkle.color}`,
          }}
          initial={{
            opacity: 0,
            scale: 0,
            x: 0,
            y: 0,
          }}
          animate={{
            opacity: [0, sparkle.opacity, 0],
            scale: [0, 1, 0.5, 1, 0],
            x: [0, Math.random() * 20 - 10, Math.random() * 40 - 20],
            y: [0, -Math.random() * 30 - 10, -Math.random() * 60 - 20],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: sparkle.duration,
            delay: sparkle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Componente de partículas grandes para efectos
const SpookyParticles = ({ count = 8, colores }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const colors = [colores.naranja, colores.dorado, colores.morado];
    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 12 + 8,
      delay: Math.random() * 2,
      duration: Math.random() * 4 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setParticles(newParticles);
  }, [count, colores]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            boxShadow: `0 0 ${particle.size * 3}px ${particle.color}`,
          }}
          initial={{
            opacity: 0,
            scale: 0,
            x: 0,
            y: 0,
          }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0, 1.2, 0.8, 1.2, 0],
            x: [0, Math.random() * 30 - 15, Math.random() * 50 - 25],
            y: [0, -Math.random() * 40 - 20, -Math.random() * 80 - 30],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default function HeroSection() {
  const { nombreEvento, colores } = useHalloweenConfig();

  // Estilos para los textos principales
  const titleStyles = {
    className: "text-6xl md:text-8xl lg:text-9xl font-bold mb-4 relative z-10",
    style: {
      fontFamily: "var(--font-dancing)",
      color: colores.naranja,
      textShadow: `0 0 20px ${colores.naranja}, 0 0 40px ${colores.morado}, 0 0 60px ${colores.dorado}, 2px 2px 8px rgba(0,0,0,0.9)`,
    },
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Tapiz con opacidad para que se vea sobre el fondo */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url('/assets/backdesktop.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",

          mixBlendMode: "multiply",
        }}
      />

      {/* Overlay sutil para dar profundidad */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(to bottom, 
              ${colores.negro}20, 
              transparent 30%, 
              transparent 70%, 
              ${colores.negro}30
            )
          `,
        }}
      />

      {/* Destellos mágicos estilo Halloween */}
      <HalloweenSparkles count={25} colores={colores} />
      <SpookyParticles count={12} colores={colores} />

      <div className="text-center z-10 px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 relative"
        >
          {/* Calabaza principal */}
          <motion.div
            className="text-8xl mb-8"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              filter: `drop-shadow(0 0 30px ${colores.naranja})`,
            }}
          >
            🎃
          </motion.div>

          {/* Contenedor del nombre del evento */}
          <div className="relative">
            <motion.h1
              className={titleStyles.className}
              style={titleStyles.style}
              animate={{
                scale: [1, 1.05, 1],
                textShadow: [
                  `0 0 20px ${colores.naranja}, 0 0 40px ${colores.morado}, 0 0 60px ${colores.dorado}, 2px 2px 8px rgba(0,0,0,0.9)`,
                  `0 0 30px ${colores.naranja}, 0 0 50px ${colores.morado}, 0 0 70px ${colores.dorado}, 2px 2px 8px rgba(0,0,0,0.9)`,
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {nombreEvento}
            </motion.h1>
          </div>

          {/* Sección con emojis de Halloween entre líneas */}
          <div className="flex items-center justify-center gap-4 mb-6 mt-8">
            <div
              className="h-px w-24"
              style={{
                background: `linear-gradient(to right, transparent, ${colores.naranja}, transparent)`,
              }}
            />

            {/* Emojis Halloween con efectos especiales */}
            <motion.div
              className="relative flex gap-4 text-5xl"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <motion.span
                animate={{
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                👻
              </motion.span>

              <motion.span
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                🦇
              </motion.span>

              <motion.span
                animate={{
                  rotate: [0, -10, 10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              >
                💀
              </motion.span>

              {/* Partículas alrededor de los emojis */}
              <SpookyParticles count={6} colores={colores} />
            </motion.div>

            <div
              className="h-px w-24"
              style={{
                background: `linear-gradient(to right, transparent, ${colores.naranja}, transparent)`,
              }}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-8 relative"
        >
          {/* Fecha con los mismos estilos */}
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            style={{
              fontFamily: "var(--font-dancing)",
              color: colores.dorado,
              textShadow: `0 0 20px ${colores.dorado}, 0 0 40px ${colores.naranja}, 2px 2px 8px rgba(0,0,0,0.9)`,
            }}
            animate={{
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Sábado 25 de Octubre
          </motion.h2>
          <motion.h2
            className="text-4xl lg:text-5xl font-bold mb-6"
            style={{
              fontFamily: "var(--font-dancing)",
              color: colores.dorado,
              textShadow: `0 0 20px ${colores.dorado}, 0 0 40px ${colores.naranja}, 2px 2px 8px rgba(0,0,0,0.9)`,
            }}
            animate={{
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            23.59 hs
          </motion.h2>

          <motion.p
            className="text-xl md:text-2xl font-light relative z-10 text-orange-300"
            style={{
              textShadow: `2px 2px 4px rgba(0,0,0,0.9), 0 0 15px ${colores.naranja}`,
            }}
            animate={{
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Vení a celebrar la mejor noche de terror
          </motion.p>

          {/* Emojis adicionales */}
          <motion.div
            className="flex justify-center gap-4 mt-6 text-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <motion.span
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              🕷️
            </motion.span>
            <motion.span
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              🕸️
            </motion.span>
            <motion.span
              animate={{ rotate: [0, -360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              🕷️
            </motion.span>
          </motion.div>
        </motion.div>
      </div>

      {/* Luciérnagas decorativas con colores Halloween */}
      <motion.div
        className="absolute top-10 left-10"
        animate={{
          opacity: [0.5, 1, 0.5],
          scale: [0.8, 1.2, 0.8],
          x: [0, 10, -5, 0],
          y: [0, -8, 5, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          delay: 1,
        }}
      >
        <div
          className="w-3 h-3 rounded-full"
          style={{
            backgroundColor: colores.naranja,
            boxShadow: `0 0 15px ${colores.naranja}, 0 0 30px ${colores.naranja}60`,
          }}
        />
      </motion.div>

      <motion.div
        className="absolute top-20 right-16"
        animate={{
          opacity: [0.3, 0.8, 0.3],
          scale: [0.6, 1, 0.6],
          x: [0, -15, 8, 0],
          y: [0, 12, -6, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          delay: 2,
        }}
      >
        <div
          className="w-2 h-2 rounded-full"
          style={{
            backgroundColor: colores.morado,
            boxShadow: `0 0 12px ${colores.morado}, 0 0 24px ${colores.morado}40`,
          }}
        />
      </motion.div>

      <motion.div
        className="absolute bottom-32 left-20"
        animate={{
          opacity: [0.4, 0.9, 0.4],
          scale: [0.7, 1.1, 0.7],
          x: [0, 18, -10, 0],
          y: [0, -12, 8, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          delay: 0.5,
        }}
      >
        <div
          className="w-4 h-4 rounded-full"
          style={{
            backgroundColor: colores.dorado,
            boxShadow: `0 0 18px ${colores.dorado}, 0 0 36px ${colores.dorado}50`,
          }}
        />
      </motion.div>

      <motion.div
        className="absolute bottom-20 right-24"
        animate={{
          opacity: [0.6, 1, 0.4, 0.8],
          scale: [0.8, 1.2, 0.9, 1],
          x: [0, -20, 15, 0],
          y: [0, -18, 10, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      >
        <div
          className="w-2.5 h-2.5 rounded-full"
          style={{
            backgroundColor: colores.naranja,
            boxShadow: `0 0 14px ${colores.naranja}, 0 0 28px ${colores.naranja}40`,
          }}
        />
      </motion.div>
    </section>
  );
}
