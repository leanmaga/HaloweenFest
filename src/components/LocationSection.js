"use client";

import { useState, useEffect } from "react";
import { MapPin, Phone, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useHalloweenConfig } from "@/hooks/useHalloweenConfig";

export default function LocationSection() {
  // ✅ Usar configuración centralizada
  const config = useHalloweenConfig();

  console.log("LocationSection - Config:", config);
  console.log("LocationSection - imagenesSalon:", config.imagenesSalon);

  const {
    lugar = "Ubicación",
    direccion = "Dirección no disponible",
    telefono = "+54 9 11 2271-0612",
    horaEvento = "20:00 PM - 03:00 AM",
    googleMapsUrl = "#",
    wazeUrl = "#",
    imagenesSalon = ["/assets/1.jpg"],
    colores,
  } = config;

  // Slider state
  const [currentSlide, setCurrentSlide] = useState(0);

  console.log(
    "LocationSection - Renderizando con",
    imagenesSalon.length,
    "imágenes"
  );

  // Manejo de carga de imágenes
  const handleImageLoad = () => {
    console.log(`✅ Imagen del salón cargada`);
  };

  const handleImageError = (imageSrc) => {
    console.warn(`⚠️ Error al cargar imagen del salón: ${imageSrc}`);
  };

  // Auto-slide functionality
  useEffect(() => {
    if (imagenesSalon.length > 1) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % imagenesSalon.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [imagenesSalon.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % imagenesSalon.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + imagenesSalon.length) % imagenesSalon.length
    );
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section
      id="location"
      className="py-20 min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${colores.naranja}20 0%, ${colores.morado}30 50%, ${colores.negro} 100%)`,
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

        <div className="grid lg:grid-cols-2 gap-12 items-center">
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

                <div className="flex items-start gap-4 p-4 rounded-2xl transition-all hover:bg-orange-900/20">
                  <Clock
                    className="w-6 h-6 flex-shrink-0 mt-1"
                    style={{ color: colores.naranja }}
                  />
                  <div>
                    <h4
                      className="font-semibold mb-1"
                      style={{ color: colores.dorado }}
                    >
                      Horario
                    </h4>
                    <p className="text-orange-200">
                      Recepción: {horaEvento.split(" - ")[0]}
                      <br />
                      Evento hasta: {horaEvento.split(" - ")[1]}
                    </p>
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

          {/* Image Slider */}
          <div className="relative">
            <div
              className="aspect-square lg:aspect-[4/3] rounded-3xl overflow-hidden shadow-xl relative border-4"
              style={{
                background: `linear-gradient(135deg, ${colores.naranja}30, ${colores.morado}30)`,
                borderColor: colores.naranja,
              }}
            >
              <div className="relative w-full h-full overflow-hidden">
                <div
                  className="flex h-full transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {imagenesSalon.map((image, index) => (
                    <div
                      key={index}
                      className="relative w-full h-full flex-shrink-0"
                    >
                      <Image
                        src={image}
                        alt={`Imagen del lugar ${index + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                        className="object-cover"
                        onLoad={handleImageLoad}
                        onError={() => handleImageError(image)}
                        priority={index === 0}
                      />
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background: `linear-gradient(to bottom, transparent 0%, ${colores.negro}80 100%)`,
                        }}
                      />
                    </div>
                  ))}
                </div>

                {/* Navigation Arrows - solo si hay más de 1 imagen */}
                {imagenesSalon.length > 1 && (
                  <>
                    <button
                      onClick={prevSlide}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 z-20 border-2"
                      style={{
                        background: `${colores.naranja}cc`,
                        borderColor: colores.dorado,
                      }}
                      aria-label="Imagen anterior"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>

                    <button
                      onClick={nextSlide}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 z-20 border-2"
                      style={{
                        background: `${colores.naranja}cc`,
                        borderColor: colores.dorado,
                      }}
                      aria-label="Siguiente imagen"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Dots Indicator */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                      {imagenesSalon.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => goToSlide(index)}
                          className={`w-3 h-3 rounded-full transition-all duration-300 border-2 ${
                            index === currentSlide
                              ? "scale-125 shadow-lg"
                              : "hover:scale-110"
                          }`}
                          style={{
                            backgroundColor:
                              index === currentSlide
                                ? colores.naranja
                                : "transparent",
                            borderColor: colores.naranja,
                          }}
                          aria-label={`Ir a imagen ${index + 1}`}
                        />
                      ))}
                    </div>

                    {/* Image Counter */}
                    <div
                      className="absolute top-4 right-4 text-white px-4 py-2 rounded-full text-sm font-bold z-20 border-2"
                      style={{
                        background: `${colores.negro}cc`,
                        borderColor: colores.naranja,
                      }}
                    >
                      {currentSlide + 1} / {imagenesSalon.length}
                    </div>
                  </>
                )}

                {/* Overlay with info */}
                <div
                  className="absolute bottom-0 left-0 right-0 p-6 z-20"
                  style={{
                    background: `linear-gradient(to top, ${colores.negro}dd, transparent)`,
                  }}
                >
                  <div className="text-white">
                    <h3
                      className="font-serif text-xl font-bold mb-1"
                      style={{ color: colores.naranja }}
                    >
                      {lugar}
                    </h3>
                    <p className="text-sm text-orange-300">
                      🎃 Conoce el lugar de la fiesta
                    </p>
                  </div>
                </div>

                {/* Decorative Halloween elements */}
                <div className="absolute top-4 left-4 z-20 text-3xl animate-bounce">
                  🎃
                </div>
                <div className="absolute top-4 right-20 z-20 text-2xl animate-pulse">
                  👻
                </div>
              </div>
            </div>

            {/* Texto decorativo debajo del slider */}
            <div className="text-center mt-4">
              <p className="text-orange-300 font-semibold">
                🕷️ Un lugar perfecto para la noche más terrorífica 🕷️
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
