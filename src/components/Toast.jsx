import { createContext, useContext, useState, useCallback, useRef } from 'react'
import './Toast.css'

const ToastContext = createContext(null)

export function useToast() {
  return useContext(ToastContext)
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const idRef = useRef(0)

  const showToast = useCallback((message, type = 'success') => {
    const id = ++idRef.current
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 2500)
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="toast-container" aria-live="polite">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast toast--${toast.type} glass`}>
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
