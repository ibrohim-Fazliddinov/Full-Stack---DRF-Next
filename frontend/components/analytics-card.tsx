"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

type AnalyticsCardProps = {
  title: string
  value: number | string
  description?: string
  icon: React.ReactNode
  color: string
  trend?: number
}

export default function AnalyticsCard({ title, value, description, icon, color, trend }: AnalyticsCardProps) {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
      <Card className="dark:bg-gray-800 transition-all duration-300 hover:shadow-md overflow-hidden">
        <CardHeader className="pb-2 relative">
          <motion.div
            className="absolute -right-4 -top-4 w-16 h-16 rounded-full opacity-10"
            style={{ backgroundColor: color }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          />
          <CardTitle className="text-sm font-medium dark:text-white">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <div className={`p-2 rounded-full mr-3`} style={{ backgroundColor: `${color}20`, color: color }}>
              {icon}
            </div>
            <div className="text-2xl font-bold dark:text-white">{value}</div>
          </div>
          {description && (
            <p className="text-xs text-muted-foreground mt-2 flex items-center">
              {trend !== undefined && (
                <span className={`inline-block mr-1 ${trend >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {trend >= 0 ? "↑" : "↓"} {Math.abs(trend)}%
                </span>
              )}
              {description}
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

