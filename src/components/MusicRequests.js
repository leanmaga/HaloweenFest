import { useState, useEffect } from "react";
import { Music, Send, Headphones, Loader2, AlertCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useHalloweenConfig } from "@/hooks/useHalloweenConfig";

export default function MusicRequests() {
  const [songRequest, setSongRequest] = useState("");
  const [artistRequest, setArtistRequest] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [dbSongs, setDbSongs] = useState([]);
  const [loadingSongs, setLoadingSongs] = useState(true);
  const [isFlipped, setIsFlipped] = useState(false);

  const { colores } = useHalloweenConfig();

  // Cargar canciones al montar el componente
  useEffect(() => {
    loadSongs();
  }, []);

  // Función para cargar canciones desde Supabase
  const loadSongs = async () => {
    try {
      setLoadingSongs(true);
      const { data, error } = await supabase
        .from("song_requests")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(20);

      if (error) {
        console.error("Error loading songs:", error);
        throw error;
      }

      setDbSongs(data || []);
    } catch (error) {
      console.error("Error loading songs:", error);
      setDbSongs([]);
    } finally {
      setLoadingSongs(false);
    }
  };

  // Función para enviar canción a Supabase
  const handleSubmit = async () => {
    if (!songRequest.trim()) return;

    try {
      setLoading(true);
      setError("");

      const { data, error } = await supabase
        .from("song_requests")
        .insert([
          {
            song_name: songRequest.trim(),
            artist_name: artistRequest.trim() || null,
            message: message.trim() || null,
            ip_address: null,
          },
        ])
        .select();

      if (error) {
        console.error("Error de Supabase:", error);
        throw error;
      }

      if (data && data[0]) {
        setDbSongs((prev) => [data[0], ...prev]);
      }

      setSubmitted(true);
      setSongRequest("");
      setArtistRequest("");
      setMessage("");

      setTimeout(() => {
        setShowForm(false);
        setSubmitted(false);
        setIsFlipped(false);
      }, 3000);
    } catch (error) {
      console.error("Error submitting song:", error);
      let errorMessage =
        "Hubo un error al enviar tu solicitud. Por favor, intenta nuevamente.";

      if (error.code === "PGRST116") {
        errorMessage =
          "No se pudo conectar con la base de datos. Verifica tu configuración de Supabase.";
      }

      setError(errorMessage);
      setTimeout(() => setError(""), 5000);
    } finally {
      setLoading(false);
    }
  };

  const getSongsCountText = (count) => {
    if (count === 0) return "0 canciones";
    if (count === 1) return "1 canción";
    return `${count} canciones`;
  };

  return (
    <div className="relative" id="music">
      <style>{`
        .music-flip-card {
          perspective: 1000px;
          height: 100vh;
        }

        .music-flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.8s;
          transform-style: preserve-3d;
        }

        .music-flip-card.flipped .music-flip-card-inner {
          transform: rotateY(180deg);
        }

        .music-flip-card-front,
        .music-flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        .music-flip-card-back {
          transform: rotateY(180deg);
        }

        .music-golden-button {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 8px 32px rgba(255, 107, 53, 0.3);
          }
          50% {
            box-shadow: 0 8px 48px rgba(255, 107, 53, 0.6);
          }
        }

        .music-rotate-sparkles {
          animation: rotate 4s linear infinite;
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .music-fade-in-up {
          animation: fadeInUp 0.5s ease-out forwards;
          opacity: 0;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .music-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .music-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 107, 53, 0.1);
          border-radius: 10px;
        }

        .music-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 107, 53, 0.5);
          border-radius: 10px;
        }

        .music-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 107, 53, 0.7);
        }
      `}</style>

      {/* LAYOUT MÓVIL */}
      <div className="lg:hidden">
        <div className={`music-flip-card ${isFlipped ? "flipped" : ""}`}>
          <div className="music-flip-card-inner">
            {/* FRONT: Imagen con botón */}
            <div className="music-flip-card-front">
              <div
                className="relative h-screen w-full flex items-center justify-center"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=800&q=80')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to bottom, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0.7) 100%)`,
                  }}
                />

                <div className="relative flex flex-col items-center z-10 text-center max-w-lg mx-auto px-6">
                  <div className="relative inline-flex items-center justify-center mb-8">
                    <div className="absolute inset-0">
                      <div
                        className="w-24 h-24 rounded-full blur-2xl animate-pulse"
                        style={{
                          background: colores.naranja,
                        }}
                      />
                    </div>
                    <Music className="w-12 h-12 relative z-10 text-white" />
                    <div className="absolute -top-2 -right-2 music-rotate-sparkles">
                      <div className="text-2xl">🎃</div>
                    </div>
                  </div>

                  <h2
                    className="font-bold text-4xl sm:text-5xl mb-6 leading-tight text-white"
                    style={{
                      textShadow: `0 0 20px ${colores.naranja}, 0 4px 20px rgba(0, 0, 0, 0.8)`,
                    }}
                  >
                    🎵 Playlist Espeluznante 🎵
                    <br />
                    <span className="text-3xl sm:text-4xl">
                      ¡Pide tu Canción!
                    </span>
                  </h2>

                  <button
                    onClick={() => setIsFlipped(true)}
                    className="music-golden-button px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center gap-3 mx-auto text-black"
                    style={{
                      background: `linear-gradient(135deg, ${colores.naranja}, ${colores.dorado})`,
                    }}
                  >
                    <Music className="w-6 h-6" />
                    Agregar Mi Canción
                  </button>
                </div>
              </div>
            </div>

            {/* BACK: Formulario y lista */}
            <div className="music-flip-card-back">
              <div
                className="h-screen flex items-center justify-center overflow-y-auto"
                style={{
                  background: colores.negro,
                }}
              >
                <div className="w-full max-w-lg px-6 py-8">
                  {!showForm ? (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-lg flex items-center gap-2 text-orange-400">
                          <Music className="w-5 h-5" />
                          Playlist de la Fiesta 🎃
                        </h3>
                        <button
                          onClick={() => {
                            setIsFlipped(false);
                            setShowForm(false);
                          }}
                          className="transition-colors text-orange-400 hover:text-orange-300"
                        >
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 19l-7-7m0 0l7-7m-7 7h18"
                            />
                          </svg>
                        </button>
                      </div>

                      <div className="text-center">
                        <button
                          onClick={() => setShowForm(true)}
                          className="inline-flex items-center gap-3 rounded-full px-6 py-3 font-bold text-lg shadow-2xl hover:scale-105 transition-transform text-black"
                          style={{
                            background: `linear-gradient(to right, ${colores.naranja}, ${colores.dorado})`,
                          }}
                        >
                          <Music className="w-5 h-5" />
                          Agregar Mi Canción 👻
                        </button>
                      </div>

                      <div className="text-center">
                        <div
                          className="inline-flex items-center gap-3 bg-black/60 backdrop-blur-sm rounded-full px-6 py-3 border-2"
                          style={{
                            borderColor: colores.naranja,
                          }}
                        >
                          <Headphones className="w-5 h-5 text-orange-500" />
                          <span className="font-semibold text-white">
                            {loadingSongs
                              ? "Cargando..."
                              : getSongsCountText(dbSongs.length)}{" "}
                            agregadas
                          </span>
                        </div>
                      </div>

                      {loadingSongs ? (
                        <div className="text-center py-8">
                          <Loader2 className="w-8 h-8 animate-spin mx-auto text-orange-500" />
                          <p className="text-orange-400 mt-2">
                            Cargando canciones...
                          </p>
                        </div>
                      ) : dbSongs.length > 0 ? (
                        <div
                          className="bg-black/60 backdrop-blur-sm rounded-2xl p-4 border-2"
                          style={{
                            borderColor: `${colores.morado}80`,
                          }}
                        >
                          <h4 className="font-bold text-sm mb-3 flex items-center gap-2 text-orange-400">
                            <Music className="w-4 h-4" />
                            Últimas Canciones
                          </h4>
                          <div className="space-y-2 max-h-60 overflow-y-auto music-scrollbar">
                            {dbSongs.slice(0, 8).map((song, index) => (
                              <div
                                key={song.id}
                                className="flex items-center gap-2 p-3 bg-orange-900/30 rounded-lg transition-opacity duration-300 music-fade-in-up border border-orange-500/30"
                                style={{ animationDelay: `${index * 100}ms` }}
                              >
                                <div
                                  className="w-2 h-2 rounded-full flex-shrink-0"
                                  style={{
                                    background: `linear-gradient(to right, ${colores.naranja}, ${colores.dorado})`,
                                  }}
                                />
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium truncate text-sm text-orange-100">
                                    {song.song_name}
                                  </p>
                                  {song.artist_name && (
                                    <p className="text-xs truncate text-orange-300">
                                      {song.artist_name}
                                    </p>
                                  )}
                                  {song.message && (
                                    <p className="text-xs truncate italic mt-1 text-orange-400">
                                      {song.message}
                                    </p>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <Music className="w-12 h-12 mx-auto mb-4 opacity-60 text-orange-500" />
                          <p className="text-orange-300">
                            Aún no hay canciones solicitadas. ¡Sé el primero! 🎃
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div
                      className="bg-black/80 backdrop-blur-xl rounded-3xl p-6 relative shadow-2xl border-2"
                      style={{
                        borderColor: colores.naranja,
                      }}
                    >
                      <button
                        onClick={() => setShowForm(false)}
                        className="absolute top-4 right-4 w-8 h-8 bg-orange-900/40 hover:bg-orange-800/60 rounded-full flex items-center justify-center transition-all text-sm hover:rotate-90 text-orange-300"
                      >
                        ✕
                      </button>

                      <div className="mb-4">
                        <h3 className="font-bold text-lg flex items-center gap-2 text-orange-400">
                          <Music className="w-5 h-5" />
                          Tu Canción Favorita 🎃
                        </h3>
                      </div>

                      {!submitted ? (
                        <div className="space-y-4">
                          {error && (
                            <div className="p-3 bg-red-500/20 border border-red-400/50 rounded-xl flex items-center gap-2 text-red-400">
                              <AlertCircle className="w-4 h-4" />
                              <span className="text-xs">{error}</span>
                            </div>
                          )}

                          <div>
                            <label className="block font-medium mb-2 text-sm text-orange-300">
                              Nombre de la Canción *
                            </label>
                            <input
                              type="text"
                              value={songRequest}
                              onChange={(e) => setSongRequest(e.target.value)}
                              className="w-full px-3 py-2 bg-orange-900/30 rounded-xl focus:outline-none focus:ring-2 transition-all text-sm text-white border-2"
                              style={{
                                borderColor: `${colores.naranja}80`,
                              }}
                              placeholder="Ej: Thriller - Michael Jackson"
                              disabled={loading}
                              onKeyPress={(e) =>
                                e.key === "Enter" && handleSubmit()
                              }
                            />
                          </div>

                          <div>
                            <label className="block font-medium mb-2 text-sm text-orange-300">
                              Artista
                            </label>
                            <input
                              type="text"
                              value={artistRequest}
                              onChange={(e) => setArtistRequest(e.target.value)}
                              className="w-full px-3 py-2 bg-orange-900/30 rounded-xl focus:outline-none focus:ring-2 transition-all text-sm text-white border-2"
                              style={{
                                borderColor: `${colores.naranja}80`,
                              }}
                              placeholder="Ej: Michael Jackson"
                              disabled={loading}
                              onKeyPress={(e) =>
                                e.key === "Enter" && handleSubmit()
                              }
                            />
                          </div>

                          <div>
                            <label className="block font-medium mb-2 text-sm text-orange-300">
                              Mensaje Especial (Opcional)
                            </label>
                            <textarea
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                              rows={2}
                              className="w-full px-3 py-2 bg-orange-900/30 rounded-xl focus:outline-none focus:ring-2 transition-all resize-none text-sm text-white border-2"
                              style={{
                                borderColor: `${colores.naranja}80`,
                              }}
                              placeholder="¿Por qué es especial esta canción?"
                              disabled={loading}
                            />
                          </div>

                          <button
                            onClick={handleSubmit}
                            disabled={loading || !songRequest.trim()}
                            className="w-full px-4 py-3 rounded-xl font-bold text-sm hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 hover:scale-105 text-black"
                            style={{
                              background: `linear-gradient(to right, ${colores.naranja}, ${colores.dorado})`,
                            }}
                          >
                            {loading ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Send className="w-4 h-4" />
                            )}
                            {loading
                              ? "Enviando..."
                              : "¡Agregar a la Playlist!"}
                          </button>
                        </div>
                      ) : (
                        <div className="text-center py-4">
                          <div className="text-5xl mb-3 animate-bounce">🎃</div>
                          <h4 className="font-bold text-lg mb-2 text-orange-400">
                            ¡Canción Agregada!
                          </h4>
                          <p className="text-sm text-orange-300">
                            Tu canción ya está en la lista. ¡Esperamos que suene
                            durante la fiesta! 👻
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LAYOUT DESKTOP */}
      <div className="hidden lg:block relative min-h-screen overflow-hidden">
        {/* Imagen de fondo - Mitad izquierda */}
        <div className="absolute inset-0 lg:w-1/2 lg:left-0 lg:inset-y-0">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=1200&q=80')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to right, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0.8) 100%)`,
            }}
          />
        </div>

        {/* Fondo degradado - Mitad derecha */}
        <div
          className="absolute inset-y-0 right-0 w-1/2"
          style={{
            background: colores.negro,
          }}
        />

        {/* Contenido principal */}
        <div className="relative z-10 min-h-screen">
          <div className="w-full mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-0 min-h-screen">
              {/* Lado izquierdo - Hero */}
              <div className="flex items-center justify-center">
                <div className="text-center lg:text-left lg:pl-12">
                  <div className="relative inline-flex items-center justify-center mb-8">
                    <div className="absolute inset-0">
                      <div
                        className="w-24 h-24 rounded-full blur-2xl animate-pulse"
                        style={{
                          background: `linear-gradient(135deg, ${colores.naranja}80, ${colores.dorado}80)`,
                        }}
                      />
                    </div>
                    <Music className="w-12 h-12 text-white relative z-10" />
                    <div className="absolute -top-2 -right-2 text-3xl animate-bounce">
                      🎃
                    </div>
                  </div>

                  <h2
                    className="font-bold text-5xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight"
                    style={{
                      textShadow: `0 0 30px ${colores.naranja}, 0 4px 20px rgba(0, 0, 0, 0.8)`,
                    }}
                  >
                    Playlist Espeluznante
                    <br />
                    <span className="text-4xl md:text-5xl lg:text-6xl">
                      ¡Pide tu Canción! 🎵
                    </span>
                  </h2>
                </div>
              </div>

              {/* Lado derecho - Interactivo */}
              <div className="flex items-center justify-center py-12">
                <div className="w-full max-w-lg">
                  {!showForm ? (
                    <div className="space-y-8">
                      <div className="text-center">
                        <button
                          onClick={() => setShowForm(true)}
                          className="inline-flex items-center gap-3 rounded-full px-8 py-4 font-bold text-xl shadow-2xl hover:scale-105 transition-transform text-black"
                          style={{
                            background: `linear-gradient(to right, ${colores.naranja}, ${colores.dorado})`,
                            border: `2px solid ${colores.naranja}`,
                          }}
                        >
                          <Music className="w-6 h-6" />
                          <span>Agregar Mi Canción 👻</span>
                        </button>
                      </div>

                      <div className="text-center">
                        <div
                          className="inline-flex items-center gap-3 bg-black/60 backdrop-blur-sm rounded-full px-8 py-4 border-2"
                          style={{
                            borderColor: colores.naranja,
                          }}
                        >
                          <Headphones className="w-6 h-6 text-orange-500" />
                          <span className="font-semibold text-xl text-white">
                            {loadingSongs
                              ? "Cargando..."
                              : getSongsCountText(dbSongs.length)}{" "}
                            agregadas
                          </span>
                        </div>
                      </div>

                      <div
                        className="bg-black/60 backdrop-blur-sm rounded-2xl p-6 border-2"
                        style={{
                          borderColor: `${colores.morado}80`,
                        }}
                      >
                        <h3 className="font-bold text-xl mb-4 flex items-center gap-2 text-orange-400">
                          <Music className="w-6 h-6" />
                          Canciones Solicitadas 🎃
                        </h3>

                        {loadingSongs ? (
                          <div className="text-center py-8">
                            <Loader2 className="w-8 h-8 animate-spin mx-auto text-orange-500" />
                            <p className="text-orange-400 mt-2">
                              Cargando canciones...
                            </p>
                          </div>
                        ) : dbSongs.length > 0 ? (
                          <div
                            className="space-y-3 overflow-y-auto music-scrollbar pr-2"
                            style={{ height: "240px" }}
                          >
                            {dbSongs.map((song, index) => (
                              <div
                                key={song.id}
                                className="p-3 bg-orange-900/30 rounded-xl hover:bg-orange-800/40 transition-all cursor-pointer group music-fade-in-up border border-orange-500/30"
                                style={{ animationDelay: `${index * 100}ms` }}
                              >
                                <div className="flex items-start gap-3">
                                  <Music className="w-4 h-4 flex-shrink-0 mt-1 group-hover:text-orange-300 transition-colors text-orange-500" />
                                  <div className="flex-1 min-w-0">
                                    <p className="font-medium truncate group-hover:text-orange-200 transition-colors text-orange-100">
                                      {song.song_name}
                                    </p>
                                    {song.artist_name && (
                                      <p className="text-sm truncate text-orange-300">
                                        {song.artist_name}
                                      </p>
                                    )}
                                    {song.message && (
                                      <div
                                        className="text-xs mt-1 italic music-scrollbar overflow-y-auto text-orange-400"
                                        style={{
                                          maxHeight: "40px",
                                        }}
                                        title={song.message}
                                      >
                                        {song.message}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-12">
                            <Music className="w-12 h-12 mx-auto mb-4 opacity-60 text-orange-500" />
                            <p className="text-orange-300">
                              Aún no hay canciones solicitadas. ¡Sé el primero!
                              🎃
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div
                      className="bg-black/80 backdrop-blur-xl rounded-3xl p-8 relative shadow-2xl border-2"
                      style={{
                        borderColor: colores.naranja,
                      }}
                    >
                      <button
                        onClick={() => setShowForm(false)}
                        className="absolute top-4 right-4 w-10 h-10 bg-orange-900/40 hover:bg-orange-800/60 rounded-full flex items-center justify-center transition-all text-xl hover:rotate-90 text-orange-300"
                      >
                        ✕
                      </button>

                      <div className="mb-6">
                        <h3 className="font-bold text-2xl flex items-center gap-3 text-orange-400">
                          <Music className="w-8 h-8" />
                          Solicita una Canción 🎃
                        </h3>
                      </div>

                      {!submitted ? (
                        <div className="space-y-6">
                          {error && (
                            <div className="p-4 bg-red-500/20 border border-red-400/50 rounded-xl flex items-center gap-2 text-red-400">
                              <AlertCircle className="w-5 h-5" />
                              <span>{error}</span>
                            </div>
                          )}

                          <div>
                            <label className="block font-medium mb-2 text-orange-300">
                              Nombre de la Canción *
                            </label>
                            <input
                              type="text"
                              value={songRequest}
                              onChange={(e) => setSongRequest(e.target.value)}
                              className="w-full px-4 py-3 bg-orange-900/30 rounded-xl focus:outline-none focus:ring-2 transition-all text-white border-2"
                              style={{
                                borderColor: `${colores.naranja}80`,
                              }}
                              placeholder="Ej: Thriller - Michael Jackson"
                              disabled={loading}
                              onKeyPress={(e) =>
                                e.key === "Enter" && handleSubmit()
                              }
                            />
                          </div>

                          <div>
                            <label className="block font-medium mb-2 text-orange-300">
                              Artista
                            </label>
                            <input
                              type="text"
                              value={artistRequest}
                              onChange={(e) => setArtistRequest(e.target.value)}
                              className="w-full px-4 py-3 bg-orange-900/30 rounded-xl focus:outline-none focus:ring-2 transition-all text-white border-2"
                              style={{
                                borderColor: `${colores.naranja}80`,
                              }}
                              placeholder="Ej: Michael Jackson"
                              disabled={loading}
                              onKeyPress={(e) =>
                                e.key === "Enter" && handleSubmit()
                              }
                            />
                          </div>

                          <div>
                            <label className="block font-medium mb-2 text-orange-300">
                              Mensaje Especial (Opcional)
                            </label>
                            <textarea
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                              rows={3}
                              className="w-full px-4 py-3 bg-orange-900/30 rounded-xl focus:outline-none focus:ring-2 transition-all resize-none text-white border-2"
                              style={{
                                borderColor: `${colores.naranja}80`,
                              }}
                              placeholder="¿Por qué es especial esta canción para ti?"
                              disabled={loading}
                            />
                          </div>

                          <button
                            onClick={handleSubmit}
                            disabled={loading || !songRequest.trim()}
                            className="w-full px-6 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all flex items-center justify-center gap-3 disabled:opacity-50 hover:scale-105 text-black"
                            style={{
                              background: `linear-gradient(to right, ${colores.naranja}, ${colores.dorado})`,
                            }}
                          >
                            {loading ? (
                              <Loader2 className="w-6 h-6 animate-spin" />
                            ) : (
                              <Send className="w-6 h-6" />
                            )}
                            {loading ? "Enviando..." : "Enviar Solicitud"}
                          </button>
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <div className="text-7xl mb-4 animate-bounce">🎃</div>
                          <h4 className="font-bold text-2xl mb-3 text-orange-400">
                            ¡Canción Agregada Exitosamente!
                          </h4>
                          <p className="mb-4 text-orange-300">
                            Tu canción aparece ahora en la lista. ¡Esperamos que
                            suene durante la fiesta! 👻
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
