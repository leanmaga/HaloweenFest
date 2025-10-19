"use client";

import { MapPin, Phone } from "lucide-react";
import { useHalloweenConfig } from "@/hooks/useHalloweenConfig";

export default function LocationSection() {
  // ✅ Usar configuración centralizada
  const config = useHalloweenConfig();

  const {
    lugar = "Ubicación",
    direccion = "Dirección no disponible",
    telefono = "+54 9 11 2271-0612",
    googleMapsUrl = "#",
    wazeUrl = "#",
    colores,
  } = config;

  return (
    <section
      id="location"
      className="py-20 min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        background: `${colores.negro}`,
      }}
    >
      <div className="max-w-6xl mx-auto px-4">
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
          <p className="text-xl text-orange-300">
            ¡Encuentra el lugar de la celebración más espeluznante! 🎃
          </p>
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
    </section>
  );
}
