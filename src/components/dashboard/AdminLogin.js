"use client";

import { motion } from "framer-motion";
import { Ghost, Eye, EyeOff, AlertCircle } from "lucide-react";

export default function AdminLogin({
  password,
  showPassword,
  authError,
  handleLogin,
  setPassword,
  setShowPassword,
  nombre,
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900 via-purple-900 to-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-b from-gray-900 to-black rounded-2xl shadow-2xl border-2 border-orange-500 p-8 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Ghost className="w-12 h-12 text-orange-500 mx-auto mb-4 animate-pulse" />
          <h1 className="text-2xl font-bold text-orange-500 mb-2">
            Panel de Administración
          </h1>
          <p className="text-purple-300">{nombre} - Acceso Restringido</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-orange-400 mb-2">
              Contraseña de Administrador
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-orange-500 text-white rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder-gray-500"
                placeholder="Ingresa la contraseña"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-400 hover:text-orange-500"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {authError && (
              <div className="mt-2 flex items-center gap-2 text-red-500">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">{authError}</span>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-600 to-orange-700 text-white py-3 rounded-xl font-semibold hover:from-orange-700 hover:to-orange-800 transition-all shadow-lg shadow-orange-500/50"
          >
            Iniciar Sesión
          </button>
        </form>

        <div className="mt-6">
          <button
            onClick={() => (window.location.href = "/")}
            className="w-full bg-purple-900 text-purple-200 py-3 rounded-xl font-medium hover:bg-purple-800 transition-all flex items-center justify-center gap-2 border border-purple-700"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Volver al Sitio Principal
          </button>
        </div>

        <div className="mt-6 text-center text-xs text-orange-400">
          Solo para administradores autorizados 👻
        </div>
      </motion.div>
    </div>
  );
}
