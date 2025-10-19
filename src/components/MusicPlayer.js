import React from "react";
import { motion } from "framer-motion";
import { Music, Play, Pause, Volume2, VolumeX } from "lucide-react";
import { useAudio } from "./AudioContext";

const MusicPlayer = ({ className = "", showVolumeControl = true }) => {
  // Obtener todo el estado y las funciones del contexto global
  const {
    isPlaying,
    isLoading,
    error,
    volume,
    isMuted,
    togglePlayPause,
    handleVolumeChange,
    toggleMute,
  } = useAudio();

  // Colores de Halloween
  const colors = {
    orange: "#FF8C42",
    orangeLight: "#FFA500",
    orangeDark: "#FF7720",
    purple: "#A855F7",
    purpleLight: "#C084FC",
    purpleDark: "#9333EA",
    black: "#000000",
    blackLight: "#1a1a1a",
  };

  // Si hay error, mostrar mensaje de error
  if (error) {
    return (
      <div
        className={`inline-flex items-center px-2 py-1 rounded text-xs ${className}`}
        style={{
          backgroundColor: `${colors.orange}20`,
          color: colors.orange,
        }}
      >
        <Music size={14} className="mr-1" />
        <span className="text-xs">Audio Error</span>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      {/* Botón principal de Play/Pause */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={togglePlayPause}
        disabled={isLoading}
        animate={
          !isPlaying && !isLoading
            ? {
                scale: [1, 1.08, 1],
                boxShadow: [
                  `0 4px 20px ${colors.orange}80`,
                  `0 6px 30px ${colors.orange}cc`,
                  `0 4px 20px ${colors.orange}80`,
                ],
              }
            : {}
        }
        transition={
          !isPlaying && !isLoading
            ? {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }
            : {}
        }
        className={`flex items-center gap-1 px-3 py-1.5 text-sm font-bold rounded-full transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed relative overflow-hidden`}
        style={{
          backgroundImage: isPlaying
            ? `linear-gradient(90deg, ${colors.orange}, ${colors.orangeLight}, ${colors.orange})`
            : isLoading
            ? `linear-gradient(90deg, ${colors.blackLight}, ${colors.blackLight})`
            : `linear-gradient(90deg, ${colors.orangeDark}, ${colors.orange}, ${colors.orangeDark})`,
          backgroundSize: "200% 100%",
          color: isPlaying ? colors.black : "#ffffff",
          boxShadow: isPlaying
            ? `0 4px 20px ${colors.orange}66`
            : `0 4px 20px ${colors.orange}99`,
        }}
        aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
        onMouseEnter={(e) => {
          if (!isLoading) {
            e.currentTarget.style.backgroundImage = `linear-gradient(90deg, ${colors.purple}, ${colors.purpleLight}, ${colors.purple})`;
            e.currentTarget.style.boxShadow = `0 6px 30px ${colors.purple}99`;
          }
        }}
        onMouseLeave={(e) => {
          if (!isLoading) {
            e.currentTarget.style.backgroundImage = isPlaying
              ? `linear-gradient(90deg, ${colors.orange}, ${colors.orangeLight}, ${colors.orange})`
              : `linear-gradient(90deg, ${colors.orangeDark}, ${colors.orange}, ${colors.orangeDark})`;
            e.currentTarget.style.boxShadow = isPlaying
              ? `0 4px 20px ${colors.orange}66`
              : `0 4px 20px ${colors.orange}99`;
          }
        }}
      >
        {/* Efecto de brillo cuando está reproduciéndose */}
        {isPlaying && (
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)`,
            }}
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}

        {/* Icono que rota cuando está reproduciéndose */}
        <motion.div
          animate={isPlaying ? { rotate: [0, 360] } : { rotate: 0 }}
          transition={{
            duration: 2,
            repeat: isPlaying ? Infinity : 0,
            ease: "linear",
          }}
        >
          {isLoading ? (
            <Music size={12} className="animate-spin" />
          ) : isPlaying ? (
            <Pause size={12} />
          ) : (
            <Play size={12} />
          )}
        </motion.div>

        {/* Texto que parpadea cuando está reproduciéndose */}
        <motion.span
          animate={isPlaying ? { opacity: [1, 0.7, 1] } : { opacity: 1 }}
          transition={{
            duration: 1.5,
            repeat: isPlaying ? Infinity : 0,
            ease: "easeInOut",
          }}
        >
          {isLoading ? "Cargando..." : isPlaying ? "PAUSE" : "PLAY"}
        </motion.span>
      </motion.button>

      {/* Controles de volumen (solo si showVolumeControl es true) */}
      {showVolumeControl && (
        <div className="hidden sm:flex items-center gap-1">
          {/* Botón de mute/unmute */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleMute}
            className="p-1 rounded-full transition-all duration-300"
            style={{
              color: colors.orange,
            }}
            aria-label={isMuted ? "Activar sonido" : "Silenciar"}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = colors.purple;
              e.currentTarget.style.textShadow = `0 0 8px ${colors.purple}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = colors.orange;
              e.currentTarget.style.textShadow = "none";
            }}
          >
            <motion.div
              animate={
                !isMuted && isPlaying ? { scale: [1, 1.1, 1] } : { scale: 1 }
              }
              transition={{
                duration: 0.8,
                repeat: !isMuted && isPlaying ? Infinity : 0,
                ease: "easeInOut",
              }}
            >
              {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </motion.div>
          </motion.button>

          {/* Slider de volumen */}
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={isMuted ? 0 : volume}
            onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
            className="w-16 h-1 rounded-lg appearance-none cursor-pointer slider"
            style={{
              backgroundImage: `linear-gradient(to right, 
                ${colors.orange} 0%, 
                ${colors.orange} ${(isMuted ? 0 : volume) * 100}%, 
                ${colors.blackLight} ${(isMuted ? 0 : volume) * 100}%, 
                ${colors.blackLight} 100%)`,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;
