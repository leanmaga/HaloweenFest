// hooks/useHalloweenConfig.js
"use client";

import { clientConfig, getMapUrls } from "@/config/client.config";
import { themeConfig } from "@/config/theme.config";

/**
 * 🎃 HOOK CENTRALIZADO DE CONFIGURACIÓN - HALLOWEEN
 *
 * Este hook combina:
 * 1. Configuración del cliente (client.config.js)
 * 2. Variables de entorno (para valores sensibles como API keys)
 * 3. Configuración de tema Halloween (theme.config.js)
 *
 * PRIORIDAD: client.config.js > variables de entorno > valores por defecto
 */
export function useHalloweenConfig() {
  // 🎃 INFORMACIÓN DEL EVENTO
  const nombreEvento = "Halloween Party";
  const fechaEvento = clientConfig.evento.fecha;
  const fechaCompleta = clientConfig.evento.fechaCompleta;
  const horaEvento = clientConfig.evento.hora;
  const horaInicio = clientConfig.evento.horaInicio;
  const horaFin = clientConfig.evento.horaFin;

  // 📍 UBICACIÓN
  const lugar = clientConfig.ubicacion.nombreLugar;
  const direccion = clientConfig.ubicacion.direccion;
  const ciudad = clientConfig.ubicacion.ciudad;
  const provincia = clientConfig.ubicacion.provincia;
  const pais = clientConfig.ubicacion.pais;
  const imagenesSalon = clientConfig.ubicacion.imagenesSalon;
  const mapUrls = getMapUrls();

  // 👨‍👩‍👧‍👦 INFORMACIÓN DE CONTACTO
  const nombreFamilia = clientConfig.contacto.nombreFamilia;
  const telefono = clientConfig.contacto.telefono;
  const email = clientConfig.contacto.email;
  const whatsapp = clientConfig.contacto.whatsapp;

  // 📱 REDES SOCIALES
  const instagramUser = clientConfig.redes.instagram.usuario;
  const instagramUrl = clientConfig.redes.instagram.url;
  const hashtag = "#HalloweenParty2025";

  // 📝 CONFIRMACIÓN DE ASISTENCIA (RSVP)
  const fechaLimiteRSVP = clientConfig.rsvp.fechaLimite;
  const fechaLimiteRSVPISO = clientConfig.rsvp.fechaLimiteISO;
  const mensajeCierreRSVP = clientConfig.rsvp.mensajeCierre;
  const mostrarDietaryRestrictions =
    clientConfig.rsvp.mostrarDietaryRestrictions;

  // 🎁 INFORMACIÓN BANCARIA PARA REGALOS
  const mostrarRegalos = clientConfig.regalos.mostrarOpcion;
  const alias = clientConfig.regalos.alias;
  const cbu = clientConfig.regalos.cbu;
  const nombreCuentaBancaria = clientConfig.regalos.nombreCuenta;
  const mensajeRegalos = clientConfig.regalos.mensajePersonalizado;

  // 🎵 MÚSICA
  const musicUrl = clientConfig.musica.url;
  const musicTitle = clientConfig.musica.titulo;
  const musicAutoplay = clientConfig.musica.autoplay;

  // 🎃 CÓDIGO DE VESTIMENTA - HALLOWEEN
  const codigoVestimenta = {
    tema: "¡Disfraz Obligatorio!",
    descripcion:
      "Vení caracterizado con tu disfraz más terrorífico, creativo o divertido. ¡Habrá premio al mejor disfraz!",
  };

  // 🔐 ADMIN
  const adminPassword = clientConfig.admin.password;

  // 🗄️ SERVICIOS EXTERNOS (Usar variables de entorno para seguridad)
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL || clientConfig.servicios.supabase.url;
  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    clientConfig.servicios.supabase.anonKey;
  const emailJsServiceId =
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ||
    clientConfig.servicios.emailjs.serviceId;
  const emailJsTemplateId =
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ||
    clientConfig.servicios.emailjs.templateId;
  const emailJsPublicKey =
    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ||
    clientConfig.servicios.emailjs.publicKey;

  // 🌐 CONFIGURACIÓN DEL SITIO
  const siteTitle = "Halloween Party 2025";
  const siteDescription = "Una noche de terror y diversión inolvidable";
  const productionUrl =
    process.env.NEXT_PUBLIC_PRODUCTION_URL || clientConfig.sitio.url;
  const siteName = "Halloween Party";
  const siteLanguage = clientConfig.sitio.idioma;
  const ogImage = clientConfig.sitio.imagenOG;

  // 🎭 SECCIONES VISIBLES
  const seccionesVisibles = clientConfig.seccionesVisibles;

  // 🎨 COLORES HALLOWEEN
  const colores = {
    naranja: "#FF6B35",
    morado: "#6B2D5C",
    negro: "#000000",
    verde: "#4CAF50",
    dorado: "#FFB800",
    // Mantener compatibilidad con estructura anterior
    primario: {
      50: "#FFF3E0",
      100: "#FFE0B2",
      200: "#FFCC80",
      300: "#FFB74D",
      400: "#FFA726",
      500: "#FF6B35",
      600: "#F57C00",
      700: "#E65100",
      800: "#6B2D5C",
      900: "#1a1a1a",
    },
    secundario: {
      50: "#E8EAF6",
      100: "#C5CAE9",
      200: "#9FA8DA",
      300: "#7986CB",
      400: "#5C6BC0",
      500: "#6B2D5C",
      600: "#3949AB",
      700: "#303F9F",
      800: "#283593",
      900: "#1A237E",
    },
    terciario: {
      300: "#FFD54F",
      400: "#FFB800",
      500: "#FFA000",
    },
  };

  const efectos = themeConfig.efectos;
  const fuentes = themeConfig.fuentes;

  // 📊 TÍTULOS DINÁMICOS (para meta tags)
  const titulos = {
    principal: siteTitle,
    admin: `Panel de Administración - Halloween Party`,
    descripcion: siteDescription,
    redes: `Halloween Party 2025`,
  };

  // 🔄 VALIDACIONES
  if (!whatsapp && process.env.NODE_ENV === "development") {
    console.warn("⚠️ Número de WhatsApp no configurado");
  }

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn(
      "⚠️ Supabase no está configurado. Algunas funciones pueden no funcionar."
    );
  }

  // 🎯 RETURN: Toda la configuración en un solo objeto
  return {
    // Evento
    nombreEvento,
    fechaEvento,
    fechaCompleta,
    horaEvento,
    horaInicio,
    horaFin,

    // Ubicación
    lugar,
    direccion,
    ciudad,
    provincia,
    pais,
    imagenesSalon,
    googleMapsUrl: mapUrls.google,
    wazeUrl: mapUrls.waze,

    // Contacto
    nombreFamilia,
    telefono,
    email,
    whatsapp,

    // Redes sociales
    instagramUser,
    instagramUrl,
    hashtag,

    // RSVP
    fechaLimiteRSVP,
    fechaLimiteRSVPISO,
    mensajeCierreRSVP,
    mostrarDietaryRestrictions,

    // Regalos
    mostrarRegalos,
    alias,
    cbu,
    nombreCuentaBancaria,
    mensajeRegalos,

    // Música
    musicUrl,
    musicTitle,
    musicAutoplay,

    // Código de vestimenta
    codigoVestimenta,

    // Admin
    adminPassword,

    // Servicios
    supabaseUrl,
    supabaseAnonKey,
    emailJsServiceId,
    emailJsTemplateId,
    emailJsPublicKey,

    // Sitio
    siteTitle,
    siteDescription,
    productionUrl,
    siteName,
    siteLanguage,
    ogImage,
    titulos,

    // Secciones visibles
    seccionesVisibles,

    // Tema Halloween
    colores,
    efectos,
    fuentes,
  };
}

/**
 * 🎨 HOOK PARA OBTENER SOLO LOS COLORES HALLOWEEN
 */
export function useHalloweenColors() {
  return {
    naranja: "#FF6B35",
    morado: "#6B2D5C",
    negro: "#000000",
    verde: "#4CAF50",
    dorado: "#FFB800",
  };
}

/**
 * 📋 HOOK PARA OBTENER SOLO EL CÓDIGO DE VESTIMENTA
 */
export function useDressCode() {
  return {
    tema: "¡Disfraz Obligatorio!",
    descripcion:
      "Vení caracterizado con tu disfraz más terrorífico, creativo o divertido. ¡Habrá premio al mejor disfraz!",
  };
}

export default useHalloweenConfig;
