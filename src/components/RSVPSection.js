"use client";

import { useState, useEffect } from "react";
import {
  Send,
  User,
  Phone,
  Utensils,
  Loader2,
  AlertCircle,
  CheckCircle,
  Calendar,
} from "lucide-react";
import { useHalloweenConfig } from "@/hooks/useHalloweenConfig";
import { supabase } from "@/lib/supabase";

export default function RSVPSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    dietary_restrictions: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [existingRSVP, setExistingRSVP] = useState(null);
  const [checkingExisting, setCheckingExisting] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const { nombreEvento, whatsapp, telefono, fechaLimiteRSVP, colores } =
    useHalloweenConfig();

  if (!whatsapp) {
    console.error(
      "❌ NEXT_PUBLIC_WHATSAPP_NUMBER no está configurado en .env.local"
    );
  }

  const checkExistingRSVP = async (name, phone) => {
    if (!name.trim()) return null;
    try {
      return null;
    } catch (error) {
      console.error("Error checking existing RSVP:", error);
      return null;
    }
  };

  const saveToDatabase = async (data) => {
    try {
      const { error } = await supabase.from("rsvp_confirmations").insert([
        {
          name: data.name,
          email: "no-email@temp.com",
          phone: data.phone || null,
          guests: 1,
          dietary_restrictions: data.dietary_restrictions || null,
          message: data.message || null,
        },
      ]);

      if (error) throw error;
    } catch (error) {
      console.error("Error guardando en BD:", error);
      throw error;
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (formData.name.trim().length >= 3) {
        setCheckingExisting(true);
        const existing = await checkExistingRSVP(formData.name, formData.phone);
        setExistingRSVP(existing);
        setCheckingExisting(false);

        if (existing) {
          setSubmitted(true);
          setIsFlipped(false);
        }
      } else {
        setExistingRSVP(null);
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [formData.name, formData.phone]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
    if (e.target.name === "name" && !e.target.value.trim()) {
      setSubmitted(false);
      setExistingRSVP(null);
      setIsFlipped(false);
    }
  };

  const formatWhatsAppMessage = (data) => {
    let message = `🎃 *CONFIRMACIÓN DE ASISTENCIA - HALLOWEEN PARTY 2025*\n\n`;
    message += `👤 *Nombre:* ${data.name}\n`;
    message += `📱 *Teléfono:* ${data.phone || "No proporcionado"}\n`;

    if (data.dietary_restrictions) {
      message += `🍽️ *Restricciones alimentarias:* ${data.dietary_restrictions}\n`;
    }

    if (data.message) {
      message += `💀 *Mensaje:* ${data.message}\n`;
    }

    message += `\n📅 *Fecha:* ${new Date().toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })}`;

    return encodeURIComponent(message);
  };

  const sendToWhatsApp = (data) => {
    const message = formatWhatsAppMessage(data);
    const whatsappURL = `https://wa.me/${whatsapp}?text=${message}`;
    window.open(whatsappURL, "_blank");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const existing = await checkExistingRSVP(formData.name, formData.phone);
    if (existing) {
      setExistingRSVP(existing);
      setSubmitted(true);
      setIsFlipped(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      await saveToDatabase(formData);
      sendToWhatsApp(formData);
      setSubmitted(true);
      setIsFlipped(false);
    } catch (error) {
      console.error("Error submitting RSVP:", error);
      setError(
        "Hubo un error al guardar la confirmación. El WhatsApp se abrirá de todas formas."
      );

      sendToWhatsApp(formData);
      setSubmitted(true);
      setIsFlipped(false);
    } finally {
      setLoading(false);
    }
  };

  // PANTALLA DE CONFIRMACIÓN
  if (submitted || existingRSVP) {
    const rsvpData = existingRSVP || formData;
    const isExisting = !!existingRSVP;

    return (
      <div className="relative">
        {/* LAYOUT MÓVIL - Confirmación */}
        <div className="lg:hidden">
          <div
            className="relative h-screen w-full flex items-center justify-center"
            style={{
              backgroundImage: `url('/assets/hombrelobo.png')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            {/* ✅ OVERLAY SEMI-TRANSPARENTE PARA MÓVIL */}
            <div
              className="absolute inset-0"
              style={{
                background: `rgba(0, 0, 0, 0.6)`, // 60% opacidad
              }}
            />

            <div className="relative z-10 text-center max-w-lg mx-auto px-6 rsvp-fade-in-up">
              <div className="flex justify-center mb-8">
                <div className="rsvp-bounce-icon text-7xl">
                  {isExisting ? "✅" : "🎃"}
                </div>
              </div>

              <h2
                className="font-bold text-4xl sm:text-5xl mb-6 leading-tight"
                style={{
                  color: colores.naranja,
                  textShadow: `0 0 30px ${colores.naranja}, 0 4px 20px rgba(0, 0, 0, 0.8)`,
                }}
              >
                {isExisting ? "¡Ya Confirmaste!" : "¡Confirmación Enviada!"}
              </h2>

              <div
                className="bg-black/80 backdrop-blur-sm rounded-3xl p-6 shadow-2xl mb-6 border-2"
                style={{
                  borderColor: colores.naranja,
                }}
              >
                <div className="space-y-3 text-left">
                  <div className="flex items-center gap-2 text-orange-200">
                    <span className="text-lg">👤</span>
                    <span>
                      <strong className="text-orange-400">Nombre:</strong>{" "}
                      {rsvpData.name}
                    </span>
                  </div>
                  {rsvpData.phone && (
                    <div className="flex items-center gap-2 text-orange-200">
                      <span className="text-lg">📱</span>
                      <span>
                        <strong className="text-orange-400">Teléfono:</strong>{" "}
                        {rsvpData.phone}
                      </span>
                    </div>
                  )}
                  {rsvpData.dietary_restrictions && (
                    <div className="flex items-start gap-2 text-orange-200">
                      <span className="text-lg">🍽️</span>
                      <span>
                        <strong className="text-orange-400">
                          Restricciones:
                        </strong>{" "}
                        {rsvpData.dietary_restrictions}
                      </span>
                    </div>
                  )}
                  {rsvpData.message && (
                    <div className="flex items-start gap-2 text-orange-200">
                      <span className="text-lg">💀</span>
                      <span>
                        <strong className="text-orange-400">Mensaje:</strong>{" "}
                        {rsvpData.message}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={() => {
                  setSubmitted(false);
                  setExistingRSVP(null);
                  setIsFlipped(false);
                  setFormData({
                    name: "",
                    phone: "",
                    dietary_restrictions: "",
                    message: "",
                  });
                }}
                className="px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm hover:scale-105 text-black"
                style={{
                  background: `linear-gradient(to right, ${colores.naranja}, ${colores.dorado})`,
                }}
              >
                Confirmar otra persona
              </button>
            </div>
          </div>
        </div>

        {/* LAYOUT DESKTOP - Confirmación */}
        <section className="hidden lg:block relative min-h-screen overflow-hidden">
          {/* ✅ IMAGEN VISIBLE EN DESKTOP */}
          <div className="absolute inset-0 lg:left-1/2 w-full lg:w-1/2">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `url('/assets/hombrelobo.png')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />
            {/* ✅ OVERLAY SEMI-TRANSPARENTE */}
            <div
              className="absolute inset-0"
              style={{
                background: `rgba(0, 0, 0, 0.5)`, // 50% opacidad
              }}
            />
          </div>

          <div
            className="absolute inset-0 lg:w-1/2 lg:right-1/2"
            style={{
              background: `${colores.negro}`,
            }}
          />

          <div className="relative z-10 h-screen flex items-center">
            <div className="w-full h-full">
              <div className="grid lg:grid-cols-2 gap-0 h-full min-h-screen">
                <div className="flex items-center justify-center h-full min-h-screen lg:min-h-0 px-8">
                  <div className="text-center rsvp-scale-in">
                    <div className="flex justify-center mb-8">
                      <div className="rsvp-bounce-icon text-9xl">
                        {isExisting ? "✅" : "🎃"}
                      </div>
                    </div>

                    <h2
                      className="font-bold text-5xl mb-6 leading-tight text-white"
                      style={{
                        color: colores.naranja,
                        textShadow: `0 0 30px ${colores.naranja}, 0 4px 20px rgba(0, 0, 0, 0.8)`,
                      }}
                    >
                      {isExisting
                        ? "¡Ya Confirmaste!"
                        : "¡Confirmación Enviada!"}
                    </h2>

                    <div
                      className="bg-black/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl mb-8 border-2"
                      style={{
                        borderColor: colores.naranja,
                      }}
                    >
                      <div className="space-y-4 text-left">
                        <div className="flex items-center gap-3 text-lg text-orange-200">
                          <span className="text-2xl">👤</span>
                          <span>
                            <strong className="text-orange-400">Nombre:</strong>{" "}
                            {rsvpData.name}
                          </span>
                        </div>
                        {rsvpData.phone && (
                          <div className="flex items-center gap-3 text-lg text-orange-200">
                            <span className="text-2xl">📱</span>
                            <span>
                              <strong className="text-orange-400">
                                Teléfono:
                              </strong>{" "}
                              {rsvpData.phone}
                            </span>
                          </div>
                        )}
                        {rsvpData.dietary_restrictions && (
                          <div className="flex items-start gap-3 text-lg text-orange-200">
                            <span className="text-2xl">🍽️</span>
                            <span>
                              <strong className="text-orange-400">
                                Restricciones:
                              </strong>{" "}
                              {rsvpData.dietary_restrictions}
                            </span>
                          </div>
                        )}
                        {rsvpData.message && (
                          <div className="flex items-start gap-3 text-lg text-orange-200">
                            <span className="text-2xl">💀</span>
                            <span>
                              <strong className="text-orange-400">
                                Mensaje:
                              </strong>{" "}
                              {rsvpData.message}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setExistingRSVP(null);
                        setIsFlipped(false);
                        setFormData({
                          name: "",
                          phone: "",
                          dietary_restrictions: "",
                          message: "",
                        });
                      }}
                      className="px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm hover:scale-105 text-black"
                      style={{
                        background: `linear-gradient(to right, ${colores.naranja}, ${colores.dorado})`,
                      }}
                    >
                      Confirmar otra persona
                    </button>
                  </div>
                </div>
                <div className="hidden lg:block"></div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // FORMULARIO PRINCIPAL
  return (
    <div className="relative">
      {/* LAYOUT MÓVIL */}
      <div className="lg:hidden">
        <div className={`rsvp-flip-card ${isFlipped ? "flipped" : ""}`}>
          <div className="rsvp-flip-card-inner">
            {/* FRONT: Imagen con botón */}
            <div className="rsvp-flip-card-front">
              <div
                className="relative h-screen w-full flex items-center justify-center"
                style={{
                  backgroundImage: `url('/assets/hombrelobo.png')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                {/* ✅ OVERLAY SEMI-TRANSPARENTE */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `rgba(0, 0, 0, 0.6)`,
                  }}
                />

                <div className="relative flex flex-col items-center z-10 text-center max-w-lg mx-auto px-6 rsvp-fade-in-up">
                  <h2
                    className="font-bold text-2xl md:text-3xl lg:text-4xl mb-4 leading-tight text-white"
                    style={{
                      textShadow: `0 0 30px ${colores.naranja}, 0 4px 20px rgba(0, 0, 0, 0.8)`,
                      color: colores.naranja,
                    }}
                  >
                    Confirmá tu Asistencia
                  </h2>

                  <p className="text-lg mb-12 font-medium drop-shadow-lg text-orange-200">
                    antes del{" "}
                    <span className="font-bold text-orange-400">
                      {fechaLimiteRSVP.split(",")[0]}
                    </span>
                    <br />
                    para que podamos preparar la mejor fiesta de Halloween 🎃
                  </p>

                  <button
                    onClick={() => setIsFlipped(true)}
                    className="px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center gap-3 text-black rsvp-golden-button"
                    style={{
                      background: `linear-gradient(135deg, ${colores.naranja}, ${colores.dorado})`,
                      boxShadow: `0 8px 32px ${colores.naranja}4d`,
                    }}
                  >
                    <Send className="w-5 h-5" />
                    Confirmar Ahora
                  </button>
                </div>
              </div>
            </div>

            {/* BACK: Formulario */}
            <div className="rsvp-flip-card-back">
              <div
                className="h-screen flex items-center justify-center overflow-y-auto"
                style={{
                  background: `${colores.negro}`,
                }}
              >
                <div className="w-full max-w-lg px-6 py-8">
                  <div
                    className="bg-black/70 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border-2"
                    style={{
                      borderColor: colores.naranja,
                    }}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-bold text-xl text-orange-400">
                        Confirmá tu Asistencia
                      </h3>
                      <button
                        onClick={() => setIsFlipped(false)}
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

                    {error && (
                      <div className="p-3 bg-red-500/20 border border-red-400/50 rounded-xl flex items-center gap-2 text-red-400 mb-4">
                        <AlertCircle className="w-4 h-4" />
                        <span className="text-sm">{error}</span>
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className=" font-medium mb-2 flex items-center gap-2 text-sm text-orange-300">
                          <User className="w-4 h-4 text-orange-500" />
                          Nombre Completo *
                          {checkingExisting && (
                            <Loader2 className="w-3 h-3 animate-spin text-orange-500" />
                          )}
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          disabled={loading}
                          className="w-full px-3 py-2 bg-orange-900/30 rounded-xl focus:outline-none focus:ring-2 transition-all text-sm text-white border-2"
                          style={{
                            borderColor: `${colores.naranja}80`,
                          }}
                          placeholder="Tu nombre completo"
                        />
                      </div>

                      <div>
                        <label className=" font-medium mb-2 flex items-center gap-2 text-sm text-orange-300">
                          <Phone className="w-4 h-4 text-orange-500" />
                          Teléfono
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          disabled={loading}
                          className="w-full px-3 py-2 bg-orange-900/30 rounded-xl focus:outline-none focus:ring-2 transition-all text-sm text-white border-2"
                          style={{
                            borderColor: `${colores.naranja}80`,
                          }}
                          placeholder="+54 11 3566-0145"
                        />
                      </div>

                      <div>
                        <label className="font-medium mb-2 flex items-center gap-2 text-sm text-orange-300">
                          <Utensils className="w-4 h-4 text-orange-500" />
                          Restricciones Alimentarias
                        </label>
                        <input
                          type="text"
                          name="dietary_restrictions"
                          value={formData.dietary_restrictions}
                          onChange={handleChange}
                          disabled={loading}
                          className="w-full px-3 py-2 bg-orange-900/30 rounded-xl focus:outline-none focus:ring-2 transition-all text-sm text-white border-2"
                          style={{
                            borderColor: `${colores.naranja}80`,
                          }}
                          placeholder="Vegano, celíaco, etc."
                        />
                      </div>

                      <div>
                        <label className=" font-medium mb-2 flex items-center gap-2 text-sm text-orange-300">
                          <span className="text-lg">💀</span>
                          Mensaje
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          disabled={loading}
                          rows={3}
                          className="w-full px-3 py-2 bg-orange-900/30 rounded-xl focus:outline-none focus:ring-2 transition-all text-sm text-white border-2"
                          style={{
                            borderColor: `${colores.naranja}80`,
                          }}
                          placeholder="Mensaje opcional..."
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm flex items-center justify-center gap-2 text-black text-sm"
                        style={{
                          background: `linear-gradient(to right, ${colores.naranja}, ${colores.dorado})`,
                          boxShadow: `0 0 30px ${colores.naranja}66`,
                        }}
                      >
                        {loading ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Send className="w-4 h-4" />
                        )}
                        {loading ? "Enviando..." : "¡Confirmar Asistencia!"}
                      </button>

                      <div
                        className="mt-4 p-3 rounded-xl border-2"
                        style={{
                          backgroundColor: `${colores.negro}20`,
                          borderColor: `${colores.naranja}80`,
                        }}
                      >
                        <p className="text-center text-xs text-orange-300">
                          <Calendar className="inline w-3 h-3 mr-1" />
                          <strong>Fecha límite:</strong> {fechaLimiteRSVP}
                          <br />
                          <Phone className="inline w-3 h-3 mr-1 mt-1" />
                          Contacto: {telefono}
                          <br />
                          <span className="text-xs mt-1 block text-orange-400">
                            Tu confirmación se enviará por WhatsApp
                            automáticamente
                          </span>
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LAYOUT DESKTOP */}
      <section
        id="rsvp"
        className="hidden lg:block relative min-h-screen overflow-hidden"
      >
        {/* ✅ IMAGEN VISIBLE EN DESKTOP - Lado derecho */}
        <div className="absolute inset-0 lg:left-1/2 w-full lg:w-1/2">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url('/assets/hombrelobo.png')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
          {/* ✅ OVERLAY SEMI-TRANSPARENTE - CAMBIO CLAVE */}
          <div
            className="absolute inset-0"
            style={{
              background: `rgba(0, 0, 0, 0.5)`, // 50% opacidad en lugar de 100%
            }}
          />
        </div>

        {/* Fondo negro - Lado izquierdo */}
        <div
          className="absolute inset-0 lg:w-1/2 lg:right-1/2"
          style={{
            background: `${colores.negro}`,
          }}
        />

        <div className="relative z-10 h-screen flex items-center">
          <div className="w-full h-full">
            <div className="grid lg:grid-cols-2 gap-0 h-full min-h-screen">
              {/* Formulario - Lado izquierdo */}
              <div className="flex items-center justify-center h-full min-h-screen lg:min-h-0 px-8">
                <div className="w-full max-w-lg">
                  <div className="text-center mb-8 rsvp-fade-in-up">
                    <h2
                      className="font-bold text-2xl md:text-3xl lg:text-4xl mb-4 leading-tight"
                      style={{
                        color: colores.naranja,
                        textShadow: `0 0 30px ${colores.naranja}, 0 4px 20px rgba(0, 0, 0, 0.8)`,
                      }}
                    >
                      Confirmá tu Asistencia
                    </h2>

                    <p className="text-lg max-w-lg mx-auto mb-6 font-medium text-orange-300">
                      antes del{" "}
                      <span className="font-bold text-orange-400">
                        {fechaLimiteRSVP.split(",")[0]}
                      </span>{" "}
                      para que podamos preparar la mejor fiesta de Halloween 🎃
                    </p>
                  </div>

                  <div
                    className="bg-black/80 backdrop-blur-lg rounded-3xl p-6 shadow-2xl rsvp-scale-in border-2"
                    style={{
                      borderColor: colores.naranja,
                    }}
                  >
                    {error && (
                      <div className="p-3 bg-red-500/20 border border-red-400/50 rounded-xl flex items-center gap-2 text-red-400 mb-4">
                        <AlertCircle className="w-4 h-4" />
                        <span className="text-sm">{error}</span>
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className=" font-medium mb-2 flex items-center gap-2 text-sm text-orange-300">
                          <User className="w-4 h-4 text-orange-500" />
                          Nombre Completo *
                          {checkingExisting && (
                            <Loader2 className="w-3 h-3 animate-spin text-orange-500" />
                          )}
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          disabled={loading}
                          className="w-full px-3 py-2 bg-orange-900/30 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all backdrop-blur-sm disabled:opacity-50 text-sm text-white border-2"
                          style={{
                            borderColor: `${colores.naranja}80`,
                          }}
                          placeholder="Tu nombre completo"
                        />
                      </div>

                      <div>
                        <label className=" font-medium mb-2 flex items-center gap-2 text-orange-300">
                          <Phone className="w-4 h-4 text-orange-500" />
                          <span className="text-sm">Teléfono</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          disabled={loading}
                          className="w-full px-3 py-2 bg-orange-900/30 rounded-lg focus:outline-none focus:ring-2 transition-all text-sm text-white border-2"
                          style={{
                            borderColor: `${colores.naranja}80`,
                          }}
                          placeholder="+54 11 3566-0145"
                        />
                      </div>

                      <div>
                        <label className=" font-medium mb-2 flex items-center gap-2 text-orange-300">
                          <Utensils className="w-4 h-4 text-orange-500" />
                          <span className="text-sm">
                            Restricciones Alimentarias
                          </span>
                        </label>
                        <input
                          type="text"
                          name="dietary_restrictions"
                          value={formData.dietary_restrictions}
                          onChange={handleChange}
                          disabled={loading}
                          className="w-full px-3 py-2 bg-orange-900/30 rounded-lg focus:outline-none focus:ring-2 transition-all text-sm text-white border-2"
                          style={{
                            borderColor: `${colores.naranja}80`,
                          }}
                          placeholder="Vegano, celíaco, etc."
                        />
                      </div>

                      <div>
                        <label className=" font-medium mb-2 flex items-center gap-2 text-orange-300">
                          <span className="text-lg">💀</span>
                          <span className="text-sm">Mensaje</span>
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          disabled={loading}
                          rows={3}
                          className="w-full px-3 py-2 bg-orange-900/30 rounded-lg focus:outline-none focus:ring-2 transition-all text-sm text-white border-2"
                          style={{
                            borderColor: `${colores.naranja}80`,
                          }}
                          placeholder="Mensaje opcional..."
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm flex items-center justify-center gap-2 text-black text-sm"
                        style={{
                          background: `linear-gradient(to right, ${colores.naranja}, ${colores.dorado})`,
                          boxShadow: `0 0 30px ${colores.naranja}66`,
                        }}
                      >
                        {loading ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Send className="w-4 h-4" />
                        )}
                        {loading ? "Enviando..." : "¡Confirmar Asistencia!"}
                      </button>

                      <div
                        className="mt-4 p-3 rounded-xl border-2"
                        style={{
                          backgroundColor: `${colores.negro}20`,
                          borderColor: `${colores.naranja}80`,
                        }}
                      >
                        <p className="text-center text-xs text-orange-300">
                          <Calendar className="inline w-3 h-3 mr-1" />
                          <strong>Fecha límite:</strong> {fechaLimiteRSVP}
                          <br />
                          <Phone className="inline w-3 h-3 mr-1 mt-1" />
                          Contacto: {telefono}
                          <br />
                          <span className="text-xs mt-1 block text-orange-400">
                            Tu confirmación se enviará por WhatsApp
                            automáticamente
                          </span>
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              {/* Imagen visible - Lado derecho */}
              <div className="hidden lg:block"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
