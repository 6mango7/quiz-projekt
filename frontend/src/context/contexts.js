// Konteksty i hooki do nich. Same "providery" są w osobnych plikach .jsx,
// bo Vite (Fast Refresh) lubi, gdy plik z komponentami eksportuje tylko komponenty.

import { createContext, useContext } from 'react'

export const AuthContext = createContext(null)
export const ThemeContext = createContext(null)
export const ToastContext = createContext(null)

function useRequiredContext(context, name) {
  const value = useContext(context)
  if (!value) throw new Error(`${name} musi być użyty wewnątrz swojego Providera`)
  return value
}

// { user, loading, login, register, logout, setUser }
export function useAuth() {
  return useRequiredContext(AuthContext, 'useAuth')
}

// { theme, setTheme, toggleTheme }
export function useTheme() {
  return useRequiredContext(ThemeContext, 'useTheme')
}

// { success(msg), error(msg), info(msg) }
export function useToast() {
  return useRequiredContext(ToastContext, 'useToast')
}
