"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Music, Trash2, Loader2 } from "lucide-react";

export default function AdminSongsTable({
  songs,
  deleteSong,
  isDeleting = false,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-b from-gray-900 to-black rounded-2xl shadow-2xl border-2 border-purple-500 overflow-hidden"
    >
      <div className="px-6 py-4 border-b border-purple-500/30 bg-gradient-to-r from-purple-900/20 to-orange-900/20">
        <h2 className="text-lg font-semibold text-purple-400 flex items-center gap-2">
          🎵 Canciones Solicitadas ({songs.length})
        </h2>
      </div>

      {songs.length > 0 ? (
        <div
          className="overflow-auto custom-scrollbar"
          style={{ maxHeight: "400px" }}
        >
          <table className="w-full">
            <thead className="bg-gray-800 sticky top-0">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-purple-400 uppercase">
                  Canción
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-purple-400 uppercase">
                  Artista
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-purple-400 uppercase">
                  Mensaje
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-purple-400 uppercase">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-purple-400 uppercase">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-500/20">
              <AnimatePresence>
                {songs.map((song) => (
                  <motion.tr
                    key={song.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="hover:bg-purple-900/10 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-orange-200">
                      {song.song_name}
                    </td>
                    <td className="px-6 py-4 text-sm text-purple-200">
                      {song.artist_name || (
                        <span className="text-gray-500">Sin artista</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-purple-200 max-w-xs">
                      {song.message ? (
                        <div
                          className="overflow-y-auto bg-purple-900/50 text-purple-200 px-2 py-1 rounded-lg border border-purple-500/30"
                          style={{ maxHeight: "60px" }}
                          title={song.message}
                        >
                          {song.message}
                        </div>
                      ) : (
                        <span className="text-gray-500">Sin mensaje</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-purple-300">
                      {new Date(song.created_at).toLocaleDateString("es-ES", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => deleteSong(song.id)}
                        disabled={isDeleting}
                        className="p-1 text-red-500 hover:text-red-400 hover:bg-red-900/30 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Eliminar canción"
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
          <Music className="w-12 h-12 text-purple-500/50 mx-auto mb-4" />
          <p className="text-purple-300">Aún no hay canciones solicitadas.</p>
        </div>
      )}

      {songs.length > 5 && (
        <div className="px-6 py-3 bg-gray-900/50 text-center border-t border-purple-500/30">
          <p className="text-sm text-purple-400 flex items-center justify-center gap-2">
            <span>Desliza para ver más canciones</span>
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
