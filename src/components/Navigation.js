"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Music } from "lucide-react";
import MusicPlayer from "./MusicPlayer";
import { useHalloweenConfig } from "@/hooks/useHalloweenConfig";

const navItems = [
  { name: "Inicio", href: "#hero" },
  { name: "Detalles", href: "#details" },
  { name: "Dress Code", href: "#dresscode" },
  { name: "Ubicación", href: "#location" },
  { name: "Música", href: "#music" },
  { name: "RSVP", href: "#rsvp" },
];

// Colores de Halloween
const halloweenColors = {
  background: "#000000",
  backgroundScrolled: "rgba(0, 0, 0, 0.95)",
  orange: "#FF8C42",
  orangeHover: "#FFA500",
  purple: "#A855F7",
  purpleGlow: "#8B5CF6",
  border: "rgba(255, 140, 66, 0.2)",
  borderScrolled: "rgba(255, 140, 66, 0.4)",
};

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { nombre } = useHalloweenConfig();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "shadow-lg shadow-orange-500/20" : ""
        }`}
        style={{
          backgroundColor: scrolled
            ? halloweenColors.backgroundScrolled
            : halloweenColors.background,
          borderBottom: `1px solid ${
            scrolled ? halloweenColors.borderScrolled : halloweenColors.border
          }`,
        }}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="font-coockie text-xl sm:text-2xl md:text-3xl font-bold flex-shrink-0"
              style={{
                color: halloweenColors.orange,
                textShadow: `0 0 10px ${halloweenColors.orange}, 0 0 20px ${halloweenColors.orangeHover}`,
                fontFamily: "var(--font-dancing)",
              }}
            >
              {nombre}
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{
                    scale: 1.05,
                    textShadow: `0 0 8px ${halloweenColors.purple}, 0 0 16px ${halloweenColors.purpleGlow}`,
                  }}
                  className="font-semibold transition-all text-sm lg:text-base whitespace-nowrap px-3 py-2 rounded-lg"
                  style={{
                    color: halloweenColors.orange,
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = halloweenColors.purple;
                    e.target.style.backgroundColor = "rgba(168, 85, 247, 0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = halloweenColors.orange;
                    e.target.style.backgroundColor = "transparent";
                  }}
                >
                  {item.name}
                </motion.a>
              ))}

              {/* Reproductor de música en desktop */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.1 }}
                className="ml-2 lg:ml-4"
              >
                <MusicPlayer showVolumeControl={true} />
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              {/* Reproductor de música en móvil */}
              <div>
                <MusicPlayer showVolumeControl={false} />
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg transition-all"
                style={{
                  color: halloweenColors.orange,
                  boxShadow: `0 2px 8px ${halloweenColors.orange}33`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = halloweenColors.purple;
                  e.currentTarget.style.backgroundColor =
                    "rgba(168, 85, 247, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = halloweenColors.orange;
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Overlay */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="md:hidden fixed inset-0 backdrop-blur-sm"
                style={{
                  top: "64px",
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                }}
              />

              {/* Menu Panel */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="md:hidden absolute top-full left-0 right-0 w-full backdrop-blur-md shadow-lg"
                style={{
                  backgroundColor: halloweenColors.backgroundScrolled,
                  borderTop: `1px solid ${halloweenColors.borderScrolled}`,
                  boxShadow: `0 8px 32px ${halloweenColors.orange}33`,
                }}
              >
                <div className="px-4 py-4 space-y-1">
                  {navItems.map((item, index) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={handleLinkClick}
                      whileHover={{
                        scale: 1.02,
                        textShadow: `0 0 8px ${halloweenColors.purple}, 0 0 16px ${halloweenColors.purpleGlow}`,
                      }}
                      className="block py-3 px-3 font-semibold rounded-lg transition-all"
                      style={{
                        color: halloweenColors.orange,
                        backdropFilter: "blur(10px)",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.color = halloweenColors.purple;
                        e.target.style.backgroundColor =
                          "rgba(168, 85, 247, 0.15)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = halloweenColors.orange;
                        e.target.style.backgroundColor = "transparent";
                      }}
                    >
                      {item.name}
                    </motion.a>
                  ))}

                  {/* Control de música adicional en menú móvil */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navItems.length * 0.1 }}
                    className="pt-2 mt-2"
                    style={{
                      borderTop: `1px solid ${halloweenColors.border}`,
                    }}
                  >
                    <div
                      className="py-2 px-3 text-sm font-semibold flex items-center gap-2"
                      style={{
                        color: halloweenColors.orange,
                        textShadow: `0 0 8px ${halloweenColors.orange}66`,
                      }}
                    >
                      <motion.div
                        animate={{
                          rotate: [0, 360],
                          color: [
                            halloweenColors.orange,
                            halloweenColors.purple,
                            halloweenColors.purpleGlow,
                            halloweenColors.orangeHover,
                            halloweenColors.orange,
                          ],
                          filter: [
                            `drop-shadow(0 0 8px ${halloweenColors.orange})`,
                            `drop-shadow(0 0 12px ${halloweenColors.purple})`,
                            `drop-shadow(0 0 8px ${halloweenColors.orange})`,
                          ],
                        }}
                        transition={{
                          rotate: {
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear",
                          },
                          color: {
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          },
                          filter: {
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          },
                        }}
                      >
                        <Music size={16} />
                      </motion.div>
                      Control de Música
                    </div>
                    <div className="px-3 py-2">
                      <MusicPlayer
                        className="w-full justify-center"
                        showVolumeControl={true}
                      />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer para compensar el navbar fijo */}
      <div className="h-16 md:h-20" />
    </>
  );
}
