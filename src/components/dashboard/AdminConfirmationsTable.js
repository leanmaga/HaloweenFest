// src/components/dashboard/AdminConfirmationsTable.js
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Users, Trash2, Loader2, Phone, UserCheck } from "lucide-react";

export default function AdminConfirmationsTable({
  filteredConfirmations,
  deleteConfirmation,
  isDeleting = false,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-b from-gray-900 to-black rounded-2xl shadow-2xl border-2 border-orange-500 overflow-hidden"
    >
      <div className="px-6 py-4 border-b border-orange-500/30 bg-gradient-to-r from-orange-900/20 to-purple-900/20">
        <h2 className="text-lg font-semibold text-orange-500 flex items-center gap-2">
          👥 Confirmaciones de Asistencia ({filteredConfirmations?.length || 0})
        </h2>
      </div>

      {filteredConfirmations?.length > 0 ? (
        <div
          className="overflow-auto custom-scrollbar"
          style={{ maxHeight: "400px" }}
        >
          <table className="w-full">
            <thead className="bg-gray-800 sticky top-0">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-orange-400 uppercase">
                  Nombre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-orange-400 uppercase">
                  Teléfono
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-orange-400 uppercase">
                  Mensaje
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-orange-400 uppercase">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-orange-400 uppercase">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-orange-500/20">
              <AnimatePresence>
                {filteredConfirmations.map((guest) => (
                  <motion.tr
                    key={guest.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="hover:bg-orange-900/10 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-orange-600 to-orange-700 rounded-full flex items-center justify-center flex-shrink-0">
                          <UserCheck className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-orange-200">
                            {guest.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-purple-200">
                      {guest.phone ? (
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-green-400" />
                          <span>{guest.phone}</span>
                        </div>
                      ) : (
                        <span className="text-gray-500 text-xs flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-600" />
                          Sin teléfono
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm max-w-xs">
                      {guest.message ? (
                        <div
                          className="overflow-y-auto bg-purple-900/50 text-purple-200 px-2 py-1 rounded-lg text-xs border border-purple-500/30"
                          style={{ maxHeight: "50px" }}
                          title={guest.message}
                        >
                          {guest.message}
                        </div>
                      ) : (
                        <span className="text-gray-500 text-xs">
                          Sin mensaje
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-purple-300">
                      {new Date(guest.created_at).toLocaleDateString("es-ES", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => deleteConfirmation(guest.id)}
                        disabled={isDeleting}
                        className="p-1 text-red-500 hover:text-red-400 hover:bg-red-900/30 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Eliminar confirmación"
                      >
                        {isDeleting ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-orange-500/50 mx-auto mb-4" />
          <p className="text-purple-300">
            Aún no hay confirmaciones de asistencia.
          </p>
        </div>
      )}

      {filteredConfirmations?.length > 5 && (
        <div className="px-6 py-3 bg-gray-900/50 text-center border-t border-orange-500/30">
          <p className="text-sm text-orange-400 flex items-center justify-center gap-2">
            <span>Desliza para ver más confirmaciones</span>
            <svg
              className="w-4 h-4 animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </p>
        </div>
      )}
    </motion.div>
  );
}
