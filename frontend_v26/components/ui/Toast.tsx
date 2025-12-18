"use client"

import * as React from "react"
import { useEffect, useMemo, useRef, useState } from "react"
import { createPortal } from "react-dom"

export type ToastType = "info" | "success" | "error" | "warning"

export interface ToastProps {
  message: string
  /** milliseconds before auto-hide; default 3000 */
  duration?: number
  /** optional callback fired after the toast finishes hiding */
  onClose?: () => void
  /** visual variant */
  type?: ToastType
  /** extra tailwind classes for the wrapper */
  className?: string
}

const typeStyles: Record<ToastType, string> = {
  info: "bg-white/10 border-white/20 text-white",
  success: "bg-emerald-600/90 border-emerald-400/40 text-white",
  error: "bg-red-600/90 border-red-400/40 text-white",
  warning: "bg-amber-600/90 border-amber-400/40 text-white",
}

export function Toast({
  message,
  duration = 3000,
  onClose,
  type = "info",
  className = "",
}: ToastProps) {
  const [mounted, setMounted] = useState(true)
  const [visible, setVisible] = useState(false)
  const hideTimer = useRef<number | null>(null)
  const afterTimer = useRef<number | null>(null)

  // Create a portal root lazily (document only exists client-side)
  const portalTarget = useMemo(() => (typeof document !== "undefined" ? document.body : null), [])

  useEffect(() => {
    // allow enter animation
    const id = window.setTimeout(() => setVisible(true), 20)
    return () => window.clearTimeout(id)
  }, [])

  useEffect(() => {
    if (!mounted) return
    // schedule auto hide
    hideTimer.current = window.setTimeout(() => {
      setVisible(false)
    }, Math.max(0, duration)) as unknown as number

    return () => {
      if (hideTimer.current) window.clearTimeout(hideTimer.current)
    }
  }, [mounted, duration])

  // After hide animation completes, call onClose
  useEffect(() => {
    if (visible) return
    if (!mounted) return
    // give time for exit transition (~250ms)
    afterTimer.current = window.setTimeout(() => {
      onClose?.()
    }, 260) as unknown as number
    return () => {
      if (afterTimer.current) window.clearTimeout(afterTimer.current)
    }
  }, [visible, mounted, onClose])

  if (!portalTarget) return null

  return createPortal(
    <div
      className={
        // positioning: bottom-center on mobile, bottom-right on >= md
        "fixed z-50 bottom-4 left-1/2 -translate-x-1/2 md:left-auto md:right-4 md:translate-x-0 " +
        // transition for slide/fade
        "transition-all duration-250 ease-out " +
        (visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3")
      }
      aria-live="polite"
      role="status"
    >
      <div
        className={
          "max-w-[92vw] md:max-w-sm px-4 py-3 rounded-xl backdrop-blur-md border shadow-lg " +
          typeStyles[type] +
          " " +
          className
        }
      >
        <p className="text-sm md:text-base leading-relaxed">{message}</p>
      </div>
    </div>,
    portalTarget
  )
}

export default Toast
