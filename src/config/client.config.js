export const clientConfig = {
  // 🎃 INFORMACIÓN DEL EVENTO
  quinceañera: {
    nombre: "Halloween", // Mantener para compatibilidad
    edad: "Party", // Mantener para compatibilidad
    apodo: "",
  },

  // 📅 INFORMACIÓN DEL EVENTO
  evento: {
    fecha: "Sábado 25 de Octubre, 2025",
    // ⚠️ IMPORTANTE: Formato de fechaCompleta para countdown (YYYY-MM-DD)
    fechaCompleta: "2025-10-25",
    hora: "23:59 PM - 05:00 AM",
    horaInicio: "23:59 PM",
    horaFin: "05:00 AM",
  },

  // 📍 UBICACIÓN
  ubicacion: {
    nombreLugar: "Manuel Soler 1855",
    direccion: "Entre Gamboa y Terán, Libertad, Merlo.",
    ciudad: "Libertad, Merlo",
    provincia: "Buenos Aires",
    pais: "Argentina",
    // URLs de mapas
    googleMapsUrl: "https://maps.app.goo.gl/3Np1QuGHKqF3Ax7YA", // Actualizar con la dirección correcta
    wazeUrl:
      "https://www.waze.com/en/live-map/directions/ar/provincia-de-buenos-aires/libertad/myl?place=ChIJkwt9X9zAvJURYJT-iJr4Ryg",
  },

  // 👨‍👩‍👧‍👦 INFORMACIÓN DE CONTACTO
  contacto: {
    nombreFamilia: "Organizadores",
    telefono: "+54 9 11 3566-0145",
    email: "contacto@example.com",
    whatsapp: "+541135660145", // Sin espacios ni guiones
  },

  // 📱 REDES SOCIALES
  redes: {
    instagram: {
      usuario: "halloween_party", // Sin @
      url: "https://instagram.com/halloween_party",
    },
    hashtag: "#HalloweenParty2025",
  },

  // 🎁 INFORMACIÓN BANCARIA PARA REGALOS (Deshabilitado)
  regalos: {
    mostrarOpcion: false, // Deshabilitado
    alias: "",
    cbu: "",
    nombreCuenta: "",
    mensajePersonalizado: "",
  },

  // 📝 CONFIRMACIÓN DE ASISTENCIA (RSVP)
  rsvp: {
    fechaLimite: "Miércoles 22 de Octubre, 2025",
    // Fecha límite en formato ISO para validaciones
    fechaLimiteISO: "2025-10-22",
    mensajeCierre: "¡Gracias por confirmar tu asistencia!",
    mostrarDietaryRestrictions: true, // Mostrar campo de restricciones alimentarias
  },

  // 🎵 MÚSICA
  musica: {
    url: "", // URL de YouTube, Spotify, etc. Déjalo vacío para desactivar
    titulo: "Playlist Halloween",
    autoplay: false, // true o false
  },

  // 🎃 CÓDIGO DE VESTIMENTA - HALLOWEEN
  codigoVestimenta: {
    tema: "¡Disfraz Obligatorio!",
    descripcion:
      "Ven caracterizado con tu disfraz más terrorífico, creativo o divertido. ¡Habrá premio al mejor disfraz!",
    coloresRestringidos: [], // No hay restricciones para Halloween
    mensajeRestriccion: "",
    categorias: {}, // Eliminado - se maneja en el componente
  },

  // 🔐 CONFIGURACIÓN DE ADMINISTRADOR
  admin: {
    password: "halloween2025", // ⚠️ CAMBIAR ESTO en producción
    dashboardUrl: "/admin",
  },

  // 🗄️ CONFIGURACIÓN DE SERVICIOS EXTERNOS
  servicios: {
    supabase: {
      url: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
      anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
    },
    emailjs: {
      serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
      templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
      publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "",
    },
  },

  // 🌐 CONFIGURACIÓN DEL SITIO
  sitio: {
    nombre: "Halloween Party 2025",
    descripcion: "Una noche de terror y diversión",
    url:
      process.env.NEXT_PUBLIC_PRODUCTION_URL ||
      "https://halloween-party-2025.vercel.app",
    idioma: "es",
    imagenOG: "/assets/back.png", // Imagen para compartir en redes sociales
  },

  // 🎭 SECCIONES VISIBLES
  seccionesVisibles: {
    countdown: true,
    ubicacion: true,
    codigoVestimenta: true,
    rsvp: true,
    regalos: false, // Deshabilitado para Halloween
    fotos: false, // Deshabilitado (eliminaste la galería)
    musica: true, // Habilitado
  },
};

/**
 * 🔧 FUNCIONES HELPER
 */

// Generar hashtag automáticamente
export const getHashtag = () => {
  return clientConfig.redes.hashtag || "#HalloweenParty2025";
};

// Generar URLs de mapas automáticamente
export const getMapUrls = () => {
  const { nombreLugar, direccion, googleMapsUrl, wazeUrl } =
    clientConfig.ubicacion;
  const direccionCompleta = `${nombreLugar}, ${direccion}`;

  return {
    google:
      googleMapsUrl ||
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        direccionCompleta
      )}`,
    waze:
      wazeUrl ||
      `https://waze.com/ul?q=${encodeURIComponent(direccionCompleta)}`,
  };
};

// Obtener título completo del sitio
export const getSiteTitle = () => {
  return "Halloween Party 2025";
};

// Obtener descripción del sitio
export const getSiteDescription = () => {
  const { fecha } = clientConfig.evento;
  return `Te invitamos a la Halloween Party más espeluznante el ${fecha}. ¡No te lo pierdas!`;
};

export default clientConfig;
