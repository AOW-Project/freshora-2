"use client"

import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface ToastProps {
  title?: string
  description?: string
  action?: React.ReactNode
  onClose?: () => void
  variant?: "default" | "warning" | "success" | "destructive"
  className?: string
}

export function Toast({ title, description, action, onClose, variant = "default", className }: ToastProps) {
  const variantStyles = {
    default: "bg-white border-gray-200 text-gray-900",
    warning: "bg-amber-50 border-amber-200 text-amber-900",
    success: "bg-green-50 border-green-200 text-green-900",
    destructive: "bg-red-50 border-red-200 text-red-900",
  }

  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 z-50 w-96 rounded-lg border p-4 shadow-lg animate-in slide-in-from-bottom-2",
        variantStyles[variant],
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <div className="flex-1">
          {title && <div className="font-semibold text-sm mb-1">{title}</div>}
          {description && <div className="text-sm opacity-90">{description}</div>}
          {action && <div className="mt-3">{action}</div>}
        </div>
        {onClose && (
          <button onClick={onClose} className="opacity-70 hover:opacity-100 transition-opacity">
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
}

interface ToastContextType {
  showToast: (props: Omit<ToastProps, "onClose">) => void
  hideToast: () => void
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = React.useState<ToastProps | null>(null)

  const showToast = React.useCallback((props: Omit<ToastProps, "onClose">) => {
    setToast({ ...props, onClose: () => setToast(null) })
  }, [])

  const hideToast = React.useCallback(() => {
    setToast(null)
  }, [])

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      {toast && <Toast {...toast} />}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}
