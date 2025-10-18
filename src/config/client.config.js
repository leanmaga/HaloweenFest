// config/client.config.js
/**
 * 🎃 CONFIGURACIÓN HALLOWEEN PARTY 2025
 *
 * Este archivo contiene TODA la información personalizable de la invitación.
 * Solo modifica los valores aquí y se aplicarán en toda la aplicación.
 */

export const clientConfig = {
  // 🎃 INFORMACIÓN DEL EVENTO
  quinceañera: {
    nombre: "Halloween", // Mantener para compatibilidad
    edad: "Party", // Mantener para compatibilidad
    apodo: "",
  },

  // 📅 INFORMACIÓN DEL EVENTO
  evento: {
    fecha: "Viernes 25 de Octubre, 2025",
    // ⚠️ IMPORTANTE: Formato de fechaCompleta para countdown (YYYY-MM-DD)
    fechaCompleta: "2025-10-25",
    hora: "22:00 PM - 05:00 AM",
    horaInicio: "22:00 PM",
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
    googleMapsUrl: "https://maps.app.goo.gl/GLyir2p9khfF6qLL8", // Actualizar con la dirección correcta
    wazeUrl:
      "https://ul.waze.com/ul?place=ChIJHzAU50vAvJURDGwKF_UHSCA&ll=-34.70682730%2C-58.71007240&navigate=yes",

    // Imágenes del salón (ubicadas en /public/assets/)
    imagenesSalon: [
      "/assets/salon1.png",
      "/assets/salon2.png",
      "/assets/salon3.png",
      "/assets/salon4.png",
    ],
  },

  // 👨‍👩‍👧‍👦 INFORMACIÓN DE CONTACTO
  contacto: {
    nombreFamilia: "Organizadores",
    telefono: "+54 9 11 2271-0612",
    email: "contacto@example.com",
    whatsapp: "+541122710612", // Sin espacios ni guiones
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
    imagenOG: "/assets/1.jpg", // Imagen para compartir en redes sociales
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
