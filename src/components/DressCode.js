"use client";

import { useState, useEffect } from "react";
import { Sparkles, Send, Loader2, CheckCircle, Users } from "lucide-react";
import { useHalloweenConfig, useDressCode } from "@/hooks/useHalloweenConfig";
import { supabase } from "@/lib/supabase";

export default function DressCodeSection() {
  const [particles, setParticles] = useState([]);

  // Estados para el registro de disfraces
  const [costumes, setCostumes] = useState([]);
  const [formData, setFormData] = useState({ name: "", costume: "" });
  const [loading, setLoading] = useState(false);
  const [loadingCostumes, setLoadingCostumes] = useState(true);
  const [submitted, setSubmitted] = useState(false);

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

    loadCostumes();
  }, []);

  const loadCostumes = async () => {
    try {
      const { data, error } = await supabase
        .from("costume_registrations")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setCostumes(data || []);
    } catch (error) {
      console.error("Error loading costumes:", error);
    } finally {
      setLoadingCostumes(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.costume.trim()) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("costume_registrations")
        .insert([
          {
            name: formData.name.trim(),
            costume: formData.costume.trim(),
          },
        ])
        .select();

      if (error) throw error;

      setCostumes([data[0], ...costumes]);
      setFormData({ name: "", costume: "" });
      setSubmitted(true);

      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error("Error submitting costume:", error);
      alert("Hubo un error al registrar tu disfraz. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

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
                  🏆 1° Premio: Champagne <br />
                  🏆 2° Premio: Vino
                </p>
              </div>
            </div>
          </div>

          {/* Formulario de Registro de Disfraz */}
          <div className="max-w-4xl mx-auto mb-12">
            <div
              className="glass-morphism rounded-2xl p-8 border-2"
              style={{
                borderColor: colores.dorado,
                backgroundColor: "rgba(0, 0, 0, 0.7)",
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="text-3xl">📝</div>
                <h4
                  className="text-2xl font-bold"
                  style={{ color: colores.dorado }}
                >
                  Registrá tu Disfraz
                </h4>
              </div>

              <p className="text-orange-300 mb-6">
                ¡Anotá de qué vas a venir para que no se repitan los disfraces!
              </p>

              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Tu nombre"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    disabled={loading}
                    className="px-4 py-3 bg-gray-900/80 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all text-white placeholder-gray-500"
                    style={{
                      borderColor: `${colores.naranja}80`,
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Tu disfraz (ej: Vampiro)"
                    value={formData.costume}
                    onChange={(e) =>
                      setFormData({ ...formData, costume: e.target.value })
                    }
                    disabled={loading}
                    className="px-4 py-3 bg-gray-900/80 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all text-white placeholder-gray-500"
                    style={{
                      borderColor: `${colores.naranja}80`,
                    }}
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={
                    loading || !formData.name.trim() || !formData.costume.trim()
                  }
                  className="w-full px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-black"
                  style={{
                    background: `linear-gradient(to right, ${colores.naranja}, ${colores.dorado})`,
                  }}
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : submitted ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      ¡Registrado!
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Registrar Disfraz
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Lista de Disfraces Registrados */}
          <div className="max-w-4xl mx-auto">
            <div
              className="glass-morphism rounded-2xl p-8 border-2"
              style={{
                borderColor: colores.naranja,
                backgroundColor: "rgba(0, 0, 0, 0.7)",
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Users
                    className="w-6 h-6"
                    style={{ color: colores.naranja }}
                  />
                  <h4
                    className="text-2xl font-bold"
                    style={{ color: colores.naranja }}
                  >
                    Disfraces Registrados
                  </h4>
                </div>
                <span
                  className="px-3 py-1 rounded-full text-sm font-semibold"
                  style={{
                    backgroundColor: `${colores.naranja}30`,
                    color: colores.dorado,
                  }}
                >
                  {costumes.length}{" "}
                  {costumes.length === 1 ? "disfraz" : "disfraces"}
                </span>
              </div>

              {loadingCostumes ? (
                <div className="text-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto text-orange-500" />
                </div>
              ) : costumes.length > 0 ? (
                <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
                  {costumes.map((costume, index) => (
                    <div
                      key={costume.id}
                      className="flex items-center gap-4 p-4 rounded-xl border transition-all hover:scale-[1.02]"
                      style={{
                        backgroundColor: `${colores.naranja}10`,
                        borderColor: `${colores.naranja}30`,
                      }}
                    >
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0"
                        style={{
                          backgroundColor: colores.naranja,
                          color: colores.negro,
                        }}
                      >
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-orange-200 truncate">
                          {costume.name}
                        </p>
                        <p className="text-sm text-orange-400 truncate">
                          🎭 {costume.costume}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-orange-300">
                  <p className="text-lg">
                    ¡Sé el primero en registrar tu disfraz! 👻
                  </p>
                </div>
              )}
            </div>
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
        .glass-morphism {
          backdrop-filter: blur(10px);
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${colores.naranja};
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: ${colores.dorado};
        }
      `}</style>
    </section>
  );
}
