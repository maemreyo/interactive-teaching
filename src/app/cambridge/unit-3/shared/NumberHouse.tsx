// src/app/cambridge/unit-3/shared/NumberHouse.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Language } from "./types";
import { translations } from "./translations";

interface NumberHouseProps {
  hundreds?: number | string;
  tens?: number | string;
  units?: number | string;
  label?: string;
  showRoof?: boolean;
  highlightColumn?: "hundreds" | "tens" | "units" | null;
  carryValue?: number;
  borrowValue?: number;
  size?: "small" | "medium" | "large";
  className?: string;
  language?: Language;
}

export const NumberHouse = ({
  hundreds = "",
  tens = "",
  units = "",
  label = "",
  showRoof = true,
  highlightColumn = null,
  carryValue,
  borrowValue,
  size = "medium",
  className,
  language = "en"
}: NumberHouseProps) => {
  const t = translations[language];
  
  const sizeClasses = {
    small: {
      container: "w-48 h-32",
      cell: "h-16 text-2xl",
      roof: "h-8",
      label: "text-lg",
      header: "text-xs"
    },
    medium: {
      container: "w-72 h-48",
      cell: "h-24 text-4xl",
      roof: "h-12",
      label: "text-xl",
      header: "text-sm"
    },
    large: {
      container: "w-96 h-64",
      cell: "h-32 text-6xl",
      roof: "h-16",
      label: "text-2xl",
      header: "text-base"
    }
  };

  const currentSize = sizeClasses[size];

  return (
    <motion.div 
      className={cn("relative", className)}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Label */}
      {label && (
        <motion.div 
          className={cn(
            "text-center font-bold text-gray-800 mb-4",
            currentSize.label
          )}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {label}
        </motion.div>
      )}

      {/* Carry values */}
      {carryValue && (
        <motion.div 
          className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-red-500 font-bold text-lg"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 500 }}
        >
          +{carryValue}
        </motion.div>
      )}

      {/* Borrow values */}
      {borrowValue && (
        <motion.div 
          className="absolute -top-8 right-4 text-blue-500 font-bold text-lg"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 500 }}
        >
          -{borrowValue}
        </motion.div>
      )}

      <div className={cn("relative", currentSize.container)}>
        {/* Roof */}
        {showRoof && (
          <motion.div 
            className={cn(
              "absolute -top-2 left-1/2 transform -translate-x-1/2 bg-red-500 rounded-t-lg border-4 border-red-600 flex items-center justify-center",
              currentSize.roof
            )}
            style={{ 
              width: "110%",
              clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)"
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-white font-bold text-lg">🏠</span>
          </motion.div>
        )}

        {/* House structure */}
        <div className="w-full h-full bg-yellow-100 border-4 border-yellow-600 rounded-lg shadow-lg flex">
          {/* Hundreds column */}
          <motion.div 
            className={cn(
              "flex-1 border-r-2 border-yellow-600 flex flex-col",
              highlightColumn === "hundreds" && "bg-green-200 animate-pulse"
            )}
            whileHover={{ backgroundColor: "rgb(254 240 138)" }}
          >
            {/* Header */}
            <div className={cn(
              "bg-yellow-300 border-b-2 border-yellow-600 p-2 text-center font-bold text-gray-800",
              currentSize.header
            )}>
              {t.numberHouse.hundreds}
            </div>
            
            {/* Content */}
            <motion.div 
              className={cn(
                "flex-1 flex items-center justify-center font-bold text-gray-800",
                currentSize.cell
              )}
              animate={highlightColumn === "hundreds" ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.5, repeat: highlightColumn === "hundreds" ? Infinity : 0 }}
            >
              {hundreds}
            </motion.div>
          </motion.div>

          {/* Tens column */}
          <motion.div 
            className={cn(
              "flex-1 border-r-2 border-yellow-600 flex flex-col",
              highlightColumn === "tens" && "bg-green-200 animate-pulse"
            )}
            whileHover={{ backgroundColor: "rgb(254 240 138)" }}
          >
            {/* Header */}
            <div className={cn(
              "bg-yellow-300 border-b-2 border-yellow-600 p-2 text-center font-bold text-gray-800",
              currentSize.header
            )}>
              {t.numberHouse.tens}
            </div>
            
            {/* Content */}
            <motion.div 
              className={cn(
                "flex-1 flex items-center justify-center font-bold text-gray-800",
                currentSize.cell
              )}
              animate={highlightColumn === "tens" ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.5, repeat: highlightColumn === "tens" ? Infinity : 0 }}
            >
              {tens}
            </motion.div>
          </motion.div>

          {/* Units column */}
          <motion.div 
            className={cn(
              "flex-1 flex flex-col",
              highlightColumn === "units" && "bg-green-200 animate-pulse"
            )}
            whileHover={{ backgroundColor: "rgb(254 240 138)" }}
          >
            {/* Header */}
            <div className={cn(
              "bg-yellow-300 border-b-2 border-yellow-600 p-2 text-center font-bold text-gray-800",
              currentSize.header
            )}>
              {t.numberHouse.units}
            </div>
            
            {/* Content */}
            <motion.div 
              className={cn(
                "flex-1 flex items-center justify-center font-bold text-gray-800",
                currentSize.cell
              )}
              animate={highlightColumn === "units" ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.5, repeat: highlightColumn === "units" ? Infinity : 0 }}
            >
              {units}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};