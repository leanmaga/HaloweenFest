"use client";
import React, { useState, useEffect, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useHalloweenConfig } from "@/hooks/useHalloweenConfig";
import { Volume2, VolumeX } from "lucide-react";
import { useAudio } from "@/components/AudioContext";

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showAudioChoice, setShowAudioChoice] = useState(false);

  useEffect(() => {
    // Mostrar loader decorativo por 2 segundos, luego mostrar opciones de audio
    const timer = setTimeout(() => {
      setShowAudioChoice(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const closeLoader = () => {
    setIsLoading(false);
  };

  // Funciones vacías para compatibilidad con componentes que las usan
  const incrementLoadedImages = () => {};
  const updateImageCount = () => {};

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        showAudioChoice,
        closeLoader,
        setIsLoading,
        incrementLoadedImages,
        updateImageCount,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within LoadingProvider");
  }
  return context;
};

const PageLoader = () => {
  const { showAudioChoice, closeLoader } = useLoading();
  const [particles, setParticles] = useState([]);

  const { colores } = useHalloweenConfig();
  const { togglePlayPause, isPlaying } = useAudio();

  useEffect(() => {
    // Generar partículas de Halloween
    const particleData = [...Array(30)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      emoji: ["🎃", "👻", "🦇", "💀", "🕷️"][Math.floor(Math.random() * 5)],
      scale: Math.random() * 0.5 + 0.5,
      duration: Math.random() * 3 + 4,
      delay: Math.random() * 2,
    }));
    setParticles(particleData);
  }, []);

  const handlePlayWithAudio = async () => {
    if (!isPlaying) {
      await togglePlayPause();
    }
    closeLoader();
  };

  const handleContinueWithoutAudio = () => {
    closeLoader();
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.1,
        transition: { duration: 1, ease: "easeInOut" },
      }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${colores.naranja}30 0%, ${colores.morado}50 50%, ${colores.negro} 100%)`,
      }}
    >
      {/* Partículas flotantes de Halloween */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute text-3xl opacity-30"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            initial={{
              scale: particle.scale,
              rotate: 0,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.sin(particle.id) * 20, 0],
              rotate: [0, 360],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: particle.delay,
            }}
          >
            {particle.emoji}
          </motion.div>
        ))}
      </div>

      <div className="text-center z-10 px-8 max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          {!showAudioChoice ? (
            // Loader Decorativo de Halloween
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
            >
              {/* Calabaza Animada */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="mb-8"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="text-9xl"
                  style={{
                    filter: `drop-shadow(0 0 30px ${colores.naranja})`,
                  }}
                >
                  🎃
                </motion.div>
              </motion.div>

              {/* Título */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-5xl md:text-6xl font-bold mb-6"
                style={{
                  color: colores.naranja,
                  textShadow: `0 0 30px ${colores.naranja}, 0 0 60px ${colores.morado}`,
                }}
              >
                Halloween Party
              </motion.h1>

              {/* Subtítulo */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="text-xl md:text-2xl font-medium text-orange-300"
              >
                Preparando una noche espeluznante...
              </motion.p>

              {/* Emojis Animados */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="flex justify-center gap-6 mt-8 text-4xl"
              >
                {["👻", "🦇", "💀"].map((emoji, i) => (
                  <motion.span
                    key={i}
                    animate={{
                      y: [0, -15, 0],
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeInOut",
                    }}
                  >
                    {emoji}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ) : (
            // Pantalla de Selección de Música
            <motion.div
              key="audio-choice"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Icono de Música */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-8"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${colores.naranja}, ${colores.dorado})`,
                    boxShadow: `0 8px 32px ${colores.naranja}66`,
                  }}
                >
                  <Volume2 className="w-12 h-12 text-black" />
                </motion.div>

                <h2
                  className="text-4xl md:text-5xl font-bold mb-4"
                  style={{
                    color: colores.naranja,
                    textShadow: `0 0 20px ${colores.naranja}80`,
                  }}
                >
                  ¿Deseas música? 🎵
                </h2>

                <p className="text-xl text-orange-300">
                  Para una mejor experiencia, te recomendamos reproducir la
                  música de la fiesta
                </p>
              </motion.div>

              {/* Botones */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="space-y-4"
              >
                {/* Botón: Reproducir con Audio */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePlayWithAudio}
                  className="w-full py-5 px-8 rounded-2xl font-bold text-xl text-black shadow-2xl relative overflow-hidden group"
                  style={{
                    background: `linear-gradient(135deg, ${colores.naranja}, ${colores.dorado})`,
                    boxShadow: `0 10px 40px ${colores.naranja}66`,
                  }}
                >
                  <motion.div
                    animate={{
                      x: ["-100%", "200%"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                  />

                  <span className="relative flex items-center justify-center gap-3">
                    <Volume2 className="w-6 h-6" />
                    Reproducir con Música
                  </span>
                </motion.button>

                {/* Botón: Continuar sin Audio */}
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleContinueWithoutAudio}
                  className="w-full py-5 px-8 rounded-2xl font-semibold text-lg border-2 transition-all"
                  style={{
                    color: colores.naranja,
                    borderColor: colores.naranja,
                    backgroundColor: `${colores.negro}cc`,
                  }}
                >
                  <span className="flex items-center justify-center gap-3">
                    <VolumeX className="w-5 h-5" />
                    Continuar sin Música
                  </span>
                </motion.button>
              </motion.div>

              {/* Nota informativa */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-6 text-sm text-orange-400"
              >
                💡 Puedes cambiar esto en cualquier momento
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Overlay animado de fondo */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${colores.naranja}20, transparent 70%)`,
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
};

export default PageLoader;
