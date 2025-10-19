// src/components/dashboard/AdminStats.js
"use client";

import { motion } from "framer-motion";
import { Users, MessageSquare, Utensils, Phone, Music } from "lucide-react";

export default function AdminStats({ stats }) {
  const statCards = [
    {
      title: "Total Confirmaciones",
      value: stats.totalConfirmations || 0,
      icon: Users,
      color: "text-orange-400",
      bgColor: "bg-orange-900/30",
      borderColor: "border-orange-500",
      description: "Personas confirmadas",
    },
    {
      title: "Con Teléfono",
      value: stats.withPhone || 0,
      icon: Phone,
      color: "text-green-400",
      bgColor: "bg-green-900/30",
      borderColor: "border-green-500",
      description: "Teléfonos proporcionados",
    },
    {
      title: "Restricciones Alimentarias",
      value: stats.withDietary || 0,
      icon: Utensils,
      color: "text-orange-500",
      bgColor: "bg-orange-800/30",
      borderColor: "border-orange-600",
      description: "Con restricciones",
    },
    {
      title: "Con Mensajes",
      value: stats.withMessages || 0,
      icon: MessageSquare,
      color: "text-purple-400",
      bgColor: "bg-purple-900/30",
      borderColor: "border-purple-500",
      description: "Mensajes especiales",
    },
    {
      title: "Canciones Solicitadas",
      value: stats.totalSongs || 0,
      icon: Music,
      color: "text-purple-500",
      bgColor: "bg-purple-800/30",
      borderColor: "border-purple-600",
      description: "Peticiones musicales",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      {statCards.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className={`bg-gradient-to-b from-gray-900 to-black rounded-2xl shadow-2xl border-2 ${stat.borderColor} p-6 hover:shadow-orange-500/20 transition-shadow`}
        >
          <div className="flex items-center justify-between">
            <div
              className={`p-3 rounded-xl ${stat.bgColor} border ${stat.borderColor}`}
            >
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-2xl font-bold text-orange-400">{stat.value}</p>
            <p className="text-sm font-medium text-orange-300 mt-1">
              {stat.title}
            </p>
            <p className="text-xs text-purple-300 mt-1">{stat.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
